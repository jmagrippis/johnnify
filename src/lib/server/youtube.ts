import {YOUTUBE_API_KEY} from '$env/static/private'

export type YouTubeThumb = {
	url: string
	width: 1280
	height: 720
}

export type YoutubeVideoItem = {
	id: string
	statistics: {
		viewCount: string
		likeCount: string
		favoriteCount: string
		commentCount: string
	}
}

export const fetchYouTubeDetails = async (
	videoIds: string[],
): Promise<YoutubeVideoItem[]> => {
	const url = new URL('https://youtube.googleapis.com/youtube/v3/videos')
	url.searchParams.set('part', ['statistics'].join(','))
	url.searchParams.set('id', videoIds.join(','))
	url.searchParams.set('key', YOUTUBE_API_KEY)
	const response = await fetch(url, {
		headers: new Headers({Accept: 'application/json'}),
	})

	if (!response.ok) {
		throw new Error('Could not fetch YouTube details!')
	}

	const {items} = await response.json()

	return items
}
