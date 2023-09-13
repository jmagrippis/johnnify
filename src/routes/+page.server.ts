import {stripe} from '$lib/server/stripe'
import {fail, redirect} from '@sveltejs/kit'

import {env} from '$env/dynamic/private'
import {isUIPrice, isUIProduct, type UIProduct} from '$lib/types'
import type {Actions, PageServerLoad} from './$types'

export const load: PageServerLoad<{
	products: UIProduct[] | null
}> = async ({locals: {supabase}}) => {
	let products: UIProduct[] | null = null

	if (env.PRODUCTS_LIVE === 'true') {
		const {data, error} = await supabase
			.from('products')
			.select(
				`
        id, name, description,
        prices(id, unit_amount, currency, interval)
        `,
			)
			.match({active: true, 'prices.active': true})

		if (error) {
			console.error(error)
		}

		products =
			data?.reduce<UIProduct[]>((acc, dbProduct) => {
				const prices = dbProduct.prices.filter(isUIPrice)
				const monthlyPrice = prices.find((price) => price.interval === 'month')
				const yearlyPrice = prices.find((price) => price.interval === 'year')
				const product = {...dbProduct, monthlyPrice, yearlyPrice}

				if (isUIProduct(product)) {
					acc.push(product)
				}

				return acc
			}, []) ?? null
	}

	return {products}
}

export const actions: Actions = {
	default: async ({request, url}) => {
		const data = await request.formData()
		const priceId = data.get('priceId')

		if (typeof priceId !== 'string') {
			return fail(400, {priceId, missing: true})
		}

		const checkoutSession = await stripe.checkout.sessions.create({
			mode: 'subscription',
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			// {CHECKOUT_SESSION_ID} is a string literal; do not change it!
			// the actual Session ID is returned in the query parameter when your customer
			// is redirected to the success page.
			success_url: `${url.origin}/new-subscriber?session_id={CHECKOUT_SESSION_ID}`,
			// redirect back in case
			// checkout gets aborted / errors
			cancel_url: url.href,
		})

		if (!checkoutSession.url) {
			throw Error('could not create checkout session with Stripe')
		}

		throw redirect(303, checkoutSession.url)
	},
}
