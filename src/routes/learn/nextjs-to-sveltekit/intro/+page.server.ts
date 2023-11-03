import type {PageServerLoad} from './$types'

export const load: PageServerLoad = () => ({
	chapterCount: 18,
	meta: {
		title: 'Learn SvelteKit! Introduction',
		description:
			'The introduction to the brand new “Learn SvelteKit” course by Johnny!',
	},
})
