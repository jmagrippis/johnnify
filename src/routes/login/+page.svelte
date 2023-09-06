<script lang="ts">
	import {goto} from '$app/navigation'
	import GitHubIcon from '$lib/icons/github.svg?component'

	export let data

	let loginOrSignup: 'login' | 'signup' = 'login'

	let formState: 'idle' | 'submitting' | 'done' | Error = 'idle'
	let confirmationEmail: string | null = null

	async function signInWithGitHub() {
		formState = 'submitting'

		const signInResponse = await data.supabase.auth.signInWithOAuth({
			provider: 'github',
		})

		if (signInResponse.error) {
			formState = signInResponse.error
			return
		} else {
			formState = 'done'
		}
	}

	async function signInWithEmail({
		email,
		password,
	}: {
		email: string
		password: string
	}) {
		formState = 'submitting'

		const signInResponse = await data.supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (signInResponse.error) {
			formState = signInResponse.error
			return
		} else {
			formState = 'done'
			goto('/profile')
		}
	}

	async function signUpWithEmail({
		email,
		password,
	}: {
		email: string
		password: string
	}) {
		formState = 'submitting'

		const signUpResponse = await data.supabase.auth.signUp({
			email,
			password,
		})

		if (signUpResponse.error) {
			formState = signUpResponse.error
			return
		} else {
			formState = 'done'
			confirmationEmail = email
		}
	}
</script>

<main class="container flex grow flex-col px-2">
	<h1 class="text-4xl">Login or Signup!</h1>

	<section
		class="flex grow flex-col items-center justify-center gap-4 self-center"
	>
		<div>
			<button
				class="relative flex items-center gap-4 rounded bg-gradient-to-br from-primary-900 via-primary-600 to-secondary-400 px-4 py-2 text-2xl shadow-low transition-shadow hover:shadow-mid active:top-[-1px]"
				on:click={signInWithGitHub}
			>
				<GitHubIcon class="w-8" /><span class="grow">Login with GitHub</span>
			</button>
		</div>
		<div class="flex w-full items-center gap-4">
			<span class="inline-block h-[1px] w-full bg-copy-base" />
			<span class="shrink-0">or with email</span>
			<span class="inline-block h-[1px] w-full bg-copy-base" />
		</div>
		{#if loginOrSignup === 'login'}
			<form
				class="flex w-full flex-col gap-2"
				on:submit|preventDefault={(event) => {
					const form = event.currentTarget
					const formData = new FormData(form)

					const email = formData.get('email')
					const password = formData.get('password')

					if (typeof email !== 'string' || typeof password !== 'string') return

					signInWithEmail({email, password})
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
				/>
				<input
					class="rounded bg-surface-2 text-copy-base placeholder:font-light placeholder:text-copy-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
					type="password"
					name="password"
					placeholder="password"
					required
					aria-label="password"
					minlength="12"
				/>
				<button
					class="relative flex items-center justify-center gap-4 rounded bg-gradient-to-br from-primary-900 via-primary-600 to-secondary-400 px-4 py-2 text-2xl shadow-low transition-shadow hover:shadow-mid active:top-[-1px]"
				>
					<span>💌</span><span>Login</span>
				</button>
				<button
					type="button"
					class="underline decoration-emphasis"
					on:click={() => {
						loginOrSignup = 'signup'
					}}
				>
					or create a new account!
				</button>
			</form>
		{:else if confirmationEmail}
			<div>
				💌 Please check your email: <strong>{confirmationEmail}</strong> 💌
			</div>
		{:else}
			<form
				class="flex w-full flex-col gap-2"
				on:submit|preventDefault={(event) => {
					const form = event.currentTarget
					const formData = new FormData(form)

					const email = formData.get('email')
					const password = formData.get('password')

					if (typeof email !== 'string' || typeof password !== 'string') return

					signUpWithEmail({email, password})
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
				>
					<span>💌</span><span>Signup</span>
				</button>
				<button
					type="button"
					class="underline decoration-emphasis"
					on:click={() => {
						loginOrSignup = 'login'
					}}
				>
					or login to an existing account
				</button>
			</form>
		{/if}
		{#if formState instanceof Error}
			<strong>🚨 {formState.message} 🚨</strong>
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
