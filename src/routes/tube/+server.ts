import {redirect} from '@sveltejs/kit'

import type {RequestHandler} from './$types'
import {deriveDevice} from './deriveDevice'
import {channelUrl} from './constants'
import {trackRedirect} from '$lib/plausible/trackRedirect'

export const GET: RequestHandler = ({request, url}) => {
	const userAgent = request.headers.get('User-Agent')
	const userIp = request.headers.get('X-Forwarded-For')

	const device = deriveDevice(userAgent)

	let redirectUrl: string

	switch (device) {
		case 'iOS':
			redirectUrl = `vnd.youtube://${channelUrl}`
			break
		case 'android':
			redirectUrl = `intent://${channelUrl}#Intent;package=com.google.android.youtube;scheme=https;end`
			break
		case 'other':
		default:
			redirectUrl = `https://${channelUrl}`
	}

	if (userAgent) {
		trackRedirect({
			userAgent,
			userIp,
			url: url.href,
		})
	}
	throw redirect(303, redirectUrl)
}
