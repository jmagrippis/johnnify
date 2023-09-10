<script lang="ts">
	import {onMount} from 'svelte'
	import '@fontsource-variable/inconsolata'
	import '@fontsource/noto-color-emoji/emoji.css'

	import '../app.css'

	import {invalidate, onNavigate} from '$app/navigation'
	import type {LayoutData} from './$types'
	import Header from './Header.svelte'
	import Footer from './Footer.svelte'
	import {page} from '$app/stores'
	import {defaultMeta} from '$lib/defaultMeta'
	import {isTheme, theme, type Theme} from '$lib/stores/theme'
	import {browser} from '$app/environment'

	export let data: LayoutData

	$: title = $page.data.meta?.title
		? `${$page.data.meta?.title} 🧪 Johnnify`
		: defaultMeta.title
	$: description = $page.data.meta?.description ?? defaultMeta.description

	const syncTheme = (nextTheme: Theme) => {
		document.documentElement.dataset.theme = nextTheme
		localStorage.setItem('theme', nextTheme)
	}

	$: browser && $theme && syncTheme($theme)

	onMount(() => {
		const documentTheme = document.documentElement.dataset.theme
		$theme = isTheme(documentTheme) ? documentTheme : 'auto'

		const {
			data: {subscription},
		} = data.supabase.auth.onAuthStateChange((_, session) => {
			if (session?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => subscription.unsubscribe()
	})

	onNavigate((navigation) => {
		if (!document.startViewTransition) return

		return new Promise((resolve) => {
			document.startViewTransition &&
				document.startViewTransition(async () => {
					resolve()
					await navigation.complete
				})
		})
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

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(30px);
		}
	}

	@keyframes slide-to-left {
		to {
			transform: translateX(-30px);
		}
	}

	:root::view-transition-old(root) {
		animation:
			90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
	}

	:root::view-transition-new(root) {
		animation:
			210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
			300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
	}
</style>
