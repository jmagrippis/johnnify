<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte'
	import YouTubeIcon from '$lib/icons/youtube.svg?component'
	import Hero from './Hero.svelte'

	export let data
</script>

<main class="grow text-center text-lg">
	<section class="container px-2 pt-12 md:py-16">
		<PageTitle>Start building with SvelteKit</PageTitle>
		<p class="mx-auto max-w-prose">
			Go from beginner to expert by learning the foundations of SvelteKit and
			building a fully functional demo website that uses all the latest
			features.
		</p>
	</section>
	<Hero chapterCount={data.chapterCount} />
	<section
		class="container mb-8 flex flex-col justify-center px-2 lg:flex-row lg:items-end lg:gap-4"
	>
		<h2 class="text-2xl font-bold">How does this course work?</h2>
		<p class="italic text-emphasis">
			By building a full web application. Step by step.
		</p>
	</section>
	<section class="container flex flex-col items-center px-2">
		<h2 class="mb-8 text-2xl font-bold">Extra Resources</h2>
		<div class="max-w-prose text-left leading-relaxed">
			<p>
				<strong>Learn SvelteKit</strong> is <em>heavily</em> inspired by
				<a
					href="https://nextjs.org/learn"
					target="_blank"
					rel="noopener noreferrer"
					class="hover:text-emphasis-hover">Next.js/Learn</a
				>, Vercel's official, free, Next.js course.
			</p>
			<p>
				SvelteKit, like any other framework, is an implementation detail! So
				we’ll be following the same structure, and building the same final
				app... Only difference being, we’ll be implementing “the SvelteKit way”!
			</p>
			<p>
				You can see me, Johnny, <a
					href="https://www.youtube.com/watch?v=l07E3GZLwTc"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 hover:text-emphasis-hover"
				>
					<YouTubeIcon class="w-3" /> go through that whole course</a
				>, live!
			</p>
			<p>
				This course, the SvelteKit version with a bit of my own spice, is under
				development, so <a
					href="https://www.youtube.com/@johnnifytech?sub_confirmation=1"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 hover:text-emphasis-hover"
				>
					<YouTubeIcon class="w-3" /> subscribe to my channel
				</a> and we can go through it and evolve it live!
			</p>
			<p>
				Watching my content helps solidify that if I do have a seemingly hot
				take, I’m actually smiling all the while 😄
			</p>
		</div>
	</section>
</main>
