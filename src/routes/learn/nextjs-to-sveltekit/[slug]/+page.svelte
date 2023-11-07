<script lang="ts">
	import 'highlight.js/styles/github-dark-dimmed.min.css'

	import ArrowForwardIcon from '$lib/icons/arrow-forward.svg?component'
	import Button from '$lib/components/Button.svelte'

	export let data
</script>

<main class="container flex flex-col items-center px-2 pt-6">
	<section
		class="prose-pre-code:surface-2 prose prose-lg prose-stone dark:prose-invert lg:prose-xl xl:prose-2xl prose-code:rounded-sm prose-pre:p-0"
	>
		<h1>
			{data.title}
		</h1>
		<div>
			{@html data.content}
		</div>
	</section>
	{#if data.nextChapterSlug}
		<Button tag="a" href={`/learn/nextjs-to-sveltekit/${data.nextChapterSlug}`}
			>Onwards to the next chapter! <ArrowForwardIcon class="w-7" /></Button
		>
	{/if}
</main>
