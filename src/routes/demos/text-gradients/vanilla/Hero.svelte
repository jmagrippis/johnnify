<h1>vanilla CSS Text Gradients</h1>
<ul>
	<li>Josh Linear Gradient</li>
	<li>Radial Gradient</li>
	<li>Baldur's Gate 3 Radial</li>
	<li>With Background Image</li>
	<li>Paper Texture</li>
</ul>

<style>
	h1 {
		background: linear-gradient(to right, plum, aquamarine);
		background-clip: text;
		color: transparent;
	}

	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	ul li:first-child {
		background: linear-gradient(
			45deg,
			hsl(315deg 73% 10%) 0%,
			hsl(327deg 76% 18%) 10%,
			hsl(339deg 82% 26%) 20%,
			hsl(352deg 86% 34%) 30%,
			hsl(5deg 91% 42%) 40%,
			hsl(17deg 95% 50%) 50%,
			hsl(24deg 97% 54%) 60%,
			hsl(30deg 97% 58%) 70%,
			hsl(37deg 98% 62%) 80%,
			hsl(44deg 99% 66%) 90%,
			hsl(50deg 100% 70%) 100%
		);
		background-clip: text;
		color: transparent;
	}
	ul li:nth-child(2) {
		background: radial-gradient(#e66465, #9198e5);
		background-clip: text;
		color: transparent;
	}
	ul li:nth-child(3) {
		background: radial-gradient(
			circle at 50% 50%,
			#fff 0,
			#fbcea0 66%,
			#fbcea0 100%
		);
		background-clip: text;
		color: transparent;
	}
	ul li:nth-child(4) {
		background: url('https://media.freestocktextures.com/cache/d7/d7/d7d72be81898a7f7b56681242cf3ee5b.jpg');
		background-clip: text;
		color: transparent;
	}
	ul li:nth-child(5) {
		background: url('https://images.unsplash.com/photo-1566305977571-5666677c6e98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
		background-clip: text;
		color: transparent;
	}
</style>
