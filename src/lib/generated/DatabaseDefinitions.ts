export type Json =
	| string
	| number
	| boolean
	| null
	| {[key: string]: Json | undefined}
	| Json[]

export interface Database {
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
						referencedRelation: 'prices'
						referencedColumns: ['id']
					},
					{
						foreignKeyName: 'subscriptions_user_id_fkey'
						columns: ['user_id']
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
			hnswhandler: {
				Args: {
					'': unknown
				}
				Returns: unknown
			}
			ivfflathandler: {
				Args: {
					'': unknown
				}
				Returns: unknown
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
					public?: boolean | null
					updated_at?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'buckets_owner_fkey'
						columns: ['owner']
						referencedRelation: 'users'
						referencedColumns: ['id']
					},
				]
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
					path_tokens?: string[] | null
					updated_at?: string | null
					version?: string | null
				}
				Relationships: [
					{
						foreignKeyName: 'objects_bucketId_fkey'
						columns: ['bucket_id']
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
