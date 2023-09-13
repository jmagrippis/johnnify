<script lang="ts">
	import Plans from './Plans.svelte'

	export let data
</script>

<main class="flex grow flex-col items-center justify-center">
	<section
		class="flex h-[89vh] flex-col items-center justify-center bg-gradient-to-r from-primary-600 via-secondary-600 to-secondary-500 bg-clip-text text-transparent drop-shadow-sm"
	>
		<h1 class="text-6xl font-bold">Johnnify</h1>
		<p class="text-xl">Level up your coding journey!</p>
	</section>
	{#if data.products && data.products.length}
		<Plans products={data.products} />
	{/if}
</main>
