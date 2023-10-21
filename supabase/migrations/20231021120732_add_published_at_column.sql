alter table "public"."videos" add column "published_at" timestamp with time zone not null default now();

CREATE INDEX videos_published_at ON videos (published_at);
