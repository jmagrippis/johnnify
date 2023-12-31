import {json} from '@sveltejs/kit'
import type Stripe from 'stripe'

import {STRIPE_WEBHOOK_SECRET} from '$env/static/private'
import {stripe} from '$lib/server/stripe'
import {upsertProductRecord} from '$lib/server/supabase/upsertProductRecord'
import {upsertPriceRecord} from '$lib/server/supabase/upsertPriceRecord'
import {manageSubscriptionStatusChange} from '$lib/server/supabase/manageSubscriptionStatusChange'
import type {RequestHandler} from './$types'

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
		event = await stripe.webhooks.constructEventAsync(
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
			case 'product.created':
			case 'product.updated':
				await upsertProductRecord(event.data.object as Stripe.Product)
				break
			case 'price.created':
			case 'price.updated':
				await upsertPriceRecord(event.data.object as Stripe.Price)
				break
			case 'customer.subscription.created':
			case 'customer.subscription.updated':
			case 'customer.subscription.deleted': {
				const subscription = event.data.object as Stripe.Subscription
				const customerId =
					typeof subscription.customer === 'string'
						? subscription.customer
						: subscription.customer.id

				await manageSubscriptionStatusChange(
					subscription.id,
					customerId,
					event.type === 'customer.subscription.created',
					null,
				)
				break
			}
			case 'checkout.session.completed':
				{
					const checkoutSession = event.data.object as Stripe.Checkout.Session
					if (checkoutSession.mode === 'subscription') {
						const subscriptionId =
							typeof checkoutSession.subscription === 'string'
								? checkoutSession.subscription
								: checkoutSession.subscription?.id
						const customerId =
							typeof checkoutSession.customer === 'string'
								? checkoutSession.customer
								: checkoutSession.customer?.id
						const customerEmail =
							checkoutSession.customer_details?.email ?? null

						if (!subscriptionId || !customerId) break

						await manageSubscriptionStatusChange(
							subscriptionId,
							customerId,
							true,
							customerEmail,
						)
					} else {
						console.log(`unhandled checkout mode: ${checkoutSession.mode}!`)
					}
				}
				break
			default:
				console.log(`we did not handle related event: ${event.type}!`)
		}
	}

	return json({received: true})
}
