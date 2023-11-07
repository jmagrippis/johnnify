<script lang="ts">
	import type {Session} from '@supabase/supabase-js'

	import {page} from '$app/stores'
	import {theme, type Theme} from '$lib/stores/theme'
	import ThemeToggleIcon from './ThemeToggleIcon.svelte'
	import {browser} from '$app/environment'

	export let session: Session | null

	const deriveNextTheme = (currentTheme: Theme | null): Theme | null => {
		if (!browser) return null

		if (!currentTheme) {
			return window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'light'
				: 'dark'
		}

		return currentTheme === 'dark' ? 'light' : 'dark'
	}

	$: nextTheme = deriveNextTheme($theme)

	const activePageClasses = 'decoration-dashed'
</script>

<header class="mb-2 bg-surface-2">
	<nav class="container flex justify-between px-2 py-4">
		<a
			href="/"
			class="decoration-none font-bold"
			aria-label="Johnnify homepage"
		>
			<span
				class={`inline-block sm:hidden ${
					$page.url.pathname === '/'
						? `underline decoration-emphasis decoration-2 ${activePageClasses}`
						: ''
				}`}>J</span
			>

			<span
				class={`hidden sm:inline-block ${
					$page.url.pathname === '/'
						? `underline decoration-emphasis decoration-2 ${activePageClasses}`
						: ''
				}`}>Johnnify</span
			></a
		>
		<div class="flex gap-4">
			<ul class="flex gap-4">
				<li>
					<a
						href="/ask"
						class={$page.url.pathname.startsWith('/ask')
							? activePageClasses
							: undefined}>ask</a
					>
				</li>
				<li>
					<a
						href="/learn/nextjs-to-sveltekit"
						class={$page.url.pathname.startsWith('/learn')
							? activePageClasses
							: undefined}>learn</a
					>
				</li>
				<li>
					<a
						href="/videos"
						class={$page.url.pathname.startsWith('/videos')
							? activePageClasses
							: undefined}>videos</a
					>
				</li>
				<li>
					<a
						href="/demos/text-gradients"
						class={$page.url.pathname.startsWith('/demos')
							? activePageClasses
							: undefined}>demos</a
					>
				</li>
				<li>
					{#if session}
						<a
							href="/profile"
							class={$page.url.pathname === '/profile'
								? activePageClasses
								: undefined}>profile</a
						>
					{:else}
						<a
							href="/login"
							class={$page.url.pathname === '/login'
								? activePageClasses
								: undefined}>login</a
						>
					{/if}
				</li>
			</ul>
			<button
				class="hover:text-primary-400"
				aria-label="toggle theme from {$theme} to {nextTheme}"
				aria-live="polite"
				on:click|preventDefault={() => {
					$theme = nextTheme
				}}
			>
				<ThemeToggleIcon className="w-6" />
			</button>
		</div>
	</nav>
</header>

<style>
	header {
		view-transition-name: header;
	}
</style>
