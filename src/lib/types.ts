export type UIPrice = {
	id: string
	currency: string
	unit_amount: number
	interval: 'month' | 'year'
}

export const isUIPrice = (price: unknown): price is UIPrice =>
	typeof price === 'object' &&
	((price as UIPrice).interval === 'month' ||
		(price as UIPrice).interval === 'year') &&
	typeof (price as UIPrice).unit_amount === 'number' &&
	typeof (price as UIPrice).currency === 'string'

export type UIProduct = {
	id: string
	name: string
	description: string
	monthlyPrice: UIPrice
	yearlyPrice: UIPrice
}

export const isUIProduct = (product: unknown): product is UIProduct =>
	typeof product === 'object' &&
	typeof (product as UIProduct).name === 'string' &&
	typeof (product as UIProduct).description === 'string' &&
	isUIPrice((product as UIProduct).monthlyPrice) &&
	isUIPrice((product as UIProduct).yearlyPrice)

export let products: UIProduct[]
