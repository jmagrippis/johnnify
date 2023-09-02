<script lang="ts">
	import GitHubIcon from '$lib/icons/github.svg?component'

	export let data

	async function signInWithGitHub() {
		const signInResponse = await data.supabase.auth.signInWithOAuth({
			provider: 'github',
		})

		if (signInResponse.error) {
			console.error(signInResponse.error)
			return
		}
	}
</script>

<div class="flex grow flex-col items-center justify-center">
	<button
		class="relative flex items-center gap-4 rounded bg-gradient-to-br from-primary-900 via-primary-600 to-secondary-400 px-4 py-2 text-2xl shadow-low transition-shadow hover:shadow-mid active:top-[-1px]"
		on:click={signInWithGitHub}
	>
		<GitHubIcon class="w-8" /><span class="grow">Login with GitHub</span>
	</button>
</div>

<style>
	button {
		color: hsl(var(--copy-base-color-dark));
		text-shadow:
			0 1px 2px hsl(var(--surface-1-color-dark)),
			0 2px 2px hsl(var(--surface-1-color-dark));
	}
</style>
