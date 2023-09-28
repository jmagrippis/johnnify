import {sveltekit} from '@sveltejs/kit/vite'
import svg from '@poppanator/sveltekit-svg'
import {defineConfig} from 'vite'

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
})
