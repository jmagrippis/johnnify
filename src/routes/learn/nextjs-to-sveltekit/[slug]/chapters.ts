import matter from 'gray-matter'

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

const SLUG_REGEX = /\.\/chapters\/(.+)\.md/gm

const rawChapters = import.meta.glob('./chapters/*.md', {
	as: 'raw',
	eager: true,
})

export const chapters: Chapter[] = Object.entries(rawChapters).map(
	([path, chapter]) => {
		const {content, data} = matter(chapter)

		const [[, slug]] = [...path.matchAll(SLUG_REGEX)]
		return {content, front_matter: data as FrontMatter, slug}
	},
)
