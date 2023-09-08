import type {Database} from '$lib/generated/DatabaseDefinitions'
import type Stripe from 'stripe'

import {supabaseAdmin} from './admin'

type Price = Database['public']['Tables']['prices']['Row']

export const upsertPriceRecord = async (price: Stripe.Price) => {
	const priceData: Price = {
		id: price.id,
		product_id: typeof price.product === 'string' ? price.product : '',
		active: price.active,
		currency: price.currency,
		description: price.nickname ?? null,
		type: price.type,
		unit_amount: price.unit_amount ?? null,
		interval: price.recurring?.interval ?? null,
		interval_count: price.recurring?.interval_count ?? null,
		trial_period_days: price.recurring?.trial_period_days ?? null,
		metadata: price.metadata,
	}

	const {error} = await supabaseAdmin.from('prices').upsert(priceData)
	if (error) throw error
	console.log(`Price inserted/updated: ${price.id}`)
}
