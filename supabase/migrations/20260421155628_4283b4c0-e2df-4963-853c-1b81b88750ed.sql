-- Roles enum & table
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view own roles"
  on public.user_roles for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Admins can view all roles"
  on public.user_roles for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can manage roles"
  on public.user_roles for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Videos
create type public.video_category as enum ('serious', 'creative');
create type public.video_platform as enum ('YouTube', 'Instagram', 'TikTok');

create table public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  platform video_platform not null,
  embed_url text not null,
  category video_category not null,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.videos enable row level security;

create policy "Anyone can view videos"
  on public.videos for select
  using (true);

create policy "Admins can insert videos"
  on public.videos for insert
  to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update videos"
  on public.videos for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete videos"
  on public.videos for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Trust items
create type public.trust_kind as enum ('logo', 'creator');

create table public.trust_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  kind trust_kind not null,
  initials text,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.trust_items enable row level security;

create policy "Anyone can view trust items"
  on public.trust_items for select using (true);

create policy "Admins can insert trust items"
  on public.trust_items for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update trust items"
  on public.trust_items for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete trust items"
  on public.trust_items for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Testimonials
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  role text not null,
  company text not null,
  initials text not null,
  avatar_url text,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "Anyone can view testimonials"
  on public.testimonials for select using (true);

create policy "Admins can insert testimonials"
  on public.testimonials for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update testimonials"
  on public.testimonials for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete testimonials"
  on public.testimonials for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Updated_at triggers
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

create trigger videos_touch before update on public.videos
  for each row execute function public.touch_updated_at();
create trigger trust_items_touch before update on public.trust_items
  for each row execute function public.touch_updated_at();
create trigger testimonials_touch before update on public.testimonials
  for each row execute function public.touch_updated_at();