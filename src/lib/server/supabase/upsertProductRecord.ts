import type {Database} from '$lib/generated/DatabaseDefinitions'
import type Stripe from 'stripe'

import {supabaseAdmin} from './admin'

type Product = Database['public']['Tables']['products']['Row']

export const upsertProductRecord = async (product: Stripe.Product) => {
	const productData: Product = {
		id: product.id,
		active: product.active,
		name: product.name,
		description: product.description ?? null,
		image: product.images?.[0] ?? null,
		metadata: product.metadata,
		// TODO: DB Migration
		// so we can include product.features
	}

	const {error} = await supabaseAdmin.from('products').upsert(productData)
	if (error) throw error
	console.log(`Product inserted/updated: ${product.id}`)
}
