import {redirect} from '@sveltejs/kit'
import type {Actions, PageServerLoad} from './$types'
import {stripe} from '$lib/server/stripe'

export const load: PageServerLoad = async ({
	locals: {getSession, supabase},
}) => {
	const session = await getSession()

	// if the user is NOT logged in return them to the home page
	if (!session) {
		throw redirect(303, '/login')
	}

	// check if the user has a subscription

	const {data: subscription} = await supabase
		.from('subscriptions')
		.select('status, cancel_at_period_end, cancel_at')
		.single()

	return {
		subscription,
		meta: {
			title: 'Profile',
			description: 'Manage your account and view your profile details.',
		},
	}
}

export const actions: Actions = {
	customerPortalSession: async ({url, locals: {supabase}}) => {
		const {data, error} = await supabase
			.from('customers')
			.select('stripe_customer_id')
			.single()

		if (error || !data?.stripe_customer_id) {
			throw new Error('could not find stripe_customer_id for user')
		}

		const portalSession = await stripe.billingPortal.sessions.create({
			customer: data.stripe_customer_id,
			return_url: url.href,
		})

		if (!portalSession.url) {
			throw Error('could not create portal session with Stripe')
		}

		throw redirect(303, portalSession.url)
	},
}
