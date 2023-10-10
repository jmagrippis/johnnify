import 'xhr'
import {serve} from 'std/http/server.ts'
import {createClient} from '@supabase/supabase-js'
import {codeBlock, oneLine} from 'commmon-tags'
import {isWithinTokenLimit} from 'gpt-tokenizer'
import {
	ChatCompletionRequestMessageRoleEnum,
	Configuration,
	CreateChatCompletionRequest,
	OpenAIApi,
} from 'openai'
import {ensureGetEnv} from '../_utils/env.ts'
import {ApplicationError, UserError} from '../_utils/errors.ts'

const OPENAI_KEY = ensureGetEnv('OPENAI_KEY')
const SUPABASE_URL = ensureGetEnv('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = ensureGetEnv('SUPABASE_SERVICE_ROLE_KEY')

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
	db: {schema: 'docs'},
})
const openAiConfiguration = new Configuration({apiKey: OPENAI_KEY})
const openai = new OpenAIApi(openAiConfiguration)

export const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers':
		'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
	try {
		// Handle CORS
		if (req.method === 'OPTIONS') {
			return new Response('ok', {headers: corsHeaders})
		}

		const query = new URL(req.url).searchParams.get('query')

		if (!query) {
			throw new UserError('Missing query in request data')
		}

		const sanitizedQuery = query.trim()

		// Moderate the content to comply with OpenAI T&C
		const moderationResponse = await openai.createModeration({
			input: sanitizedQuery,
		})

		const [results] = moderationResponse.data.results

		if (results.flagged) {
			throw new UserError('Flagged content', {
				flagged: true,
				categories: results.categories,
			})
		}

		const embeddingResponse = await openai.createEmbedding({
			model: 'text-embedding-ada-002',
			input: sanitizedQuery.replaceAll('\n', ' '),
		})

		if (embeddingResponse.status !== 200) {
			throw new ApplicationError(
				'Failed to create embedding for question',
				embeddingResponse,
			)
		}

		const [{embedding}] = embeddingResponse.data.data

		const {error: matchError, data: pageSections} = await supabaseClient.rpc(
			'match_page_sections',
			{
				embedding,
				match_threshold: 0.78,
				match_count: 10,
				min_content_length: 50,
			},
		)

		if (matchError) {
			throw new ApplicationError('Failed to match page sections', matchError)
		}

		const TOKEN_LIMIT = 1_500
		let contextText = ''

		for (const pageSection of pageSections) {
			const content = pageSection.content

			const nextContextText = contextText + `${content.trim()}\n---\n`
			if (!isWithinTokenLimit(nextContextText, TOKEN_LIMIT)) {
				break
			}

			contextText += nextContextText
		}

		const messages = [
			{
				role: ChatCompletionRequestMessageRoleEnum.System,
				content: codeBlock`
      ${oneLine`
        You are the helpful assistant Johnnybot, representing Johnny Magrippis.
        Johnny is a Principal Software Engineer and educational YouTuber.
        Johnny is known for his positive personality, smiley face and ability to explain things concisely!
        Johnny codes around the world, and inspires others to do the same!
        Johnny loves coding, video games, beach volleyball and "dad jokes".
        You have watched all of Johnny's videos, and love to help other viewers.
        Given the following sections of transcripts from Johnny's videos,
        answer user questions based mostly on that information.
      `}

      Context sections:
      ${contextText}

      Please answer in markdown, including related code snippets if available.
    `,
			},
			{
				role: ChatCompletionRequestMessageRoleEnum.User,
				content: sanitizedQuery,
			},
		]

		const completionOptions: CreateChatCompletionRequest = {
			model: 'gpt-4',
			messages,
			max_tokens: 512,
			temperature: 0,
			stream: true,
		}

		// The Fetch API allows for easier response streaming over the OpenAI client.
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			headers: {
				Authorization: `Bearer ${OPENAI_KEY}`,
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(completionOptions),
		})

		if (!response.ok) {
			const error = await response.json()
			throw new ApplicationError('Failed to generate completion', error)
		}

		// Proxy the streamed SSE response from OpenAI
		return new Response(response.body, {
			headers: {
				...corsHeaders,
				'Content-Type': 'text/event-stream',
			},
		})
	} catch (err: unknown) {
		if (err instanceof UserError) {
			return Response.json(
				{
					error: err.message,
					data: err.data,
				},
				{
					status: 400,
					headers: corsHeaders,
				},
			)
		} else if (err instanceof ApplicationError) {
			// Print out application errors with their additional data
			console.error(`${err.message}: ${JSON.stringify(err.data)}`)
		} else {
			// Print out unexpected errors as is to help with debugging
			console.error(err)
		}

		// TODO: include more response info in debug environments
		return Response.json(
			{
				error: 'There was an error processing your request',
			},
			{
				status: 500,
				headers: corsHeaders,
			},
		)
	}
})
