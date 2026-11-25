-- v5: acompanhamento de atividade do aluno (visto por último, avisos lidos, o que abriu no app)
-- Registros guardados por 90 dias (a limpeza roda no agendador diário /api/lembretes).
alter table academy.profiles add column if not exists last_seen timestamptz;

create or replace function academy.ping() returns void
language sql security definer set search_path = academy, public as $$
  update academy.profiles set last_seen = now() where id = auth.uid();
$$;
grant execute on function academy.ping() to authenticated;

-- quando o aviso foi lido
alter table academy.avisos add column if not exists lido_em timestamptz;
create or replace function academy.aviso_lido() returns trigger
language plpgsql security definer set search_path = academy, public as $$
begin
  new.lido_em := case when new.lido and not coalesce(old.lido, false) then now() else old.lido_em end;
  return new;
end $$;
drop trigger if exists aviso_lido on academy.avisos;
create trigger aviso_lido before update on academy.avisos for each row execute function academy.aviso_lido();

create table if not exists academy.eventos(
  id bigint generated always as identity primary key,
  student_id uuid not null references academy.profiles(id) on delete cascade default auth.uid(),
  tipo text not null,
  ref text,
  detalhe jsonb,
  created_at timestamptz default now()
);
create index if not exists eventos_aluno_idx on academy.eventos(student_id, created_at desc);
alter table academy.eventos enable row level security;
drop policy if exists ev_ins on academy.eventos;
create policy ev_ins on academy.eventos for insert to authenticated with check (student_id = auth.uid());
drop policy if exists ev_sel on academy.eventos;
create policy ev_sel on academy.eventos for select to authenticated using (student_id = auth.uid() or academy.is_teacher());
drop policy if exists ev_del on academy.eventos;
create policy ev_del on academy.eventos for delete to authenticated using (academy.is_teacher());
grant select, insert, delete on academy.eventos to authenticated;
grant all on academy.eventos to service_role;
grant usage, select on all sequences in schema academy to authenticated, service_role;
notify pgrst, 'reload schema';
