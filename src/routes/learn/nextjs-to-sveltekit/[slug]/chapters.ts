import matter from 'gray-matter'
import {marked} from 'marked'
import {markedSmartypants} from 'marked-smartypants'
import {markedShiki} from './markedShiki'

export type FrontMatter = {
	title: string
	description: string
	chapterNumber: number
	slug: string
}
export type Chapter = {
	content: string
	front_matter: FrontMatter
	slug: string
}

marked.use(markedSmartypants())
marked.use({renderer: markedShiki})

const SLUG_REGEX = /\.\/chapters\/(.+)\.md/gm

const rawChapters = import.meta.glob('./chapters/*.md', {
	as: 'raw',
	eager: true,
})

export const chapters: Chapter[] = Object.entries(rawChapters).map(
	([path, chapter]) => {
		const {content: rawContent, data} = matter(chapter)
		const content = marked.parse(rawContent)

		const [[, slug]] = [...path.matchAll(SLUG_REGEX)]
		return {content, front_matter: data as FrontMatter, slug}
	},
)
