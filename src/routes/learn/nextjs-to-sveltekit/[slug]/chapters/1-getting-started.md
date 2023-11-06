---
title: 'Chapter 1: Getting Started'
description: 'Learn how to create a SvelteKit application and run your local development server.'
chapterNumber: 1
---

## Creating a new project

We are going to use [the official SvelteKit wizard](https://kit.svelte.dev/docs/creating-a-project) to scaffold our app!

To create a new SvelteKit app, we `cd` into the directory **above** where we want our new project to live, and run the following command:

```sh
pnpm create svelte@latest [NAME-OF-THE-PROJECT]
```

In my case, I keep all my codebases in a `Code` directory, and I want to name the new project `sveltekit-dashboard`, so I `cd Code` and then:

```sh
pnpm create svelte@latest sveltekit-dashboard
```

## SvelteKit options & sensible defaults

"Or would you like to shoot yourself in the foot and use Javascript without any types whatsoever."

We should follow the instructions, cd into our brand new directory, and install all our dependencies:

```sh
pnpm install
```

## Running the development server

```sh
pnpm run dev
```
