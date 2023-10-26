---
title: '🍞 & 🧈: Magically load data with SvelteKit Endpoints'
snippet: 'Be great at the one combo I’ve never stopped being asked to do in my 20 years of Web & App development: Loading data & rendering it on-screen!'
youtubeId: f6prqYlbTE4
appUrl: https://techy.cat/
githubUrl: https://github.com/jmagrippis/techy-cat
publishedAt: Jun 14, 2022
---

# 🍞 & 🧈: Magically load data with SvelteKit Endpoints

## 🍞 & 🧈: The bread & butter of web dev!

Hello and welcome, I’m Johnny and you want to be great at the bread and butter of app development: fetching some data and rendering some UI.

This is THE technical skill to have as a frontend dev. It’s not reciting what’s a closure, it’s not the ability to calculate Big O notation off the cuff, it’s not even centering a div. Most of the time people will want you to get some stats, visualise them nicely in a dashboard, get an array of blog post snippets, render them in a list, get a single full blog post, show it all beautiful and responsive.

So today we’ll learn how to do that efficiently, with less code, using SvelteKit! Let’s go.

## The app so far & the need for dynamic data

Let’s say this is the product we’re asked to implement, an app featuring a free, curated, list of app ideas! Someone’s already done the homepage, and they’ve put the Header, Footer and base styling in a layout component, so what we need to do today is the fun stuff in the middle, we need to render a list of cards!

However, this ain’t 1996, so that list needs to be dynamic, we aren’t allowed to manually hardcode every idea we currently have, because then we’d need a code change and deployment whenever we come up with a new idea we wanna feature, or spot a typo.

## Creating a SvelteKit Endpoint

And whenever there’s UI that needs dynamic data, there’s a backend API it can consume to get it. With SvelteKit we can have a backend bespoke to our UI, in the same repo, by creating what’s called a Page or Shadow Endpoint.

So if we want this UI to be in the `/ideas` route, we need to create a GET Endpoint for it at `/ideas.ts`. Browsers do GET requests when we ask them to visit a link, so we need to export a `get` method to handle that request. We can type this method as a SvelteKit RequestHandler, and return an object with a `body`, a JSON body with a property of ideas.

SvelteKit will automatically make this response return JSON for us, if we put an object in the `body` property.

So we can see on the right when our browser hits `/ideas` now, we do indeed get a JSON response, and an empty array of ideas. And if we hit it the same way from the terminal, with a curl, we get the same thing: a JSON object with an empty array on the ideas key.

## Integrating with a data source

So, how do we get the actual ideas instead of returning a hard-coded empty array?

Well, it depends! If you’re implementing by yourself then it’s on you to decide where you’ll be storing your data… in a spreadsheet, a database, or wherever else. If you’re working with others maybe the decision has already been made and you need to integrate accordingly.

In either case, I suggest we create a helper method for this, and not put all of the data-fetching logic in the Endpoint file. We can create a `getIdeas` method, but this is one of the few cases where I’d suggest a class, so let’s create a `lib/repos/ideas.ts`... A class for `IdeasRepo`… And a `getAll` method which will be doing some magic, and returning a list of Ideas. This is a great place to define that type, let’s do that… As far as we’re concerned, an idea has a name, an emoji, a description and a slug, all strings…

Cool, so, it’s not important for this video to show what actually happens in `getAll`, how we may integrate with a Database or whatever, the important thing is that we can go back to our Endpoint at `routes/ideas.ts`, instantiate our IdeasRepo outside of the handler, and `getAll` ideas like so.

The important thing is we’re using a repo and a dedicated method to get the ideas, and you can imagine your own internals for what exactly happens behind the scenes in the IdeasRepo. Even if we change what’s happening in IdeasRepo, our handler here wouldn’t need to change, it’d always be awaiting to get all ideas like this.

However, if you hate imagining things, I did livestream my prep for this video, and we went with storing the ideas in Notion. This is the crazy implementation we ended up with for fetching data from the Notion beta API.

And this is what I’m actually doing now, fetching them from a PostgresDB I created with Supabase, using the Supabase REST client. I did try using Prisma to connect directly to that database and have that sweet type-safety Prisma provides, but I had problems deploying to Vercel. It is why I still suggest creating the `ideasRepo` and therefore the `client` outside the handlers, and why we may want to put our `ideasRepo` in the `locals` in our handle hook…

