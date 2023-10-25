import {marked} from 'marked'
import {error} from '@sveltejs/kit'

import type {PageServerLoad} from './$types'
import {fetchYouTubeDetails} from '$lib/server/youtube'
import type {FrontMatter} from '$lib/generated/frontMatter'

export const load: PageServerLoad = async ({params, locals: {supabase}}) => {
	const {data, error: selectError} = await supabase
		.from('videos')
		.select('slug, front_matter, content, published_at')
		.match({slug: params.slug})
		.maybeSingle()

	if (selectError) {
		throw selectError
	}
	if (!data) {
		throw error(404, 'Not Found')
	}

	const [details] = await fetchYouTubeDetails([
		(data.front_matter as FrontMatter).youtubeId,
	])
	// remove the title from the markdown content
	const [, , body] = data.content.match(/(#.*)([\s\S]*)/m) ?? []

	if (!body) {
		throw new Error('could not render transcript...')
	}

	const video = {
		...data,
		front_matter: data.front_matter as FrontMatter,
		likes: details.statistics.likeCount,
		content: marked.parse(body),
	}

	return {
		video,
		thumbnail: details.snippet.thumbnails.maxres,
		meta: {
			title: video.front_matter.title,
			description: `A video by Johnny: ${video.front_matter.snippet}`,
		},
	}
}
