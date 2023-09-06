<script lang="ts">
	import {goto} from '$app/navigation'

	export let data

	$: ({supabase, session} = data)

	async function signOut() {
		const {error} = await supabase.auth.signOut()

		if (error) {
			console.error(error)
			return
		}

		goto('/')
	}
</script>

<main class="container grow px-2">
	<h1 class="text-4xl">Profile</h1>
	<p>You are logged in as <strong>{session?.user.email}</strong></p>
	<button
		class="underline decoration-emphasis hover:decoration-emphasis-hover"
		on:click={signOut}>logout</button
	>
</main>
