---
title: ChatGPT-4 with SvelteKit 🤖 Generative AI on the EDGE 🌍
snippet: Let’s use ChatGPT to create a next-gen app to share with friends for FUN, and impress potential colleagues and employees for PROFIT 😄
youtubeId: Uw5GZg96kD8
appUrl: https://hellothere.cat/
githubUrl: https://github.com/jmagrippis/hello-there
publishedAt: Apr 17, 2023
---

# ChatGPT-4 with SvelteKit 🤖 Generative AI on the EDGE 🌍

Hello and welcome, I’m Johnny and **you** wanna integrate with the hottest of hot tech. You want to work with generative AI, so, today, we’re gonna use ChatGPT-4 with SvelteKit.

On my livestreams, we’ve been building an app which picks a random emoji every day, then “asks” a famous fictional character for a quote! Users may ask characters for content creation advice as well, you can ask Geralt how they’d make a TikTok about Guide Dog 🦮, ask Spider-Man how they’d make a Video Game about 🚕.

Today we’ll build a brand new, next-gen “Hello World” app. The app will get the user’s name from the url, so we can share pretty links to friends, and ask ChatGPT to greet that user on our behalf, as if ChatGPT were a Principal Software engineer who hates gate-keeping but loves mentoring, video-games and puns!

And if you’re thinking, “Johnny, this isn’t the industry-disrupting application of AI everyone is dreaming about”…

A: It is solving a real problem, literally no human can come up with puns about every possible, existing and future name in the world… and my greetings’ gotta have unique puns!

B: It does make for a cool “calling-card” portfolio site: something you can proudly showcase for fun & profit!

And, C:, as always, the main point of my videos is to teach & inspire… We will encounter quite a few SvelteKit, OpenAI, caching & deployment intricacies building this together, so… let’s get to it!

## Starting point & goals overview

Our starting point is essentially the skeleton app we get by running the SvelteKit wizard, plus a couple of my classics… Tailwind setup, toggle-able dark mode with CSS variables, a layout for a universal Header and Footer…

But absolutely nothing related to OpenAI or Chat-GPT, we’ll be covering all of that functionality together, so you can learn to do this yourself, for your own work, your projects, your ideas!

The idea here is to first make our greeting slightly custom, like “Hello there, Fernando”, and then use AI to make it truly personalised, based on how I’d greet a Fernando in the workplace: Like, “Hey there, Fernomenal! I saw you deployed some phenomenal code with that latest PR! Keep it up 😄”

