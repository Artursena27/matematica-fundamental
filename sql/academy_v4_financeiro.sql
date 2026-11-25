-- v4: financeiro por aluno (aulas dadas, pagas e pendentes; horário fixo e valor da hora)
alter table academy.profiles add column if not exists valor_hora numeric;
alter table academy.profiles add column if not exists horario jsonb; -- {"desde":"2026-11-17","slots":[{"dia":2,"hora":"18:00","dur":60}]}

create table if not exists academy.aulas(
  id bigint generated always as identity primary key,
  student_id uuid not null references academy.profiles(id) on delete cascade,
  data date not null,
  hora text,
  duracao_min int not null default 60,
  valor numeric,
  status text not null default 'pendente' check (status in ('pendente','paga','cancelada')),
  pago_em timestamptz,
  obs text,
  criado_por uuid default auth.uid(),
  created_at timestamptz default now()
);
create index if not exists aulas_aluno_idx on academy.aulas(student_id, data);

alter table academy.aulas enable row level security;
drop policy if exists au_sel on academy.aulas;
create policy au_sel on academy.aulas for select to authenticated using (student_id = auth.uid() or academy.is_teacher());
drop policy if exists au_ins on academy.aulas;
create policy au_ins on academy.aulas for insert to authenticated with check (academy.is_teacher());
drop policy if exists au_upd on academy.aulas;
create policy au_upd on academy.aulas for update to authenticated using (academy.is_teacher()) with check (academy.is_teacher());
drop policy if exists au_del on academy.aulas;
create policy au_del on academy.aulas for delete to authenticated using (academy.is_teacher());
grant select, insert, update, delete on academy.aulas to authenticated;
grant all on academy.aulas to service_role;

-- configurações públicas (chave PIX): só chaves que começam com "pub_" ficam visíveis para os alunos
grant select, insert, update on academy.config to authenticated;
drop policy if exists cfg_sel on academy.config;
create policy cfg_sel on academy.config for select to authenticated using (left(chave, 4) = 'pub_');
drop policy if exists cfg_ins on academy.config;
create policy cfg_ins on academy.config for insert to authenticated with check (academy.is_teacher() and left(chave, 4) = 'pub_');
drop policy if exists cfg_upd on academy.config;
create policy cfg_upd on academy.config for update to authenticated using (academy.is_teacher() and left(chave, 4) = 'pub_') with check (academy.is_teacher() and left(chave, 4) = 'pub_');

grant usage, select on all sequences in schema academy to authenticated, service_role;
notify pgrst, 'reload schema';
