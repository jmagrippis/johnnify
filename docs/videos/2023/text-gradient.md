---
title: Text Gradient with vanilla CSS 🍦, or with Tailwind! ⛵️ (for your stylish hero sections)
snippet: Gradients have been making a come-back for the past couple years, let’s get in on the fresh Text Gradient trend!
youtubeId: Bual_cAToQQ
appUrl: https://johnnify.com/
githubUrl: https://github.com/jmagrippis/johnnify
publishedAt: Sep 5, 2023
---

# Text Gradient with vanilla CSS 🍦, or with Tailwind! ⛵️ (for your stylish hero sections)

Hello and welcome, I’m Johnny and YOU want stylish colourful text for your hero sections!

Gradient text has been trending massively! You can go really subtle, or REALLY loud, so let’s learn how it works and the world is your oyster!

We’ll first break this down with vanilla CSS, then also show how to do it with Tailwind, and we’ll finish with a couple bonus tips & gotchas.

## with vanilla 🍦 CSS

So, we can start with any HTML element with text inside, like this h1. We know we can change the colour of the text by setting color… to something like… papayawhip, one of the extended colour keywords, or to a hex code… or to Hue Saturation Lightness…

Given how this works, we’d wish for things to be as simple for our text gradient effect, to be able to specify a gradient right here somehow. Like, I’d love for linear-gradient(to right, start from plum, end on aquamarine) to work… But this is CSS and it’s only 2023, so this doesn’t work, whatever madness we did here gets ignored.

But I didn’t completely make this up, this is the way to set a gradient… for backgrounds, so if… instead of targeting the text colour, we set the background to a linear gradient, from left to right, from plum to aquamarine, we do get a lovely gradient!

For the background, we can specify all sorts of gradients with all sorts of angles and styles, and we can even use Josh Comeau’s excellent gradient generator to end up with something even more fun and complicated.

And it turns out, we can use this gradient background to make our text colourful. You see, there is this `background-clip` property we can set to `text`. Listen carefully, this does NOT make our background disappear, this makes our background render behind anywhere there’s text. Of course, if it’s behind our text we cannot see it! But we can finish off this style hack by setting our text… color to transparent and… BOOM! Text gradient!

## More demos 🚀 examples

So, again, we set a background colour, we specify we only want it rendered behind our text, and then we make our text transparent. Bing, bang, boom. The order we do this does not actually matter, but it is how my mind understands the process. It also works with radial gradients, or even images, but I haven’t really seen either of those in the wild, while linear gradients seem to be everywhere.

## with ⛵️ Tailwind.css

Alright, now we understand the process, let’s see how we can do the same with my favourite CSS framework, Tailwind.

The idea is the same, we apply a gradient with the class `bg-gradient-to-r`. We can specify the colour we want to start from like `from-purple-400`, and the colour we want to end in, like `to-emerald-400`. In my projects I like configuring my primary and secondary colour palettes, so I can instead do **`from-primary-400 to-secondary-400`**, which makes it easier to copy & paste styling like this across projects with different branding. I don’t have to remember to change every `purple` to `teal` or whatever, each project’s tailwind config is the source of truth for what the colours should be.

In any case, we’ve got the gradient, step 2 is making the background clip to the text, which we do with `bg-clip-text`, and, finally we make the text transparent with… `text-transparent`. Woohoo!

And we can still customise the angle of the gradient… we can specify multiple colour stops… It’s fun, I love that gradients are back in style!

## Animated gradients, other tips + LIKE 💜 SUBSCRIBE

Whether it’s vanilla, or Tailwind, or something else, I do see this trick applied to the parent HTML element too; it’s not just for headings. For example, we can have a `section` containing multiple other elements, all of which get a piece of that background gradient. But do keep in mind that the effect will change if the container’s width and height is responsive, and not directly dependent on the text size.

Actually, this may spark some creativity, because we cannot directly animate a gradient with CSS, but we CAN animate the background position.

So if we use `background-size` to double the width of our background… and then we create an animation which sets the `background-position` from 0 to 100%… and have that animation play forever in a ping-pong style… We get…

Wow… 🤩

That’s all for now, hope you do get creative with this, and if you want more fun with HTML & CSS checkout out this video, while YouTube thinks you’d also enjoy this one. Thanks a bunch for watching, I’ll see you around!
