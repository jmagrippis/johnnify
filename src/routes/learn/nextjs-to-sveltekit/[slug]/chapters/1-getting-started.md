---
title: 'Getting Started'
description: 'Learn how to create a SvelteKit application and run your local development server'
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

The wizard has few hard opinions, instead asks questions to help scaffold our app according to taste.

The first question is choosing three Svelte app templates:

- The "SvelteKit demo app" is a more of a showcase of Svelte & SvelteKit features, even including a Wordle clone! It's worth trying out, but not for when we're building our own app.

- "Library project" is for when you're creating something to be used in other projects / apps, so it also doesn't apply to us today!

- That leaves us with "**Skeleton Project**"!

Let's pick **Skeleton Project**!

Next 🧙‍♂️ question is a big one:

> Add type checking with Typescript?

In my opinion, the options here translate to:

1. Yes, the hard way with Javascript & JSDoc comments
2. Yes, the easy way with Typescript
3. No, I would like to shoot myself in the foot

The internet loves arguing over this, and I do agree that it can look more intimidating for beginners than regular Javascript. After all, it's got more syntax to learn!

However, **especially as a beginner**, you **want** your editor / IDE to be doing as much work for you as possible! I can see people relishing the flexibility of untyped Javascript.

The expectation is "I'll be _in the zone_ coding if I don't have Typescript complaining about types, and writing all that boilerplate", but the reality, "even for me" with two decades of experience, is all I'm getting is the "flexibility" of introduce runtime errors I'll need to jump back to fix, breaking my flow anyway.

So I'm going for option 2 "**Yes, using TypeScript syntax**".

Lastly we can opt-in to some additional tooling:

> Add ESLint for code linting?

In a time before [Prettier](https://prettier.io/), this used to be essential. ESLint still is in React projects, as there are a few gotchas with hooks that no human will be catching every-time. However, we're doing Svelte, so I am leaving it up to taste to enable it or not. ESLint can be nice, will catch some accessibility omissions, but can also annoy you all the while you're coding, for things you'd be getting on with anyway.

> Add Prettier for code formatting?

Mandatory **yes**. It's been 2 years since I've had to convince a senior engineer Prettier is essential, so I'm hoping it's universally understood by now! No arguing over things a computer would be best at resolving anyway, plus Prettier lets me know quickly if I've got a syntax error: if prettier can format it, the code compiles!

> Add Playwright for browser testing?

[Playwright](https://playwright.dev/) is my browser / e2e testing tool of choice, but I don't particularly like the way SvelteKit sets it up! I prefer using [Playwright's own CLI](https://playwright.dev/docs/intro)!

Next/Learn doesn't have any e2e testing, but we'll do it as extra credit in the end: it's essential!

> Add Vitest for unit testing?

[Vitest](https://vitest.dev/) is a great node-based test runner. It was harder to set up when I made [🧪 Test SvelteKit with TDD & VITEST 🧪](https://www.youtube.com/watch?v=5bQD3dCoyHA), now it's easy much simpler and we can ask the wizard to "just do it" for us. The video still has value though, including my favourite TDD exercise!

Next/Learn doesn't have any unit testing, and we won't explicitly be going over any, although you may enjoy TDDing some of the currency formatting for example!

## Our new skeleton app!

With the wizard done, we can `cd` into our brand new directory, and install all our dependencies:

```sh
pnpm install
```

Then we can run the development server with

```sh
pnpm run dev
```

Which will get our app running on [localhost:5173](http://localhost:5173)! Make sure to visit and take in the humble beginnings. We'll be adding so much!
