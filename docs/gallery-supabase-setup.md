# Cloud gallery (Supabase) — setup

Lets any committee member add/remove gallery photos from the website's **Admin** page
(no code, no local files). One-time setup, ~10 minutes.

## 1. Create the Supabase project
1. Go to https://supabase.com → sign up (free) → **New project**. Pick a name + password, choose a region (London/EU).
2. When it's ready, open **Project Settings → API** and copy:
   - **Project URL** (e.g. `https://abcd1234.supabase.co`)
   - **service_role** key (under "Project API keys" — this is SECRET, server-side only)

## 2. Create the storage bucket
1. **Storage → New bucket** → name it exactly `gallery` → tick **Public bucket** → Create.

## 3. Create the database table
1. **SQL Editor → New query**, paste and run:
```sql
create table if not exists gallery (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  category text not null,
  caption text,
  path text,
  url text
);

-- shop items (managed from /admin → Shop tab)
create table if not exists shop (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  name text not null,
  price numeric not null default 0,
  kind text not null default 'practice',
  sizes text,
  descr text,
  path text,
  url text
);

-- kit orders (captured from the shop basket; view/export in /admin → Orders tab)
create table if not exists orders (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  name text, email text, phone text, notes text,
  total numeric, items jsonb,
  status text default 'received'
);
-- if the orders table already exists without status, run this once:
alter table orders add column if not exists status text default 'received';

-- site settings (e.g. order window open/closed)
create table if not exists settings (
  key text primary key,
  value text
);
insert into settings(key,value) values ('order_window','open') on conflict (key) do nothing;
```

## 4. Tell the website (env vars on Vercel)
From the project folder:
```
printf "https://YOUR-PROJECT.supabase.co" | vercel env add SUPABASE_URL production
printf "YOUR-SERVICE-ROLE-KEY"            | vercel env add SUPABASE_SERVICE_KEY production
vercel --prod --yes
```
(or add them in the Vercel dashboard → Settings → Environment Variables, then redeploy).

## 5. Use it
- Go to **/admin** on the site → log in with the **admin password** (set as `ADMIN_PASSWORD`).
- Upload a photo, choose the gallery/category, tick consent → it appears on the public Gallery for everyone.
- Delete removes it from the cloud too.

## Notes
- `ADMIN_PASSWORD` + `ADMIN_SESSION` are already set on Vercel (admin password can be changed any time).
- The **service_role key is powerful** — it's only ever stored as a Vercel env var, never in the website code.
- Uploads are admin-only (no public submissions). Only publish photos you have consent for.
