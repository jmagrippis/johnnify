import Stripe from 'stripe'
import {STRIPE_SECRET_KEY} from '$env/static/private'

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2023-10-16',
	// Register this as an official Stripe plugin.
	// https://stripe.com/docs/building-plugins#setappinfo
	appInfo: {
		name: 'Johnnify',
		version: '0.1.0',
	},
})
