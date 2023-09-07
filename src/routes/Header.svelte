<script lang="ts">
	import type {Session} from '@supabase/supabase-js'

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
</script>

<header class="mb-2 bg-surface-2">
	<nav class="container flex justify-between px-2 py-4">
		<a href="/">Johnnify</a>
		<div class="flex gap-4">
			<ul class="flex gap-4">
				<li>
					<a href="/demos/text-gradients">demos</a>
				</li>
				<li>
					{#if session}
						<a href="/profile">profile</a>
					{:else}
						<a href="/login">login / signup</a>
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
