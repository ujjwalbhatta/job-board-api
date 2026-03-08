-- ─── clean slate ────────────────────────────────────────────────────────────
TRUNCATE applications, job_tags, jobs, candidates, tags, companies RESTART IDENTITY CASCADE;

-- ─── companies ──────────────────────────────────────────────────────────────
INSERT INTO companies (name, industry, size, location, website) VALUES
  ('Stripe',      'Fintech',         'enterprise', 'San Francisco', 'https://stripe.com'),
  ('Vercel',      'Developer Tools', 'mid',         'Remote',        'https://vercel.com'),
  ('Linear',      'Productivity',    'startup',     'Remote',        'https://linear.app'),
  ('PlanetScale', 'Database',        'mid',         'Remote',        'https://planetscale.com'),
  ('Resend',      'Developer Tools', 'startup',     'Remote',        'https://resend.com');

-- ─── tags ────────────────────────────────────────────────────────────────────
INSERT INTO tags (name) VALUES
  ('TypeScript'), ('PostgreSQL'), ('Node.js'), ('React'),
  ('Go'), ('Rust'), ('Docker'), ('AWS'), ('GraphQL'), ('Redis');

-- ─── jobs ────────────────────────────────────────────────────────────────────
INSERT INTO jobs (company_id, title, description, salary_min, salary_max, job_type, remote, status, seats) VALUES
  (1, 'Backend Engineer',        'Build payment infrastructure at scale',          120000, 180000, 'full-time',  true,  'open',   3),
  (1, 'Staff Engineer',          'Lead technical direction across teams',           180000, 240000, 'full-time',  true,  'open',   1),
  (1, 'DevOps Engineer',         'Own cloud infrastructure and CI/CD pipelines',   110000, 160000, 'full-time',  false, 'open',   2),
  (2, 'Frontend Engineer',       'Build the Vercel dashboard and CLI',             100000, 150000, 'full-time',  true,  'open',   2),
  (2, 'Developer Advocate',      'Help developers succeed with Vercel platform',    90000, 130000, 'full-time',  true,  'open',   1),
  (3, 'Product Engineer',        'Work across the full stack on Linear app',       110000, 160000, 'full-time',  true,  'open',   2),
  (3, 'iOS Engineer',            'Build the native iOS client for Linear',         100000, 150000, 'full-time',  true,  'draft',  1),
  (4, 'Database Engineer',       'Work on PlanetScale core database engine',       130000, 190000, 'full-time',  true,  'open',   2),
  (4, 'Solutions Engineer',      'Help enterprises adopt PlanetScale',              90000, 130000, 'full-time',  false, 'closed', 1),
  (5, 'Founding Engineer',       'First engineering hire at Resend',               100000, 160000, 'full-time',  true,  'open',   1),
  (5, 'Growth Engineer',         'Own acquisition and activation funnels',          80000, 120000, 'contract',   true,  'open',   1),
  (1, 'Data Engineer',           'Build data pipelines for financial analytics',   115000, 165000, 'full-time',  false, 'open',   2),
  (2, 'Infrastructure Engineer', 'Scale Vercel edge network globally',             120000, 170000, 'full-time',  true,  'open',   1),
  (3, 'Design Engineer',         'Bridge design and engineering at Linear',         95000, 140000, 'full-time',  true,  'open',   2),
  (4, 'Backend Engineer',        'Build APIs for PlanetScale console',             110000, 155000, 'full-time',  true,  'open',   3);

-- ─── job_tags ────────────────────────────────────────────────────────────────
INSERT INTO job_tags (job_id, tag_id) VALUES
  (1, 1), (1, 2), (1, 3), (1, 7),   -- Stripe Backend: TS, PG, Node, Docker
  (2, 1), (2, 3), (2, 8),            -- Stripe Staff: TS, Node, AWS
  (3, 7), (3, 8),                    -- Stripe DevOps: Docker, AWS
  (4, 1), (4, 4),                    -- Vercel Frontend: TS, React
  (5, 1), (5, 4), (5, 9),            -- Vercel Advocate: TS, React, GraphQL
  (6, 1), (6, 3), (6, 2),            -- Linear Product: TS, Node, PG
  (7, 1),                            -- Linear iOS: TS
  (8, 5), (8, 2), (8, 10),           -- PlanetScale DB: Go, PG, Redis
  (9, 1), (9, 3),                    -- PlanetScale Solutions: TS, Node
  (10, 1), (10, 3), (10, 7),         -- Resend Founding: TS, Node, Docker
  (11, 1), (11, 4),                  -- Resend Growth: TS, React
  (12, 5), (12, 2), (12, 8),         -- Stripe Data: Go, PG, AWS
  (13, 7), (13, 8), (13, 6),         -- Vercel Infra: Docker, AWS, Rust
  (14, 1), (14, 4),                  -- Linear Design: TS, React
  (15, 1), (15, 3), (15, 2);         -- PlanetScale Backend: TS, Node, PG

