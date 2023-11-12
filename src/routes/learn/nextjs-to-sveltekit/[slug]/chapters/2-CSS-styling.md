---
title: 'CSS Styling'
description: 'Let’s create your home page and discuss the different ways you can style your application'
chapterNumber: 2
---

## Global styles

We need them! Let's create a new file, in `src/routes/global.css`:

And add something classic, such as:

```css
html {
	background-color: darkolivegreen;
}
```

This will eventually change our app's background color to... a dark olive green! Only problem is, we're not using this CSS file anywhere in our project.

Let's open `src/routes/+page.svelte` and add a script tag at the top, to import our `global.css`:

```svelte
<script lang="ts">
	import '../global.css'
</script>

<h1>Welcome to SvelteKit</h1>
```

As soon as we save, our app's background will change! Our SvelteKit dev server pushes changes as needed to quickly see the results of our new code.

An unfortunate side-effect of our lovely new background color, is that our text is almost unreadable. Let's fix that by adding a `color` property to our `html` selector!

```css
html {
	background-color: darkolivegreen;
	color: ivory;
}
```

Again, our app updates on save, and we can see again! Feel free to pick a color combo you like.

## Layouts with SvelteKit

However...

## Scoped styles

You may also know them as CSS Modules

## Tailwind

We love it! My video [Tailwind with SvelteKit: How to setup + bonus tips](https://www.youtube.com/watch?v=JExJDNPz-Ow) may be from late 2021, but still applies today 😄
