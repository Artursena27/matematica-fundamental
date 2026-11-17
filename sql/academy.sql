-- Plataforma de matemática: schema separado "academy" dentro do projeto Supabase.
create schema if not exists academy;
grant usage on schema academy to anon, authenticated, service_role;

create table if not exists academy.profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'aluno' check (role in ('aluno','professor')),
  nome text not null,
  username text unique,
  ano text,
  created_at timestamptz default now()
);

create or replace function academy.is_teacher() returns boolean
language sql stable security definer set search_path = academy, public as $$
  select exists(select 1 from academy.profiles where id = auth.uid() and role = 'professor');
$$;

create table if not exists academy.progress(
  student_id uuid not null references academy.profiles(id) on delete cascade default auth.uid(),
  topic_id text not null,
  teoria boolean default false,
  acertos jsonb not null default '{}'::jsonb,
  pct int not null default 0,
  updated_at timestamptz default now(),
  primary key (student_id, topic_id)
);

create table if not exists academy.notes(
  id bigint generated always as identity primary key,
  student_id uuid not null references academy.profiles(id) on delete cascade default auth.uid(),
  topic_id text,
  texto text not null,
  dificuldade boolean default false,
  created_at timestamptz default now()
);

create table if not exists academy.plan_items(
  id bigint generated always as identity primary key,
  student_id uuid not null references academy.profiles(id) on delete cascade,
  topic_id text,
  titulo text not null,
  data date,
  feito boolean default false,
  criado_por uuid default auth.uid(),
  created_at timestamptz default now()
);

create table if not exists academy.exercises(
  id bigint generated always as identity primary key,
  topic_id text not null,
  q text not null,
  a text not null,
  s text,
  criado_por uuid default auth.uid(),
  created_at timestamptz default now()
);

create table if not exists academy.assignments(
  id bigint generated always as identity primary key,
  student_id uuid not null references academy.profiles(id) on delete cascade,
  titulo text not null,
  topic_id text,
  itens jsonb not null,
  prazo date,
  status text not null default 'enviada' check (status in ('enviada','entregue','corrigida')),
  respostas jsonb,
  correcao jsonb,
  nota numeric,
  feedback text,
  created_at timestamptz default now(),
  entregue_em timestamptz,
  corrigida_em timestamptz
);

create table if not exists academy.doubts(
  id bigint generated always as identity primary key,
  student_id uuid not null references academy.profiles(id) on delete cascade default auth.uid(),
  topic_id text,
  texto text not null,
  imagem text,
  status text not null default 'aberta' check (status in ('aberta','respondida')),
  resposta text,
  created_at timestamptz default now(),
  respondida_em timestamptz
);

-- Aluno não consegue mexer na correção, nota, itens nem reabrir lista corrigida
create or replace function academy.guard_assign() returns trigger
language plpgsql security definer set search_path = academy, public as $$
begin
  if not academy.is_teacher() then
    new.student_id := old.student_id; new.titulo := old.titulo; new.topic_id := old.topic_id;
    new.itens := old.itens; new.prazo := old.prazo; new.correcao := old.correcao;
    new.nota := old.nota; new.feedback := old.feedback; new.corrigida_em := old.corrigida_em;
    if old.status = 'corrigida' then
      new.respostas := old.respostas; new.status := old.status; new.entregue_em := old.entregue_em;
    elsif new.status not in ('enviada','entregue') then
      new.status := old.status;
    end if;
  end if;
  return new;
end $$;
drop trigger if exists guard_assign on academy.assignments;
create trigger guard_assign before update on academy.assignments for each row execute function academy.guard_assign();

-- Aluno não responde a própria dúvida
create or replace function academy.guard_doubt() returns trigger
language plpgsql security definer set search_path = academy, public as $$
begin
  if not academy.is_teacher() then
    new.resposta := old.resposta; new.status := old.status; new.respondida_em := old.respondida_em; new.student_id := old.student_id;
  end if;
  return new;
