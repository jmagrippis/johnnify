import type Stripe from 'stripe'
import type {RequestHandler} from './$types'
import {stripe} from '$lib/server/stripe'
import {json} from '@sveltejs/kit'

const STRIPE_WEBHOOK_SECRET = '....'

const handledEvents = [
	'product.created',
	'product.updated',
	'price.created',
	'price.updated',
	'checkout.session.completed',
	'customer.subscription.created',
	'customer.subscription.updated',
	'customer.subscription.deleted',
] as const

type HandledEvent = (typeof handledEvents)[number]

const isHandledEvent = (
	eventType: Stripe.Event.Type,
): eventType is HandledEvent =>
	handledEvents.includes(eventType as HandledEvent)

export const POST: RequestHandler = async ({request}) => {
	const {headers} = request
	const signature = headers.get('Stripe-Signature')

	let event: Stripe.Event

	try {
		if (!signature) throw new Error('No signature')

		const parsedBody = await request.text()
		event = stripe.webhooks.constructEvent(
			parsedBody,
			signature,
			STRIPE_WEBHOOK_SECRET,
		)
	} catch (err: unknown) {
		const message = `Webhook Error: ${
			err instanceof Error ? err.message : 'unknown error'
		}`

		console.log(message)
		return new Response(message, {status: 400})
	}

	if (isHandledEvent(event.type)) {
		switch (event.type) {
			default:
				console.log('we are handling this!')
		}
	}

	return json({received: true})
}
