import {createClient} from '@supabase/supabase-js'

import {PUBLIC_SUPABASE_URL} from '$env/static/public'
import {SUPABASE_SERVICE_ROLE_KEY} from '$env/static/private'
import type {Database} from '$lib/generated/DatabaseDefinitions'

export const supabaseAdmin = createClient<Database>(
	PUBLIC_SUPABASE_URL,
	SUPABASE_SERVICE_ROLE_KEY,
)
