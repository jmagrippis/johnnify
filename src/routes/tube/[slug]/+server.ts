import {redirect} from '@sveltejs/kit'

import type {RequestHandler} from './$types'
import {deriveDevice} from '../deriveDevice'
import {channelUrl} from '../constants'
import {trackRedirect} from '$lib/plausible/trackRedirect'

const slugsToVideoUrls: Record<string, string> = {
	'text-gradient': 'www.youtube.com/watch?v=Bual_cAToQQ',
	'view-transitions': 'www.youtube.com/watch?v=qcgGJ0J3yOA',
	'google-fonts': 'www.youtube.com/watch?v=TKKpVlZRFLc',
	'list-to-detail': 'www.youtube.com/watch?v=suuxXrMs5P4',
}

export const GET: RequestHandler = ({request, url, params: {slug}}) => {
	const videoOrChannelUrl = slugsToVideoUrls[slug] ?? channelUrl
	const userIp = request.headers.get('X-Forwarded-For')

	const userAgent = request.headers.get('User-Agent')

	const device = deriveDevice(userAgent)

	let redirectUrl: string

	switch (device) {
		case 'iOS':
			redirectUrl = `vnd.youtube://${videoOrChannelUrl}`
			break
		case 'android':
			redirectUrl = `intent://${videoOrChannelUrl}#Intent;package=com.google.android.youtube;scheme=https;end`
			break
		case 'other':
		default:
			redirectUrl = `https://${videoOrChannelUrl}`
	}

	if (userAgent) {
		trackRedirect({
			userAgent,
			userIp,
			url: url.href,
		})
	}

	redirect(303, redirectUrl)
}
