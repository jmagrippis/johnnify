import '@poppanator/sveltekit-svg/dist/svg'
import type {Session, SupabaseClient} from '@supabase/supabase-js'
import type {Database} from './lib/generated/DatabaseDefinitions'

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	// fresh API just dropped, let's extend Document
	interface Document {
		startViewTransition?(callback: () => Promise<void>): void
	}

	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>
			getSession(): Promise<Session | null>
		}
		interface PageData {
			session: Session | null
		}
		// interface Platform {}
	}
}

export {}