But, again, I don’t think what happens in these other files is important for this video, you may follow the link to the repo in the video description, so you may see the code up close at your own pace, check the revision history to inspect the Notion version…

But, in this video we’re learning about SvelteKit Endpoints, so the hero file is where we’ve defined the GET `/ideas` Endpoint, and it should look like this. Not too many lines of code, and now that we are dynamically getting the Ideas out of _somewhere_, we get them back as JSON when we hit that route on the browser. And here is the exact same response, when I curl `/ideas` from the terminal.

## Creating a SvelteKit UI Route

So, our SvelteKit endpoint is ready, what do we do with it? We said we’ll have our UI consume it, so let’s create some UI for `/ideas`! To do that, we have to create an `ideas.svelte` file. And you’ll notice that, even when it’s still empty, the moment I save that `.svelte` file, the browser will stop getting the JSON response! It’s rendering HTML!

We get our layout, so our styled Header and Footer, and nothing in the middle because our `ideas.svelte` has nothing, there is no HTML to put in this slot… so let’s add _something_ to make it a bit more obvious…

And it’s worth noting that if I hit our `/ideas` endpoint from the terminal, it’s the same story, I get HTML back, not JSON! So how can we go back to hitting our API again, get a JSON response like before?

Well, SvelteKit is being clever here, it will serve HTML by default when it can, so when we hit `/ideas` on the browser, we get the UI according to our `ideas.svelte` file. When we didn’t have `ideas.svelte`, it would look to `ideas.ts` to figure out how to respond. And without neither, it would 404 - Not Found.

So now that we have both, we get HTML by default and if we want our ideas in JSON form once again, we need to specify in our request that we’ll only accept JSON as a response.

We cannot have the browser add this Accept header, but we can do it through the terminal like so. This is important to know for when we wanna consume this `/ideas` Endpoint from anywhere other than its respective UI page!

So keep that in mind, we will explore that concept more later but, let’s focus on our UI again. From the design it looks like we want an unordered list, and a list item for each idea. Let’s open a script tag, write some typescript inside, let’s have an ideas array…

We’ll want to iterate through that array, and the way we do that in Svelte is by opening an `#each` block, then pass the array we wanna to loop through, and then `as` we get each individual item here, which we can even immediately destructure, so let’s take out the emoji & the name, and use them in our `li`…

Close off the each block with `/each`…

And that’s all well and good, but this is the critical point of this video, the app would crash if I save because `ideas` would be undefined, we can’t iterate through it as it’s not an array… yet. How do we populate this ideas array in our `ideas.svelte` UI with the ideas from the `ideas.ts` Endpoint we made earlier?

The answer is NOT by using fetch, the answer is in the video title, we’ll be getting these ideas with magic. If we export the ideas, they’ll become a Svelte Component prop, so if I save now… BOOM!

## What happened?! SvelteKit Page Endpoint magic

So what happened here exactly? Well, magic, but really it’s sufficiently advanced technology, let’s try to understand it.

Svelte components can have props by declaring a reference and exporting it; this has always be the case.

As an example, let’s make an IdeaCard component. We want some regular HTML, but also to have dynamic `emoji` and `name` props. My editor is underlining them as we haven’t defined these Component Props anywhere! We do that inside a script tag…

So my editor now knows what an `emoji` is, but is still flipping out about the `name`, so let’s declare that too… And remember, by exporting these, they become Component Props, so we can and should pass them in, wherever we use our `IdeaCard`!

Alright, let’s tweak our vanilla Svelte Component just a bit more, and go back to SvelteKit-land

In SvelteKit-land a component we put inside routes, becomes a Page Component, so a Svelte component with a few extra superpowers.

One of these superpowers, is that SvelteKit will look at the component props, all the `export let`s the component has, and see if it can pass relevant data from the corresponding Endpoint, if it exists. This is why these have been called Shadow or Page Endpoints, their purpose is to server the Page, the UI, behind the scenes.

Our `ideas.svelte` does have a corresponding Endpoint, `ideas.ts`, and wouldn’t you know it, it does return an `ideas` array in its json response. The key and prop names do matter here, it’s how SvelteKit knows which data goes where. If we changed either the key in the json body, or the prop name in the Svelte component, the magic would break. These need to match.

