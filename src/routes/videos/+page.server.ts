import type {FrontMatter} from '$lib/generated/frontMatter'
import {fetchYouTubeDetails, type YouTubeThumb} from '$lib/server/youtube'

import type {PageServerLoad} from './$types'

type VideoWithThumbsAndStats = {
	slug: string
	front_matter: FrontMatter
	published_at: string
	thumbnail: YouTubeThumb
	likes: number
}
export const load: PageServerLoad = async ({locals: {supabase}}) => {
	const {data, error} = await supabase
		.from('videos')
		.select('slug, front_matter, published_at')
		.order('published_at', {ascending: false})

	if (error) {
		throw error
	}
	if (!data) {
		throw new Error('Could not fetch videos!')
	}

	const videoIds = data.map(
		({front_matter}) => (front_matter as FrontMatter).youtubeId,
	)

	const details = await fetchYouTubeDetails(videoIds)

	const videos = data.reduce<VideoWithThumbsAndStats[]>((acc, video) => {
		const youtubeDetails = details.find(({id}) => {
			return id === (video.front_matter as FrontMatter).youtubeId
		})
		if (!youtubeDetails) return acc

		acc.push({
			...video,
			front_matter: video.front_matter as FrontMatter,
			thumbnail: youtubeDetails.snippet.thumbnails.maxres,
			likes: parseInt(youtubeDetails.statistics.likeCount),
		})

		return acc
	}, [])

	return {
		videos,
		meta: {
			title: 'Latest Videos',
			description:
				'View the latest YouTube videos by Johnny, with their transcripts included!',
		},
	}
}
