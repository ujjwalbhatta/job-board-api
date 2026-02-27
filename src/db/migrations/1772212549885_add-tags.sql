-- Up Migration
CREATE TABLE tags (
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE job_tags (
    job_id  INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    tag_id  INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (job_id, tag_id)
);

-- Down Migration
DROP TABLE IF EXISTS job_tags;
DROP TABLE IF EXISTS tags;