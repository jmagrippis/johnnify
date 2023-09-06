import {redirect} from '@sveltejs/kit'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals: {getSession}}) => {
	const session = await getSession()

	// if the user is already logged in return them to their profile page
	if (session) {
		throw redirect(303, '/profile')
	}

	return {
		meta: {
			title: 'Login',
			description:
				'Login to your account, to purchase or view special content!',
		},
	}
}
