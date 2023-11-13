import {error} from '@sveltejs/kit'

import type {PageServerLoad} from './$types'
import {chapters, type Chapter} from './chapters'
import {getMdParser} from '$lib/server/mdParser'

export const load: PageServerLoad = async ({params: {slug}}) => {
	const chapter = chapters.find((chapter) => chapter.slug === slug)
	if (!chapter) {
		throw error(404, 'Not Found')
	}

	const {nextChapter, prevChapter} = chapters.reduce<{
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

	const mdParser = await getMdParser()
	const content = await mdParser.parse(chapter.content)

	return {
		content,
		title: chapter.front_matter.title,
		chapterNumber: chapter.front_matter.chapterNumber,
		prevChapter: prevChapter
			? {
					slug: prevChapter.slug,
					chapterNumber: prevChapter.front_matter.chapterNumber,
			  }
			: null,
		nextChapter: nextChapter
			? {
					slug: nextChapter.slug,
					chapterNumber: nextChapter.front_matter.chapterNumber,
			  }
			: null,
		meta: {
			title: `Learn SvelteKit! ${chapter.front_matter.title}`,
			description: chapter.front_matter.description,
		},
	}
}
