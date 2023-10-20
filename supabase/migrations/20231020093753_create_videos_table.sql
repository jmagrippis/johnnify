create table "public"."videos" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "slug" text not null,
    "content" text not null,
    "front_matter" jsonb not null default '{}'::jsonb,
    "checksum" text not null,
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."videos" enable row level security;

CREATE UNIQUE INDEX videos_pkey ON public.videos USING btree (id);

CREATE UNIQUE INDEX videos_slug_key ON public.videos USING btree (slug);

alter table "public"."videos" add constraint "videos_pkey" PRIMARY KEY using index "videos_pkey";

alter table "public"."videos" add constraint "videos_slug_key" UNIQUE using index "videos_slug_key";

create policy "Enable read access for all users"
on "public"."videos"
as permissive
for select
to public
using (true);
