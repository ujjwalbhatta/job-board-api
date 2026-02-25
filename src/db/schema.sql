CREATE TABLE companies (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL UNIQUE,
    industry    VARCHAR(255),
    size        VARCHAR(50) CHECK (size IN ('startup', 'mid', 'enterprise')),
    location    VARCHAR(255),
    website     VARCHAR(500),
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE jobs (
    id           SERIAL PRIMARY KEY,
    company_id   INTEGER NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    title        VARCHAR(255) NOT NULL,
    description  TEXT,
    salary_min   INTEGER,
    salary_max   INTEGER,
    job_type     VARCHAR(50) CHECK (job_type IN ('full-time','part-time','contract','internship')),
    remote       BOOLEAN DEFAULT false,
    status       VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open','closed','draft')),
    posted_at    TIMESTAMPTZ DEFAULT NOW(),
    expires_at   TIMESTAMPTZ,
    seats        INTEGER DEFAULT 1,
    updated_at   TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT   salary_check CHECK (salary_min <= salary_max )
);

CREATE TABLE candidates (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    phone       VARCHAR(50),
    -- skills      TEXT[],
    bio         TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE applications (
    id              SERIAL PRIMARY KEY,
    job_id          INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    candidate_id    INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    status          VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'rejected', 'accepted')),
    cover_letter    TEXT,
    applied_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT      unique_application UNIQUE (job_id, candidate_id)
);