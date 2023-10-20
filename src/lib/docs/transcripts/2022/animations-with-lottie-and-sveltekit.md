---
title: 😘👌 Animations with Lottie & SvelteKit
snippet: Let’s add CINEMATIC FLAIR to our animations, by bringing LOTTIE in our SvelteKit app!
youtubeId: X1irc9kC_ZI
appUrl: https://techy.cat/
githubUrl: https://github.com/jmagrippis/techy-cat
publishedAt: Oct 13, 2022
---

# 😘👌 Animations with Lottie & SvelteKit

## Spark joy with 😘👌 animations

Hello and welcome, I’m Johnny and **you** want to spark user delight, with well-placed, eye-catching animations… and we’ll do just that, with SvelteKit & Lottie.

Svelte does have first class support for transitions and animations, but they are limited to what CSS can do… Which is a lot, to be fair, but I know I’m limited when it comes to bending CSS rules like a wizard.

## What is Lottie? After Effects to Web???

I’m no After Effects wizard either, but I can do much more, much easier with After Effects, and that’s probably what Airbnb was thinking when they created Lottie! Lottie is a delightful library which takes animations you created in After Effects, and renders them in web and mobile apps.

And when I say **you**, I’m also including your dedicated design team, your video editor, or, most likely some other super talented individual who uploaded their work, for free, on LottieFiles.

So we can just go and search for **heart**, find the one we like best, and even quickly tweak its colour palette. Pretty straightforward way to add on-brand flair, for the “like” functionality in any app.

