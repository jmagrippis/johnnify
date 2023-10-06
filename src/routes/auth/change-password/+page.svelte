<script lang="ts">
	import {enhance} from '$app/forms'
	import Button from '$lib/components/Button.svelte'
	import Spinner from '$lib/icons/spinner.svg?component'

	let formState: 'idle' | 'submitting' | 'done' | Error = 'idle'
</script>

<main class="container max-w-prose grow px-2 text-lg">
	<h1 class="mb-2 text-4xl">Change your password</h1>
	<form
		class="flex w-full flex-col gap-4"
		method="POST"
		use:enhance={() => {
			formState = 'submitting'

			return async ({result, update}) => {
				if (result.type === 'failure') {
					const message =
						typeof result.data?.message === 'string'
							? result.data?.message
							: `There was a problem changing your password...`
					formState = new Error(message)
				}
				if (result.type === 'success') {
					formState = 'done'
				}
				await update()
			}
		}}
	>
		<p class="text-lg">
			This is your chance to change your password. Passwords need to be at least
			12 characters long, otherwise you just need to make it memorable!
		</p>
		<input
			class="rounded bg-surface-2 text-copy-base placeholder:font-light placeholder:text-copy-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
			type="password"
			name="password"
			placeholder="new password"
			required
			aria-label="password"
			minlength="12"
			autocomplete="new-password"
		/>
		<Button disabled={formState === 'submitting'}>
			<span>♻️</span><span>change password!</span>
		</Button>
		{#if formState === 'submitting'}
			<Spinner class="w-12 self-center text-emphasis" />
		{/if}
	</form>
</main>
