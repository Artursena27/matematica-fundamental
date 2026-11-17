// Cria a conta do professor na primeira vez (só funciona enquanto não existe professor).
const { json, readBody, faltaConfig, rest, adminAuth, URL_, ANON } = require('./_lib');
module.exports = async (req, res) => {
  const falta = faltaConfig();
  if (falta.length) return json(res, 500, { erro: 'Configuração faltando na Vercel: ' + falta.join(', ') });
  const prof = await rest('profiles?select=id&role=eq.professor&limit=1');
  if (!prof.ok) return json(res, 500, { erro: 'Não consegui ler o banco. Confira se o schema academy foi exposto na API do Supabase.', detalhe: prof.data });
  const existe = prof.data.length > 0;
  if (req.method === 'GET') return json(res, 200, { precisaSetup: !existe });
  if (existe) return json(res, 403, { erro: 'O professor já foi cadastrado.' });
  const b = await readBody(req);
  const nome = String(b.nome || '').trim(), email = String(b.email || '').trim().toLowerCase(), senha = String(b.senha || '');
  if (!nome || !/^\S+@\S+\.\S+$/.test(email) || senha.length < 6) return json(res, 400, { erro: 'Preencha nome, e-mail válido e senha com pelo menos 6 caracteres.' });
  let uid = null;
  const u = await adminAuth('users', 'POST', { email, password: senha, email_confirm: true, user_metadata: { nome } });
  if (u.ok) uid = u.data.id;
  else {
    const msg = String((u.data && (u.data.msg || u.data.message || u.data.error_code)) || '');
    if (!/already|registered|exists/i.test(msg)) return json(res, 400, { erro: 'Não consegui criar a conta: ' + (msg || u.status) });
    // E-mail já existe no Supabase (ex.: outro app do mesmo projeto): confere a senha dessa conta
    const t = await fetch(URL_() + '/auth/v1/token?grant_type=password', { method: 'POST', headers: { apikey: ANON(), 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: senha }) });
    const td = await t.json().catch(() => ({}));
    if (!t.ok || !td.user) return json(res, 400, { erro: 'Esse e-mail já tem conta no Supabase (de outro app seu). Use a MESMA senha dessa conta para virar professor aqui.' });
    uid = td.user.id;
  }
  const p = await rest('profiles', { method: 'POST', body: { id: uid, role: 'professor', nome, username: null } });
  if (!p.ok) return json(res, 500, { erro: 'Conta criada, mas falhou ao salvar o perfil.', detalhe: p.data });
  json(res, 200, { ok: true });
};
