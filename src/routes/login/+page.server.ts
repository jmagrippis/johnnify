import {fail, redirect} from '@sveltejs/kit'
import {AuthApiError} from '@supabase/supabase-js'
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

export const actions = {
	password: async ({request, locals: {supabase}}) => {
		const formData = await request.formData()

		const email = formData.get('email')
		const password = formData.get('password')

		if (typeof email !== 'string' || typeof password !== 'string') {
			return fail(400, {
				error: 'Missing email / password',
			})
		}

		const {error} = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			if (error.status === 400) {
				return fail(400, {
					message: 'Invalid credentials!',
					values: {email},
				})
			}

			return fail(500, {
				message: 'We had a problem logging you in! Try again?',
				values: {email},
			})
		}

		throw redirect(303, '/profile')
	},

	signUp: async ({request, url, locals: {supabase}}) => {
		const formData = await request.formData()

		const email = formData.get('email')
		const password = formData.get('password')

		if (typeof email !== 'string' || typeof password !== 'string') {
			return fail(400, {
				message: 'Missing email / password',
			})
		}

		const {error} = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}/profile`,
			},
		})

		if (error) {
			if (error.status === 400) {
				return fail(400, {
					message: error.message,
					values: {email},
				})
			}

			return fail(500, {
				message:
					error.message ??
					`We had a problem creating an account for ${email}! Try again?`,
				values: {email},
			})
		}

		return {email}
	},

	magic: async ({request, url, locals: {supabase}}) => {
		const formData = await request.formData()

		const email = formData.get('email')

		if (typeof email !== 'string') {
			return fail(400, {
				error: 'Missing email',
			})
		}

		const emailRedirectTo = `${url.origin}/auth/confirm`

		const {error} = await supabase.auth.signInWithOtp({
			email,
			options: {emailRedirectTo},
		})

		if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, {
					message: 'We need your email for email login 🙄',
					values: {email},
				})
			}

			if (error.message === 'Email rate limit exceeded') {
				return fail(500, {
					message: 'We’ve sent too many magic links 😅 please try again later?',
					email,
				})
			}

			return fail(500, {
				message: error.message ?? 'We had a problem logging you in! Try again?',
				email,
			})
		}

		return {email}
	},

	provider: async ({request, url, locals: {supabase}}) => {
		const formData = await request.formData()

		const provider = formData.get('provider')

		if (typeof provider !== 'string') {
			return fail(400, {
				error: 'Missing provider',
			})
		}

		const redirectTo = `${url.origin}/auth/callback`

		const {data, error} = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {redirectTo},
		})

		if (error || !data.url) {
			return fail(500, {
				message:
					error?.message ??
					`We had a problem logging you in with ${provider}! Try again?`,
				provider,
			})
		}

		throw redirect(303, data.url)
	},

	reset: async ({request, url, locals: {supabase}}) => {
		const formData = await request.formData()

		const email = formData.get('email')

		if (typeof email !== 'string') {
			return fail(400, {
				error: 'Missing email',
			})
		}

		const redirectTo = `${url.origin}/auth/change-password`
		const {error} = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo,
		})

		if (error) {
			return fail(500, {
				message:
					error.message ??
					`We had a problem sending a reset email to ${email}... Try again?`,
				email,
			})
		}

		return {email}
	},
}
