<script lang="ts">
	import type {Session} from '@supabase/supabase-js'

	import {page} from '$app/stores'
	import {theme, type Theme} from '$lib/stores/theme'
	import ThemeToggleIcon from './ThemeToggleIcon.svelte'
	import {browser} from '$app/environment'

	export let session: Session | null

	const deriveNextTheme = (currentTheme: Theme | null): Theme => {
		if (!browser) return currentTheme ?? 'auto'

		if (!currentTheme || currentTheme === 'auto') {
			return window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'light'
				: 'dark'
		}

		return currentTheme === 'dark' ? 'light' : 'dark'
	}

	$: nextTheme = deriveNextTheme($theme)

	const activePageClasses = 'pointer-events-none decoration-dashed'
</script>

<header class="mb-2 bg-surface-2">
	<nav class="container flex justify-between px-2 py-4">
		<a
			href="/"
			class={$page.url.pathname === '/' ? activePageClasses : undefined}
			>Johnnify</a
		>
		<div class="flex gap-4">
			<ul class="flex gap-4">
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
								: undefined}>login / signup</a
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