Now, keep in mind I don’t think all framework magic is good. I do like frameworks with opinions, I do like writing less code, but sometimes the magic is superficial, inefficient, extremely confusing to beginners, only really applicable to trivial cases, way different to standards we’re used to… and so on… In this case… I feel even though this is very magical, very bespoke to SvelteKit… I like it! Love it even.

## Styling interlude

But let’s let it settle for a moment, let’s take a styling intrelude, and then fetch data from our Endpoint in a different way, and see how that feels!

And yes, we are again using TailwindCSS here, so this is your cue to comment “I love Tailwind”, or “I don’t understand why people love Tailwind! Could the classes attribute BE any longer?”. Or, you know, maybe comment something more related to SvelteKit Endpoints… like, if you think this way of data loading with the Page / Shadow Endpoints is too magic, if you think it’s too awesome, if you’re excited to try it, if you’re confused... But anything goes really, engagement always welcome!

## Page, Shadow and Standalone Endpoints

Sweet, let’s call this page done, but now we wanna show a few of these ideas right on the homepage! The UI for our homepage is on `routes/index.svelte`, and let me stress that the most sensible way to get the latest 3 ideas would probably be to create a `routes/index.ts` file, and define another Page Endpoint there, that would be very similar to our `routes/ideas.ts`. Just like we did to sort our `/ideas` route out!

While on the topic of the Endpoints: Bespoke Endpoints made specifically for the frontend to consume, bespoke backends, are commonly called BFFs by the way, Backend For Frontend. And in Svelte discussions they’ve been called Shadow Endpoints, but currently in the docs you see no mention of that name, they’re just called Page Endpoints.

Standalone Endpoints would be those that don’t have a corresponding `.svelte` UI page, but are meant for anyone to consume.

I’m including this aside, even though I’m definitely more of a practical person: I dislike acronyms, I don’t split hairs between what’s a directory and what’s a folder, what’s the official technical term for whatever… but… I know some engineers really focus on those things, I know some interview processes are all about the keyword Bingo, so I hope this detour helps you follow more conversations on this topic, and tick a few more things off.

In that spirit, just so we learn a new option we have, we will not be creating a Shadow Endpoint for our homepage, we will instead be consuming our `/ideas` Endpoint as if it were a Standalone Endpoint, by using a SvelteKit Page Component `load` method.

## Loading UI data with a `load` method

The concept is similar to what we did for our `ideas.svelte`. Our `index.svelte` file will be exporting a prop that something else will populate by magic. Let’s say it needs the `latestIdeas`, and we’ll be iterating through them in the HTML here.

When we save and refresh, we will get a crash, because `latestIdeas` will be undefined. We need some magic to populate it.

But instead of this being magically populated by a GET Endpoint we write in `index.ts`, it will be magically populated through a `load` method we’ll be defining right here in `index.svelte`!

However, we’ll need to export this method for SvelteKit to be able to run it anywhere, and in order for that to happen, we need to define and export it in a separate script block, with `context="module"` defined. We may type this as a SvelteKit Load method, and it’s kinda similar to the `get` Endpoint RequestHandler we’ve made, it needs to return an object that can have a status code, only instead of a `body` it has `props`. Which is a direct reference that whatever we return here, will be populating Component Props.

So if I return in these props an empty `latestIdeas` array, at least our UI doesn’t crash, it’s just that we’re iterating through 0 Latest Ideas.

So how do I return the actual latest ideas? We’ll need to do an API request, and it’s important to use the `fetch` SvelteKit provides to our `load` method, which ensures smooth operations regardless of whether SvelteKit needs to run this server-side or client-side. The browser, client-side, has had the Fetch API for ages, there are still hacks that need to happen to make this available on the server.

The url we wanna fetch is the `/ideas` endpoint, so we may await that response, and have a sanity check whether we got an OK response, if not return the bad status code we got instead...

If we make it out of this block, the response is OK, so we wanna to parse that JSON, and destructure the `ideas` out of it. However, you may remember this Endpoint returns HTML by default, not JSON! So this would crash again! To have `/ideas` return json, we need to pass some headers… so let’s create some with the Headers constructor, we need to specify we’ll be accepting `application/json`, thank you very much.

So now, we will be getting back json, we will be getting back all of the ideas, and rendering them in our new section!

