---
title: HTML Video Backgrounds 🎥 (featuring SvelteKit & Tailwind)
snippet: Let’s add a chill VIDEO BACKGROUND in our hero section, using the vanilla HTML video element!
youtubeId: 9yAStvszXh8
appUrl: https://moving-scapes.vercel.app/
githubUrl: https://github.com/jmagrippis/moving-scapes
publishedAt: Mar 6, 2023
---

# HTML Video Backgrounds 🎥 (featuring SvelteKit & Tailwind)

Hello and welcome, I’m Johnny and you want an eye-catching video in the background of your website. Everyone wants something cool for their HERO section, and putting a chill video there has been popular for a few years now.

The latest trend is probably animations that give a stylised, romanticised look at using the product, but I still get clients asking explicitly for video backgrounds… which makes sense, we are in the age of social media after all.

It is also the age of being conscious about performance, about how much stuff we force our users download, so we’ll at least be avoiding gifs today. Gifs are much easier to setup as backgrounds, but they also have much bigger filesizes for worse quality, so, no thanks.

We will be using the `video` element instead, we’ll be utilising vanilla html and css techniques, but we will be implementing in SvelteKit, because I love SvelteKit, and Tailwind, because I love triggering people who hate Tailwind!

## Building the container

Alright, so we want a nice big hero section right at the top of the page. It’s going to have our video, but also, on the foreground, our company name, or motto, or a call to action, a big button that has the user do something important.

For our purposes let’s add a company name, let’s put it in an `h1`... and a `button`, if the user clicks on one thing on this page, we want this to be it!

We’ll make these look nicer in a moment, but first let’s take over most of the user’s screen with our hero section. I’m going to add a bold background to highlight what we’re doing. Our bold background starts as big as our section, which is as big as its contents.

So, to take 80% of the user’s viewport, we can use the Tailwind class for setting an element’s height with an arbitrary value, `h-[80vh]`. Viewport Height. Now, in this particular website, our section is inside a flex container, so we need to specify that it should never shrink, with `shrink-0`, and only then the browser will actually respect exactly how tall we want this element.

We may use different values here, we could go full-screen, but I like leaving a bit more space at the end, so the user has a sneak peek at what’s coming, if they were to keep scrolling.

Let’s make our section a `flex` container, with a direction `column`, align items in the centre horizontally with `items-center` and vertically with `justify-center`. All of this to center our text, bonus practice for our next front-end interview which will inevitably ask us to center a div… Let’s make our text bigger as well.

## Adding the video element

Cool, we’re at the moment we’ve all been waiting for, let’s get our eye-catching video in the background of our section! Let’s add a `video` element, you can see our eslint accessibility rule immediately complains that we haven’t provided captions, but that’s alright because we’re gonna add the attribute `muted`.

Our video should be without sound anyway, but `muted` also allows us to `autoplay`, some browsers and plugins rightly block autoplaying unmuted video, so we need to specify that for safety, and we’re also going to `loop`. These are the important attributes, but we’ll also be adding `playsinline` and `disablepictureinpicture`, to hint to the browser we don’t want fullscreen nor PiP, for this video.

Sweet, time to add the sauce, we have a few options here but we’ll go for statically hosting our video, and with SvelteKit this means we’ll need to drop it in our `static` directory. So, let’s do the ol’ drag & drop…

And we can now, we can add a `source` element, which will have a source `src` attribute, pointing to the file we just drag and dropped, it will be at `/hero-bg.webp`... And we’ll also specify its mime type, it’s `type="video/webm"`.

And, hey, we got a video! But it’s not where we want it, for that we’ll need some more styling. Let’s make our parent `section` a `relative` container, and let’s add some classes to our video element.

We want `absolute` positioning… We do want to specify full width, and full height, and also we want to “zoom-in” as needed to cover the whole container, we do that with the `object-fit` styling property, we need to set that to `cover`, with Tailwind we do all that with `object-cover`.

Now the video covers everything we need, including the foreground elements we don’t want to cover, so let’s give it a -10 z-index with `-z-10`… but then, watch out, our section’s coloured background also stay in front of our video. No worries, we didn’t really need the background anyway, so we can just remove it and everything works! It’s even… responsive!

## Applying filters for ARTISTIC VISION

Now, we all know size does matter, but there’s an interesting conflict of interest here since videos usually look best when they’re big, but performance is better when they’re small.

And some videos just compress better than others, this is a 480p video, in the webm format and it looks alright, but your mileage may vary. If there’s lots of movement, lots of different changing colours, those are things that are harder to compress well. In any case, we ain’t building Netflix here, so a way to hide that we’ve uploaded a smaller, more compressed video to save on bandwidth, would be to apply a CSS filter or two!

Blur is a good one, it can make a video look more intentionally artistic, and less accidentally garbage. We could remove some saturation, or we could also add or subtract brightness according to whether we’re on light, or dark mode!

And if we mess with our text & Call to Action, we can have something that looks like this… or like this… or like this. As always, my examples are meant to reinforce the concept, and leave you with a better idea of what you can do, not necessarily to blind you with ground-breaking design.

## Providing alternative video formats

Alright, this was a fun styling break, but it’s also important to provide more than one video source… even today not all browsers support `webm`, but I think we’d be well covered if we drag and drop an `mp4` version, and then add another `source`, element… Setting it up for that `mp4` file.

The browser will only try to fetch and play the first one it understands, so we’re keeping `webm` at the top, as it’s more value for bandwidth than `mp4`. Almost all our users should be getting that that `webm` version, but there may be some iOS Safari stragglers that will actually ignore it, and fetch our `mp4` instead.

## Different videos for different viewports?

At this point, seeing we can have multiple sources, we may be tempted to have different videos for different viewports, for different orientations, but that just won’t work with media queries, neither on the `source` element, nor the `video` element.

So for example, we can’t have two video elements, one which stays hidden on mobile, and one which stays hidden desktop: the video just won’t load for whichever gets a media query to apply a different `display` attribute.

We can do some trickery with Javascript to show a different video on a case by case basis, but I don’t think that would ever be worth it: instead, it’s better to keep this limitation in mind as well, and try to have the right video for the job.

We want a video that looks nice no matter how it gets cropped, that doesn’t rely on crisp focus, and doesn’t have too many moving elements, due to the compression concerns we mentioned earlier.

## Placeholder image with the poster attribute?

Last thing that’s borderline worth discussing is the `poster` attribute, we can provide an image here to show while the video is loading. It probably makes most sense to have this be the first frame of the video, so it will appear to start seamlessly when it eventually downloads… however, instead of giving the user one more thing to download, I’d rather try to fight for a smaller video.

Using `poster` does make a difference to the user experience for longer videos, but at that point we’re looking at a much different usage of the video element; we’d probably want some controls, and we wouldn’t want to self-host that video… we’d be looking at providers such as Cloudinary or Mux…

## Next steps + comment & SUBSCRIBE

… It’s a different story, for a different video! For something more related to cool hero sections, check out this video on Animations with Lottie, and YouTube thinks you’re going to enjoy this one too. Thanks a bunch for watching, I’ll see you around!
