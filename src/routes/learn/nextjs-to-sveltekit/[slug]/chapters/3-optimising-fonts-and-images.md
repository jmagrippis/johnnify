---
title: 'Optimising Fonts and Images'
description: 'Let’s create your home page and discuss the different ways you can style your application'
chapterNumber: 3
---

Building and deploying an app is just a small part of the job! Making it discoverable so people can find it, and usable so they delight when they come, use it longer, and come back for more is crucial.

The [Core Web Vitals](https://web.dev/learn-core-web-vitals/) are the best metrics we currently have for those aspect. Google and other search engines factor them in when ranking your website, and unlike SEO hacks of old they actually are great indicators of the user experience once people makes it to your website.

Meta frameworks such as SvelteKit do a lot of work behind the scenes to ensure you've got a performant website, however there is a lot of work we still need to do ourselves! Thankfully the most common pitfalls take reasonable effort to avoid or fix.

## Optimising fonts

I’ve made a video [about the WHY and HOW of optimising fonts](https://www.youtube.com/watch?v=TKKpVlZRFLc)! Half is theory and general advice, the other is specific to SvelteKit, so give it a watch and come back so we can go through the steps together here too 😄

## Optimising images

Images are often the biggest assets on your website, both in filesize and screen-space!

Optimising them in SvelteKit is harder than in Next.js, which offers the built-in Image Optimisation with Vercel, but we can still do it. It's easier for "local" images, the ones we commit to version control, so let's start with those 📸
