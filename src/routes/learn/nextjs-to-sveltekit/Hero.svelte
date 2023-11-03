<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import SvelteIcon from '$lib/icons/svelte.svg?component'
	import ArrowForwardIcon from '$lib/icons/arrow-forward.svg?component'

	export let chapterCount: number
</script>

<section
	class="relative mb-12 flex grow flex-col items-center justify-center overflow-hidden px-4 pt-8 md:mb-16"
>
	<div class="absolute bottom-[20px] left-1/2 -translate-x-1/2 md:bottom-0">
		<div class="block dark:hidden">
			<svg
				fill="none"
				height="640"
				viewBox="0 0 1744 640"
				width="1744"
				xmlns="http://www.w3.org/2000/svg"
				><g filter="url(#filter0_f_521_2815)" opacity="0.25"
					><ellipse cx="872" cy="330" fill="#D6DBDC" rx="792" ry="230"
					></ellipse></g
				><g filter="url(#filter1_f_521_2815)" opacity="0.2"
					><ellipse cx="464" cy="411.5" fill="#6ADDF4" rx="256" ry="129.5"
					></ellipse></g
				><g filter="url(#filter2_f_521_2815)" opacity="0.2"
					><ellipse cx="592" cy="364.5" fill="#6AB2F4" rx="128" ry="176.5"
					></ellipse></g
				><g filter="url(#filter3_f_521_2815)" opacity="0.2"
					><ellipse cx="1162" cy="396.5" fill="#6ADDF4" rx="256" ry="129.5"
					></ellipse></g
				><g filter="url(#filter4_f_521_2815)" opacity="0.2"
					><ellipse cx="1162" cy="256.5" fill="#6AB2F4" rx="128" ry="176.5"
					></ellipse></g
				><defs
					><filter
						color-interpolation-filters="sRGB"
						filterUnits="userSpaceOnUse"
						height="620"
						id="filter0_f_521_2815"
						width="1744"
						x="0"
						y="20"
						><feFlood flood-opacity="0" result="BackgroundImageFix"
						></feFlood><feBlend
							in="SourceGraphic"
							in2="BackgroundImageFix"
							mode="normal"
							result="shape"
						></feBlend><feGaussianBlur
							result="effect1_foregroundBlur_521_2815"
							stdDeviation="40"
						></feGaussianBlur></filter
					><filter
						color-interpolation-filters="sRGB"
						filterUnits="userSpaceOnUse"
						height="419"
						id="filter1_f_521_2815"
						width="672"
						x="128"
						y="202"
						><feFlood flood-opacity="0" result="BackgroundImageFix"
						></feFlood><feBlend
							in="SourceGraphic"
							in2="BackgroundImageFix"
							mode="normal"
							result="shape"
						></feBlend><feGaussianBlur
							result="effect1_foregroundBlur_521_2815"
							stdDeviation="40"
						></feGaussianBlur></filter
					><filter
						color-interpolation-filters="sRGB"
						filterUnits="userSpaceOnUse"
						height="513"
						id="filter2_f_521_2815"
						width="416"
						x="384"
						y="108"
						><feFlood flood-opacity="0" result="BackgroundImageFix"
						></feFlood><feBlend
							in="SourceGraphic"
							in2="BackgroundImageFix"
							mode="normal"
							result="shape"
						></feBlend><feGaussianBlur
							result="effect1_foregroundBlur_521_2815"
							stdDeviation="40"
						></feGaussianBlur></filter
					><filter
						color-interpolation-filters="sRGB"
						filterUnits="userSpaceOnUse"
						height="419"
						id="filter3_f_521_2815"
						width="672"
						x="826"
						y="187"
						><feFlood flood-opacity="0" result="BackgroundImageFix"
						></feFlood><feBlend
							in="SourceGraphic"
							in2="BackgroundImageFix"
							mode="normal"
							result="shape"
						></feBlend><feGaussianBlur
							result="effect1_foregroundBlur_521_2815"
							stdDeviation="40"
						></feGaussianBlur></filter
					><filter
						color-interpolation-filters="sRGB"
						filterUnits="userSpaceOnUse"
						height="513"
						id="filter4_f_521_2815"
						width="416"
						x="954"
						y="0"
						><feFlood flood-opacity="0" result="BackgroundImageFix"
						></feFlood><feBlend
							in="SourceGraphic"
							in2="BackgroundImageFix"
							mode="normal"
							result="shape"
						></feBlend><feGaussianBlur
							result="effect1_foregroundBlur_521_2815"
							stdDeviation="40"
						></feGaussianBlur></filter
					></defs
				></svg
			>
		</div>
		<div class="hidden dark:block">
			<svg
				fill="none"
				height="640"
				viewBox="0 0 1744 640"
				width="1744"
				xmlns="http://www.w3.org/2000/svg"
				><g filter="url(#filter0_f_521_2816)" opacity="0.25"
					><ellipse cx="872" cy="330" fill="#566163" rx="792" ry="230"
					></ellipse></g
				><g filter="url(#filter1_f_521_2816)" opacity="0.2"
					><ellipse cx="464" cy="411.5" fill="#6ADDF4" rx="256" ry="129.5"
					></ellipse></g
				><g filter="url(#filter2_f_521_2816)" opacity="0.2"
					><ellipse cx="592" cy="364.5" fill="#6AB2F4" rx="128" ry="176.5"
					></ellipse></g
				><g filter="url(#filter3_f_521_2816)" opacity="0.2"
					><ellipse cx="1162" cy="396.5" fill="#6ADDF4" rx="256" ry="129.5"
					></ellipse></g
				><g filter="url(#filter4_f_521_2816)" opacity="0.2"
					><ellipse cx="1162" cy="256.5" fill="#6AB2F4" rx="128" ry="176.5"
					></ellipse></g
				><defs
					><filter
						color-interpolation-filters="sRGB"
						filterUnits="userSpaceOnUse"
						height="620"
						id="filter0_f_521_2816"
						width="1744"
						x="0"
						y="20"
						><feFlood flood-opacity="0" result="BackgroundImageFix"
						></feFlood><feBlend
							in="SourceGraphic"
							in2="BackgroundImageFix"
							mode="normal"
							result="shape"
						></feBlend><feGaussianBlur
							result="effect1_foregroundBlur_521_2816"
							stdDeviation="40"
						></feGaussianBlur></filter
					><filter
						color-interpolation-filters="sRGB"
						filterUnits="userSpaceOnUse"
						height="419"
						id="filter1_f_521_2816"
						width="672"
						x="128"
						y="202"
						><feFlood flood-opacity="0" result="BackgroundImageFix"
						></feFlood><feBlend
							in="SourceGraphic"
							in2="BackgroundImageFix"
							mode="normal"
							result="shape"
						></feBlend><feGaussianBlur
							result="effect1_foregroundBlur_521_2816"
							stdDeviation="40"
						></feGaussianBlur></filter
					><filter
						color-interpolation-filters="sRGB"
						filterUnits="userSpaceOnUse"
						height="513"
						id="filter2_f_521_2816"
						width="416"
						x="384"
						y="108"
						><feFlood flood-opacity="0" result="BackgroundImageFix"
						></feFlood><feBlend
							in="SourceGraphic"
							in2="BackgroundImageFix"
							mode="normal"
							result="shape"
						></feBlend><feGaussianBlur
							result="effect1_foregroundBlur_521_2816"
							stdDeviation="40"
						></feGaussianBlur></filter
					><filter
						color-interpolation-filters="sRGB"
						filterUnits="userSpaceOnUse"
						height="419"
						id="filter3_f_521_2816"
						width="672"
						x="826"
						y="187"
						><feFlood flood-opacity="0" result="BackgroundImageFix"
						></feFlood><feBlend
							in="SourceGraphic"
							in2="BackgroundImageFix"
							mode="normal"
							result="shape"
						></feBlend><feGaussianBlur
							result="effect1_foregroundBlur_521_2816"
							stdDeviation="40"
						></feGaussianBlur></filter
					><filter
						color-interpolation-filters="sRGB"
						filterUnits="userSpaceOnUse"
						height="513"
						id="filter4_f_521_2816"
						width="416"
						x="954"
						y="0"
						><feFlood flood-opacity="0" result="BackgroundImageFix"
						></feFlood><feBlend
							in="SourceGraphic"
							in2="BackgroundImageFix"
							mode="normal"
							result="shape"
						></feBlend><feGaussianBlur
							result="effect1_foregroundBlur_521_2816"
							stdDeviation="40"
						></feGaussianBlur></filter
					></defs
				></svg
			>
		</div>
	</div>
	<div
		class="absolute left-0 right-0 top-[80%] h-[350px] bg-surface-1/50 md:h-[200px]"
	></div>
	<div class="relative flex w-full flex-col items-center pt-20 md:pt-8">
		<div
			class="relative flex w-full max-w-prose flex-col items-center rounded-lg bg-surface-2 p-4 shadow-mid"
		>
			<svg
				class="absolute top-0 dark:hidden"
				fill="none"
				height="215"
				viewBox="0 0 460 215"
				width="460"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M0 30H460"
					opacity="0.12"
					stroke="url(#paint0_linear_24_5808)"
					stroke-dasharray="2 2"
				></path><path
					d="M58 154H402"
					opacity="0.12"
					stroke="url(#paint1_linear_24_5808)"
					stroke-dasharray="2 2"
				></path><path
					d="M138.5 215L138.5 -2.38419e-06"
					opacity="0.12"
					stroke="url(#paint2_linear_24_5808)"
					stroke-dasharray="2 2"
				></path><path
					d="M150 30C150 27.6266 149.296 25.3065 147.978 23.3332C146.659 21.3598 144.785 19.8217 142.592 18.9134C140.399 18.0052 137.987 17.7676 135.659 18.2306C133.331 18.6936 131.193 19.8365 129.515 21.5147C127.836 23.1929 126.694 25.3311 126.231 27.6589C125.768 29.9867 126.005 32.3995 126.913 34.5922C127.822 36.7849 129.36 38.6591 131.333 39.9776C133.307 41.2962 135.627 42 138 42"
					opacity="0.12"
					stroke="url(#paint3_angular_24_5808)"
					stroke-dasharray="2 2"
				></path><path
					d="M230.5 186L230.5 18"
					opacity="0.12"
					stroke="url(#paint4_linear_24_5808)"
					stroke-dasharray="2 2"
				></path><path
					d="M322.5 215L322.5 -3.45707e-06"
					opacity="0.12"
					stroke="url(#paint5_linear_24_5808)"
					stroke-dasharray="2 2"
				></path><path
					d="M310 154C310 156.373 310.704 158.693 312.022 160.667C313.341 162.64 315.215 164.178 317.408 165.087C319.601 165.995 322.013 166.232 324.341 165.769C326.669 165.306 328.807 164.164 330.485 162.485C332.164 160.807 333.306 158.669 333.769 156.341C334.232 154.013 333.995 151.601 333.087 149.408C332.178 147.215 330.64 145.341 328.667 144.022C326.693 142.704 324.373 142 322 142"
					opacity="0.12"
					stroke="url(#paint6_angular_24_5808)"
					stroke-dasharray="2 2"
				></path><defs
					><linearGradient
						gradientUnits="userSpaceOnUse"
						id="paint0_linear_24_5808"
						x1="0"
						x2="460"
						y1="30"
						y2="30"
						><stop stop-opacity="0"></stop><stop offset="0.115"></stop><stop
							offset="0.893678"
						></stop><stop offset="1" stop-opacity="0"></stop></linearGradient
					><linearGradient
						gradientUnits="userSpaceOnUse"
						id="paint1_linear_24_5808"
						x1="58"
						x2="402"
						y1="154"
						y2="154"
						><stop stop-opacity="0"></stop><stop offset="0.115"></stop><stop
							offset="0.893678"
						></stop><stop offset="1" stop-opacity="0"></stop></linearGradient
					><linearGradient
						gradientUnits="userSpaceOnUse"
						id="paint2_linear_24_5808"
						x1="138.5"
						x2="138.5"
						y1="215"
						y2="-1.2815e-05"
						><stop stop-opacity="0"></stop><stop offset="0.333333"></stop><stop
							offset="0.666667"
						></stop><stop offset="1" stop-opacity="0"></stop></linearGradient
					><radialGradient
						cx="0"
						cy="0"
						gradientTransform="translate(138 30) rotate(90) scale(12)"
						gradientUnits="userSpaceOnUse"
						id="paint3_angular_24_5808"
						r="1"
						><stop></stop><stop offset="0.5" stop-opacity="0.34"></stop><stop
							offset="1"
						></stop></radialGradient
					><linearGradient
						gradientUnits="userSpaceOnUse"
						id="paint4_linear_24_5808"
						x1="230.5"
						x2="230.5"
						y1="186"
						y2="18"
						><stop stop-opacity="0"></stop><stop offset="0.333333"></stop><stop
							offset="0.666667"
						></stop><stop offset="1" stop-opacity="0"></stop></linearGradient
					><linearGradient
						gradientUnits="userSpaceOnUse"
						id="paint5_linear_24_5808"
						x1="322.5"
						x2="322.5"
						y1="215"
						y2="-1.2815e-05"
						><stop stop-opacity="0"></stop><stop offset="0.333333"></stop><stop
							offset="0.666667"
						></stop><stop offset="1" stop-opacity="0"></stop></linearGradient
					><radialGradient
						cx="0"
						cy="0"
						gradientTransform="translate(322 154) rotate(-90) scale(12)"
						gradientUnits="userSpaceOnUse"
						id="paint6_angular_24_5808"
						r="1"
						><stop></stop><stop offset="0.5" stop-opacity="0.34"></stop><stop
							offset="1"
						></stop></radialGradient
					></defs
				></svg
			>
			<svg
				class="absolute top-0 hidden dark:block"
				fill="none"
				height="215"
				viewBox="0 0 460 215"
				width="460"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M0 30H460"
					opacity="0.24"
					stroke="url(#paint0_linear_166_1526)"
					stroke-dasharray="2 2"
				></path><path
					d="M58 154H402"
					opacity="0.24"
					stroke="url(#paint1_linear_166_1526)"
					stroke-dasharray="2 2"
				></path><path
					d="M138.5 215L138.5 -2.38419e-06"
					opacity="0.24"
					stroke="url(#paint2_linear_166_1526)"
					stroke-dasharray="2 2"
				></path><path
					d="M150 30C150 27.6266 149.296 25.3065 147.978 23.3332C146.659 21.3598 144.785 19.8217 142.592 18.9134C140.399 18.0052 137.987 17.7676 135.659 18.2306C133.331 18.6936 131.193 19.8365 129.515 21.5147C127.836 23.1929 126.694 25.3311 126.231 27.6589C125.768 29.9867 126.005 32.3995 126.913 34.5922C127.822 36.7849 129.36 38.6591 131.333 39.9776C133.307 41.2962 135.627 42 138 42"
					opacity="0.36"
					stroke="url(#paint3_angular_166_1526)"
					stroke-dasharray="2 2"
				></path><path
					d="M230.5 186L230.5 18"
					opacity="0.24"
					stroke="url(#paint4_linear_166_1526)"
					stroke-dasharray="2 2"
				></path><path
					d="M322.5 215L322.5 -3.45707e-06"
					opacity="0.24"
					stroke="url(#paint5_linear_166_1526)"
					stroke-dasharray="2 2"
				></path><path
					d="M310 154C310 156.373 310.704 158.693 312.022 160.667C313.341 162.64 315.215 164.178 317.408 165.087C319.601 165.995 322.013 166.232 324.341 165.769C326.669 165.306 328.807 164.164 330.485 162.485C332.164 160.807 333.306 158.669 333.769 156.341C334.232 154.013 333.995 151.601 333.087 149.408C332.178 147.215 330.64 145.341 328.667 144.022C326.693 142.704 324.373 142 322 142"
					opacity="0.36"
					stroke="url(#paint6_angular_166_1526)"
					stroke-dasharray="2 2"
				></path><defs
					><linearGradient
						gradientUnits="userSpaceOnUse"
						id="paint0_linear_166_1526"
						x1="0"
						x2="460"
						y1="30"
						y2="30"
						><stop stop-color="white" stop-opacity="0"></stop><stop
							offset="0.115"
							stop-color="white"
						></stop><stop offset="0.893678" stop-color="white"></stop><stop
							offset="1"
							stop-color="white"
							stop-opacity="0"
						></stop></linearGradient
					><linearGradient
						gradientUnits="userSpaceOnUse"
						id="paint1_linear_166_1526"
						x1="58"
						x2="402"
						y1="154"
						y2="154"
						><stop stop-color="white" stop-opacity="0"></stop><stop
							offset="0.115"
							stop-color="white"
						></stop><stop offset="0.893678" stop-color="white"></stop><stop
							offset="1"
							stop-color="white"
							stop-opacity="0"
						></stop></linearGradient
					><linearGradient
						gradientUnits="userSpaceOnUse"
						id="paint2_linear_166_1526"
						x1="138.5"
						x2="138.5"
						y1="215"
						y2="-1.2815e-05"
						><stop stop-color="white" stop-opacity="0"></stop><stop
							offset="0.333333"
							stop-color="white"
						></stop><stop offset="0.666667" stop-color="white"></stop><stop
							offset="1"
							stop-color="white"
							stop-opacity="0"
						></stop></linearGradient
					><radialGradient
						cx="0"
						cy="0"
						gradientTransform="translate(138 30) rotate(90) scale(12)"
						gradientUnits="userSpaceOnUse"
						id="paint3_angular_166_1526"
						r="1"
						><stop stop-color="white"></stop><stop
							offset="0.5"
							stop-color="white"
							stop-opacity="0.34"
						></stop><stop offset="1" stop-color="white"></stop></radialGradient
					><linearGradient
						gradientUnits="userSpaceOnUse"
						id="paint4_linear_166_1526"
						x1="230.5"
						x2="230.5"
						y1="186"
						y2="18"
						><stop stop-color="white" stop-opacity="0"></stop><stop
							offset="0.333333"
							stop-color="white"
						></stop><stop offset="0.666667" stop-color="white"></stop><stop
							offset="1"
							stop-color="white"
							stop-opacity="0"
						></stop></linearGradient
					><linearGradient
						gradientUnits="userSpaceOnUse"
						id="paint5_linear_166_1526"
						x1="322.5"
						x2="322.5"
						y1="215"
						y2="-1.2815e-05"
						><stop stop-color="white" stop-opacity="0"></stop><stop
							offset="0.333333"
							stop-color="white"
						></stop><stop offset="0.666667" stop-color="white"></stop><stop
							offset="1"
							stop-color="white"
							stop-opacity="0"
						></stop></linearGradient
					><radialGradient
						cx="0"
						cy="0"
						gradientTransform="translate(322 154) rotate(-90) scale(12)"
						gradientUnits="userSpaceOnUse"
						id="paint6_angular_166_1526"
						r="1"
						><stop stop-color="white"></stop><stop
							offset="0.5"
							stop-color="white"
							stop-opacity="0.34"
						></stop><stop offset="1" stop-color="white"></stop></radialGradient
					></defs
				></svg
			>
			<div class="relative -mt-[56px] flex w-full justify-center md:-mt-14">
				<div
					class="relative h-[181px] w-[160px] rounded-sm bg-gradient-to-b from-surface-contrast to-surface-3 before:absolute before:-left-[1px] before:block before:h-full before:w-[16px] before:rounded-l-sm before:bg-gradient-to-r before:from-gray-600 before:to-gray-700 dark:before:from-gray-800 dark:before:to-gray-900"
				>
					<div
						class="ml-[16px] flex max-w-[143px] flex-col py-2 pl-2 text-left"
					>
						<p class="mb-2 text-base font-bold leading-none text-copy-contrast">
							Learn SvelteKit
						</p>
						<div class="text-xs font-light leading-tight text-copy-contrast">
							<p>Chapter: 1</p>
							<p>Getting Started</p>
						</div>
					</div>
					<svg
						fill="none"
						height="181"
						viewBox="0 0 160 181"
						width="160"
						xmlns="http://www.w3.org/2000/svg"
						class="absolute top-0 text-svelte"
					>
						<path
							d="M122 1C122 0.447716 122.448 0 123 0H137C137.552 0 138 0.447715 138 1V22.259C138 23.0308 137.163 23.5116 136.496 23.1227L130.504 19.6273C130.193 19.4456 129.807 19.4456 129.496 19.6273L123.504 23.1227C122.837 23.5116 122 23.0308 122 22.259V1Z"
							fill="currentColor"
						></path>
					</svg>
					<SvelteIcon
						width="36px"
						class="absolute bottom-2 right-3 text-svelte"
					/>
				</div>
			</div>
			<div
				class="relative mt-6 flex w-full max-w-full flex-col items-center justify-center space-y-4 pb-0 md:space-y-6 md:pb-4 lg:pt-4"
			>
				<div class="mb-2 flex max-w-full flex-col items-center justify-center">
					<p class="mb-2 py-2 text-xl font-bold">Learn SvelteKit</p>
					<p class="mx-auto flex max-w-prose flex-col">
						<span>
							{chapterCount} chapters that take you
						</span>
						<span>from Javascript basics to SvelteKit.</span>
					</p>
					<div
						class="mt-6 flex w-full max-w-md items-center justify-between rounded-full bg-surface-1 px-6 py-3 text-sm"
					>
						<div class="flex flex-col text-left">
							<p>Chapter 1: Getting Started</p>
							<p class="text-copy-muted">Dive into the course materials</p>
						</div>
						<div class="rounded-full border-4 border-emphasis p-4" />
					</div>
				</div>
				<div class="h-px w-full bg-surface-1"></div>
				<Button tag="a" href="/learn/nextjs-to-sveltekit/intro"
					>Start Learning <ArrowForwardIcon class="w-7" /></Button
				>
			</div>
		</div>
	</div>
</section>
