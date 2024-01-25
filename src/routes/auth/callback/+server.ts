import {error, redirect} from '@sveltejs/kit'

export const GET = async ({url, locals: {supabase}}) => {
	const code = url.searchParams.get('code')
	const next = url.searchParams.get('next') ?? '/profile'

	if (typeof code !== 'string' || typeof next !== 'string') {
		error(400, 'Invalid parameters given')
	}

	if (code) {
		const {error} = await supabase.auth.exchangeCodeForSession(code)
		if (!error) {
			redirect(303, `/${next.slice(1)}`)
		}
	}

	error(400, 'Something went wrong validating your credentials')
}
