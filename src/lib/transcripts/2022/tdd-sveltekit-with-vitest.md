---
title: TDD SvelteKit 🧪 with Vitest
snippet: Let’s use Test-Driven Development and test our SvelteKit app with VITEST! Blazing-fast tests, to go with our blazing-fast bundler 🚀
youtubeId: 5bQD3dCoyHA
appUrl: https://vitest-with-sveltekit.vercel.app/dashboard
githubUrl: https://github.com/jmagrippis/vitest-with-sveltekit
publishedAt: May 11, 2022
---

Hello and welcome, I’m Johnny and you want to test your SvelteKit app with Vitest!

The most popular framework to test Javascript... JEST, and I love Jest, but its biggest drawback is that we have to configure it separately in order for it to understand the files we’re testing.

If we’re using unreleased Javascript features we may need to bring in `babel-jest`, if we’re using Typescript we may need `ts-jest`, if we’re importing svgs we’ll need to stub them...

Bundler configuration may be the most unpleasant part of web development and we have to do it twice if we wanna have this sort of tests?

What’s worse, the separate configs mean we’ll have less confidence in our tests to begin with, because it’ll be on us to ensure how we’re configuring our tests accurately reflects reality!

That’s the drawback Vitest aims to eliminate. If you’re using Vite as your bundler, which you are if you’ve gone with SvelteKit, Vitest can run with the exact same config, it will also use Vite to transpile your files for your tests, the same way as Vite would transpile your files for the production deployment. So, we’ve got tests that are more in-sync with reality, with less config to maintain.

It’s not ZERO config tho when it comes to SvelteKit, so let’s get to it and set things up!

## Setup for a unit test

Let’s bring in `vitest` with `npm install -D vitest`, and while that happens let’s say we wanna create something like this revenue dashboard screen, and focus on these elements that show some formatted currency numbers. Let’s start by writing a helper method to format currency!

Let’s create a `lib/formatCurrency.ts` file, and write a named export with the same name, that does nothing. We do know that it will be receiving a value as an argument, that value is going to be a number, like 1, 42, 5 billion...

Cool, let’s write our first test, let’s collocate a `lib/formatCurrency.test.ts` test file. Here, we need to specify what our code does, what `it` does, and what we `expect` to happen. So let’s bring in `it` and `expect` from the `vitest` library we just installed, and now we can say that our code, `it` adds the pound sign before the given number.

Then we pass a fat arrow method, and in its body we add all the setup and expectations we want.

For this test, let’s say that the `result` of calling our `formatCurrency` method with `1`... we `expect` the result to be `£1`.

And now we can go to our `package.json`and specify our test script: all it’s gonna do is run `vitest`. So now, we can go to our command line and execute `npm test`. We can instantly see we’ve got a failing test, and this will run `vitest` in watch mode, so it will keep rerunning every-time our files change. You can see this re-running every time I save! And you can’t really feel it when it’s just a single tiny test, but another reason to use Vitest is that, much like Vite, it is indeed superfast.

So let’s go to our implementation, and the simplest way I can think of to make our test pass, is to literally hardcode `£1` here, and if I save we see green, the test passes!

People sometimes get upset when I do this, but hardcoding the solution is the first step of Test-Driven Development, so if you’ve put TDD in your CV, you better believe I’ll want you to start like this. You gotta go for the simplest solution you can, until you’ve got a failing test that forces you to increase complexity. Or you can say you don’t do TDD, that’s also fine.

So, let’s get us back to red, let’s change this to `resultA`, and introduce a `resultB` which will be what happens when we pass `42` to our method, we expect that to be `£42`... Cool, we’re in the red again, we can go back to our implementation and finally use the given value as a placeholder in a template literal and... Back to green!

## Setup for SvelteKit

So it may feel we’re done and we’ve managed to setup Vitest with zero config indeed, but SvelteKit does some magic that `vitest` is not aware of! You see, the way `vitest` works by default, is it will look for a `vite.config.ts`. However, there is no such file in a SvelteKit project, there is a `svelte.config.js`, which exports a config object that can have a `vite` property.