## Query params on page endpoints

But we don’t actually want ALL ideas here, we only want 3 of ‘em. And we could just slice the response array, but that’d be a waste, fetching ALL ideas over the wire to only use three. So it’d be better to extend our API, and make it work with a `limit` query parameter, so ideally we’d want to hit `/ideas` with `limit=3` and we’d that to result to just 3 ideas being fetched.

Let’s make that dream a reality, let’s go back to our `/routes/ideas.ts` and our GET handler, SvelteKit passes the `url` as an argument to destructure, so we can say that our `limit`, is going to be whatever we get from the `url.searchParams` for `limit`, or let’s say 50. And both of those have to be strings, so we can parse them as integers.

And then we can pass that limit to our helper method, which will do whatever our imagination says it will with it, in order for it return only 3 results. Tada!

When we visit our `/ideas` page, it still has all of them as before because they were under 50, but we do get an unintended bonus: if we manually add the query parameter here for `limit=7`, we will only see 7 ideas… … or just 1, or however many we specify as the limit. So SvelteKit will magically pass the url and all its searchParams when it’s using this as a Page / Shadow Endpoint too, it’s not a bug, it’s a feature to keep in mind.

## Server-side vs client-side?

Something more critical to keep in mind is that SvelteKit will run all of this magic Server-Side or Client-Side according to the situation. According to what it thinks is best. As it stands, and as I understand it, when someone first hits our app it’s all gonna be server-side execution, and then we switch to client-side for pre-fetching magic and an app-like navigation and feel and all that.

This does mean that whatever you put in the `load` method may run on the client, so DON’T PUT SENSITIVE environment variables here! Don’t use your FIREBASE ADMIN KEYS and whatnot here, neither directly in the `load` method, nor in the methods that `load` itself runs, as you will leak them! Watch out.

It’s fine to fetch from Endpoints that use them, Endpoints always run on the server, so if you’re worried about leaking sensitive keys and getting haxxxed, you can even always use the Page Endpoint magic as a rule, and then never have to worry about that sort of thing.

## Route Params

Alright, one final thing, how do we use dynamic route parameters here? You’ll notice in our With Svelte app, you can go to a lesson `slug` and see the whole thing. We have the list view like our ideas, but we also have the detail in a dynamic route.

We can replicate that for our ideas, by creating a `/routes/ideas/[slug].ts` file, note the brackets around slug, they’re important. This is what’s telling SvelteKit this isn’t literally gonna be “slug in brackets”, but something dynamic we’d want to capture as a parameter.

So now we can export a `get` RequestHandler as before, but this handler will magically be given `params` to destructure, and because we’ve named the file `brackets slug`, it will be populating the `slug` property. So if our `ideasRepo` has a helper method where we can `find` ideas based on a given slug, we could do this…

Typescript isn’t happy though, as it doesn’t know `slug` will be defined! We can type this ourselves, by saying our RequestHandler will be getting a `{ slug: string }`, however there’s some hot off the press SvelteKit magic here too. In recent versions SvelteKit has started auto-generating type definitions for these, so instead of importing the generic SvelteKit `RequestHandler` we may import the one specifically for this route.

We do that with `import type { RequestHandler} from` and this is the crazy part, `./`, relative to the current directory, `__types/[the-name-of-the-file]`, so “bracket slug” for us here. I won’t go into detail on how this works, it is Typescript magic related to specifying the `rootDirs` and it may change again, but it should be something there or thereabouts whenever you’re watching this in the future.

The great news today is Typescript is happy and it will protect me if I decide this should be `id` and not `slug` one day.

Cool, so we if we hit that endpoint with `ground-to-perfection`, we do indeed get that idea with that slug, if we hit it with `BlipBloop` we get that idea back, and so on. Awesome!

## Next steps + Comment & SUBSCRIBE

I leave it as an exercise for you dear viewer on how we’d render the UI for this, a great way to reinforce your learnings! List & Detail views will always be great to know how to do, and on that note, Next.js recently released a Request for Comments on how they see their new Layouts logic working… People are excited, I’m excited…

And I think we can do this well already with SvelteKit, so maybe that’s an episode you’d like to see soon? Let me know, in the meantime we do lots more backend stuff with Endpoints in this video, and YouTube also suggests you go through this one! Thanks a bunch for watching, see you around!
