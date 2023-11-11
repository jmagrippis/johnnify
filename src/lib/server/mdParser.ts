import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'
import remarkSmartypants from 'remark-smartypants'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'

export const mdParser = unified()
	.use(remarkParse)
	.use(remarkFrontmatter)
	.use(remarkSmartypants)
	.use(remarkRehype)
	.use(rehypeStringify)
	// multiple versions of vfile-message
	// with meaningless type conflicts means
	// we need this ts-ignore for now
	// @ts-ignore
	.use(rehypePrettyCode, {
		theme: 'dracula',
		defaultLang: 'sh',
	})
