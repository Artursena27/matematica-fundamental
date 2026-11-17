-- v2: sequência (XP diário), avisos, notificações push, horários da agenda, nivelamento, responsável
alter table academy.profiles add column if not exists diagnostico jsonb;
alter table academy.profiles add column if not exists responsavel_whatsapp text;
alter table academy.profiles add column if not exists meta_xp int not null default 20;

create table if not exists academy.atividade(
  student_id uuid not null references academy.profiles(id) on delete cascade default auth.uid(),
  dia date not null,
  xp int not null default 0,
  updated_at timestamptz default now(),
  primary key (student_id, dia)
);

create table if not exists academy.avisos(
  id bigint generated always as identity primary key,
  para uuid not null references academy.profiles(id) on delete cascade,
  titulo text not null,
  texto text,
  link text,
  tipo text not null default 'info',
  lido boolean not null default false,
  criado_por uuid default auth.uid(),
  created_at timestamptz default now()
);
create index if not exists avisos_para_idx on academy.avisos(para, lido);

create table if not exists academy.push_subs(
  id bigint generated always as identity primary key,
  user_id uuid not null references academy.profiles(id) on delete cascade default auth.uid(),
  endpoint text not null unique,
  sub jsonb not null,
  created_at timestamptz default now()
);

create table if not exists academy.config(chave text primary key, valor text);

create table if not exists academy.horarios(
  id bigint generated always as identity primary key,
  dia int not null check (dia between 0 and 6),
  hora text not null,
  ocupado boolean not null default false,
  obs text,
  created_at timestamptz default now()
);

-- aluno salva o próprio nivelamento (não pode mexer no resto do perfil)
create or replace function academy.salvar_diagnostico(d jsonb) returns void
language sql security definer set search_path = academy, public as $$
  update academy.profiles set diagnostico = d where id = auth.uid();
$$;
grant execute on function academy.salvar_diagnostico(jsonb) to authenticated;

-- aluno só pode marcar aviso como lido
create or replace function academy.guard_aviso() returns trigger
language plpgsql security definer set search_path = academy, public as $$
begin
  if not academy.is_teacher() then
    new.para := old.para; new.titulo := old.titulo; new.texto := old.texto; new.link := old.link; new.tipo := old.tipo; new.criado_por := old.criado_por;
  end if;
  return new;
end $$;
drop trigger if exists guard_aviso on academy.avisos;
create trigger guard_aviso before update on academy.avisos for each row execute function academy.guard_aviso();

-- avisos automáticos
create or replace function academy.aviso_lista() returns trigger
language plpgsql security definer set search_path = academy, public as $$
begin
  if tg_op = 'INSERT' then
    insert into academy.avisos(para, titulo, texto, link, tipo) values (new.student_id, 'Nova lista: ' || new.titulo, coalesce('Prazo: ' || to_char(new.prazo, 'DD/MM'), 'Responda quando puder.'), '#/lista/' || new.id, 'lista');
  elsif new.status = 'corrigida' and old.status is distinct from 'corrigida' then
    insert into academy.avisos(para, titulo, texto, link, tipo) values (new.student_id, 'Lista corrigida: ' || new.titulo, coalesce('Nota: ' || replace(new.nota::text, '.', ','), 'Veja a correção.'), '#/lista/' || new.id, 'correcao');
  end if;
  return new;
end $$;
drop trigger if exists aviso_lista on academy.assignments;
create trigger aviso_lista after insert or update on academy.assignments for each row execute function academy.aviso_lista();

create or replace function academy.aviso_duvida() returns trigger
language plpgsql security definer set search_path = academy, public as $$
begin
  if new.status = 'respondida' and old.status is distinct from 'respondida' then
    insert into academy.avisos(para, titulo, texto, link, tipo) values (new.student_id, 'O professor respondeu sua dúvida', left(coalesce(new.resposta, ''), 140), '#/duvidas', 'duvida');
  end if;
  return new;
end $$;
drop trigger if exists aviso_duvida on academy.doubts;
create trigger aviso_duvida after update on academy.doubts for each row execute function academy.aviso_duvida();

alter table academy.atividade enable row level security;
alter table academy.avisos    enable row level security;
alter table academy.push_subs enable row level security;
alter table academy.config    enable row level security;
alter table academy.horarios  enable row level security;

drop policy if exists at_all on academy.atividade;
create policy at_all on academy.atividade for all to authenticated
  using (student_id = auth.uid() or academy.is_teacher()) with check (student_id = auth.uid());

drop policy if exists av_sel on academy.avisos;
create policy av_sel on academy.avisos for select to authenticated using (para = auth.uid() or academy.is_teacher());
drop policy if exists av_ins on academy.avisos;
create policy av_ins on academy.avisos for insert to authenticated with check (academy.is_teacher());
drop policy if exists av_upd on academy.avisos;
create policy av_upd on academy.avisos for update to authenticated using (para = auth.uid() or academy.is_teacher());
drop policy if exists av_del on academy.avisos;
create policy av_del on academy.avisos for delete to authenticated using (para = auth.uid() or academy.is_teacher());

drop policy if exists ps_all on academy.push_subs;
create policy ps_all on academy.push_subs for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists hr_sel on academy.horarios;
create policy hr_sel on academy.horarios for select to anon, authenticated using (true);
drop policy if exists hr_ins on academy.horarios;
create policy hr_ins on academy.horarios for insert to authenticated with check (academy.is_teacher());
drop policy if exists hr_upd on academy.horarios;
create policy hr_upd on academy.horarios for update to authenticated using (academy.is_teacher()) with check (academy.is_teacher());
drop policy if exists hr_del on academy.horarios;
create policy hr_del on academy.horarios for delete to authenticated using (academy.is_teacher());

grant select, insert, update, delete on academy.atividade, academy.avisos, academy.push_subs, academy.horarios to authenticated;
grant select on academy.horarios to anon;
grant all on all tables in schema academy to service_role;
grant usage, select on all sequences in schema academy to authenticated, service_role;

-- horários atuais (só se a tabela estiver vazia)
insert into academy.horarios(dia, hora, ocupado)
select d, h, (d in (2,3,5) and h = '18:00')
from (values (1),(2),(3),(4),(5)) as dd(d), (values ('18:00'),('19:00'),('20:00')) as hh(h)
where not exists (select 1 from academy.horarios);
insert into academy.horarios(dia, hora, ocupado)
select 6, h, false from (values ('08:00'),('09:00'),('10:00'),('11:00')) as hh(h)
where not exists (select 1 from academy.horarios where dia = 6);

notify pgrst, 'reload schema';

-- aluno escolhe a própria meta diária
create or replace function academy.salvar_meta(m int) returns void
language sql security definer set search_path = academy, public as $$
  update academy.profiles set meta_xp = greatest(5, least(m, 100)) where id = auth.uid();
$$;
grant execute on function academy.salvar_meta(int) to authenticated;
notify pgrst, 'reload schema';
