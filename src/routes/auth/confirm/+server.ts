import type {EmailOtpType} from '@supabase/supabase-js'
import {error, redirect} from '@sveltejs/kit'

const emailOtpTypes = [
	'signup',
	'invite',
	'magiclink',
	'recovery',
	'email_change',
	'email',
]
const isEmailOtpType = (type: string): type is EmailOtpType =>
	emailOtpTypes.includes(type)

export const GET = async ({url, locals: {supabase}}) => {
	const token_hash = url.searchParams.get('token_hash')
	const type = url.searchParams.get('type')
	const next = url.searchParams.get('next') ?? '/'

	if (
		typeof token_hash !== 'string' ||
		typeof next !== 'string' ||
		typeof type !== 'string' ||
		!isEmailOtpType(type)
	) {
		throw error(400, 'Invalid parameters given')
	}

	if (token_hash && type) {
		const {error} = await supabase.auth.verifyOtp({token_hash, type})
		if (!error) {
			throw redirect(303, `/${next.slice(1)}`)
		}
	}

	throw error(400, 'Something went wrong validating your credentials')
}