The object we pass here will get merged with SvelteKit’s own options, which do trivial things like alias the `lib` directory to `$lib`, and super important things like configuring how to parse .svelte files! But vitest can’t see all of this setup by default, and the most obvious way to showcase how that’s a problem, is to create a Svelte component!

Let’s say we’ve got a `CurrencyStat.svelte` component, in its script tag we can say it takes in a value, which will be a number, and it returns it inside a div. But, it returns it formatted using our new utility method, which we import using the magic `$lib` path alias.

Let’s quickly create a route to render this component, split screen the browser window on the side here to see that it does indeed work IRL... but now let’s write a unit test for `CurrencyStat`, so let’s create a `CurrencyStat.test.ts`.

Let’s import `it` from vitest again, and say “it... displays the given value formatted as currency”, and if we save with no expectations or anything, you can see we have passing green tests... but the moment we import our CurrencyStat...

We can see the test flipping out because of invalid JS syntax! Again, that’s because our Vitest is currently using Vite in a different way that our SvelteKit app.

## **vitest-svelte-kit**

So the situation we’re in really is the problem with Jest we mentioned in the beginning, “real life” uses one config, our tests are using another! The way to use the same is by using a library called `vitest-svelte-kit`.

So let’s kill our test process and npm install dev dependency `vitest-svelte-kit`... And now we can create a `vitest.config.js`, import `extractFromSvelteConfig` from `vitest-svelte-kit`, and default export the result of calling that method. This will extract the vitest config we want based on what our `svelte.config.js`, so if we start our test process again, you see it passes.

However, we’re still not done, remember we’re not actually testing anything here, there’s a couple more libraries we need to bring in to test Svelte components.

## Setting up svelte-testing-library and jsdom

Now, you can test Svelte components without `svelte-testing-library` but it is quite unpleasant, and I’m a big fan of everything Testing Library anyways, as I do believe its selectors do help us write better tests that avoid implementation details... so let’s go ahead and bring svelte-testing-library in!

Back to our terminal, let’s `npm i -D @testing-library/svelte`...

And now, in our test we can import `render` from `@testing-library/svelte`, so inside our it block we can `render` our CurrencyStat component with some props, let’s go with a `value` prop of `123`.

But immediately the test will crash, because `document` is not defined. vitest is a node process, it doesn’t run on the browser, so we gotta bring our own “simulated browser environment” if we want to test things like UI, like our Svelte components.

Vitest recommends `jsdom` or `happy-dom` for this, let’s bring in `npm i -D jsdom`, which achieves nothing by itself, as we also need to specify in our vitest config that we wanna use the jsdom environment. But how, where?

Well, the where can be in `vitest.config.js`, but given we’re “extracting from the svelte config”, it’s probably best to go to our `svelte.config.js`, and in that vite key, add the test key, which can take all of our vitest configuration, and specify `environment: "jsdom"`. If we restart our tests, document will be defined and our tests will finally run as expected!

So if we were fake TDD-ing this component, let’s say we started by using the value unformatted... and in our test, `render` returns the handy Testing Library selectors, so we destructure `getByText`, and use it to try and find `£123`.

But this fails, and we get the helpful DOM printout to see it’s because we’ve rendered the value without the pound sign in front, so if we go back to using our `formatCurrency` method, our tests are happy.

## jest-style globals and extended matchers

At this point, we are indeed testing SvelteKit with Vitest, we don’t need anything more really, but if you come from `jest` you may be used to `it` and `expect` being globally available so you may use them without importing them; and if you’ve used `testing-library` before, you may have enjoyed the extended matchers like `toBeInTheDocument`.

We can have the same experience with `vitest`, we can pass the `globals: true` option, and to keep typescript happy we should also install the `@types/jest` to let it know we’ve got the “jest compatible” matchers available.

As for the extended matchers, we can `npm install -D testing-library/jest-dom`, create a `src/setupTests.ts` file and import `@testing-library/jest-dom/extend-expect`. This will overload the `expect` global with the bonus matchers, all we need is to go back to our test config and say we’ve got a `setupFile` for you, it’s in `./src/setupTests.ts`. This can be an array, that’s why the key is plural, but that’s by the by, the point is we can now use things like `toBeInTheDocument`.

