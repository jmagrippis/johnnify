<script lang="ts">
	import {onMount} from 'svelte'
	import '@fontsource-variable/inconsolata'
	import '@fontsource/noto-color-emoji/emoji.css'

	import '../app.css'

	import {invalidate} from '$app/navigation'
	import type {LayoutData} from './$types'
	import Header from './Header.svelte'
	import Footer from './Footer.svelte'
	import {page} from '$app/stores'
	import {defaultMeta} from '$lib/defaultMeta'

	export let data: LayoutData

	$: title = $page.data.meta?.title
		? `${$page.data.meta?.title} 🧪 Johnnify`
		: defaultMeta.title
	$: description = $page.data.meta?.description ?? defaultMeta.description

	onMount(() => {
		const {
			data: {subscription},
		} = data.supabase.auth.onAuthStateChange((_, session) => {
			if (session?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => subscription.unsubscribe()
	})
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Johnnify" />
	<meta property="og:url" content={$page.url.href} />
</svelte:head>

<Header session={data.session} />
<slot />
<Footer />