end $$;
drop trigger if exists guard_doubt on academy.doubts;
create trigger guard_doubt before update on academy.doubts for each row execute function academy.guard_doubt();

alter table academy.profiles   enable row level security;
alter table academy.progress   enable row level security;
alter table academy.notes      enable row level security;
alter table academy.plan_items enable row level security;
alter table academy.exercises  enable row level security;
alter table academy.assignments enable row level security;
alter table academy.doubts     enable row level security;

drop policy if exists prof_sel on academy.profiles;
create policy prof_sel on academy.profiles for select to authenticated using (id = auth.uid() or academy.is_teacher());
drop policy if exists prof_upd on academy.profiles;
create policy prof_upd on academy.profiles for update to authenticated using (academy.is_teacher()) with check (academy.is_teacher());

drop policy if exists prog_all on academy.progress;
create policy prog_all on academy.progress for all to authenticated
  using (student_id = auth.uid() or academy.is_teacher()) with check (student_id = auth.uid());

drop policy if exists notes_sel on academy.notes;
create policy notes_sel on academy.notes for select to authenticated using (student_id = auth.uid() or academy.is_teacher());
drop policy if exists notes_ins on academy.notes;
create policy notes_ins on academy.notes for insert to authenticated with check (student_id = auth.uid());
drop policy if exists notes_upd on academy.notes;
create policy notes_upd on academy.notes for update to authenticated using (student_id = auth.uid()) with check (student_id = auth.uid());
drop policy if exists notes_del on academy.notes;
create policy notes_del on academy.notes for delete to authenticated using (student_id = auth.uid());

drop policy if exists plan_all on academy.plan_items;
create policy plan_all on academy.plan_items for all to authenticated
  using (student_id = auth.uid() or academy.is_teacher()) with check (student_id = auth.uid() or academy.is_teacher());

drop policy if exists ex_sel on academy.exercises;
create policy ex_sel on academy.exercises for select to authenticated using (true);
drop policy if exists ex_ins on academy.exercises;
create policy ex_ins on academy.exercises for insert to authenticated with check (academy.is_teacher());
drop policy if exists ex_upd on academy.exercises;
create policy ex_upd on academy.exercises for update to authenticated using (academy.is_teacher()) with check (academy.is_teacher());
drop policy if exists ex_del on academy.exercises;
create policy ex_del on academy.exercises for delete to authenticated using (academy.is_teacher());

drop policy if exists as_sel on academy.assignments;
create policy as_sel on academy.assignments for select to authenticated using (student_id = auth.uid() or academy.is_teacher());
drop policy if exists as_ins on academy.assignments;
create policy as_ins on academy.assignments for insert to authenticated with check (academy.is_teacher());
drop policy if exists as_upd on academy.assignments;
create policy as_upd on academy.assignments for update to authenticated using (student_id = auth.uid() or academy.is_teacher());
drop policy if exists as_del on academy.assignments;
create policy as_del on academy.assignments for delete to authenticated using (academy.is_teacher());

drop policy if exists dv_sel on academy.doubts;
create policy dv_sel on academy.doubts for select to authenticated using (student_id = auth.uid() or academy.is_teacher());
drop policy if exists dv_ins on academy.doubts;
create policy dv_ins on academy.doubts for insert to authenticated with check (student_id = auth.uid());
drop policy if exists dv_upd on academy.doubts;
create policy dv_upd on academy.doubts for update to authenticated using (student_id = auth.uid() or academy.is_teacher());
drop policy if exists dv_del on academy.doubts;
create policy dv_del on academy.doubts for delete to authenticated using (student_id = auth.uid() or academy.is_teacher());

grant select, insert, update, delete on all tables in schema academy to authenticated;
grant all on all tables in schema academy to service_role;
grant usage, select on all sequences in schema academy to authenticated, service_role;
grant execute on function academy.is_teacher() to authenticated, service_role;
