import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShikiFromHighlighter from '@shikijs/rehype/core'
import {getHighlighterCore} from 'shiki/core'
import getWasm from 'shiki/wasm'

export const parseMd = async (md: string) => {
	const highlighter = await getHighlighterCore({
		themes: [import('shiki/themes/dracula.mjs')],
		langs: [
			import('shiki/langs/css.mjs'),
			import('shiki/langs/javascript.mjs'),
			import('shiki/langs/shellscript.mjs'),
			import('shiki/langs/svelte.mjs'),
			import('shiki/langs/swift.mjs'),
			import('shiki/langs/tsx.mjs'),
			import('shiki/langs/typescript.mjs'),
		],
		loadWasm: getWasm,
	})

	return unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeShikiFromHighlighter, highlighter, {
			theme: 'dracula',
		})
		.use(rehypeStringify)
		.process(md)
		.then(String)
}
