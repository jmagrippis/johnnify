import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeShiki from '@shikijs/rehype'

export const parseMd = (md: string) =>
	unified()
		.use(remarkParse)
		.use(remarkRehype)
		.use(rehypeShiki, {
			theme: 'dracula',
		})
		.use(rehypeStringify)
		.process(md)
		.then(String)
