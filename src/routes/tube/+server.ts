import {redirect} from '@sveltejs/kit'

import type {RequestHandler} from './$types'
import {deriveDevice} from './deriveDevice'
import {channelUrl} from './constants'

export const GET: RequestHandler = ({request}) => {
	const userAgent = request.headers.get('User-Agent')

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

	throw redirect(303, redirectUrl)
}
