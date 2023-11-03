import type {PageServerLoad} from './$types'

export const load: PageServerLoad = () => ({
	chapterCount: 18,
	meta: {
		title: 'Learn SvelteKit!',
		description:
			'Transition from HTML & Javascript basics, to deploying fullstack apps with SvelteKit! Particularly ideal for engineers transitioning from React or even Next.js fundamentals.',
	},
})
