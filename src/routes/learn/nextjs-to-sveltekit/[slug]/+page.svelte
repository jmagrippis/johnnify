<script lang="ts">
	import {MoveLeft, MoveRight} from 'lucide-svelte'

	import Button from '$lib/components/Button.svelte'

	export let data
</script>

<main class="container flex flex-col items-center px-2 pt-6">
	<section
		class="prose prose-lg prose-stone dark:prose-invert lg:prose-xl xl:prose-2xl prose-pre:px-4 prose-pre:py-2"
	>
		<h1>
			{data.title}
		</h1>
		{#if data.prevChapter}
			<a
				href={`/learn/nextjs-to-sveltekit/${data.prevChapter.slug}`}
				class="not-prose flex items-center gap-2 text-base"
			>
				<MoveLeft /> back to chapter {data.prevChapter.chapterNumber}
			</a>
		{/if}
		<div>
			{@html data.content}
		</div>
	</section>
	{#if data.nextChapter}
		<Button
			class="mb-4"
			tag="a"
			href={`/learn/nextjs-to-sveltekit/${data.nextChapter.slug}`}
			>Onwards to chapter {data.nextChapter.chapterNumber}! <MoveRight
			/></Button
		>
	{/if}
</main>
