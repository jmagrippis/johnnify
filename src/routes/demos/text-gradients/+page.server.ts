import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async () => {
	return {
		meta: {
			title: 'Text Gradients 🎓 Demos',
			description:
				'Various examples of how we can do Text Gradients, just through the magic of CSS!',
		},
	}
}
