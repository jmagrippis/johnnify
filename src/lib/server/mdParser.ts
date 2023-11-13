import {Marked} from 'marked'
import {markedSmartypants} from 'marked-smartypants'
import {markedHighlight} from 'marked-highlight'
import {getHighlighter} from 'shiki'

export const getMdParser = async (): Promise<Marked> => {
	const marked = new Marked(
		markedSmartypants(),
		markedHighlight({
			async: true,
			async highlight(code, lang = 'bash') {
				const highlighter = await getHighlighter({
					theme: 'dracula',
				})

				return highlighter.codeToHtml(code, {lang})
			},
		}),
	)

	return marked
}
