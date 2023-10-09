---
title: “App-like feel” 😍 with the View Transitions API & SvelteKit!
snippet: It’s one of the most exciting times to be a web developer, as most users can now experience all the magic we can do with the new View Transitions API 🥳🚀🎉
youtubeId: qcgGJ0J3yOA
appUrl: https://johnnify.com/
githubUrl: https://github.com/jmagrippis/johnnify
publishedAt: Sep 17, 2023
---

Hello and welcome, I’m Johnny and YOU want to give your website that elusive app-like feel, and I’ll show you how, with SvelteKit and the brand new, experimental, View Transitions API.

Web developers have been chasing the “app-like” feel for decades. Since the iPhone came out and mobile apps started becoming parts of our lives! They felt fast, they felt slick, they felt totally unlike your average web experience.

So us web developers would strive to get that “app-like feel”, often by emulating the stack navigation mobile apps have.

I remember rendering the critical views the user may be going to just off-screen, then sliding them in when they finally do navigate. It was a hack crazy enough to work, so long as you weren’t rendering too much, and you didn’t have too many “next possible views” to worry about.

Now, a decade plus later, there’s essentially a native way to emulate that hack, and more, with WAAAAAAY less code and performance cost. Crucially, it works the same no matter if your app has three pages or three million!

So, let’s setup View Transitions in our SvelteKit app, and see if we achieve that “app-like feel”!

## new `onNavigate` lifecycle method

SvelteKit 1.24 introduced the `onNavigate` lifecycle method, which actually executes right before we navigate, which is exactly where we want to run our new code! Let’s call it in our root `+layout.svelte`, since we want this to happen no matter where our user is in our app.

`onNavigate` takes a single parameter, a callback. If that callback returns a Promise, SvelteKit will wait for it to resolve before completing the navigation. We can do all sorts of tricks with this, but all we want today is a quick `document.startViewTransition`, which takes an asynchronous callback, in which we’ll immediately `resolve` our Promise.

The `onNavigate` callback gets given a `navigation` object, and we’ll also be `await` ing `navigation.complete`.

Again, when we resolve the first promise… we’re telling SvelteKit it’s ok to complete the navigation. An asynchronous method, like this async fat arrow, will always return a Promise, and by `await`ing `navigation.complete` inside it, we’re making it resolve only after… navigation to the next page completes.

This `startViewTransition` is the heart of the `View Transitions API`, and it needs those two promises to work correctly with our SvelteKit app. The first promise essentially makes it so the browser can take a screenshot of the page we’re on now, before we navigate away, and the second promise makes it so it can take another screenshot right after the next page we’re going to is ready & rendered.

Those two screenshots are what we’ll be custom animating later, but, believe it or not, we already have page transitions working! If we navigate now we get the default animated transition, which is a crossfade between the old page we’re on, and the new page we’re navigating to! Sweet!

## Typescript issues and extending Document

We’ll be applying a different animation, to better emulate app-like Stack Navigation, in just a moment; but first, let’s take care of Typescript.

If you are using Typescript, it’s probably flipping out about `startViewTransition`; if you’re from the future, Typescript may be chill, but today, `startViewTransition` is not typed in to be part of the `Document` object. Because it isn’t, not for every browser, it’s still in the experimental stage! My preview on the right is latest Chrome, which does have `startViewTransition`, but Safari, for example, does not, not yet.

So, let’s go in our `app.d.ts`, and extend the Document global. We do that by redeclaring `interface Document`, in which we specify `startViewTransition` may be there. It could be undefined, but if it’s there, it’s going to be a function which returns nothing… but does take a callback… which returns an empty Promise. Remember: asynchronous methods always return Promises.

With that out of the way, we can go back to our root `+layout.svelte`, check whether `startViewTransition` exists, because sometimes it doesn’t, and only then do our magic.

Things still work the same in Chrome, the transition plays out perfectly, the difference is that in browsers that don’t support transitions, we don’t crash! Sweet!

Extra sweet even, because this means that in your next interview, you can say that yes, you are familiar with progressive enhancement, it’s what we’ve just done!

## Slide pages to better emulate Stack Navigation

Regardless, this default crossfade is kinda boring, let’s change the animation to something closer to the Stack Navigation people love from mobile apps!

