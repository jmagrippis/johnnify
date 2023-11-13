import {getHighlighter} from 'shiki'
import {Marked} from 'marked'
import {markedSmartypants} from 'marked-smartypants'

export const getMdParser = async (): Promise<Marked> => {
	const highlighter = await getHighlighter({
		theme: 'dracula',
	})

	return new Marked(markedSmartypants(), {
		renderer: {
			code(code, lang = 'sh') {
				return highlighter.codeToHtml(code, {lang})
			},
		},
	})
}
