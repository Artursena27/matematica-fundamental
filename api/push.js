// GET: chave pública para o aparelho se inscrever. POST: professor notifica alunos; aluno notifica o professor.
const { json, readBody, getUser, getRole, rest } = require('./_lib');
const { vapid, enviar } = require('./_push');
module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') { const v = await vapid(); return json(res, 200, { publicKey: v.pub }); }
    const user = await getUser(req); if (!user) return json(res, 401, { erro: 'Faça login.' });
    const role = await getRole(user.id); const b = await readBody(req);
    const titulo = String(b.titulo || '').slice(0, 80), texto = String(b.texto || '').slice(0, 200), link = String(b.link || '#/');
    if (!titulo) return json(res, 400, { erro: 'Sem título.' });
    let para = [];
    if (role === 'professor') {
      if (b.todos) { const a = await rest('profiles?select=id&role=eq.aluno'); para = (a.data || []).map((x) => x.id); }
      else para = Array.isArray(b.para) ? b.para : [];
      if (b.salvarAviso) await rest('avisos', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: para.map((id) => ({ para: id, titulo, texto, link, tipo: b.tipo || 'recado', criado_por: user.id })) });
    } else if (role === 'aluno') {
      const p = await rest('profiles?select=id&role=eq.professor'); para = (p.data || []).map((x) => x.id);
      await rest('avisos', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: para.map((id) => ({ para: id, titulo, texto, link, tipo: b.tipo || 'aluno', criado_por: user.id })) });
    } else return json(res, 403, { erro: 'Sem permissão.' });
    const enviados = await enviar(para, { titulo, texto, link });
    json(res, 200, { ok: true, enviados });
  } catch (e) { json(res, 500, { erro: 'Falha ao notificar: ' + e.message }); }
};
