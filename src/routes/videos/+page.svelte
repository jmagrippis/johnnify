<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte'

	export let data
</script>

<main class="container grow px-2 text-lg">
	<PageTitle>Latest Videos</PageTitle>
	<ul class="divide-y divide-surface-2">
		{#each data.videos as { slug, front_matter, thumbnail }}
			<li class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 xl:gap-12 xl:py-8">
				<a class="mb-4 block place-self-center sm:mb-0" href={`videos/${slug}`}>
					<img
						style={`view-transition-name: image-${front_matter.youtubeId}`}
						class="rounded"
						src={thumbnail.url}
						width={thumbnail.width}
						height={thumbnail.height}
						alt={`Youtube thumbnail for ${front_matter.title}`}
					/>
				</a>
				<div class="col-span-2">
					<h2
						class="text-2xl"
						style={`view-transition-name: title-${front_matter.youtubeId}`}
					>
						<a href={`videos/${slug}`}>
							{front_matter.title}
						</a>
					</h2>
					<div>
						{front_matter.snippet}
					</div>
					<div>
						{#await data.streamed.youtubeIdsToLikes then youtubeIdsToLikes}
							{#each [...Array(youtubeIdsToLikes[front_matter.youtubeId]).keys()] as _}
								❤️
							{/each}
						{/await}
					</div>
				</div>
			</li>
		{/each}
	</ul>
</main>