After we’ve deployed our code, we should be able to copy & paste a url like [hellothere.cat/fernando](http://hellothere.cat/fernando), send that to any Fernando around the world, and they can immediately open it up and see a unique greeting!

But if we go to /fernando on our local dev server now, we’ll get a 404, not found error, since we have yet to define that route.

## Capture the name with SvelteKit Routing fundamentals

We’ll do that now! With Sveltekit, in order to define any route, we need to do something special in the `src/routes` directory. Our homepage is right there at the root, but what we actually want is to capture the user’s name as a route parameter.

To do that, we need to create a directory with magic brackets, so `[name]`, and put a magic `+page.svelte` inside it, so let’s drag and drop our homepage file there. Instantly, `/fernando` route resolves, as well as `/johnny` and literally any other path without further slashes.

However, we’re still not doing anything with that `name` param, for that we need to create one more SvelteKit magic file, `+page.server.ts`. This will run on the server and can load data we want our UI to use. For that, we need to export a `load` method which satisfies the typed contract `PageServerLoad` our dev server has automatically created for us.

Thanks to that contract, we can see that this method gets given an `event` object we can destructure, and we wanna make use of its `params`. And if all the Typescript fluff hurts your eyes, here’s the benefit: thanks to the Typescript boilerplate, we do know for sure that `params` has a `name` parameter, based on how we’ve named our directory. If we change the directory to `[firstName]`, Typescript will know and protect us from runtime errors.

We will be using `name` for now, but I know I’ve spent tons of hours debugging things like that: naming things is hard and sometimes you flip-flop between `slug`, or `title`, or `date`, or whatever else.

In any case, we wanna use that name in the UI. In fact, let’s have the server tell the UI the whole greeting! So "const greeting = `Hello there, ${name}! Looking good 😄`". Let's return our `greeting` inside an object, so our load method returns`{ greeting }`and now our UI, our`+page.svelte`can have a script tag… where we can`export let data`, type _that_ with another automatically generated type… and we can see the `data`object has our`greeting`inside of it… let’s render it inside our`p` element… Awesome!

If we go to different routes, we can greet Johnny, Alison, Bryan… But in our homepage, we’ll now be getting a 404. This may be fine if you want to have a dedicated route for the homepage, but for us we may make the `name` parameter optional by adding another pair of brackets in the directory, so `[[name]]`. So now the page renders, but `name` is undefined, classic… to resolve that, we go back to our `+page.server.ts` and tradition means we have to default `name` to “World”.

So we’ve got a fun little “Hello, world!” app ready to deploy, this is already the point where some bootcamps would give you a digital certificate and bid you adieu, but… for us… This is where the fun begins, this is where we take it to the next level and bring in OpenAI!

## Getting an OPEN_AI_API_KEY

OpenAI is the company behind ChatGPT and Dall-e, and if you’ve seen some cool AI stuff recently, it’s quite likely they were using ChatGPT or Dall-e behind the scenes. In order to get in on the trend and use their APIs, we need to create an account!

It’s worth noting OpenAI does **not** offer a free tier for using their APIs, but **does** give new accounts $5 worth of tokens, which should allow us to experiment enough to add “Generative AI” in our CV.

So, once we’re signed-up and logged-in, we can go to https://platform.openai.com/account/api-keys; one way to get there is by clicking our username on the top right for the dropdown menu, then “View API Keys”.

In this page, we wanna “Create new secret key”. This is indeed **secret**, so **never leak it, never show it to anyone**. If you ever even think you’ve leaked it, like I’ve just done by showing it now, immediately trash it, so no-one can use it.

API keys are a common way to identify who is trying to use an API. Sometimes they’re classified as **public**, and for those it’s fine if your app’s users can find them, they won’t be able to abuse them, sometimes they’re **secret** and you must never, ever, let anyone else find those.

Secret API keys have more powerful privileges, like using up your tokens and money, closing your account, retrieving your billing details, so, again, **don’t leak’em**.

Don’t be afraid of them though neither, we do need to use one now, and the way we do that with SvelteKit, for local development, is by adding it to our `.env` file. Create your own `.env` if you don’t have one already, and add `OPENAI_API_KEY=` whatever we copied.

## Writing an OpenAI helper method, to create a chat completion!

This makes `OPENAI_API_KEY` available throughout our SvelteKit app as a secret environment variable, so we can now make authenticated calls to OpenAI! And, as a final security measure against leaking our secret api key, we’ll be adding our `openai.ts` inside the `lib/server` directory: `lib/server` is yet another SvelteKit magic name, SvelteKit ensures nothing in this directory can ever make it client-side, it cannot make it to our users. That’s important, because if users could see the request we make to openai, they would be able to see our API key too.

Alright, so in this file we wanna write a new method, `createChatCompletion`. This corresponds to this section of the OpenAI API docs, which details how we can give ChatGPT prompts and get messages back!

We need to hit this url, which we’re gonna do with a `fetch` call. So let’s fetch `https://api.openai.com/v1/chat/completions` and we also need some options, the method has to be `POST`... and, in order to authenticate, we also need some headers, we need a `Content-Type: 'application/json'`… and also, we need an **Authorization** header, which will have **bearer token**, our `OPENAI_API_KEY`. You can see how we import this with SvelteKit magic from `$env/static/private`, as it is indeed a private environment variable, we don’t wanna leak it, and static, we wouldn’t change it without a fresh deployment.

Alright, method & headers are sorted, “Create Chat Completions” also takes some parameters, so we need a body, and we can stringify a JSON object. There are quite a few parameters you may want to tweak here, but for us now the defaults are fine, and the only two things we need to specify is the `model` string and the `messages` array.

For the engine `model`, I do have beta access to the latest and greatest, `gpt-4`, so that’s what I’ll be using; maybe you’ll need to use `gpt-3.5-turbo`, maybe you’re from the future and wanna use `gpt-order-66`, consult the docs if you’re unsure what’s available to you.

For our `messages` array, we’ll only be putting in one message at the moment, it’s going to be a user message, `role: 'user'`, like what we’d type in the ChatGPT playground. So, we can actually try out something here, for free, and see if we get a decent greeting back! As a user, we can type “Please respond as if you just saw Johnny dropping by, and you wanted to greet them. Make sure to include a pun!”

So that prompt should work, it can be our message `content`; but, of course, we don’t want to hardcode the name! We have our method take a `name` string, and use it in the template literal.

And with that, our `fetch` request should be solid, and we’ll get a great response back! We can sanity check whether our response is indeed ok, or else throw an error… if it is ok, we can parse the json we get back.

According to the docs, it’s going to be an object like this but this ain’t GraphQL, so if we really want to Typescript things up, we can write our own type based on the example, create a type guard, `isChatCompletion`... This receives… who knows what… checks whether it’s an object, and then, for simplicity’s shake, whether it’s got a `choices` array with at least one element, which should be an object with a `message` property, which should have a `content` property. If all of that is true, we’re gonna say… this json is indeed a… Chat Completion.

If all of this looks crazy, remember: you don’t really need it; and, it corresponds to this: choices→message→content. If we are indeed hitting this endpoint properly authenticated and with a legit model and a good prompt, this `content` will be the greeting we want!

So, let’s use our type-guard, if our json is legit we return… the first of the choices, array index 0, we’ll only be getting one anyway because `n` defaults to 1… we want its `message.content`.

## Let’s create a chat completion! 🎉🎉🎉 FIRST WORKING DEMO

Which brings us to the moment of truth, this file looks legit, our method looks excellent, let’s go back to our `+page.server.ts` and use it! Where we have our mostly hardcoded greeting, like savages, we will instead `await` our `createChatCompletion` method, passing in the `name`...

And if we save… 🥁… TADA!!!

Fernando, consider yourself… greeted. And let’s hit me up too. Love it! You may now update your CVs, next-gen AI integrations are go.

## Fine-tuning and more flavour with system prompts

I’m totally serious about this, and if a gate-keeping engineer tries to second guess your experience, tell ‘em… “just a POST request, innit?” And to **really** impress them, let’s dig in slightly deeper and do something I bet lots of engineers who **have** worked with ChatGPT, or previous language models… have missed!

At the moment, we’ve got ChatGPT responding as its vanilla self, as an AI language model. But we can add more flavour to our responses by starting our request with a `system` message. In our messages array, before our `role: 'user'` message, let’s add a `role: 'system'` message. The effect of system messages is downplayed by the docs and earlier models, but is very much hyped in the Lex interview with Sam Altman.

And, it has given me great results in the Emoji of the Day app, helping ChatGPT-4 impersonate the fictional characters better. So, if you plan to use what we’re building today for **your** portfolio website, maybe you’ll want ChatGPT to pretend that it’s YOU! So maybe add a `system` message like: “You are Bryan, an charismatic software engineer with a great taste in YouTube videos. You love problem-solving, puns and ponies. Please only respond as Bryan.”.

## “Flavoured” greetings 🎉🎉🎉 DEMO

So let’s greet Fernando again, this time, as Bryan, see what we get!

See the difference? You should tweak the `system` message to taste, and you may also tweak the `user` message; as always, I do have my code open source and free on GitHub, so you may check out what I’ve ended up with… but, between you and me, it’d be a bit silly to copy my messages exactly. If you gotta copy & paste my whole repo, at least change those; you will come across cooler, if the resulting messages feel more personal to you 😉

That said, let’s greet Alison as yours truly… and what if I greet another Johnny?

I could play with this and different names & prompts forever, but I will call it now, you can always knock yourself out at the live site!

## The official client and deployment on the EDGE

Speaking of the live site, wherever you deploy to, don’t forget to make `OPENAI_API_KEY` available there as well… and also potentially in your CI step. Personally, I deploy to Vercel and **always** forget to add the environment variables there as well, and get a build error… but I do eventually manage to make it to the settings/environment-variables page and sort things out.

Another thing to keep in mind is that I’m deploying on THE EDGE, which is another trendy thing to do; and, like ChatGPT, it is trending for good reason, THE EDGE is a more lightweight runtime than full node, so it’s faster to run and hosting providers like Vercel make it available in more regions, for cheaper, while allowing them to run for longer. This is especially important working with `chatgpt-4` now, as the requests do take a while to resolve, a regular, “serverless”, function may actually timeout before we get a response back.

Deployment on THE EDGE is also why I didn’t use the official `openai-node` library. They’ve still got a hard dependency on older `axios` for their http requests, which does **not** work on the EDGE runtime. SvelteKit injects a version of server-side fetch that does work everywhere, which is why our http request works perfectly.

## Save time & money, with caching!

Speaking of, those fetch requests do cost time and a little money every time they happen. To make our app more usable **\*\***and**\*\*** less eager to burn through our tokens, we should take measures to need as few requests to OpenAI as possible. As it stands, every time we reload the page, we do a fresh request to OpenAI, which both takes ages **and** costs us a couple pennies. So even if we keep greeting the same person, we keep asking for a new greeting.

The quickest way to band-aid this would be by adding HTTP caching to our app. We can do this by adding a `cache-control` header specifically in our `load` method in `+page.server.ts`, or maybe throughout our whole app, with our `hook` file and `handle` method. Either way, with a `cache-control` header set, the first time someone visits a new path, like `/maria` … will be exactly the same, the OpenAI request will happen behind the scenes, take ages and cost us money… **but**, every time after that, we’ll be instantly serving the same HTML, “for free”.

However, infamously, cache invalidation is one of the hardest things in engineering, so, even if it’s tempting to cache for years, I suggest keeping `max-age` low… until you’ve gotten at least a little feedback on your deployed app. And, if your app does go viral somehow, even a 5-minute cache will make all the difference.

## A more elegant way to save time & money, with a DB!

If you’re looking for a more elegant solution, it would be sweet to add a database layer to the app.

I’m leaving this as homework, so I will be breezing through the code: we can still have an HTTP cache as discussed, but, we can also tweak our `+page.server.ts` to first query a database for whether we’ve already got a greeting for a given name. No matter if that database is Redis, or Supabase, or whatever, getting a record from a database will **always** be faster than the OpenAI call to create a new chat completion.

If we don’t get a hit from the database, only then we’ll ask ChatGPT for a greeting, and we’ll make sure to persist that greeting in our database before resolving our request. That way, anytime anyone requests that name again, we get our greeting faster, cheaper.

Plus, this allows us to preemptively seed a few greetings for our favourite names, check back every few days to see what type of names get requested, what greetings the AI generated… We could even tweak the responses, right there in the database! After all, AI generation + human curation is **the** fire combo at the moment.

## IT WORKS 🎉🎉🎉 FINAL DEMO

So, if we’ve got a chat regular like `offenee`, they can get their AI-enhanced greeting almost instantly! Woohoo!

## Next steps + comment & SUBSCRIBE

Again, I honestly believe this app’s got legs, it’s a great learning experience already with the stuff we’ve covered in this video, it’s fun to share, and still has room to put your own spin on it!

For one last suggestion by me, if you’ve already got the DB sorted, maybe a random greeting button would be fun!

Additionally, you can implement a feature that allows users to rate the generated greetings, providing a feedback loop

Or, maybe, this look into working with OpenAI got you inspired to use ChatGPT for something else entirely! Please do, this is **the** time to go for it, and I’d love even more brilliant people in that space. And yes, you are brilliant! Thanks a bunch for watching, see you around!
