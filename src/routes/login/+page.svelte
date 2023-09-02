<script lang="ts">
	import GitHubIcon from './github.svg?component'

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

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="flex flex-col items-center">
	<button
		class="flex items-center gap-4 rounded px-4 py-2 text-2xl"
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
		background-image: linear-gradient(
			135deg,
			hsl(274deg 87% 21%) 1%,
			hsl(270deg 75% 30%) 40%,
			hsl(267deg 68% 40%) 48%,
			hsl(264deg 64% 51%) 51%,
			hsl(218deg 100% 50%) 51%,
			hsl(206deg 100% 50%) 50%,
			hsl(193deg 100% 42%) 50%,
			hsl(168deg 100% 36%) 49%,
			hsl(160deg 86% 38%) 49%,
			hsl(161deg 88% 35%) 52%,
			hsl(161deg 91% 33%) 60%,
			hsl(161deg 94% 30%) 99%
		);
	}
</style>
