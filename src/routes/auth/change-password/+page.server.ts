import {fail, redirect} from '@sveltejs/kit'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({locals: {getSession}}) => {
	const session = await getSession()

	// if the user is not logged, get them to the login page
	// they should only reach this page by clicking
	// a password reset email!
	if (!session) {
		throw redirect(303, '/login')
	}

	return {
		meta: {
			title: 'Change password',
			description:
				'You’ve chosen to reset your password, so in this page you’ll get to update it',
		},
	}
}

export const actions = {
	default: async ({request, locals: {supabase}}) => {
		const formData = await request.formData()

		const password = formData.get('password')

		if (typeof password !== 'string') {
			return fail(400, {
				error: 'You need a password to update your password 🤔',
			})
		}

		const {error} = await supabase.auth.updateUser({password})

		if (error) {
			return fail(400, {
				message: 'Something went wrong updating your password! Try again?',
			})
		}

		throw redirect(303, '/profile')
	},
}
