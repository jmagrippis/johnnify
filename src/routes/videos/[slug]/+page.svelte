<script lang="ts">
	import YouTubeIcon from '$lib/icons/youtube.svg?component'

	export let data

	$: youtubeHref = `https://www.youtube.com/watch?v=${data.video.front_matter.youtubeId}`
</script>

<main class="container flex grow flex-col items-center px-2 pt-6 text-lg">
	<section
		class="prose prose-lg prose-stone dark:prose-invert lg:prose-xl xl:prose-2xl prose-code:rounded-sm prose-code:bg-surface-2"
	>
		<h1
			style={`view-transition-name: title-${data.video.front_matter.youtubeId}`}
		>
			{data.video.front_matter.title}
		</h1>
		<a href={youtubeHref} target="_blank" rel="noopener noreferrer">
			<img
				class="not-prose mb-2"
				style={`view-transition-name: image-${data.video.front_matter.youtubeId}`}
				src={data.thumbnail.url}
				width={data.thumbnail.width}
				height={data.thumbnail.height}
				alt={`Youtube thumbnail for ${data.video.front_matter.title}`}
			/>
		</a>
		<a
			href={youtubeHref}
			target="_blank"
			rel="noopener noreferrer"
			class="flex justify-end text-sm text-emphasis hover:text-emphasis-hover"
		>
			{data.video.likes}
			❤️ over @
			<YouTubeIcon class="ml-1 w-5" />
			! Add yours? 🫶
		</a>
		{@html data.video.content}
	</section>
</main>
