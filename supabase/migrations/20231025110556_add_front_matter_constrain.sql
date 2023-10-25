CREATE EXTENSION IF NOT EXISTS pg_jsonschema;

ALTER TABLE videos
ADD CONSTRAINT front_matter_schema
CHECK (
	jsonb_matches_schema(
    schema :='{
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "snippet": {
          "type": "string"
        },
        "youtubeId": {
          "type": "string"
        },
        "publishedAt": {
          "type": "string"
        },
        "appUrl": {
          "type": "string"
        },
        "githubUrl": {
          "type": "string"
        }
      },
      "required": ["title", "snippet", "youtubeId", "publishedAt"]
    }',
    instance := front_matter
  )
);
