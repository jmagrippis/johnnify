<script lang="ts">
	import {enhance} from '$app/forms'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import {transitionsEnabled} from '$lib/stores/transitionsEnabled'
	import Toggle from '../Toggle.svelte'

	export let data

	const understatedButtonClasses =
		'underline decoration-emphasis hover:decoration-emphasis-hover'
</script>

<main class="container max-w-prose grow px-2 text-lg">
	<PageTitle>Profile</PageTitle>
	<p>You are logged in as <strong>{data.session?.user.email}</strong></p>

	<h2 class="text-2xl">Preferences</h2>
	<p class="m-2">
		<Toggle
			enabled={$transitionsEnabled}
			label="view-transitions-toggle"
			on:click={() => {
				$transitionsEnabled = !$transitionsEnabled
			}}>View Transitions / Animations</Toggle
		>
	</p>

	{#if data.subscription?.status === 'active'}
		<section>
			<p>Thank you so much for maintaining a membership!</p>

			{#if data.subscription?.cancel_at_period_end && data.subscription?.cancel_at}
				<form
					class="my-2 rounded bg-surface-2 p-4 shadow-low"
					method="POST"
					action="?/customerPortalSession"
				>
					<p>
						Your subscription is going to be cancelled at <strong
							>{new Intl.DateTimeFormat('en-US').format(
								new Date(data.subscription.cancel_at),
							)}</strong
						>.
					</p>
					<p>
						We’ll be sad to see you go! You still get all membership benefits
						until then, and if you wish to renew, <button
							class={understatedButtonClasses}
							>you may do so in the customer portal</button
						>.
					</p>
					<p>No pressure 😄 Only support if it’s sustainable 🙌</p>
				</form>
			{:else}
				<form method="POST" action="?/customerPortalSession">
					<button class={understatedButtonClasses}
						>💸 Manage your billing details or cancel</button
					>
				</form>
			{/if}
		</section>
	{/if}
	<section>
		<a href="/auth/change-password">🔐 Set / change your password</a>
	</section>
	<section>
		<form method="POST" action="?/signOut" use:enhance>
			<button class={understatedButtonClasses}>🫥 Logout </button>
		</form>
	</section>
</main>
