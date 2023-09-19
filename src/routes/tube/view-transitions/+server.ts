import {redirect} from '@sveltejs/kit'
import type {RequestHandler} from './$types'

const videoUrl = 'www.youtube.com/watch?v=qcgGJ0J3yOA'

export const GET: RequestHandler = async ({request: {headers}}) => {
	const userAgent = headers.get('User-Agent') ?? ''

	if (/android/i.test(userAgent)) {
		throw redirect(
			303,
			`intent://${videoUrl}#Intent;package=com.google.android.youtube;scheme=https;end`,
		)
	}

	if (/iPad|iPhone|iPod/.test(userAgent)) {
		throw redirect(303, `vnd.youtube://${videoUrl}`)
	}

	throw redirect(303, `https://${videoUrl}`)
}
