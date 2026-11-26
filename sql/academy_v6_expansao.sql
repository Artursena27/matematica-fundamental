-- v6: expansão para 4º/5º ano, disciplinas nos materiais, dados do responsável e mensalidade fixa.
-- Só ADICIONA colunas/constraints. Nenhum aluno, lista, progresso ou pagamento existente é apagado ou alterado.
-- Os dados do Theo ficam em sql/academy_v6b_theo.sql (rodar depois deste).

-- Anos: profiles.ano é texto livre, sem CHECK nem ENUM, então 4º e 5º ano já são aceitos pelo banco.
-- A validação da lista de anos fica em api/alunos.js.

-- Responsável (só o professor vê) e mensalidade fixa
alter table academy.profiles add column if not exists responsavel_nome text;
alter table academy.profiles add column if not exists responsavel_whatsapp text;
alter table academy.profiles add column if not exists valor_mensal numeric(10,2);

-- Disciplina dos materiais: tudo o que já existe vira Matemática (pelo default da coluna nova)
alter table academy.materiais add column if not exists disciplina text not null default 'Matemática';
alter table academy.materiais add column if not exists ano text;
alter table academy.materiais add column if not exists assunto text;
update academy.materiais set disciplina = 'Matemática' where disciplina is null or btrim(disciplina) = '' or disciplina not in ('Matemática','Português');
alter table academy.materiais drop constraint if exists materiais_disciplina_check;
alter table academy.materiais add constraint materiais_disciplina_check check (disciplina in ('Matemática','Português'));
create index if not exists materiais_disciplina_idx on academy.materiais(disciplina, ano);

-- Lançamentos financeiros: aula (como hoje) ou mensalidade. Lançamentos existentes ficam como 'aula'.
alter table academy.aulas add column if not exists tipo text not null default 'aula';
alter table academy.aulas drop constraint if exists aulas_tipo_check;
alter table academy.aulas add constraint aulas_tipo_check check (tipo in ('aula','mensalidade'));

notify pgrst, 'reload schema';
