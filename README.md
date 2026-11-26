# Matemática Academy

Plataforma de apoio às aulas de Matemática Academy, com painel do professor e do aluno, conteúdo por ano escolar, listas, progresso, materiais em PDF e financeiro.

- `index.html` é o site pronto (gerado).
- `src/` tem o conteúdo: `t1.js`/`t1b.js` (números), `t2.js` (álgebra), `t3.js` (geometria, medidas, estatística) e `t4.js` (Matemática do 4º ano).
- Para regerar depois de editar: `node build.js && cp dist/index.html .`
- Para conferir os geradores de questões: `node test.js`

## Materiais em PDF
O professor envia, edita (disciplina, ano, assunto, título, descrição e destinatário), troca o arquivo e apaga PDFs em **Painel → Materiais (PDF)**. Materiais antigos permanecem classificados como Matemática. Português funciona como catálogo de assuntos e apoio em PDF, sem progresso ou listas. Os alunos veem os materiais no Início, na tela **Materiais** e dentro de cada assunto.
- A tabela e o bucket são criados por `sql/academy_v3_materiais.sql`. Para a expansão de anos, disciplinas, responsável e mensalidade fixa, rode `sql/academy_v6_expansao.sql` no SQL Editor do Supabase.
- Os arquivos vão direto do navegador para o Storage (até 25 MB) e os alunos abrem por links temporários gerados em `api/materiais.js`.

## Financeiro
Cada aluno tem a aba **Financeiro** (Alunos → aluno → Financeiro): mensalidade fixa opcional, horário fixo, valor da hora, aulas da agenda para confirmar ("Dei a aula" / "Não teve"), aulas avulsas, pagamentos pendentes, marcar como pago e cobrar pelo WhatsApp. A tela **Painel → Financeiro** mostra o total a receber por aluno e a chave PIX. O aluno vê os pagamentos (só leitura) no Início e em Perfil → Meus pagamentos.
- Antes de usar, rode `sql/academy_v4_financeiro.sql` no SQL Editor do Supabase.

## Atividade do aluno
Aba **Atividade** em cada aluno: online agora / visto por último, avisos vistos (e quando) e linha do tempo do que o aluno abriu (app, assuntos, questões e respostas, listas, PDFs, pagamentos, Professor IA). O aluno é informado em Perfil → Privacidade. Registros apagados após 90 dias pelo agendador diário. SQL: `sql/academy_v5_atividade.sql`.
