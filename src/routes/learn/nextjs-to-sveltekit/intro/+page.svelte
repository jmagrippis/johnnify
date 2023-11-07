<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import PageTitle from '$lib/components/PageTitle.svelte'
	import YouTubeLink from '$lib/components/YouTubeLink.svelte'
	import {MoveRight} from 'lucide-svelte'
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
		<div class="mb-4 max-w-prose text-left leading-relaxed">
			<p>
				Check back later, and <YouTubeLink
					href="https://www.youtube.com/@johnnifytech?sub_confirmation=1"
					>subscribe to my channel</YouTubeLink
				>
				to see me livestream development. We can work through and evolve it together
				🙌
			</p>
			<p>
				In <YouTubeLink href="https://www.youtube.com/watch?v=0o1tqcui1k8"
					>the first livestream</YouTubeLink
				> we covered chapters 1 through 5!
			</p>

			<Button
				class="my-4"
				tag="a"
				href="/learn/nextjs-to-sveltekit/1-getting-started"
				>Onwards to Chapter 1! <MoveRight /></Button
			>
			<h2 class="my-4 text-2xl font-bold">Prerequisite knowledge</h2>
			<p>
				This course assumes some exposure to HTML, CSS and Javascript. We will
				be going through some fundamentals and theory, so give this course a
				chance even if you feel like a beginner... But promise you won’t get
				discouraged if it starts looking overwhelming 😄 Showing up makes you
				amazing in my book!
			</p>
			<p>
				If haven’t seen Svelte before, the <a
					href="https://learn.svelte.dev/tutorial/welcome-to-svelte"
					target="_blank"
					rel="noopener noreferrer"
				>
					official interactive tutorial</a
				> is by all accounts awesome and heavily recommended. However, as much as
				I love it, it is extremely long and I admit “even I” haven’t gone through
				the whole thing start to finish 😬
			</p>
			<p>
				A good tactic may be jumping to the official tutorial if this course
				becomes a bit much, and back into this course when the official tutorial
				becomes too tiring 😄
			</p>

			<h2 class="my-4 text-2xl font-bold">Environment setup</h2>
			<p>
				Node is the most popular Javascript runtime for “non-browser”
				environments, including your workstation!
			</p>
			<p>
				You may get it from its official site, although I heavily recommend
				installing a “Node version manager” to take care of that for you. Unlike
				most things in your machine, it’s likely you’ll need multiple versions
				of Node, as different projects you work on may be requiring something
				different, according to when they were last updated!
			</p>

			<p>
				My Node version manager of choice is currently <a
					href="https://volta.sh/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Volta</a
				>, but for years it used to be
				<a
					href="https://github.com/nvm-sh/nvm"
					target="_blank"
					rel="noopener noreferrer"
				>
					nvm</a
				>.
			</p>
			<p>
				Finally, in order to get anywhere in modern Javascript, you also need a
				package manager to bring in the ready-made tools you wouldn’t want to
				reimplement from scratch.
			</p>
			<p>
				Node ships with “npm”, which is still the most popular package manager,
				and you can’t really go wrong with just using that, however in this
				project and example code, I’ll be using <a
					href="https://pnpm.io/installation"
					target="_blank"
					rel="noopener noreferrer">pnpm</a
				>.
			</p>
		</div>
		<Button tag="a" href="/learn/nextjs-to-sveltekit/1-getting-started"
			>Onwards to Chapter 1! <MoveRight /></Button
		>
	</section>
</main>
