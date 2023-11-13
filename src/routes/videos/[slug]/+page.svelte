<script lang="ts">
	import YouTubeIcon from '$lib/icons/youtube.svg?component'

	export let data

	$: youtubeHref = `https://www.youtube.com/watch?v=${data.front_matter.youtubeId}`
</script>

<main class="container flex grow flex-col items-center px-2 pt-6 text-lg">
	<section class="brand-prose">
		<h1 style={`view-transition-name: title-${data.front_matter.youtubeId}`}>
			{data.front_matter.title}
		</h1>
		<a href={youtubeHref} target="_blank" rel="noopener noreferrer">
			<img
				class="not-prose mb-2"
				style={`view-transition-name: image-${data.front_matter.youtubeId}`}
				src={data.thumbnail.url}
				width={data.thumbnail.width}
				height={data.thumbnail.height}
				alt={`YouTube thumbnail for ${data.front_matter.title}`}
			/>
		</a>
		<a
			href={youtubeHref}
			target="_blank"
			rel="noopener noreferrer"
			class="flex justify-end text-sm text-emphasis hover:text-emphasis-hover"
		>
			{#await data.streamed.likes then likes}{likes}{/await}
			❤️ over @
			<YouTubeIcon class="ml-1 w-5" />
			! Add yours? 🫶
		</a>
		{@html data.content}
	</section>
</main>
