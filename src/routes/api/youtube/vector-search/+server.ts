import {OPENAI_KEY, SUPABASE_SERVICE_ROLE_KEY} from '$env/static/private'
import {PUBLIC_SUPABASE_URL} from '$env/static/public'
import {createClient} from '@supabase/supabase-js'
import {isWithinTokenLimit} from 'gpt-tokenizer'
import OpenAI from 'openai'
import type {RequestHandler} from './$types'
import {error} from '@sveltejs/kit'

export const GET: RequestHandler = async ({url, fetch}) => {
	const query = url.searchParams.get('query')?.trim()

	if (!query) {
		error(400, 'you need a query to search')
	}

	const openai = new OpenAI({
		apiKey: OPENAI_KEY,
	})

	// Moderate the content to comply with OpenAI T&C
	const moderationResponse = await openai.moderations.create({
		input: query,
	})

	const [results] = moderationResponse.results

	if (results.flagged) {
		error(400)
	}

	const embeddingResponse = await openai.embeddings.create({
		model: 'text-embedding-ada-002',
		input: query.replaceAll('\n', ' '),
	})

	const [{embedding}] = embeddingResponse.data

	const supabaseClient = createClient(
		PUBLIC_SUPABASE_URL,
		SUPABASE_SERVICE_ROLE_KEY,
		{
			db: {schema: 'docs'},
		},
	)
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
		throw matchError
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
			role: 'system',
			content: `
You are the helpful assistant Johnnybot, representing Johnny Magrippis.
Johnny is a Principal Software Engineer and educational YouTuber.
Johnny is known for his positive personality, smiley face and ability to explain things concisely!
Johnny codes around the world, and inspires others to do the same!
Johnny loves coding, video games, beach volleyball and "dad jokes".
You have watched all of Johnny's videos, and love to help other viewers.
Given the following sections of transcripts from Johnny's videos, answer user questions based mostly on that information.

Context sections:
${contextText}

Please answer in markdown, including related code snippets you can find.
`,
		},
		{
			role: 'user',
			content: query,
		},
	]

	const completionOptions = {
		model: 'gpt-4-0125-preview',
		messages,
		max_tokens: 512,
		temperature: 0,
		stream: true,
	}

	const response = await fetch('https://api.openai.com/v1/chat/completions', {
		headers: {
			Authorization: `Bearer ${OPENAI_KEY}`,
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(completionOptions),
	})

	if (!response.ok) {
		try {
			const errorData = await response.json()
			console.error(errorData)
		} catch {
			// swallow error
		}
		throw new Error('Error generating ChatGPT completion')
	}

	return response
}
