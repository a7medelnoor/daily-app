-- Daily: habits and check-ins. Run in Supabase → SQL Editor.

create table public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 60),
  created_at timestamptz not null default now()
);

create table public.checkins (
  habit_id uuid not null references public.habits (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  day date not null, -- the user's local calendar day, sent by the app
  primary key (habit_id, day)
);

create index habits_user_id_idx on public.habits (user_id);
create index checkins_user_id_idx on public.checkins (user_id);

-- Row-level security: without these lines, anyone with the publishable key can read every row.
alter table public.habits enable row level security;
alter table public.checkins enable row level security;

-- A signed-in user can read, add, change and delete only rows where user_id is their own id.
create policy "Users manage their own habits" on public.habits
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Same rule for check-ins, plus the habit being checked must also belong to the user.
create policy "Users manage their own check-ins" on public.checkins
  for all to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id
    and exists (select 1 from public.habits h where h.id = habit_id and h.user_id = (select auth.uid()))
  );
