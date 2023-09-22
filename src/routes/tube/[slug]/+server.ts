import {redirect} from '@sveltejs/kit'

import type {RequestHandler} from './$types'
import {deriveDevice} from '../deriveDevice'
import {channelUrl} from '../constants'

const slugsToVideoUrls: Record<string, string> = {
	'text-gradient': 'www.youtube.com/watch?v=Bual_cAToQQ',
	'view-transitions': 'www.youtube.com/watch?v=qcgGJ0J3yOA',
}

export const GET: RequestHandler = ({request, params: {slug}}) => {
	const url = slugsToVideoUrls[slug] ?? channelUrl

	const userAgent = request.headers.get('User-Agent')

	const device = deriveDevice(userAgent)

	let redirectUrl: string

	switch (device) {
		case 'iOS':
			redirectUrl = `vnd.youtube://${url}`
			break
		case 'android':
			redirectUrl = `intent://${url}#Intent;package=com.google.android.youtube;scheme=https;end`
			break
		case 'other':
		default:
			redirectUrl = `https://${url}`
	}

	throw redirect(303, redirectUrl)
}
