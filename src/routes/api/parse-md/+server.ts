import {json} from '@sveltejs/kit'
import {getMdParser} from '$lib/server/mdParser'

import type {RequestHandler} from './$types'

export const GET = (async ({url}) => {
	const md = url.searchParams.get('md')

	if (typeof md !== 'string') {
		return new Response('you need to provide some md to parse', {status: 400})
	}

	const mdParser = await getMdParser()
	const html = await mdParser.parse(md)

	return json({html})
}) satisfies RequestHandler
