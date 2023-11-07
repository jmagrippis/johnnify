<script lang="ts">
	import YouTubeIcon from '$lib/icons/youtube.svg?component'

	export let href: string
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	class="inline-flex items-center gap-2 hover:text-emphasis-hover"
>
	<YouTubeIcon class="w-3" />
	<slot />
</a>
