import {redirect} from '@sveltejs/kit'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals: {getSession}}) => {
	const session = await getSession()

	// if the user is NOT logged in return them to the home page
	if (!session) {
		throw redirect(303, '/login')
	}

	return {
		meta: {
			title: 'Profile',
			description: 'Manage your account and view your profile details.',
		},
	}
}
