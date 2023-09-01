<script lang="ts">
	import {onMount} from 'svelte'

	import {invalidate} from '$app/navigation'
	import type {LayoutData} from './$types'
	import Header from './Header.svelte'

	export let data: LayoutData

	$: ({supabase, session} = data)

	onMount(() => {
		const {
			data: {subscription},
		} = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => subscription.unsubscribe()
	})
</script>

<Header />
<slot />
