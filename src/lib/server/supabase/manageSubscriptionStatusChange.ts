import type Stripe from 'stripe'
import type {Database} from '$lib/generated/DatabaseDefinitions'
import {supabaseAdmin} from './admin'
import {stripe} from '../stripe'

type Subscription = Database['public']['Tables']['subscriptions']['Insert']

const epochToISO = (epoch: number) => new Date(epoch * 1000).toISOString()

/**
 * Copies the billing details from the payment method to the customer object.
 */
const copyBillingDetailsToCustomer = async (
	userId: string,
	payment_method: Stripe.PaymentMethod,
) => {
	const customerId =
		typeof payment_method.customer === 'string'
			? payment_method.customer
			: payment_method.customer?.id
	const {name, phone, address} = payment_method.billing_details
	if (!customerId || !name || !phone || !address) return

	// customers.update wants undefined,
	// where address can have `null` fields
	const stripeAddressParam = {
		city: address.city || undefined,
		country: address.country || undefined,
		line1: address.line1 || undefined,
		line2: address.line2 || undefined,
		postal_code: address.postal_code || undefined,
		state: address.state || undefined,
	}
	await stripe.customers.update(customerId, {
		name,
		phone,
		address: stripeAddressParam,
	})
	const {error} = await supabaseAdmin
		.from('users')
		.update({
			billing_address: {...address},
			payment_method: {...payment_method[payment_method.type]},
		})
		.eq('id', userId)
	if (error) throw error
}

const getUserViaEmail = async (email: string) => {
	const {data, error} = await supabaseAdmin
		.from('users')
		.select('id')
		.match({email})
		.single()

	return !error && data ? data : null
}

export const manageSubscriptionStatusChange = async (
	stripeSubscriptionId: string,
	customerId: string,
	isNewSubscription: boolean,
	email: string | null,
) => {
	// Get customer's UUID from mapping table.
	let userId: string

	const {data: customerData, error: noCustomerError} = await supabaseAdmin
		.from('customers')
		.select('id')
		.eq('stripe_customer_id', customerId)
		.single()
	if (customerData && !noCustomerError) {
		userId = customerData.id
	} else {
		if (!email) {
			throw new Error(
				`Could not find user for stripe_customer_id ${customerId}, no email so we cannot create one`,
			)
		}
		const user = await getUserViaEmail(email)

		if (user) {
			userId = user.id
		} else {
			const {error: createUserError} = await supabaseAdmin.auth.signInWithOtp({
				email,
			})

			if (createUserError) throw createUserError

			const newUser = await getUserViaEmail(email)

			if (!newUser) throw new Error(`Failed to create user for email ${email}`)

			userId = newUser.id
		}
	}

	const subscription = await stripe.subscriptions.retrieve(
		stripeSubscriptionId,
		{
			expand: ['default_payment_method'],
		},
	)
	// Upsert the latest status of the subscription object.
	const subscriptionData: Subscription = {
		id: subscription.id,
		user_id: userId,
		metadata: subscription.metadata,
		status: subscription.status,
		price_id: subscription.items.data[0].price.id,
		quantity: 1,
		cancel_at_period_end: subscription.cancel_at_period_end,
		cancel_at: subscription.cancel_at
			? epochToISO(subscription.cancel_at)
			: null,
		canceled_at: subscription.canceled_at
			? epochToISO(subscription.canceled_at)
			: null,
		current_period_start: epochToISO(subscription.current_period_start),
		current_period_end: epochToISO(subscription.current_period_end),
		created: epochToISO(subscription.created),
		ended_at: subscription.ended_at ? epochToISO(subscription.ended_at) : null,
		trial_start: subscription.trial_start
			? epochToISO(subscription.trial_start)
			: null,
		trial_end: subscription.trial_end
			? epochToISO(subscription.trial_end)
			: null,
	}

	const {error} = await supabaseAdmin
		.from('subscriptions')
		.upsert(subscriptionData)
	if (error) throw error
	console.log(
		`Inserted/updated subscription [${subscription.id}] for user [${userId}]`,
	)

	// For a new subscription copy the billing details to the customer object.
	// NOTE: This is a costly operation and should happen at the very end.
	if (isNewSubscription && subscription.default_payment_method)
		await copyBillingDetailsToCustomer(
			userId,
			subscription.default_payment_method as Stripe.PaymentMethod,
		)
}
