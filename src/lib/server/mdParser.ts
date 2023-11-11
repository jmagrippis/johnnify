import {getHighlighter} from 'shiki'
import {Marked} from 'marked'
import {markedSmartypants} from 'marked-smartypants'

let mdParser: Marked
export const getMdParser = async (): Promise<Marked> => {
	if (!mdParser) {
		const highlighter = await getHighlighter({
			theme: 'dracula',
		})
		mdParser = new Marked(markedSmartypants(), {
			renderer: {
				code(code, lang = 'sh') {
					return highlighter.codeToHtml(code, {lang})
				},
			},
		})
	}
	return mdParser
}