Which doesn’t excite me to be honest, but matchers like `toHaveValue` and `toBeChecked` are very nice indeed!

## Vitest VSCode plugin

Speaking of things that are nice, there is a handy VSCode plugin for Vitest, if we bring that in, we can see the test feedback right beside the `it` blocks, which is I always enjoy, however it doesn’t have my number #1 feature which is re-running the tests on save, you’ve got to manually trigger them!

Which is fair enough, there’s an open issue for it, maybe someone can help!

## tsconfig.json error and Continuous Integration

Alright, one last note before getting back to TDD-ing, if you’re using typescript you may get this error: For now, SvelteKit sets up typescript by creating a `tsconfig.json` which extends one generated in our `.svelte-kit` directory. However, that directory directory only gets created if we’ve run `npm run dev` or `npm run build`, and it’s of course not committed to source control... so if you’ve just checked-out a SvelteKit repo, this won’t exist!

Running either of those commands resolves that problem, so if you’ve got your Continuous Integration running your tests, it will fail if you haven’t built first, so what I’ve done with my Github Action is to run the build command right before the test command.

Maybe not the most elegant thing to do, maybe you’re supposed to have the build step separate and reuse the artifacts or something, but, hey, it works, so it’s good enough for me!

## When to Vitest, when to Playwright / Cypress?

Cool, with all of that out of the way, we can finish implementing our spec, but the question is, should we be unit-testing the `formatCurrency` method, or the svelte component, or both? Should we just be testing the dashboard component that will be showing all 3 formatted numbers? Or even, should we be testing the dashboard page with a tool like Playwright or Cypress instead of Vitest?

The answer is the usual “it depends”, you can argue for any combination, but I do think having essentially the same tests for the `currencyFormat` method and the `CurrencyStat` component would be silly, so only test either of those. And as good as `testing-library` is, testing a component is clunkier than testing a plain’ ol’ javascript method, so I’ll keep my spec here, I’ll only thoroughly test `currencyFormat`.

If your stat component has more complexity than mine, and it’s the only thing using `currencyFormat`, maybe you’ll want to test on that level instead.

On the Vitest vs Playwright or Cypress front, Vitest, or Jest for that matter, any node test runner, will always be faster than any tool which runs an actual browser, so I do prefer having the more thorough tests covering all the edge cases in Vitest. Unless the functionality we wanna test is fundamentally based on browser features, like drag ‘n’ drop and file uploads.

And in any case, you do need some more integration-y / functional tests to prove you’ve set the units up correctly, so I would have a “happy path” Playwright test for the dashboard page that would be checking the page header, the navigation and whether I am getting those 3 numbers we care about.

However, this is the `Vitest` video, so let’s keep it all in that ecosystem for now, we’ll test the `Dashboard` component we’ll eventually create using `Vitest` and testing library.

## Finishing the spec

Alright, what remains really is adding commas for readability when the numbers get big, so let’s say we want 1234 to actually contain 1,234. And the relatively new International, NumberFormat, has made implementing this much easier; I honestly thing using it is simpler than manually counting digits to figure out where to splice in a comma or whatever, so I will escalate the complexity to this, and bam, consider the spec done!

So now let’s create our Dashboard component, let’s test it’s got the correct heading... And now, if I pass it some props for balance, revenue, pending...

Can I find the balance... can I find the revenue... can I find the pending...

## Design and chill

Cool beans, our automated tests say we’re done, but we still got the eye test to go, this is a design only an engineer could love for sure, so let’s spend a bit more time gridding things up...

A bonus if you’ve got Playwright set up is that it’d be a bit easier to do some screenshot / visual testing, but let’s be honest, this will never be automated, whenever you’re implementing the first pass of something, you’d need to contact an actual human to get the all clear.

## Next steps + Comment & Subscribe!

Sweet! I can sense the audience retention has been sufficiently obliterated so super special thanks to you for sticking around! You may want to keep going with this video where we setup Jest and React Testing Library with Next.js, contrast and compare, and YouTube thinks you’d also enjoy this one. Thanks a bunch for watching, I’ll see you around.
