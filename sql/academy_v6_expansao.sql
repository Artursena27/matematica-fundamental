-- v6: expansão para 4º/5º ano, disciplinas nos materiais e mensalidade fixa
-- A tabela profiles já armazena ano como texto, sem CHECK/ENUM restritivo.
alter table academy.profiles add column if not exists responsavel_nome text;
alter table academy.profiles add column if not exists responsavel_whatsapp text;
alter table academy.profiles add column if not exists valor_mensal numeric(10,2);

-- Materiais antigos passam a ser Matemática, sem alterar destinatários, arquivos ou assuntos.
alter table academy.materiais add column if not exists disciplina text not null default 'Matemática';
alter table academy.materiais add column if not exists ano text;
alter table academy.materiais add column if not exists assunto text;
update academy.materiais set disciplina = 'Matemática' where disciplina is null or btrim(disciplina) = '' or disciplina not in ('Matemática','Português');
alter table academy.materiais alter column disciplina set default 'Matemática';
alter table academy.materiais drop constraint if exists materiais_disciplina_check;
alter table academy.materiais add constraint materiais_disciplina_check
  check (disciplina in ('Matemática','Português'));

-- O aluno provisório theo passa para o 4º ano e recebe os dados contratuais informados.
-- Se o perfil ainda não existir, esta atualização não cria um usuário nem altera outros registros.
update academy.profiles
set ano = '4º ano',
    responsavel_nome = 'Igor',
    valor_mensal = 400.00,
    horario = jsonb_build_object(
      'desde', '2026-11-30',
      'slots', jsonb_build_array(
        jsonb_build_object('dia', 1, 'hora', '19:30', 'dur', 90),
        jsonb_build_object('dia', 3, 'hora', '19:30', 'dur', 90)
      )
    )
where username = 'theo' and role = 'aluno';

create index if not exists materiais_disciplina_idx on academy.materiais(disciplina, ano);
notify pgrst, 'reload schema';
