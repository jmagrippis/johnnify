<script>
	export let enabled = false
	export let label = 'toggle'
</script>

<div class="flex items-center justify-center">
	<button
		class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
		class:bg-gray-200={!enabled}
		class:bg-primary-600={enabled}
		role="switch"
		aria-checked={enabled}
		aria-labelledby={label}
		on:click
	>
		<span
			aria-hidden="true"
			class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-low ring-0 transition duration-200 ease-in-out"
			class:translate-x-0={!enabled}
			class:translate-x-5={enabled}
		></span>
	</button>
	<span class="ml-3 text-sm" id={label}>
		<slot />
	</span>
</div>
