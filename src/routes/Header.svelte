<script lang="ts">
	import type {Session} from '@supabase/supabase-js'

	export let session: Session | null
</script>

<header class="mb-2 bg-surface-2">
	<nav class="container flex justify-between px-2 py-4">
		<a href="/">Johnnify</a>
		<ul class="flex gap-4">
			<li>
				<a href="/demos/text-gradients">demos</a>
			</li>
			<li>
				{#if session}
					<a href="/profile">profile</a>
				{:else}
					<a href="/login">login / signup</a>
				{/if}
			</li>
		</ul>
	</nav>
</header>
