-- ════════════════════════════════════════════════════════════════════
-- PAKISTAN PROPERTY PORTAL — SUPABASE DATABASE SETUP
-- ════════════════════════════════════════════════════════════════════
-- Run this entire script in your Supabase SQL Editor

-- 1. Create Agents Table
create table public.agents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id),
  name text not null,
  agency text,
  city text,
  phone text,
  whatsapp text,
  email text,
  photo_url text,
  languages text[] default '{}',
  total_listings integer default 0,
  rating numeric default 0,
  review_count integer default 0,
  experience text,
  bio text,
  specializations text[] default '{}',
  is_verified boolean default false,
  created_at timestamptz default now()
);

alter table public.agents enable row level security;
create policy "Public can read agents" on public.agents for select using (true);
create policy "Agents can update own profile" on public.agents for update using (auth.uid() = user_id);

-- 2. Create Properties Table
create table public.properties (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  type text not null check (type in ('House','Flat','Plot','Commercial','Room')),
  purpose text not null check (purpose in ('Sale','Rent')),
  price bigint not null,
  price_label text not null,
  city text not null,
  area text not null,
  address text not null,
  bedrooms integer default 0,
  bathrooms integer default 0,
  area_size numeric not null,
  area_unit text not null default 'Marla',
  description text,
  features text[] default '{}',
  images text[] default '{}',
  agent_id uuid references public.agents(id),
  is_verified boolean default false,
  is_featured boolean default false,
  is_active boolean default true,
  views integer default 0,
  lat numeric,
  lng numeric,
  posted_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.properties enable row level security;
create policy "Public can read active properties" on public.properties for select using (is_active = true);
create policy "Users can insert own properties" on public.properties for insert with check (auth.uid() = posted_by);
create policy "Users can update own properties" on public.properties for update using (auth.uid() = posted_by);
create policy "Users can delete own properties" on public.properties for delete using (auth.uid() = posted_by);

-- 3. Create Projects Table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  developer text,
  city text not null,
  location text,
  price_min bigint,
  price_max bigint,
  price_label text,
  status text check (status in ('Under Construction','Ready','Pre-Launch')),
  completion_date text,
  description text,
  amenities text[] default '{}',
  cover_image text,
  images text[] default '{}',
  is_trending boolean default false,
  lat numeric,
  lng numeric,
  created_at timestamptz default now()
);

alter table public.projects enable row level security;
create policy "Public can read projects" on public.projects for select using (true);

-- 4. Create Project Units Table
create table public.project_units (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  unit_type text,
  size text,
  price text,
  created_at timestamptz default now()
);

alter table public.project_units enable row level security;
create policy "Public can read project units" on public.project_units for select using (true);

-- 5. Create Blog Posts Table
create table public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  category text,
  author text,
  author_photo text,
  publish_date date,
  read_time text,
  cover_image text,
  tags text[] default '{}',
  is_published boolean default true,
  created_at timestamptz default now()
);

alter table public.blog_posts enable row level security;
create policy "Public can read published posts" on public.blog_posts for select using (is_published = true);

-- 6. Create Forum Categories Table
create table public.forum_categories (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  description text,
  topic_count integer default 0,
  new_topics integer default 0,
  sort_order integer default 0
);

alter table public.forum_categories enable row level security;
create policy "Public can read forum categories" on public.forum_categories for select using (true);

-- 7. Create Forum Topics Table
create table public.forum_topics (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references public.forum_categories(id),
  title text not null,
  author text,
  user_id uuid references auth.users(id),
  replies integer default 0,
  views integer default 0,
  is_hot boolean default false,
  last_activity_at timestamptz default now(),
  created_at timestamptz default now()
);

alter table public.forum_topics enable row level security;
create policy "Public can read forum topics" on public.forum_topics for select using (true);
create policy "Users can create forum topics" on public.forum_topics for insert with check (auth.uid() = user_id);

-- 8. Create Inquiries Table
create table public.inquiries (
  id uuid default gen_random_uuid() primary key,
  property_id uuid references public.properties(id),
  agent_id uuid references public.agents(id),
  sender_name text not null,
  sender_email text,
  sender_phone text,
  message text,
  is_read boolean default false,
  created_at timestamptz default now()
);

alter table public.inquiries enable row level security;
create policy "Anyone can create inquiries" on public.inquiries for insert with check (true);

-- 9. Create Settings Table
create table public.settings (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);

alter table public.settings enable row level security;
create policy "Public can read settings" on public.settings for select using (true);

insert into public.settings (key, value) values
  ('usd_to_pkr_rate', '279.50'),
  ('last_rate_update', now()::text),
  ('site_name', 'Pakistan Property Portal'),
  ('contact_email', 'info@pakistanproperty.pk'),
  ('contact_phone', '+92-51-111-999-888');

-- 10. Create Wishlists Table
create table public.property_wishlists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  property_id uuid references public.properties(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, property_id)
);

alter table public.property_wishlists enable row level security;
create policy "Users manage own wishlist" on public.property_wishlists for all using (auth.uid() = user_id);

-- 11. Create User Profiles Table
create table public.user_profiles (
  id uuid references auth.users(id) primary key,
  full_name text,
  phone text,
  city text,
  role text default 'user' check (role in ('user','agent','admin')),
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.user_profiles enable row level security;
create policy "Public can read profiles" on public.user_profiles for select using (true);
create policy "Users update own profile" on public.user_profiles for update using (auth.uid() = id);

-- 12. Helper Functions & Triggers
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function increment_property_views(property_id uuid)
returns void as $$
begin
  update public.properties
  set views = views + 1
  where id = property_id;
end;
$$ language plpgsql security definer;

-- 13. Storage Setup (SQL for bucket creation if needed, but usually done via UI)
-- Note: bucket creation via SQL requires certain extensions/permissions.
-- It's safer to create buckets 'property-images', 'agent-photos', 'project-images', 'blog-covers' in the UI.
