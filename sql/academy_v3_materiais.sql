-- v3: materiais em PDF enviados pelo professor (arquivos no Storage, bucket privado "materiais")
create table if not exists academy.materiais(
  id bigint generated always as identity primary key,
  titulo text not null,
  descricao text,
  topic_id text,
  para uuid references academy.profiles(id) on delete cascade, -- null = todos os alunos
  path text not null,
  nome_arquivo text,
  tamanho bigint,
  criado_por uuid default auth.uid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists materiais_para_idx on academy.materiais(para);
create index if not exists materiais_topic_idx on academy.materiais(topic_id);

alter table academy.materiais enable row level security;
drop policy if exists mt_sel on academy.materiais;
create policy mt_sel on academy.materiais for select to authenticated
  using (para is null or para = auth.uid() or academy.is_teacher());
-- envio, edição e exclusão passam pela rota /api/materiais (chave de serviço), que confere se é o professor
grant select on academy.materiais to authenticated;
grant all on academy.materiais to service_role;
grant usage, select on all sequences in schema academy to authenticated, service_role;

-- bucket privado só para PDF, até 25 MB (a rota /api/materiais também cria se não existir)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('materiais', 'materiais', false, 26214400, array['application/pdf'])
on conflict (id) do nothing;

notify pgrst, 'reload schema';
