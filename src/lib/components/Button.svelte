<script lang="ts">
	export let disabled: boolean | undefined = undefined
	export let tag: 'button' | 'a' = 'button'
	export let href: string | undefined = undefined
</script>

<svelte:element
	this={tag}
	role={tag === 'button' ? 'button' : 'link'}
	{href}
	on:click
	class="relative flex items-center justify-center gap-4 rounded bg-gradient-to-br from-primary-900 via-primary-600 to-secondary-400 px-4 py-2 text-2xl no-underline shadow-low transition-shadow hover:shadow-mid active:top-[-1px]"
	{disabled}
>
	<slot />
</svelte:element>

<style>
	button {
		color: hsl(var(--copy-base-color-dark));
		text-shadow:
			0 1px 2px hsl(var(--surface-1-color-dark)),
			0 2px 2px hsl(var(--surface-1-color-dark));
	}
</style>
