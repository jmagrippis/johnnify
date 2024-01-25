export type Json =
	| string
	| number
	| boolean
	| null
	| {[key: string]: Json | undefined}
	| Json[]

export interface Database {
	docs: {
		Tables: {
			page: {
				Row: {
					checksum: string | null
					id: number
					last_refresh: string | null
					meta: Json | null
					parent_page_id: number | null
					path: string
					source: string | null
					type: string | null
					version: string | null
				}
				Insert: {
					checksum?: string | null
					id?: number
					last_refresh?: string | null
					meta?: Json | null
					parent_page_id?: number | null
					path: string
					source?: string | null
					type?: string | null
					version?: string | null
				}
				Update: {
					checksum?: string | null
					id?: number
					last_refresh?: string | null
					meta?: Json | null
					parent_page_id?: number | null
					path?: string
					source?: string | null
					type?: string | null
					version?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'page_parent_page_id_fkey'
						columns: ['parent_page_id']
						isOneToOne: false
						referencedRelation: 'page'
						referencedColumns: ['id']
					},
				]
			}
			page_section: {
				Row: {
					content: string | null
					embedding: string | null
					heading: string | null
					id: number
					page_id: number
					slug: string | null
					token_count: number | null
				}
				Insert: {
					content?: string | null
					embedding?: string | null
					heading?: string | null
					id?: number
					page_id: number
					slug?: string | null
					token_count?: number | null
				}
				Update: {
					content?: string | null
					embedding?: string | null
					heading?: string | null
					id?: number
					page_id?: number
					slug?: string | null
					token_count?: number | null
				}
				Relationships: [
					{
						foreignKeyName: 'page_section_page_id_fkey'
						columns: ['page_id']
						isOneToOne: false
						referencedRelation: 'page'
						referencedColumns: ['id']
					},
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			get_page_parents: {
				Args: {
					page_id: number
				}
				Returns: {
					id: number
					parent_page_id: number
					path: string
					meta: Json
				}[]
			}
			match_page_sections: {
				Args: {
					embedding: string
					match_threshold: number
					match_count: number
					min_content_length: number
				}
				Returns: {
					id: number
					page_id: number
					slug: string
					heading: string
					content: string
					similarity: number
				}[]
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
	graphql_public: {
		Tables: {
			[_ in never]: never
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			graphql: {
				Args: {
					operationName?: string
					query?: string
					variables?: Json
					extensions?: Json
				}
				Returns: Json
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
	public: {
		Tables: {
			customers: {
				Row: {
					id: string
					stripe_customer_id: string | null
				}
				Insert: {
					id: string
					stripe_customer_id?: string | null
				}
				Update: {
					id?: string
					stripe_customer_id?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'customers_id_fkey'
						columns: ['id']
						isOneToOne: true
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
				]
			}
			prices: {
				Row: {
					active: boolean | null
					currency: string | null
					description: string | null
					id: string
					interval: Database['public']['Enums']['pricing_plan_interval'] | null
					interval_count: number | null
					metadata: Json | null
					product_id: string | null
					trial_period_days: number | null
					type: Database['public']['Enums']['pricing_type'] | null
					unit_amount: number | null
				}
				Insert: {
					active?: boolean | null
					currency?: string | null
					description?: string | null
					id: string
					interval?: Database['public']['Enums']['pricing_plan_interval'] | null
					interval_count?: number | null
					metadata?: Json | null
					product_id?: string | null
					trial_period_days?: number | null
					type?: Database['public']['Enums']['pricing_type'] | null
					unit_amount?: number | null
				}
				Update: {
					active?: boolean | null
					currency?: string | null
					description?: string | null
					id?: string
					interval?: Database['public']['Enums']['pricing_plan_interval'] | null
					interval_count?: number | null
					metadata?: Json | null
					product_id?: string | null
					trial_period_days?: number | null
					type?: Database['public']['Enums']['pricing_type'] | null
					unit_amount?: number | null
				}
				Relationships: [
					{
						foreignKeyName: 'prices_product_id_fkey'
						columns: ['product_id']
						isOneToOne: false
						referencedRelation: 'products'
						referencedColumns: ['id']
					},
				]
			}
			products: {
				Row: {
					active: boolean | null
					description: string | null
					id: string
					image: string | null
					metadata: Json | null
					name: string | null
				}
				Insert: {
					active?: boolean | null
					description?: string | null
					id: string
					image?: string | null
					metadata?: Json | null
					name?: string | null
				}
				Update: {
					active?: boolean | null
					description?: string | null
					id?: string
					image?: string | null
					metadata?: Json | null
					name?: string | null
				}
				Relationships: []
			}
			subscriptions: {
				Row: {
					cancel_at: string | null
					cancel_at_period_end: boolean | null
					canceled_at: string | null
					created: string
					current_period_end: string
					current_period_start: string
					ended_at: string | null
					id: string
					metadata: Json | null
					price_id: string | null
					quantity: number | null
					status: Database['public']['Enums']['subscription_status'] | null
					trial_end: string | null
					trial_start: string | null
					user_id: string
				}
				Insert: {
					cancel_at?: string | null
					cancel_at_period_end?: boolean | null
					canceled_at?: string | null
					created?: string
					current_period_end?: string
					current_period_start?: string
					ended_at?: string | null
					id: string
					metadata?: Json | null
					price_id?: string | null
					quantity?: number | null
					status?: Database['public']['Enums']['subscription_status'] | null
					trial_end?: string | null
					trial_start?: string | null
					user_id: string
				}
				Update: {
					cancel_at?: string | null
					cancel_at_period_end?: boolean | null
					canceled_at?: string | null
					created?: string
					current_period_end?: string
					current_period_start?: string
					ended_at?: string | null
					id?: string
					metadata?: Json | null
					price_id?: string | null
					quantity?: number | null
					status?: Database['public']['Enums']['subscription_status'] | null
					trial_end?: string | null
					trial_start?: string | null
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: 'subscriptions_price_id_fkey'
						columns: ['price_id']
						isOneToOne: false
						referencedRelation: 'prices'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'subscriptions_user_id_fkey'
						columns: ['user_id']
						isOneToOne: false
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
				]
			}
			users: {
				Row: {
					avatar_url: string | null
					billing_address: Json | null
					full_name: string | null
					id: string
					payment_method: Json | null
				}
				Insert: {
					avatar_url?: string | null
					billing_address?: Json | null
					full_name?: string | null
					id: string
					payment_method?: Json | null
				}
				Update: {
					avatar_url?: string | null
					billing_address?: Json | null
					full_name?: string | null
					id?: string
					payment_method?: Json | null
				}
				Relationships: [
					{
						foreignKeyName: 'users_id_fkey'
						columns: ['id']
						isOneToOne: true
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
				]
			}
			videos: {
				Row: {
					checksum: string
					content: string
					created_at: string
					front_matter: Json
					id: string
					published_at: string
					slug: string
					updated_at: string
				}
				Insert: {
					checksum: string
					content: string
					created_at?: string
					front_matter?: Json
					id?: string
					published_at?: string
					slug: string
					updated_at?: string
				}
				Update: {
					checksum?: string
					content?: string
					created_at?: string
					front_matter?: Json
					id?: string
					published_at?: string
					slug?: string
					updated_at?: string
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			ivfflathandler: {
				Args: {
					'': unknown
				}
				Returns: unknown
			}
			json_matches_schema: {
				Args: {
					schema: Json
					instance: Json
				}
				Returns: boolean
			}
			jsonb_matches_schema: {
				Args: {
					schema: Json
					instance: Json
				}
				Returns: boolean
			}
			vector_avg: {
				Args: {
					'': number[]
				}
				Returns: string
			}
			vector_dims: {
				Args: {
					'': string
				}
				Returns: number
			}
			vector_norm: {
				Args: {
					'': string
				}
				Returns: number
			}
			vector_out: {
				Args: {
					'': string
				}
				Returns: unknown
			}
			vector_send: {
				Args: {
					'': string
				}
				Returns: string
			}
			vector_typmod_in: {
				Args: {
					'': unknown[]
				}
				Returns: number
			}
		}
		Enums: {
			pricing_plan_interval: 'day' | 'week' | 'month' | 'year'
			pricing_type: 'one_time' | 'recurring'
			subscription_status:
				| 'trialing'
				| 'active'
				| 'canceled'
				| 'incomplete'
				| 'incomplete_expired'
				| 'past_due'
				| 'unpaid'
				| 'paused'
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
	storage: {
		Tables: {
			buckets: {
				Row: {
					allowed_mime_types: string[] | null
					avif_autodetection: boolean | null
					created_at: string | null
					file_size_limit: number | null
					id: string
					name: string
					owner: string | null
					owner_id: string | null
					public: boolean | null
					updated_at: string | null
				}
				Insert: {
					allowed_mime_types?: string[] | null
					avif_autodetection?: boolean | null
					created_at?: string | null
					file_size_limit?: number | null
					id: string
					name: string
					owner?: string | null
					owner_id?: string | null
					public?: boolean | null
					updated_at?: string | null
				}
				Update: {
					allowed_mime_types?: string[] | null
					avif_autodetection?: boolean | null
					created_at?: string | null
					file_size_limit?: number | null
					id?: string
					name?: string
					owner?: string | null
					owner_id?: string | null
					public?: boolean | null
					updated_at?: string | null
				}
				Relationships: []
			}
			migrations: {
				Row: {
					executed_at: string | null
					hash: string
					id: number
					name: string
				}
				Insert: {
					executed_at?: string | null
					hash: string
					id: number
					name: string
				}
				Update: {
					executed_at?: string | null
					hash?: string
					id?: number
					name?: string
				}
				Relationships: []
			}
			objects: {
				Row: {
					bucket_id: string | null
					created_at: string | null
					id: string
					last_accessed_at: string | null
					metadata: Json | null
					name: string | null
					owner: string | null
					owner_id: string | null
					path_tokens: string[] | null
					updated_at: string | null
					version: string | null
				}
				Insert: {
					bucket_id?: string | null
					created_at?: string | null
					id?: string
					last_accessed_at?: string | null
					metadata?: Json | null
					name?: string | null
					owner?: string | null
					owner_id?: string | null
					path_tokens?: string[] | null
					updated_at?: string | null
					version?: string | null
				}
				Update: {
					bucket_id?: string | null
					created_at?: string | null
					id?: string
					last_accessed_at?: string | null
					metadata?: Json | null
					name?: string | null
					owner?: string | null
					owner_id?: string | null
					path_tokens?: string[] | null
					updated_at?: string | null
					version?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'objects_bucketId_fkey'
						columns: ['bucket_id']
						isOneToOne: false
						referencedRelation: 'buckets'
						referencedColumns: ['id']
					},
				]
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			can_insert_object: {
				Args: {
					bucketid: string
					name: string
					owner: string
					metadata: Json
				}
				Returns: undefined
			}
			extension: {
				Args: {
					name: string
				}
				Returns: string
			}
			filename: {
				Args: {
					name: string
				}
				Returns: string
			}
			foldername: {
				Args: {
					name: string
				}
				Returns: unknown
			}
			get_size_by_bucket: {
				Args: Record<PropertyKey, never>
				Returns: {
					size: number
					bucket_id: string
				}[]
			}
			search: {
				Args: {
					prefix: string
					bucketname: string
					limits?: number
					levels?: number
					offsets?: number
					search?: string
					sortcolumn?: string
					sortorder?: string
				}
				Returns: {
					name: string
					id: string
					updated_at: string
					created_at: string
					last_accessed_at: string
					metadata: Json
				}[]
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (Database['public']['Tables'] & Database['public']['Views'])
		| {schema: keyof Database},
	TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
				Database['public']['Views'])
		? (Database['public']['Tables'] &
				Database['public']['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R
			}
			? R
			: never
		: never

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| {schema: keyof Database},
	TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
		? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I
			}
			? I
			: never
		: never

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof Database['public']['Tables']
		| {schema: keyof Database},
	TableName extends PublicTableNameOrOptions extends {schema: keyof Database}
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends {schema: keyof Database}
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof Database['public']['Tables']
		? Database['public']['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U
			}
			? U
			: never
		: never

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof Database['public']['Enums']
		| {schema: keyof Database},
	EnumName extends PublicEnumNameOrOptions extends {schema: keyof Database}
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = PublicEnumNameOrOptions extends {schema: keyof Database}
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof Database['public']['Enums']
		? Database['public']['Enums'][PublicEnumNameOrOptions]
		: never
