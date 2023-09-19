import {redirect} from '@sveltejs/kit'
import type {RequestHandler} from './$types'

const channelUrl = 'www.youtube.com/@johnnifytech'

export const GET: RequestHandler = async ({request: {headers}}) => {
	const userAgent = headers.get('User-Agent') ?? ''

	if (/android/i.test(userAgent)) {
		throw redirect(
			303,
			`intent://${channelUrl}#Intent;package=com.google.android.youtube;scheme=https;end`,
		)
	}

	if (/iPad|iPhone|iPod/.test(userAgent)) {
		throw redirect(303, `vnd.youtube://${channelUrl}`)
	}

	throw redirect(303, `https://${channelUrl}`)
}
