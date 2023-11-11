<script lang="ts">
	import type {EventHandler} from 'svelte/elements'

	import {PUBLIC_SUPABASE_URL} from '$env/static/public'
	import Button from '$lib/components/Button.svelte'
	import Spinner from '$lib/icons/spinner.svg?component'
	import PageTitle from '$lib/components/PageTitle.svelte'

	let formState: 'idle' | 'submitting' | 'replying' | 'done' | Error = 'idle'

	let questions: string[] = []
	let answers: string[] = []

	const vectorFunctionUrl = `${PUBLIC_SUPABASE_URL}/functions/v1/vector-search`

	const onSubmit: EventHandler<SubmitEvent, HTMLFormElement> = (event) => {
		let question = new FormData(event.currentTarget).get('question')
		if (typeof question !== 'string') return

		questions.push(question)

		let currentAnswerIndex = answers.length
		answers[currentAnswerIndex] = ''
		formState = 'submitting'

		const queryUrl = new URL(vectorFunctionUrl)
		queryUrl.searchParams.set('query', question)

		const eventSource = new EventSource(queryUrl)

		eventSource.addEventListener('error', (err) => {
			console.error(err)
			formState =
				err instanceof Error
					? err
					: new Error('something went wrong getting you a response!')
		})

		eventSource.addEventListener('message', async (e: MessageEvent) => {
			formState = 'replying'

			if (e.data === '[DONE]') {
				eventSource.close()
				const url = new URL('/api/parse-md', window.location.origin)
				url.searchParams.set('md', answers[currentAnswerIndex])
				const parseMdResponse = await fetch(url)
				if (parseMdResponse.ok) {
					answers[currentAnswerIndex] = (await parseMdResponse.json()).html
				}
				formState = 'done'

				return
			}

			const completionResponse = JSON.parse(e.data)
			const content = completionResponse.choices[0].delta.content

			if (content) {
				answers[currentAnswerIndex] += content
			}
		})
	}
</script>

<main class="container max-w-prose grow px-2 text-lg">
	<PageTitle>Ask & learn with Generative Q&A!</PageTitle>
	<p>Ask a chatbot trained on Johnny’s videos and guides!</p>

	<p>
		Great at programming questions, and especially Svelte, SvelteKit, React &
		Next.js... but feel free to ask anything you would like 🙌
	</p>

	{#if questions.length || answers.length}
		<section class="flex flex-col gap-4 py-2">
			{#each questions as question}
				<div class="rounded bg-surface-2 px-4 py-2">
					<p>{question}</p>
				</div>
			{/each}
			{#each answers as answer, i}
				{#if i === answers.length - 1 && formState === 'submitting'}
					<Spinner class="w-12 self-center text-emphasis" />
				{:else}
					<div
						class="overflow-x-scroll break-words rounded bg-secondary-800 px-4 py-2 text-xl text-white"
					>
						{@html answer}
					</div>
				{/if}
			{/each}
		</section>
	{/if}

	<form class="flex flex-col gap-4 py-2" on:submit|preventDefault={onSubmit}>
		<input
			class="w-full rounded bg-surface-2 text-copy-base placeholder:font-light placeholder:text-copy-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
			type="text"
			name="question"
			placeholder="type your question"
			required
			aria-label="your question"
			minlength="4"
		/>
		<Button disabled={formState === 'submitting' || formState === 'replying'}>
			<span>🤖</span><span>Ask Johnnybot!</span>
		</Button>
	</form>
</main>
