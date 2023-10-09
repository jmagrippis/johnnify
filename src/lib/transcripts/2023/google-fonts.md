---
title: Stop using Google Fonts in prod 📈 what to do instead! 📉
snippet: Google Fonts is awesome, but did you know you shouldn’t be using it in production?! Not in 2023! Not if you care about UX, SEO and conversions 😱
youtubeId: TKKpVlZRFLc
appUrl: https://johnnify.com/
githubUrl: https://github.com/jmagrippis/johnnify
publishedAt: Sep 26, 2023
---

Google Fonts is AWESOME!

You can browse through thousands of font families, filter on supported languages, the style… you can preview your own copy…

BUT! You should never use the fonts you select by bringing them in with the Google CDN…

Which **is how most people do it**!

Just copy this, paste it in the head of your `html`, and done, you’ve got your fonts, use them as you please… but at what cost?!

There is a cost, this is objectively a mistake, and I will explain why. But first, here’s what we should be doing instead.

We should be self-hosting the fonts, which we can do in a couple different ways: traditionally we’d download the fonts, figure out how to serve them from the same domain as our website, and declare them in a way to avoid Layout Shift and other gotchas… but that is much more of a hassle than pasting a couple lines of code.

No worries though, we live in a future where we have hassle-free ways to self-host!

Next.js has a bespoke solution for Font Optimisation, but here’s a solution we can use with any framework, including our darling SvelteKit!

## Hassle-free, framework-agnostic: Fontsource

We’ll use **Fontsource**, which publishes all Google Fonts, and other open source fonts, as NPM packages. We can still use Google Fonts to browse & identify the fonts we want, I find [fontsource.org](http://fontsource.org)… workable but clunkier…

Either way, let’s say we decide on “**Epilogue**” as our sans-serif, no-frills font, and “**Tourney**” as our display, fun, font.

Armed with that knowledge, let’s go to the terminal, to the root of our project, and install those fonts as dependencies. We can use any package manager we want, `npm`, `pnpm`, whichever, I’ll go with the flavour of the month, `bun`! So, `bun add -d @fontsource-variable/epilogue` and `@fontsource-variable/tourney`.

Next, we have to import the font css into our code. For SvelteKit projects, for fonts we want to use throughout our app, we do that in our root `+layout.svelte`. If you don’t have one, create it in `src/routes`, and in its script block, first thing we want to do is `import` the packages we just installed.

`import @fontsource-variable/epilogue`, `import @fontsource-variable/tourney`.

And that’s it, this has been the equivalent of pasting the Google stuff, we can now use our fonts anywhere in our app, but without “**the cost**”.

So, here in our layout, in a style block, we can say we want our default font to be Epilogue, by declaring `html`, `font-family: Epilogue Variable`, fallback to `sans-serif`. You can see this font applied the moment we save, awesome!

And maybe we want all our headers to use `Tourney`... `font-family: Tourney Variable`, falls back to sans-serif. Great, let’s apply a different font-weight as well… Fun!

## Setup with ⛵️ Tailwind

When using channel favourite Tailwind, the process is very similar.

We install our fonts the same way, I’ll go old-school this time with `npm` for the lolz. We import them in our root `+layout.svelte`, in its script block, same way as we did before. **But** now we diverge, we go into our Tailwind config to declare that our `sans` font is Epilogue Variable, falls back to sans-serif.

Tailwind applies the sans font as the default everywhere for us, so we can indeed already see **Epilogue** in our preview on the right, as soon as we save.

We can also specify our display font, `Tourney Variable`, falls back to sans-serif… which we are now able to apply with the `font-display` class.

If we want to do the same trick as before, where all our headers use our display font automatically, we can go into our `app.css`, and we can specify that in the base layer, for all our heading elements, we want to `@apply font-display`. And even `font-thin`, or `font-[250]` if we want an arbitrary value for the font weight. Some bonus Tailwind magic, to finish with a flourish.

## But what’s wrong with the Google CDN?!

Tailwind or vanilla, the core of the matter is the same: instead of pasting the Google link tags, we install our fonts as dependencies & import them. To me, as a developer, that’s about as convenient… but why is it better for our websites, for our users? What’s wrong with the Google way?!

## SEO and Core Web Vitals Costs & Benefits

The biggest practical reason, the one you’d tell your Product Owner, CTO, or similar stakeholder, is that "the Google way” harms your SEO and the User Experience. Big companies pay big money for performance and SEO audits, and the most common feedback after those rigorous and expensive assessments is: you should self-host your fonts.

The Google CDN, as fast as it may be, is still a request outside your domain. This means we need to resolve the DNS for the Google CDN, then form the connection, then make it secure, then actually ask for the font file, then load it, and then, finally, render it. The “preconnect” hint makes some of that process start happening earlier, but you know what’s faster than earlier? Never! Skip the extra hoops altogether, get the font files from where you are right now.

The Google way is the long way, which sets you back in a lot of metrics such as **First Contentful Paint**, and even Core Web Vitals such as **Largest Contentful Paint** & **Cumulative Layout Shift**. Google themselves have decided these are THE metrics correlating with a better real-world user experience, and therefore use them as a ranking signal for displaying search results.

Let’s rephrase that to ensure it lands, as it is so important: Google thinks your users will have a better experience when your website is doing well on those metrics, AND will rank you better in search results.

With that knowledge, it’s your responsibility to eliminate the third-party when it comes to your fonts! Get better metrics, better UX, better SEO. Happy users, happy clients, happy days.

## Google tracks and profiles you?!

And, there is even one more “cost” of doing fonts the Google way, although only if you care about privacy.

Google remains an ad company above all, they profile everyone as much as they can and use that data as they please. So, you bet when your users make a request to the Google CDN to get your fonts, they also get profiled a little bit more: “oh, they were on that website, using that device, they loaded this font. Interesting.”.

However, I can see people dismissing this “cost”.

Maybe they think Google already knows everything, maybe the website is using Google Analytics so every user is heavily profiled anyway. On the other hand, we do seem to be getting a bit more privacy-conscious over time. Next.js highlights “**No requests are sent to Google by the browser**” twice in their Font Optimization docs, so they think developers want clear assurance on that front**.**

I myself pay to use Plausible Analytics instead of the free Google Analytics, and there’s a lot of other “privacy-friendly” analytics alternatives. If a market like that is viable, to me that’s evidence enough people do care about privacy. But, again, I can see this “privacy / creepiness” angle being dismissed as “just, like, your opinion, man”, so I would always lead and focus on the practical reasons to dodge Google Fonts, and self-host instead.

## Is this a silver bullet?! + LIKE 🧡 SUBSCRIBE

As a principal software engineer, people often pay me to tell them “it depends”. There’s a lot of nuance to every technical decision, advantages, disadvantages… but this one really is a rare silver bullet. Just do it.

I guess if I had to list a disadvantage, I would say that there’s a higher chance to mess it up, there’s a higher chance to spend more time and get things wrong self-hosting, than when pasting the Google links. But, experts say the more you watch and share this video, the lower that chance gets.

To increase your chances, of having fun with CSS and animations, go through these videos. Thanks a bunch for watching, I’ll see you around!
