import type {FrontMatter} from '$lib/generated/frontMatter'
import {json, type RequestHandler} from '@sveltejs/kit'

type AssistantData = {
	title: string
	snippet: string
	youtubeLink: string
	publishedAt: string
	demoAppUrl?: string
	githubUrl?: string
}

const dbVideosToAssistantData = ({
	front_matter: {youtubeId, appUrl, ...restOfFrontMatter},
}: {
	front_matter: FrontMatter
}): AssistantData => ({
	...restOfFrontMatter,
	demoAppUrl: appUrl,
	youtubeLink: `https://www.youtube.com/watch?v=${youtubeId}`,
})

export const GET: RequestHandler = async ({locals: {supabase}}) => {
	const {data, error} = await supabase.from('videos').select('front_matter')

	if (error) {
		throw error
	}

	return json(data.map(dbVideosToAssistantData))
}
