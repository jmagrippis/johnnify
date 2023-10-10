import type {PageServerLoad} from './$types'

export const load: PageServerLoad = () => ({
	meta: {
		title: 'Ask Johnnybot 🤖',
		description:
			'Ask a chatbot trained on Johnny’s videos and guides! Great at programming questions, and especially Svelte, SvelteKit, React & Next.js but feel free to ask anything you would like.',
	},
})
