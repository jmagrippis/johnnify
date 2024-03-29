<script lang="ts">
	import '@fontsource-variable/inconsolata'

	import '../app.css'

	import {onMount} from 'svelte'
	import {invalidate, onNavigate} from '$app/navigation'
	import {page} from '$app/stores'
	import {browser} from '$app/environment'
	import {defaultMeta} from '$lib/defaultMeta'
	import {isTheme, theme, type Theme} from '$lib/stores/theme'
	import {transitionsEnabled} from '$lib/stores/transitionsEnabled'
	import type {LayoutData} from './$types'
	import Header from './Header.svelte'
	import Footer from './Footer.svelte'

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
		if (isTheme(documentTheme)) {
			$theme = documentTheme
		}

		// crucially removes the "pointer-events-none" class
		// now that our app is hydrated
		document.documentElement.removeAttribute('class')
		const localStorageTransitionsEnabled =
			localStorage.getItem('transitionsEnabled')

		if (localStorageTransitionsEnabled !== null) {
			$transitionsEnabled = localStorageTransitionsEnabled === 'true'
		}
		const unsubscribeTransitionsEnabled = transitionsEnabled.subscribe(
			(nextTransitionsEnabled) => {
				localStorage.setItem('transitionsEnabled', `${nextTransitionsEnabled}`)
			},
		)

		const {
			data: {subscription: authSubscription},
		} = data.supabase.auth.onAuthStateChange((_, session) => {
			if (session?.expires_at !== data.session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => {
			authSubscription.unsubscribe()
			unsubscribeTransitionsEnabled()
		}
	})

	onNavigate((navigation) => {
		if (
			$transitionsEnabled &&
			document.startViewTransition &&
			navigation.from?.url.href !== navigation.to?.url.href
		) {
			return new Promise((resolve) => {
				document.startViewTransition &&
					document.startViewTransition(async () => {
						resolve()
						await navigation.complete
					})
			})
		}
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
	@keyframes fade-out {
		to {
			opacity: 0;
		}
	}

	@keyframes slide-from-right {
		from {
			transform: translateX(100%);
			box-shadow: var(--shadow-elevation-high);
		}
	}

	:root::view-transition-old(root) {
		pointer-events: none;
		animation: 300ms ease-out both fade-out;
	}

	:root::view-transition-new(root) {
		pointer-events: none;
		animation: 300ms ease-out both slide-from-right;
	}
</style>
