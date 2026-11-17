// Professor cadastra aluno, troca senha ou remove aluno.
const { json, readBody, faltaConfig, getUser, getRole, rest, adminAuth, ALUNO_DOMINIO } = require('./_lib');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { erro: 'Use POST' });
  const falta = faltaConfig(); if (falta.length) return json(res, 500, { erro: 'Configuração faltando na Vercel: ' + falta.join(', ') });
  const user = await getUser(req); if (!user) return json(res, 401, { erro: 'Faça login novamente.' });
  if ((await getRole(user.id)) !== 'professor') return json(res, 403, { erro: 'Só o professor pode fazer isso.' });
  const b = await readBody(req);
  if (b.acao === 'criar') {
    const nome = String(b.nome || '').trim(), usuario = String(b.usuario || '').trim().toLowerCase(), senha = String(b.senha || ''), ano = String(b.ano || '');
    if (!nome) return json(res, 400, { erro: 'Informe o nome do aluno.' });
    if (!/^[a-z0-9._-]{3,30}$/.test(usuario)) return json(res, 400, { erro: 'Usuário: 3 a 30 caracteres, só letras minúsculas sem acento, números, ponto, hífen ou sublinhado.' });
    if (senha.length < 6) return json(res, 400, { erro: 'A senha precisa ter pelo menos 6 caracteres.' });
    const ja = await rest('profiles?select=id&username=eq.' + encodeURIComponent(usuario));
    if (ja.ok && ja.data.length) return json(res, 400, { erro: 'Esse usuário já existe.' });
    const u = await adminAuth('users', 'POST', { email: usuario + '@' + ALUNO_DOMINIO, password: senha, email_confirm: true, user_metadata: { nome } });
    if (!u.ok) return json(res, 400, { erro: 'Não consegui criar o acesso: ' + ((u.data && (u.data.msg || u.data.message)) || u.status) });
    const p = await rest('profiles', { method: 'POST', body: { id: u.data.id, role: 'aluno', nome, username: usuario, ano } });
    if (!p.ok) { await adminAuth('users/' + u.data.id, 'DELETE'); return json(res, 500, { erro: 'Falha ao salvar o perfil.', detalhe: p.data }); }
    return json(res, 200, { ok: true, aluno: p.data[0] });
  }
  if (b.acao === 'senha') {
    if (String(b.senha || '').length < 6) return json(res, 400, { erro: 'A senha precisa ter pelo menos 6 caracteres.' });
    if ((await getRole(b.id)) !== 'aluno') return json(res, 400, { erro: 'Aluno não encontrado.' });
    const u = await adminAuth('users/' + encodeURIComponent(b.id), 'PUT', { password: String(b.senha) });
    return u.ok ? json(res, 200, { ok: true }) : json(res, 400, { erro: 'Não consegui trocar a senha.' });
  }
  if (b.acao === 'remover') {
    if ((await getRole(b.id)) !== 'aluno') return json(res, 400, { erro: 'Aluno não encontrado.' });
    const u = await adminAuth('users/' + encodeURIComponent(b.id), 'DELETE');
    return u.ok ? json(res, 200, { ok: true }) : json(res, 400, { erro: 'Não consegui remover.' });
  }
  json(res, 400, { erro: 'Ação desconhecida.' });
};