We can open a style block here in our `layout.svelte`, where we’ve been doing most of our work. To target the old page we use a new pseudoelement: in our `:root` we have the `::view-transition-old` and we target `root`, which is the default transition group, the one that has the crossfade if we leave it untouched.

Similarly, to target the new page we use `:root::view-transition-new(root)`.

We want each of them to play their own animation, so let’s create keyframes for a modest `fade-out`, it will be animating `to` 0 opacity.

And let’s create a `slide-from-right` for the new page, which will be coming in from, 100% of its width to the right, which will make it **just** offscreen. To do that, we use a `transform`, we’ll translate on the X axis, 100%. The “real” X position would be 0, one page’s width worth to the left would be `-100%`, all the way to the right is `100%`.

Alright, time to apply those animations, for the old page we want it to `animate`, get it done in 500 milliseconds, `ease-out` so it slows down, fill `both` sides of the animation, and last we have the name of the animation, we’re gonna use `fade-out`.

For the new page we’ll do the same thing, but we’re gonna use our `slide-from-right` animation. Let’s click around now… Nice!

Now, I just made those animations up, we can play around with them, start with a bit of shadow for the new page, have it scale a bit bigger… As if it’s falling to the screen but…

Please, I’m not a designer, feel free to experiment and find your own vision, or use snippets from Geoff’s excellent article, which is cribbing Jake’s excellent article. Always keeping in mind the performance costs, as well as your users’ willingness to see the same long and intricate animation again and again.

Personally, I’d keep them subtle enough that even someone who `prefers-reduced-motion` would be ok seeing them, and have a toggle for power users to turn them off completely if they find them too distracting.

## Let’s fix that Header! Not animating common elements

Making that toggle would be a cool tutorial for another day, but we’re not done learning about view transitions yet! Now that the next page is flying in, we notice the new header is flying in with it, to replace the old header. Which is a bit weird, since the header is a consistent element throughout our app… We may want to keep it in place while the rest of the page flies in.

We can do that no worries, since we can target specific elements and give them their own animations!

We can go to our `Header.svelte`, and in the style block target its main container, the `header` element. We can specify it’s going to be doing its own thing when it comes to transitions, by setting `view-transition-name` to `whatever`, the value here is NOT magic: it has to be unique, but you can use whatever name you please, it just so happens that for me, what makes most sense is “header”.

Of course, we haven’t created a `header` transition, but that actually achieves the effect we want: the header will now stay in place, while the rest of the page flies in. Awesome!

## Targeting animation groups

Just for demo purposes, if we did want our header to do something weird whenever we navigate, we can target a named transition group with `:root::view-transition-group(` the name of the group, so, in our case `header`.

We could create keyframes for a `slide-in-from-left` animation, have that one play for our header transition group, it’s going to be the opposite animation of what the rest of our page is doing… Great. Did I mention I’m not a designer?

Anyway, let’s forget this ever happened, let’s just have our header stay in place, and reinforce our learnings by applying the same thing, to the footer. To have our footer stay in place too, we open our `Footer.svelte`, we create a style block… Target the container element, which is `footer`, and specify `view-transition-name: footer`. Done! Header & Footer both stay in place, the rest of the page in between flies in.

## NOT animating when going to the page we're already on!

Things look perfect, but there’s one last annoyance to take care of: the animations play even when we’re clicking to go to the same page! Maybe you like that, but I definitely don’t, and a way to prevent it from happening is by going back to our `+layout.svelte`. Remember this section?

We only set up our view transitions if **`document.startViewTransition`** is defined, and now we want to add another check to this conditional. The navigation object has a `from` property, which has the route we’re navigating from. We can get its id, and check that it is not equal, to the `navigation.to.route.id`. It’s a check for whether we’re navigating to a different route. And only if we are, and **`document.startViewTransition`** exists**,** only then we setup our view transitions.

Indeed, if we click around now, we can see animations work perfectly, but do not replay if I happen to click on the same route again. Awesome!

## Next steps + LIKE 🧡 SUBSCRIBE!

I’m super excited about the adoption and evolution of the View Transitions API and I think even the essentials we’ve gone through today result in a more fun and, indeed, “app-like”, website!

I urge you to get familiar with it, do read the excellent article by Jake which includes a beautiful “thumbnail to hero” example, as well as responsive examples, and many more.

And, of course, if you want more Johnny, checkout this video about Text Gradients, while YouTube thinks you’re also going to enjoy this one. Thanks a bunch for watching, I’ll see you around!
