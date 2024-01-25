import type {Handle} from '@sveltejs/kit'
import {createServerClient} from '@supabase/ssr'

import {PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY} from '$env/static/public'
import type {Database} from '$lib/generated/DatabaseDefinitions'

export const handle: Handle = async ({event, resolve}) => {
	event.locals.supabase = createServerClient<Database>(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				get: (key) => event.cookies.get(key),
				/**
				 * Note: You have to add the `path` variable to the
				 * set and remove method due to sveltekit's cookie API
				 * requiring this to be set, setting the path to an empty string
				 * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
				 */
				set: (key, value, options) => {
					event.cookies.set(key, value, {...options, path: '/'})
				},
				remove: (key, options) => {
					event.cookies.delete(key, {...options, path: '/'})
				},
			},
		},
	)

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: {session},
		} = await event.locals.supabase.auth.getSession()
		return session
	}

	return resolve(event, {
		// headers will not be serialized, unless explicitly included here
		// https://kit.svelte.dev/docs/hooks#server-hooks-handle
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		},
	})
}
