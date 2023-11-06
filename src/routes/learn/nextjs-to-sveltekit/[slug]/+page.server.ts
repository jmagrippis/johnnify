import matter from 'gray-matter'
import {error} from '@sveltejs/kit'
import {marked} from 'marked'
import {markedSmartypants} from 'marked-smartypants'
import {markedHighlight} from 'marked-highlight'
import hljs from 'highlight.js'

import type {PageServerLoad} from './$types'
marked.use(markedSmartypants())
marked.use(
	markedHighlight({
		langPrefix: 'hljs language-',
		highlight(code, lang) {
			const language = hljs.getLanguage(lang) ? lang : 'plaintext'
			return hljs.highlight(code, {language}).value
		},
	}),
)

type FrontMatter = {
	title: string
	description: string
	chapterNumber: number
	slug: string
}
type Chapter = {
	content: string
	front_matter: FrontMatter
	slug: string
}

const SLUG_REGEX = /\.\/chapters\/(.+)\.md/gm

const chapters = import.meta.glob('./chapters/*.md', {as: 'raw', eager: true})
const parsedChapters: Chapter[] = Object.entries(chapters).map(
	([path, chapter]) => {
		const {content: rawContent, data} = matter(chapter)
		const content = marked.parse(rawContent)

		const [[, slug]] = [...path.matchAll(SLUG_REGEX)]
		return {content, front_matter: data as FrontMatter, slug}
	},
)

export const load: PageServerLoad = async ({params: {slug}}) => {
	const chapter = parsedChapters.find((chapter) => chapter.slug === slug)
	if (!chapter) {
		throw error(404, 'Not Found')
	}

	const {nextChapter, prevChapter} = parsedChapters.reduce<{
		nextChapter: Chapter | null
		prevChapter: Chapter | null
	}>(
		(acc, c) => {
			if (
				chapter.front_matter.chapterNumber + 1 ===
				c.front_matter.chapterNumber
			) {
				acc.nextChapter = c
			}
			if (
				chapter.front_matter.chapterNumber - 1 ===
				c.front_matter.chapterNumber
			) {
				acc.prevChapter = c
			}
			return acc
		},
		{
			nextChapter: null,
			prevChapter: null,
		},
	)

	return {
		content: chapter.content,
		title: chapter.front_matter.title,
		prevChapterSlug: prevChapter?.slug,
		nextChapterSlug: nextChapter?.slug,
		meta: {
			title: `Learn SvelteKit! ${chapter.front_matter.title}`,
			description: chapter.front_matter.description,
		},
	}
}
