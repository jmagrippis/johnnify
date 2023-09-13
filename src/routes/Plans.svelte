<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import CheckIcon from '$lib/icons/check.svg?component'
	import type {UIProduct} from '$lib/types'
	import PriceIntervalToggle from './PriceIntervalToggle.svelte'

	export let products: UIProduct[]

	let isYearlyBilling = false
	$: heroProduct = products[0]
	$: selectedPrice = isYearlyBilling
		? heroProduct.yearlyPrice
		: heroProduct.monthlyPrice

	$: formattedPrice = new Intl.NumberFormat('en', {
		style: 'currency',
		currency: selectedPrice.currency,
		minimumFractionDigits: 0,
	}).format(selectedPrice.unit_amount / 100)
</script>

<section>
	<h2 class="mb-8 text-center text-4xl">
		Subscribe and start gaining XP today!
	</h2>

	<PriceIntervalToggle
		enabled={isYearlyBilling}
		on:click={() => {
			isYearlyBilling = !isYearlyBilling
		}}
	/>

	<form method="POST" class="mt-8 grid grid-cols-1 md:grid-cols-3">
		<input type="hidden" name="priceId" value={selectedPrice.id} />
		<div
			class="col-start-2 mx-4 flex max-w-prose flex-col gap-2 rounded bg-surface-2 px-8 py-4 shadow-low"
		>
			<h3 class="text-thin text-3xl">{heroProduct.name}</h3>
			<div class="order-first mb-4 flex gap-2 text-5xl font-bold">
				{formattedPrice}
				<span class="text-base font-light"
					>per {isYearlyBilling ? 'year' : 'month'}</span
				>
			</div>
			<div class="text-xl">{heroProduct.description}</div>
			<Button>Subscribe</Button>
			<ul>
				<li class="flex items-center gap-2">
					<CheckIcon class="w-7 text-secondary-400" />Support Johnny 💜
				</li>
				<li class="flex items-center gap-2">
					<CheckIcon class="w-7 text-secondary-400" />View ad-free & revised
					videos 📷
				</li>
				<li class="flex items-center gap-2">
					<CheckIcon class="w-7 text-secondary-400" />Join a private Discord
					Channel 👾
				</li>
			</ul>
		</div>
	</form>
</section>
