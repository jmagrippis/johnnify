import {expect, it} from 'vitest'

it('imports test env vars, also from `.env.test`', () => {
	expect(process.env.NODE_ENV).toBe('test')
	expect(process.env.PUBLIC_SUPABASE_URL).toBe('https://test.supabase.co')
})
