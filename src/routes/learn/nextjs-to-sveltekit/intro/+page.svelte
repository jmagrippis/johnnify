<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte'
	import YouTubeIcon from '$lib/icons/youtube.svg?component'
</script>

<main class="grow text-center text-lg">
	<section class="container px-2 pt-12 md:py-16">
		<PageTitle>Learn SvelteKit: Introduction</PageTitle>
		<p class="mx-auto max-w-prose">
			Hello and welcome! In this free interactive course, you'll learn the main
			features of SvelteKit by building a full-stack web application.
		</p>
	</section>
	<section class="container flex flex-col items-center px-2">
		<h2 class="mb-12 text-2xl font-bold">
			🚧 This course is under development 🚧
		</h2>
		<div class="max-w-prose text-left leading-relaxed">
			<p>
				Check back later, and <a
					href="https://www.youtube.com/@johnnifytech?sub_confirmation=1"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 hover:text-emphasis-hover"
				>
					<YouTubeIcon class="w-3" /> subscribe to my channel
				</a> to see me livestream development. We can work through and evolve it
				together 🙌
			</p>
		</div>
	</section>
</main>
