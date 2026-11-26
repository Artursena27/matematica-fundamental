-- v6b: dados do aluno Everton (rodar DEPOIS de academy_v6_expansao.sql).
-- Altera só o perfil de usuário "everton". Não cria usuário e não mexe em listas, progresso ou pagamentos.
-- Mensalidade de R$ 400, aulas segunda e quarta das 19h30 às 21h (90 min), a partir de 30/11/2026.
-- Com mensalidade, as aulas fixas não geram cobrança por aula (o app passa a lançar a mensalidade).
update academy.profiles
set ano = '4º ano',
    responsavel_nome = 'Igor (pai)',
    valor_mensal = 400.00,
    horario = jsonb_build_object(
      'desde', '2026-11-30',
      'slots', jsonb_build_array(
        jsonb_build_object('dia', 1, 'hora', '19:30', 'dur', 90),
        jsonb_build_object('dia', 3, 'hora', '19:30', 'dur', 90)
      )
    )
where username = 'everton' and role = 'aluno';

-- Conferência: deve mostrar 1 linha com 4º ano, Igor (pai) e 400.00
select nome, username, ano, responsavel_nome, valor_mensal, horario from academy.profiles where username = 'everton';
