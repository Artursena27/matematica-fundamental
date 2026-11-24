// Materiais em PDF: o professor envia/edita/apaga; o aluno vê os que são para todos ou para ele.
// O arquivo vai direto do navegador para o Storage (link de envio assinado), sem passar pelo limite da Vercel.
const { URL_, SERVICE, json, readBody, faltaConfig, getUser, getRole, rest } = require('./_lib');
const { enviar } = require('./_push');
const BUCKET = 'materiais';
const MAX = 25 * 1024 * 1024;
const PATH_OK = /^[0-9a-z-]+\.pdf$/;

async function storage(path, method, body) {
  const r = await fetch(URL_() + '/storage/v1/' + path, {
    method, headers: { apikey: SERVICE(), Authorization: 'Bearer ' + SERVICE(), 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const txt = await r.text(); let data = null; try { data = txt ? JSON.parse(txt) : null; } catch (e) { data = txt; }
  return { ok: r.ok, status: r.status, data };
}
let bucketOk = false;
async function garantirBucket() {
  if (bucketOk) return;
  const g = await storage('bucket/' + BUCKET, 'GET');
  if (!g.ok) await storage('bucket', 'POST', { id: BUCKET, name: BUCKET, public: false, file_size_limit: MAX, allowed_mime_types: ['application/pdf'] });
  bucketOk = true;
}
async function apagarArquivo(path) { if (path) await storage('object/' + BUCKET, 'DELETE', { prefixes: [path] }); }
function limpa(s, n) { s = String(s == null ? '' : s).trim(); return n ? s.slice(0, n) : s; }

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return json(res, 405, { erro: 'Use POST' });
    const falta = faltaConfig(); if (falta.length) return json(res, 500, { erro: 'Configuração faltando na Vercel: ' + falta.join(', ') });
    const user = await getUser(req); if (!user) return json(res, 401, { erro: 'Faça login novamente.' });
    const role = await getRole(user.id); if (!role) return json(res, 403, { erro: 'Sem permissão.' });
    const prof = role === 'professor';
    const b = await readBody(req);

    if (b.acao === 'listar') {
      let q = 'materiais?select=*&order=created_at.desc';
      if (!prof) q += '&or=(para.is.null,para.eq.' + encodeURIComponent(user.id) + ')';
      if (b.topic_id) q += '&topic_id=eq.' + encodeURIComponent(b.topic_id);
      if (b.limite) q += '&limit=' + Math.min(100, Math.max(1, +b.limite || 10));
      const r = await rest(q);
      if (!r.ok) return json(res, 500, { erro: /materiais/.test(JSON.stringify(r.data)) ? 'A tabela de materiais ainda não foi criada no Supabase (rode sql/academy_v3_materiais.sql).' : 'Não consegui carregar os materiais.' });
      const L = r.data || [];
      if (L.length) {
        const s = await storage('object/sign/' + BUCKET, 'POST', { expiresIn: 60 * 60 * 6, paths: L.map((m) => m.path) });
        const by = {}; (Array.isArray(s.data) ? s.data : []).forEach((x) => { if (x && x.signedURL) by[x.path] = URL_() + '/storage/v1' + x.signedURL; });
        L.forEach((m) => { m.url = by[m.path] || null; });
      }
      return json(res, 200, { materiais: L });
    }

    if (!prof) return json(res, 403, { erro: 'Só o professor pode fazer isso.' });

    if (b.acao === 'preparar') {
      const tam = +b.tamanho || 0;
      if (tam > MAX) return json(res, 400, { erro: 'O PDF passa de 25 MB. Comprima o arquivo e tente de novo.' });
      await garantirBucket();
      const path = Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10) + '.pdf';
      const s = await storage('object/upload/sign/' + BUCKET + '/' + path, 'POST');
      if (!s.ok || !s.data || !s.data.url) return json(res, 500, { erro: 'Não consegui preparar o envio do arquivo.' });
      return json(res, 200, { path, uploadUrl: URL_() + '/storage/v1' + s.data.url });
    }

    if (b.acao === 'salvar') {
      const titulo = limpa(b.titulo, 120); if (!titulo) return json(res, 400, { erro: 'Dê um título ao material.' });
      const row = { titulo, descricao: limpa(b.descricao, 500) || null, topic_id: limpa(b.topic_id, 80) || null, para: b.para || null, updated_at: new Date().toISOString() };
      if (row.para && (await getRole(row.para)) !== 'aluno') return json(res, 400, { erro: 'Aluno não encontrado.' });
      let antigo = null;
      if (b.path) {
        if (!PATH_OK.test(b.path)) return json(res, 400, { erro: 'Arquivo inválido.' });
        row.path = b.path; row.nome_arquivo = limpa(b.nome_arquivo, 200) || null; row.tamanho = +b.tamanho || null;
      }
      let r;
      if (b.id) {
        const cur = await rest('materiais?select=path&id=eq.' + encodeURIComponent(b.id));
        if (!cur.ok || !cur.data.length) return json(res, 404, { erro: 'Material não encontrado.' });
        if (row.path && row.path !== cur.data[0].path) antigo = cur.data[0].path;
        r = await rest('materiais?id=eq.' + encodeURIComponent(b.id), { method: 'PATCH', body: row });
      } else {
        if (!row.path) return json(res, 400, { erro: 'Escolha o arquivo PDF.' });
        row.criado_por = user.id;
        r = await rest('materiais', { method: 'POST', body: row });
      }
      if (!r.ok) return json(res, 500, { erro: 'Não consegui salvar o material.', detalhe: r.data });
      if (antigo) await apagarArquivo(antigo);
      const m = r.data[0];
      if (b.avisar) {
        let para = [];
        if (m.para) para = [m.para]; else { const a = await rest('profiles?select=id&role=eq.aluno'); para = (a.data || []).map((x) => x.id); }
        const t = (b.id ? 'Material atualizado: ' : 'Novo material: ') + m.titulo;
        const tx = m.descricao ? m.descricao.slice(0, 140) : 'Toque para abrir o PDF.';
        if (para.length) { await rest('avisos', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: para.map((id) => ({ para: id, titulo: t.slice(0, 80), texto: tx, link: '#/materiais', tipo: 'material', criado_por: user.id })) }); await enviar(para, { titulo: t.slice(0, 80), texto: tx, link: '#/materiais' }); }
      }
      return json(res, 200, { ok: true, material: m });
    }

    if (b.acao === 'apagar') {
      const cur = await rest('materiais?select=path&id=eq.' + encodeURIComponent(b.id));
      if (!cur.ok || !cur.data.length) return json(res, 404, { erro: 'Material não encontrado.' });
      const d = await rest('materiais?id=eq.' + encodeURIComponent(b.id), { method: 'DELETE' });
      if (!d.ok) return json(res, 500, { erro: 'Não consegui apagar.' });
      await apagarArquivo(cur.data[0].path);
      return json(res, 200, { ok: true });
    }

    // arquivo enviado mas o cadastro falhou: limpa para não sobrar lixo no Storage
    if (b.acao === 'descartar') { if (PATH_OK.test(String(b.path || ''))) { const usado = await rest('materiais?select=id&path=eq.' + encodeURIComponent(b.path)); if (usado.ok && !usado.data.length) await apagarArquivo(b.path); } return json(res, 200, { ok: true }); }

    json(res, 400, { erro: 'Ação desconhecida.' });
  } catch (e) { json(res, 500, { erro: 'Falha nos materiais: ' + e.message }); }
};
