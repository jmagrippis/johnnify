<script lang="ts">
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

<div>
	<button class="text-2xl" on:click={signInWithGitHub}>Login with GitHub</button
	>
</div>
