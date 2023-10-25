<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import GitHubIcon from '$lib/icons/github.svg?component'
	import Spinner from '$lib/icons/spinner.svg?component'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import {enhance} from '$app/forms'
	import type {Snapshot} from './$types'

	let loginOrSignup: 'login' | 'signup' = 'login'

	let formState: 'idle' | 'submitting' | 'done' | Error = 'idle'

	let email: string
	let confirmationEmail: string | null = null

	export const snapshot: Snapshot = {
		capture: () => email,
		restore: (value) => (email = value),
	}
</script>

<main class="container flex grow flex-col px-2">
	<section
		class="flex grow flex-col items-center justify-center gap-4 self-center"
	>
		<PageTitle>Login or Signup!</PageTitle>
		<form
			method="POST"
			action="?/provider"
			use:enhance={() => {
				formState = 'submitting'

				return async ({result, update}) => {
					if (result.type === 'failure') {
						const message =
							typeof result.data?.message === 'string'
								? result.data?.message
								: `There was a problem logging you in with GitHub...`
						formState = new Error(message)
					}

					if (result.type === 'success') {
						formState = 'done'
					}

					await update()
				}
			}}
		>
			<input type="hidden" name="provider" value="github" />
			<Button disabled={formState === 'submitting'}>
				<GitHubIcon class="w-8" /><span class="grow">Login with GitHub</span>
			</Button>
		</form>
		<div class="flex w-full items-center gap-4">
			<span class="inline-block h-[1px] w-full bg-copy-base" />
			<span class="shrink-0">or with email</span>
			<span class="inline-block h-[1px] w-full bg-copy-base" />
		</div>
		{#if loginOrSignup === 'login'}
			<form
				class="flex w-full flex-col gap-2"
				method="POST"
				action="?/magic"
				use:enhance={() => {
					formState = 'submitting'
					confirmationEmail = email

					return async ({result, update}) => {
						if (result.type === 'failure') {
							const message =
								typeof result.data?.message === 'string'
									? result.data?.message
									: `There was a problem sending a magic link to ${confirmationEmail}...`
							formState = new Error(message)
						}

						if (result.type === 'success') {
							formState = 'done'
							if (typeof result.data?.email === 'string') {
								confirmationEmail = result.data.email
							}
						}

						await update()
					}
				}}
			>
				<input
					class="rounded bg-surface-2 text-copy-base placeholder:font-light placeholder:text-copy-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
					type="email"
					name="email"
					placeholder="email"
					autocomplete="email"
					required
					aria-label="email"
					bind:value={email}
				/>
				<Button disabled={formState === 'submitting'}>
					<span>🪄</span><span>Login with magic link!</span>
				</Button>
			</form>
			<form
				class="flex w-full flex-col gap-2"
				method="POST"
				action="?/password"
				use:enhance={() => {
					formState = 'submitting'

					return async ({result, update}) => {
						if (result.type === 'failure') {
							const message =
								typeof result.data?.message === 'string'
									? result.data?.message
									: 'There was a problem logging you in with Email & Password...'
							formState = new Error(message)
						}
						await update()
					}
				}}
			>
				<input type="hidden" name="email" bind:value={email} required />
				<input
					class="rounded bg-surface-2 text-copy-base placeholder:font-light placeholder:text-copy-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
					type="password"
					name="password"
					placeholder="password"
					aria-label="password"
					minlength="12"
					required
				/>
				<Button disabled={formState === 'submitting'}>
					<span>💌</span><span>Login with email + password</span>
				</Button>
				<button
					type="button"
					class="underline decoration-emphasis hover:decoration-emphasis-hover"
					on:click={() => {
						loginOrSignup = 'signup'
					}}
					disabled={formState === 'submitting'}
				>
					or create a new account!
				</button>
			</form>
		{:else}
			<form
				class="flex w-full flex-col gap-2"
				method="POST"
				action="?/signUp"
				use:enhance={() => {
					formState = 'submitting'
					confirmationEmail = email

					return async ({result, update}) => {
						if (result.type === 'failure') {
							const message =
								typeof result.data?.message === 'string'
									? result.data?.message
									: `There was a problem signing you up as ${confirmationEmail}...`
							formState = new Error(message)
						}
						if (result.type === 'success') {
							formState = 'done'
							if (typeof result.data?.email === 'string') {
								confirmationEmail = result.data.email
							}
						}
						await update()
					}
				}}
			>
				<input
					class="rounded bg-surface-2 text-copy-base placeholder:font-light placeholder:text-copy-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
					type="email"
					name="email"
					placeholder="email"
					autocomplete="email"
					required
					aria-label="email"
					bind:value={email}
				/>
				<input
					class="rounded bg-surface-2 text-copy-base placeholder:font-light placeholder:text-copy-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
					type="password"
					name="password"
					placeholder="password"
					required
					aria-label="password"
					minlength="12"
					autocomplete="new-password"
				/>
				<button
					class="relative flex items-center justify-center gap-4 rounded bg-gradient-to-br from-primary-900 via-primary-600 to-secondary-400 px-4 py-2 text-2xl shadow-low transition-shadow hover:shadow-mid active:top-[-1px]"
					disabled={formState === 'submitting'}
				>
					<span>💌</span><span>Signup</span>
				</button>
				<button
					type="button"
					class="underline decoration-emphasis hover:decoration-emphasis-hover"
					on:click={() => {
						loginOrSignup = 'login'
					}}
					disabled={formState === 'submitting'}
				>
					or login to an existing account
				</button>
			</form>
		{/if}
		{#if formState === 'done' && confirmationEmail}
			<div>
				💌 Please check your email: <strong>{confirmationEmail}</strong> 💌
			</div>
		{/if}
		{#if formState === 'submitting'}
			<Spinner class="w-12 text-emphasis" />
		{/if}
		{#if formState instanceof Error}
			<strong>🚨 {formState.message} 🚨</strong>
			{#if formState.message.includes('Invalid credentials')}
				<div>
					<p>
						You may want to double-check your email & password, or try logging
						in with a magic link instead!
					</p>
					<form
						method="POST"
						action="?/reset"
						use:enhance={() => {
							formState = 'submitting'

							return async ({result, update}) => {
								if (result.type === 'failure') {
									const message =
										typeof result.data?.message === 'string'
											? result.data?.message
											: `There was a problem sending a password reset email to ${confirmationEmail}...`
									formState = new Error(message)
								}

								if (result.type === 'success') {
									formState = 'done'
									if (typeof result.data?.email === 'string') {
										confirmationEmail = result.data.email
									}
								}

								await update()
							}
						}}
					>
						<input type="hidden" name="email" bind:value={email} required />
						<p>
							You may also <button
								class="underline decoration-emphasis hover:decoration-emphasis-hover"
								>reset your password</button
							>.
						</p>
					</form>
				</div>
			{/if}
		{/if}
	</section>
</main>

<style>
	button {
		color: hsl(var(--copy-base-color-dark));
		text-shadow:
			0 1px 2px hsl(var(--surface-1-color-dark)),
			0 2px 2px hsl(var(--surface-1-color-dark));
	}
</style>
