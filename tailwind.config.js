const colors = require('tailwindcss/colors')

const withAlphaValue = (varName) => `hsl(var(--${varName}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,ts,svelte}'],
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		colors: {
			primary: colors.purple,
			secondary: colors.emerald,
			copy: {
				base: withAlphaValue('copy-base-color'),
				muted: withAlphaValue('copy-muted-color'),
			},
			surface: {
				1: withAlphaValue('surface-1-color'),
				2: withAlphaValue('surface-2-color'),
				3: withAlphaValue('surface-3-color'),
			},
			emphasis: {
				DEFAULT: withAlphaValue('emphasis-color'),
				hover: withAlphaValue('emphasis-hover-color'),
			},
			gray: colors.stone,
			white: colors.white,
			transparent: 'transparent',
			current: 'currentColor',
			error: '#be123c',
		},
		boxShadow: {
			low: 'var(--shadow-elevation-low)',
			mid: 'var(--shadow-elevation-medium)',
			high: 'var(--shadow-elevation-high)',
		},
		container: {
			center: true,
		},
		fontFamily: {
			sans: '"Inconsolata Variable", sans-serif, "Noto Color Emoji"',
		},
		extend: {},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
