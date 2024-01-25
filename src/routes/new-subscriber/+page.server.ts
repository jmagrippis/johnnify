import {redirect} from '@sveltejs/kit'

import {stripe} from '$lib/server/stripe'
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async ({url}) => {
	const session_id = url.searchParams.get('session_id')

	if (!session_id) {
		// Someone may be trying to be cheeky.
		// Users should only be able to get here
		// through a Stripe redirect with a valid session_id.
		redirect(303, '/')
	}

	const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)

	if (!checkoutSession || checkoutSession.status !== 'complete') {
		// Redirect when it's not a valid, completed checkout session
		redirect(303, '/')
	}

	return {
		meta: {
			title: '💜 Thank you for subscribing!',
			description: 'Thank you so much!',
		},
	}
}
