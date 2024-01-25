---
title: “App-like” List → Detail View Transitions 🦸 with SvelteKit
snippet: Delight your users & impress your bosses, by conquering View Transitions once and for all!
youtubeId: suuxXrMs5P4
appUrl: https://svelte-kritic.vercel.app/
githubUrl: https://github.com/jmagrippis/svelte-kritic
publishedAt: Dec 10, 2023
---

# Delight with “App-Like” animations

View Transitions are **the** way to give the “App-Like feel” to your web app, and the one people love the most is the List to Detail Hero Transition.

But everyone’s coming to me like:

[MEME]: “Johnny… I need some information, and I need it fast”

You see, I made a video all about the View Transitions API.

I showed how it works with SvelteKit, because that’s closest to how you’d make it work with vanilla Javascript

But I did leave it as your homework to do the List to Detail transition. Well, turns out…

[MEME]: “Ain’t nobody got time for that”

So let’s go over exactly how it’s done!

## View Transitions in 30”

We know how to set up view transitions using the `onNavigate` lifecycle function, by adding something like this in our root layout.

We know how we can use CSS to customise our view transitions, and how to target specifically old views going out, and new views coming in.

We know we can break elements out of their parent animations, by giving them a distinct `view-transition-name`, which will put our element in a separate view transition group. We did that for our header, and for our footer.

## Intuitive solution?

So, you may be thinking… In the list view, I’ll give hero images a `view-transition-name`, like `hero`...

And then, in the detail view, I’ll give the same `view-transition-name` to the one big hero image… And bam, it’s just gonna work… right?

Wrong! That does not “bam just work”, it “boom” just breaks all existing view transitions.

MEME: Did I do that?

You did, but you’re on to something.

## The problem

The problem is, you didn’t watch my video! Even now you didn’t listen.

The `view-transition-name` has to be unique. And in the list view, we now have, like, a dozen elements with the exact same name. So, the browser can’t tell, which one is our hero? Which one small card, becomes our big poster?

And, of course, we can tell, we know what we clicked, we know

MEME: they are the same picture

but this isn’t the first time web dev is counter-intuitive, and it’s not gonna be the last, so let’s figure it out.

## Solution: inline styles + ids

So, if we can give a unique `view-transition-name` to each hero image in the list view, and give the same name in the detail view, our animation will just work. And whenever we want unique names, we can commonly chuck an item’s `id` in there.

So, instead of a static string for our inline styles, let’s switch to javascript, template literal, `view-transition-name: hero-` the id variable. Great, since each game has a unique id, each image here will now have a unique `view-transition-name`.

Which means the list view is sorted, let’s copy these inline styles, go to the detail view, and paste them in… And BAM. “Just works”. Awesome.

Let’s reinforce our learnings, if we also want to animate the title, what do we do?

Inline styles again for our `h3` in the List View, give it a relevant `view-transition-name` like `title`… and make it unique by suffixing the `id`. Save this file, copy & paste the same thing in our Detail View, our title is in an `h1` this time… Save, and… Woohoo!

## Transition to different elements!

It’s worth noting that the browser doesn’t care how the game title may be in an h3 or in an h1, smaller text or big, different colour… all the browser cares about is its view transition name. Similarly, it doesn’t care about the image either, and we’re free to use a different source image in each view.

Commonly, we may want to load a higher quality image for the detail view, but we could even switch to something completely different!

## Almost perfect

I do believe we’ve done enough at this point, this looks cool, although you may eventually notice that the images we’re NOT clicking… they are not animating in or out anymore.

The browser has the perfect default animation for when our image is both on the old page and the new, but when the image is only on the new page… it does the default cross-dissolve. If you haven’t overridden the cross-dissolve, then you’ll see no difference and… arguably even with our sliding pages, it’s not THAT big of a deal…

We can just let it be and have a short video for once. Thanks a bunch for watching I’ll see you around!

SUMMER PUPPY INTERVAL

## Programmatic setup

Alright, new plan, we’re gonna add our `view-transition-name`s just in time, only for the one game we’re navigating to and from.

Which means in our list view, no more inline styles, we can delete those. In their place, Javascript.

We’ve used `onNavigate` to setup view transitions in our core layout, for our list view page we’re gonna use something similar, we’re gonna use `beforeNavigate` and `afterNavigate`. Before we navigate away, we wanna check if we’re going to a detail route, in our case the detail route is `/game/[id]`.

If we are, we want to get the related game element! To find it faster, we can give each element an id, and now we can `getElementById`, we can find the one we’re going to by using `navigation.to.params.id`.

Then, we can find its image element, and we can find its title element. If they exist, we’re gonna set a style attribute, `viewTransitionName`. Again, this is what we did before, but now we’re **only one doing it to one game**, just in time for the navigation to happen!

If Typescript complains, because `viewTransitionName` is still an experimental CSS attribute, we can go to `app.d.ts` and extend the `CSSStyleDeclaration` interface like so.

And, believe it or not, our list to detail transition, works again! Great. And you can see that with this solution, the normal navigation will behave the same, the unrelated images and titles are not stuck anymore, our plan will work.

But we are not done yet! We need the detail to list transition too, for that we’ll do a very similar operation in `afterNavigate`. Only this time, we’ll check whether we’re navigating FROM the detail route.

And we can extract all of this logic to a method that takes an id, so we can call it in both places without repeating ourselves. Speaking of repeating ourselves… BAM. It works. Awesome.

## Final 🥳 Demo

List to detail works great, detail to list as well, the unrelated images and titles still animate along with their cards… Perfect.

However, did you notice that when I navigate back, I’ve got a different animation playing? How does that work?

## Back transitions, next steps + COMMENT 🧡 SUBSCRIBE

That, I will leave that as your take home exercise… Thanks a bunch for watching, I’ll see you around!
