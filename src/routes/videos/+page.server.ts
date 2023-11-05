import type {FrontMatter} from '$lib/generated/frontMatter'
import {getYouTubeThumbnailFromId} from '$lib/getYouTubeThumbnailFromId'
import {fetchYouTubeDetails, type YouTubeThumb} from '$lib/server/youtube'

import type {PageServerLoad} from './$types'

type VideoWithThumbs = {
	slug: string
	front_matter: FrontMatter
	published_at: string
	thumbnail: YouTubeThumb
}
type YouTubeIdsToLikes = Record<string, number>

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

	const youtubeIds: string[] = []

	const videos = data.reduce<VideoWithThumbs[]>((acc, video) => {
		const youtubeId = (video.front_matter as FrontMatter).youtubeId
		youtubeIds.push(youtubeId)
		acc.push({
			...video,
			front_matter: video.front_matter as FrontMatter,
			thumbnail: {
				url: getYouTubeThumbnailFromId(
					(video.front_matter as FrontMatter).youtubeId,
				),
				width: 1280,
				height: 720,
			},
		})

		return acc
	}, [])

	const youtubeIdsToLikes: Promise<YouTubeIdsToLikes> = fetchYouTubeDetails(
		youtubeIds,
	).then((allStats) =>
		allStats.reduce<YouTubeIdsToLikes>(function (acc, stat) {
			acc[stat.id] = parseInt(stat.statistics.likeCount)
			return acc
		}, {}),
	)

	return {
		videos,
		streamed: {youtubeIdsToLikes},
		meta: {
			title: 'Latest Videos',
			description:
				'View the latest YouTube videos by Johnny, with their transcripts included!',
		},
	}
}
