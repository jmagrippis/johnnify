<main class="container grow px-2">
	<section class="grow py-8 text-center">
		<h1 class="text-bold text-5xl">Text Gradients</h1>
		<h2 class="flex flex-col text-4xl sm:block">
			with Vanilla CSS, <span>or Tailwind!</span>
		</h2>
	</section>
	<section class="text-xl">
		<p class="mb-6">
			Practical demos made to accompany <a
				href="https://www.youtube.com/watch?v=Bual_cAToQQ"
				>this video tutorial by Johnny</a
			>! Check it out and play around!
		</p>
		<ul class="text-3xl">
			<li>
				<a href="/demos/text-gradients/vanilla">🍦 Vanilla CSS Examples</a>
			</li>
			<li>
				<a href="/demos/text-gradients/tailwind">⛵️ Tailwind.css Examples</a>
			</li>
		</ul>
	</section>
</main>

<style>
	section:first-child {
		background: linear-gradient(
			333deg,
			hsl(345deg 100% 42%) 0%,
			hsl(25deg 64% 53%) 10%,
			hsl(56deg 55% 51%) 20%,
			hsl(83deg 60% 59%) 30%,
			hsl(129deg 40% 61%) 40%,
			hsl(175deg 100% 35%) 50%,
			hsl(205deg 50% 44%) 60%,
			hsl(231deg 58% 43%) 70%,
			hsl(238deg 71% 33%) 80%,
			hsl(244deg 66% 20%) 90%,
			hsl(267deg 100% 7%) 100%
		);
		background-clip: text;
		color: transparent;
		background-size: 200%;
		animation: move-background 2s infinite alternate;
	}

	@keyframes move-background {
		0% {
			background-position: 0;
		}
		100% {
			background-position: 100%;
		}
	}

	h1 {
		font-size: 3rem;
		font-weight: 900;
	}
</style>
