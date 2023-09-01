<script lang="ts">
	export let data
	$: redirectTo = `${data.url}/auth/callback`
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div>
	{redirectTo}
</div>
