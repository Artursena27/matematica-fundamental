# Matemática Academy — instruções para o Claude

- Trabalhe **direto na branch `main`**: faça commit e push na `main`, sem criar branches nem pull requests. A Vercel publica automaticamente a cada push.
- Antes de cada push, rode `node build.js` (gera o `index.html`) e `node test.js`; só envie se os testes passarem.
- Migrations do Supabase ficam em `sql/` e são só aditivas: nunca apagar nem alterar dados de alunos, listas, progresso ou pagamentos.
- O app é pensado para celular; mantenha o visual atual.
