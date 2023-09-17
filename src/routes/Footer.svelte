<script lang="ts">
	import YouTubeIcon from '$lib/icons/youtube.svg?component'
	import GitHubIcon from '$lib/icons/github.svg?component'
	import DiscordIcon from '$lib/icons/discord.svg?component'
	import PulsingHeart from './PulsingHeart.svelte'
</script>

<footer class="flex items-center justify-center gap-2 bg-surface-1 py-2">
	<div class="flex shrink-0 items-center justify-center gap-2">
		Made with
		<PulsingHeart />
		by <a href="https://magrippis.com">jmagrippis</a>
	</div>

	<a
		href="https://www.youtube.com/@johnnifytech"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="Johnny’s YouTube channel"
		class="hover:text-emphasis-hover"
	>
		<YouTubeIcon class="w-5" />
	</a>
	<a
		href="https://github.com/jmagrippis/johnnify"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="checkout the source code at the github repo"
		class="hover:text-emphasis-hover"
	>
		<GitHubIcon class="w-5" />
	</a>
	<a
		href="https://discord.gg/eR5Q52Sfm3"
		target="_blank"
		rel="noopener noreferrer"
		aria-label="Join Johnny's Discord community!"
		class="hover:text-emphasis-hover"
	>
		<DiscordIcon class="w-5" />
	</a>
</footer>

<style>
	footer {
		view-transition-name: footer;
	}
</style>
