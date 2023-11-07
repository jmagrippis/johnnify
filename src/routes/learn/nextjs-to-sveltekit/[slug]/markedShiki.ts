import {getHighlighter} from 'shiki'

const highlighter = await getHighlighter({
	theme: 'dracula',
	langs: ['ts', 'sh', 'html', 'css', 'json', 'md'],
})

export const markedShiki = {
	code(code: string, infostring: string | undefined = 'sh', escaped: boolean) {
		console.log({infostring})

		return highlighter.codeToHtml(code, {lang: infostring})
	},
}