-- ─── candidates ──────────────────────────────────────────────────────────────
INSERT INTO candidates (name, email, phone, skills, bio) VALUES
  ('Alice Chen',    'alice@example.com',   '+1-555-0101', ARRAY['TypeScript','PostgreSQL','Node.js'], 'Full stack engineer with 5 years experience'),
  ('Bob Patel',     'bob@example.com',     '+1-555-0102', ARRAY['Go','Docker','AWS'],                 'Backend engineer focused on distributed systems'),
  ('Carol Kim',     'carol@example.com',   '+1-555-0103', ARRAY['React','TypeScript','GraphQL'],      'Frontend engineer who loves design systems'),
  ('David Osei',    'david@example.com',   '+1-555-0104', ARRAY['Rust','Go','PostgreSQL'],            'Systems engineer with database internals experience'),
  ('Emma Wilson',   'emma@example.com',    '+1-555-0105', ARRAY['TypeScript','Node.js','Redis'],      'API engineer with fintech background'),
  ('Felix Torres',  'felix@example.com',   '+1-555-0106', ARRAY['Docker','AWS','Rust'],               'DevOps engineer who builds reliable infra'),
  ('Grace Liu',     'grace@example.com',   '+1-555-0107', ARRAY['TypeScript','React','Node.js'],      'Product engineer who ships fast'),
  ('Henry Park',    'henry@example.com',   '+1-555-0108', ARRAY['PostgreSQL','Go','Redis'],           'Database engineer with 8 years experience'),
  ('Iris Nakamura', 'iris@example.com',    '+1-555-0109', ARRAY['TypeScript','GraphQL','React'],      'Frontend engineer with API design experience'),
  ('James Moore',   'james@example.com',   '+1-555-0110', ARRAY['Node.js','TypeScript','Docker'],     'Backend engineer interested in developer tools');

-- ─── applications (spread across last 30 days for analytics) ────────────────
INSERT INTO applications (job_id, candidate_id, status, cover_letter, applied_at) VALUES
  -- today
  (1,  1,  'pending',  'Excited to work on payment infra',         NOW()),
  (4,  3,  'pending',  'Love building UI at scale',                NOW()),
  (10, 5,  'pending',  'Want to be a founding engineer',           NOW()),

  -- yesterday
  (1,  2,  'reviewed', 'Strong distributed systems background',    NOW() - INTERVAL '1 day'),
  (6,  7,  'pending',  'Big Linear fan, use it daily',             NOW() - INTERVAL '1 day'),
  (8,  4,  'pending',  'Deep DB internals knowledge',              NOW() - INTERVAL '1 day'),

  -- 2 days ago
  (2,  5,  'reviewed', 'Led multiple platform migrations',         NOW() - INTERVAL '2 days'),
  (15, 1,  'pending',  'Love working on console tooling',          NOW() - INTERVAL '2 days'),

  -- 3 days ago
  (1,  7,  'rejected', 'Interested in fintech challenges',         NOW() - INTERVAL '3 days'),
  (13, 6,  'pending',  'Built edge infra at previous role',        NOW() - INTERVAL '3 days'),
  (12, 8,  'reviewed', 'Built Spark pipelines for 5 years',        NOW() - INTERVAL '3 days'),

  -- 5 days ago
  (3,  6,  'accepted', 'Extensive k8s and Terraform experience',   NOW() - INTERVAL '5 days'),
  (11, 9,  'pending',  'Growth hacking experience at two startups',NOW() - INTERVAL '5 days'),

  -- 7 days ago
  (4,  10, 'reviewed', 'React performance optimization expert',    NOW() - INTERVAL '7 days'),
  (6,  1,  'pending',  'Full stack with strong PG knowledge',      NOW() - INTERVAL '7 days'),
  (8,  2,  'rejected', 'Go experience at high scale',              NOW() - INTERVAL '7 days'),

  -- 10 days ago
  (1,  9,  'reviewed', 'GraphQL and REST API experience',          NOW() - INTERVAL '10 days'),
  (2,  4,  'accepted', 'Led architecture at previous company',     NOW() - INTERVAL '10 days'),
  (10, 3,  'reviewed', 'Excited about email infra space',          NOW() - INTERVAL '10 days'),

  -- 14 days ago
  (5,  7,  'pending',  'Passionate about developer education',     NOW() - INTERVAL '14 days'),
  (14, 3,  'pending',  'Design systems background',                NOW() - INTERVAL '14 days'),
  (15, 5,  'reviewed', 'Node and PG production experience',        NOW() - INTERVAL '14 days'),

  -- 18 days ago
  (1,  4,  'rejected', 'Systems background, learning fintech',     NOW() - INTERVAL '18 days'),
  (6,  10, 'pending',  'TypeScript across the stack',              NOW() - INTERVAL '18 days'),
  (13, 2,  'accepted', 'Built CDN infrastructure previously',      NOW() - INTERVAL '18 days'),

  -- 21 days ago
  (4,  5,  'reviewed', 'React and TS for 4 years',                 NOW() - INTERVAL '21 days'),
  (8,  1,  'pending',  'PostgreSQL internals contributor',         NOW() - INTERVAL '21 days'),
  (12, 4,  'reviewed', 'Go data pipelines at scale',               NOW() - INTERVAL '21 days'),

  -- 25 days ago
  (1,  6,  'reviewed', 'DevOps background moving to backend',      NOW() - INTERVAL '25 days'),
  (10, 7,  'accepted', 'Founding engineer experience',             NOW() - INTERVAL '25 days'),
  (3,  8,  'rejected', 'AWS certified, strong CI/CD background',   NOW() - INTERVAL '25 days'),

  -- 28 days ago
  (2,  9,  'reviewed', 'Platform engineering at FAANG',            NOW() - INTERVAL '28 days'),
  (11, 10, 'pending',  'Growth and analytics background',          NOW() - INTERVAL '28 days'),
  (15, 8,  'reviewed', 'Database and API work for 6 years',        NOW() - INTERVAL '28 days');