Which is amazing as this isn’t Video Copilot, there won’t be an After Effects tutorial, I don’t have a design team, or anyone at all helping me with my videos. No sponsors either, so when I say LottieFiles is cool, you can be certain it’s because I’ve actually used it and genuinely liked it. Not because they bid higher than [Rive](http://Rive.app) or whatever.

Which is a cool alternative by the way, but it’s a bespoke tool to learn and, most of all, the community section is too confusing to me, there is no search! So Lottie & LottieFiles it is!

Today, we’ll be add a big looping animation, to make our splash page more fun, and then a star / unstar animation in response to user interaction. These are real features in a real app we’ve been building together and you can check out, and I’ve also added a dedicated Lottie demo page, for convenience.

## LottieFiles, `lottie-web` and `loadAnimation`

Alright, so let’s go to LottieFiles.com, search for cat… and pick this extra cute one playing with yarn. We could mess with the colour palette too, but let’s just get on with it, and download this… In JSON format.

Let’s move on to our editor, this is our Techy Cat project you can find open-source and free on GitHub, it’s a SvelteKit app! Here it is running on the right side of the screen, our first goal is to replace this huge emoji with our animation. This is our index route, this `+page.svelte` renders this Hero component, which has our huge cat emoji. This is what we want to replace.

So, let’s bring in the library we need to make this happen, let’s install `lottie-web`! On the terminal, let’s `npm i -D lottie-web`.

Alright, `lottie-web` can only run on the browser, so we need to go in our `Hero` component’s `script` block and specify we want something to happen `onMount`, one of the lifecycle methods `svelte` provides.

What we wanna happen, is for `lottie`... to `loadAnimation`. There are a few options we can pass here, the two most important, and mandatory, ones, are about which animation to actually load, and where to put it in.

## Binding our animation container

For where to put it in, we’ve got the `container` property: and we could use `document.querySelector` or similar to find the element we want to put the animation in, but the more Svelte way to do this would be by binding the element to a variable. So let’s declare `let animationContainer`, we’ll type this as `HTMLElement`, and go down to our UI, remove the emoji, render a `div` element, and bind this to `animationContainer`.

By the time our `onMount` executes, `animationContainer` will already be an HTMLElement, so we can say `container: animationContainer`. Lottie will load the animation inside our animation container.

Doing it this way, what I’ve called the more `Svelte` way, doesn’t really matter in this exact case, as we know we’ll only have this one animation playing in just this one element… it’s guaranteed to appear exactly & only once in our page…

But it will matter for our starring animation later, for example. That animation will live inside elements that appear multiple times per page, and animate asynchronously, so using document.querySelector won’t cut it.

## Passing the animation data

So, to recap, we’ve learned how to get the container element, the Svelte way, through binding `this`, a good habit that satisfies all our use-cases. That’s cool, second option we need to provide here is for specifying the animation we wanna load. And, again, we have a couple ways to do it, we could use the `path` option which takes a url, so we could even copy & paste the one serving from the LottieFiles cdn and not need to download or host anything, BUT, the way `lottie-web` works, means it will be making that request everytime we render this component.

Which is bad enough for when people are navigating around the website and back to the homepage, that’s already more requests than we’d have liked, but it’s downright disastrous for our starring example later, where we’d be making a separate request for every star we render on the page!

This is a fun problem, because we can mitigate it, we can make it a bit better by serving the resource from our own domain, we can heavily cache it, cache it on the user’s browser even, but all of this would be micro-optimising a problem we don’t need to have in the first place.

So, to avoid this problem altogether, we will NOT use `path`, instead we’ll use `animationData`, which takes the JSON object of the animation itself. Essentially, instead of telling `lottie-web` here’s the `path` for you to fetch the animation from, we’re saying here’s the animation data you need, you’re welcome!

And `animationData` is the json we downloaded earlier, so we can open the directory of our Hero component, open our Downloads directory, and drag and drop that animation json… And even rename it to something short and snappy…

## 🥳 Looping animation demo 🥳

And now, thanks to Vite, we can just import `animationData` from `cat-with-yarn.json`, and that’s what we’ll pass to our load animation! With that, our animation renders perfectly, because the two other `lottie.loadAnimation` options we will care about about today, `loop` and `autoplay`, both default to `true`, which is what we want in this case, so we don’t need to pass them in. Our animation will start playing automatically, and keep looping forever.

## Core web vitals & **Cumulative Layout Shift concerns**

Everyone agrees, this looks wicked cool, but I do advise against having an animation like that, before the fold. Use with caution! We usually go for simpler CSS and svg-based animations in places like this, to minimise how much the user needs to load, how much the browser needs to do, before the app starts looking ready and interactive.

I’ll do a proper video on Core Web Vitals at some point, especially if you keep asking, but, for now, if you really want to put something flashy like this before the fold, at least make sure you specify its dimensions, to prevent LAYOUT SHIFT.

You’ll notice our content being pushed down when the animation loads, which is a bad user experience, and bad for SEO, one of those great cases where those go hand in hand. To get around this, we can give specify our container’s height with CSS, so it’ll be taking the exact same vertical space no matter whether the animation has been loaded or not… and we can even add an extra cheeky css animation as well, to “hide” how this gets loaded a bit further down the line, I find this keeps sites looking smooth, no-one likes things popping-in abruptly.

## Star / unstar functionality breakdown with SvelteKit Form Actions

Alright, splash page flair delivered, next up, we got these Idea Cards. If I’m a logged in user, I can “star” an idea, which means I’ll be able to find it in my profile page.

If we look at the `IdeaCard` component, we’ll see that this works with SvelteKit Form Actions. It’s a whole other video to really get into those, but the short of it is that our `ideas/page.server.ts` allows for a couple Form Actions: `star` & `unstar`. If the idea is `starred` already, we submit to the `unstar` action, if not, we submit to the `star` action. This means, if we click the button when an Idea is NOT starred, we want to star it, add it to favourites. Conversly, if it’s already starred, we’d only click on it if we want to unstar it.

Again, it doesn’t really matter for this video what the form actions actually do, or what `starIdea` does behind the scenes, but if you’re curious, it is hitting the Supabase REST API to update a pivot table in our Postgres database. This allows the Remote Procedure Call we execute to retrieve the Ideas, to also know whether the logged in user has starred any returned idea, or not. I trust this clears things up.

## Downloading a customised “Starring” animation

Anyways, our goal now is to replace the star emojis with a fun animation, so let’s go to LottieFiles once again, search for “star”, and grab this one.

Let’s play around with the palette a bit to see how that flow works, save it… You do need to have an account, you need to attach it to a project and whatever, I’m not super fond of this I admit… But we can finally download the json file… And drag & drop in the directory of the IdeaCard component… Let’s find that directory… Drag & Drop, and rename!

## Using our “Starring” animation for our “unstarred” state!

Cool! Let’s replace our star emojis with the animation, which should be straightforward, it’ll be just like we did before, we’ll bind a reference to an element… Instead of doing a ternary here to show the correct emoji, let’s remove all of that and have our animation container actually be the this button!

So, maybe for clarity, we can `let starButton`, it’s an `HTMLButtonElement`... And we go back down to our button, and `bind:this`.

Awesome, `onMount`, the magic Svelte lifecycle method, let’s load our animation, our container is going to be the `starButton`. Now we need to import the json we just downloaded… and pass it in as `animationData`… And if we save, tada!

However, as fun as this is, this time we don’t want the animation to loop, or autostart, so we need to specify those options… to be `false`.

## Render on the “starred” position, using **`goToAndStop` & `totalFrames`**

Sweet, the “unstarred” state looks sorted, however some of the ideas we have actually “starred”, so how do we show them with a filled out star?

Essentially, what we really want is for the “starred” ideas to render their animation on its last frame. How do we do that? As it happens, `loadAnimation` returns the AnimationItem which has quite a few handy methods for us to use. So if we get a reference to that…

We can say, `starAnimation.goToAndStop` let’s say `10`. This number represents time by default, so go to and stop at the `10`th millisecond of the animation, which looks the same because a millisecond is like nothing, but at the 1,000th millisecond, 1 second in, the animation looks like this.

Personally, I much prefer working with frames when it comes to animations, so if we pass in `true` as the second argument, our number will be representing `frames`. There is no thousandth frame for this animation, but there is a frame number 10. But what we actually want to do is go to exactly the last frame of the animation, which we can find out dynamically, by calculating that the `lastFrame` is going to be `starAnimation.totalFrames - 1`. Frames are zero-indexed, the very first frame is actually frame number 0, so we need to subtract one.

So, if we pass that `lastFrame` in, our animation will be guaranteed to go to and stay on its last frame, no matter its length; so even if we choose a different animation to import, we wouldn’t need to change any other code.

Alright, we got every Idea looking like it’s in the `starred` state now, what we actually want is to conditionally go to that frame. So, if `starred` is truthy, that’s when we wanna go to the last frame, else, we want to go to frame zero, the first frame.

And boom, the star state of our Ideas is accurately represented!

## Playing our starring animation on click ★

This means we’re back to feature parity to what we had before, what remains is to play the animation on click! When I click now, nothing seems to happen , however if I refresh you can see that ideas have been starred & unstarred accordingly.

How do we trigger the animation to play when we click?

As mentioned previously, we’re using SvelteKit Form Actions for this functionality, and we’re also using the `enhance` action, to enhance our forms with client-side JavaScript. The `enhance` action optionally takes a method which runs immediately with the form submission. This is where we can do what’s called “optimistic updates”: before the server tells us that we have indeed succeeded in starring this idea, we can instantly give the user feedback as if everything went perfectly. We’re being optimistic!

And in case things don’t go as planned, our `enhance` method can return another method, which will run after the server responds, which is when we can dismiss our loading indicators, or show an error of what went wrong, and even revert back to our previous state, take back our “optimistic update”.

We’ve already set things up to update our `starred` component accordingly, from when we still had the emoji stars, so what remains to trigger our animation! Let’s slide the reference to our animation outside of the `onMount`, so we can use it here too

First, let’s make starring work , much like `goToAndStop`, there is a `goToAndPlay` method, we can say go to 0, and again specify `true` as the second argument to use frames, not milliseconds.

## Reversing the animation to ☆ unstar

Amazingly, this just works, but of course we get the same animation playing even for when we unstar ideas, which is not what we want. Things work fine when we’re starring an idea, but not when we unstar.

Easy enough to fix, very similar to what we did in our `onMount`, we want to check if we just toggled our `starred` property to be truthy. If it is truthy, go to frame 0 and play, if not, we want to go to the last frame and play.

But wait, if we’re on the last frame already, there’s no animation left to play surely?

And no there is not, so what we’ll do is play the animation in reverse. We’re gonna use another method, `setDirection`: if `starred` is truthy we want to play the animation forwards, normally, which we do by specifying `1`… else, we want to play the animation in reverse, which we do by specifying `-1`.

And now, it all works perfectly. Or, well enough, sometimes we may want a unique animation for this, or no animation at all for a “sad” user action. We shouldn’t give the user dopamine hits for things we don’t want them to do… but, for us now, reusing our existing animation, in reverse, will do just fine.

## Error handling 🔴 reversing Optimistic Updates

One last thing, we mentioned this is an optimistic update, when the server responds this method will execute, so if we get an error, we revert our `starred` property… it’s a good idea to add a couple lines to `goToAndStop` to the appropriate frame, to keep the visuals matching our state.

Now, if we simulate being offline, you can see that the revert is so fast we don’t even see anything, if we simulate the server responding with an error after a few seconds, we can see the state resetting as well.

We usually don’t want random animations to play in response to errors, although we probably would want a toast, some notification somewhere, to inform the user there has been an error and we couldn’t star or unstar as they wanted.

Believe it or not though, I am gonna call this done, our starring & unstarring functionality is working absolutely perfectly, with all the flair in the world. Woohoo!

## Check out [techy.cat](http://techy.cat) for the latest code & more demos!

Again, all of this code is open-source and free on GitHub, Techy Cat is a real app I do maintain to keep up to date with SvelteKit, its breaking changes, its best practices, and showcase how I think some cool things can be done with it. My best ways to learn are by building things, teaching, and being wrong on the internet, and Techy Cat has become this package deal where I’m doing all three!

To reinforce our learnings, and to let anyone heart things without needing to faff about with magic links, I’ve also created this dedicated Lottie Demo page. We’ve got a looping animation, heart/unheart based on COOKIES, not supabase, and a confetti button!

## YouTube Partner after HOW MANY YEARS?! 🤯

Celebrate your wins, I’m celebrating making YouTube Partner, which means I can finally disable unskippable & midroll ads for my videos, I hope you didn’t see ANY. Believe me, I’d have paid YouTube long ago to stop em from breaking our flow with ads, but that’s not possible, so I just had to keep doing this for, like, two years. Although, sometimes it feels like it’s been more like…thirteen? Hmmm…

## Next steps + Like & SUBSCRIBE

Anyway, next steps could be experimenting with Lottie Lite, a kinda hidden export from `lottie-web`. It ships fewer kilobytes, but only works with the svg renderer, which is fine, that’s what we’ve been using all along… but Lottie Lite also drops support for a couple more features that may leave your animation not quite working, depending on whether it’s using things like expressions… so, try Lottie Lite with caution.

If you’re really serious about smaller bundles, this Hamburger Menu Animation is my favourite one we’ve done, and it’s vanilla SVG & CSS, no extra libraries at all… and, YouTube thinks you’ll enjoy this video as well. Thanks a bunch for watching, I’ll see you around!
