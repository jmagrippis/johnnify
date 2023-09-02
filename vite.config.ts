import {sveltekit} from '@sveltejs/kit/vite'
import svg from '@poppanator/sveltekit-svg'
import {defineConfig} from 'vitest/config'

const svgPlugin = svg({
	svgoOptions: {
		multipass: true,
		plugins: [
			{
				name: 'preset-default',
				params: {
					overrides: {
						removeViewBox: false,
					},
				},
			},
			'removeDimensions',
		],
	},
})

export default defineConfig({
	plugins: [sveltekit(), svgPlugin],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
	},
})
