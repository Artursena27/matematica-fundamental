// Funções compartilhadas pelas rotas /api (Vercel, Node 18+)
const URL_ = () => (process.env.SUPABASE_URL || 'https://agdyspfoupflwdesemdl.supabase.co').replace(/\/$/, '');
const ANON = () => process.env.SUPABASE_ANON_KEY || '';
const SERVICE = () => process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const ALUNO_DOMINIO = 'alunos.matematica.app';

function json(res, code, body) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}
async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  return await new Promise((ok) => { let d = ''; req.on('data', (c) => (d += c)); req.on('end', () => { try { ok(JSON.parse(d || '{}')); } catch (e) { ok({}); } }); });
}
function faltaConfig() {
  const f = [];
  if (!URL_()) f.push('SUPABASE_URL');
  if (!ANON()) f.push('SUPABASE_ANON_KEY');
  if (!SERVICE()) f.push('SUPABASE_SERVICE_ROLE_KEY');
  return f;
}
// Usuário logado a partir do token enviado pelo site
async function getUser(req) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : '';
  if (!token) return null;
  const r = await fetch(URL_() + '/auth/v1/user', { headers: { apikey: ANON(), Authorization: 'Bearer ' + token } });
  if (!r.ok) return null;
  return await r.json();
}
// Chamada REST ao schema academy com a chave de serviço (só no servidor)
async function rest(path, opts = {}) {
  const r = await fetch(URL_() + '/rest/v1/' + path, {
    method: opts.method || 'GET',
    headers: Object.assign({
      apikey: SERVICE(), Authorization: 'Bearer ' + SERVICE(),
      'Accept-Profile': 'academy', 'Content-Profile': 'academy',
      'Content-Type': 'application/json', Prefer: 'return=representation'
    }, opts.headers || {}),
    body: opts.body ? JSON.stringify(opts.body) : undefined
  });
  const txt = await r.text();
  let data = null; try { data = txt ? JSON.parse(txt) : null; } catch (e) { data = txt; }
  return { ok: r.ok, status: r.status, data };
}
async function getRole(uid) {
  const r = await rest('profiles?select=role&id=eq.' + encodeURIComponent(uid));
  return r.ok && r.data && r.data[0] ? r.data[0].role : null;
}
async function adminAuth(path, method, body) {
  const r = await fetch(URL_() + '/auth/v1/admin/' + path, {
    method, headers: { apikey: SERVICE(), Authorization: 'Bearer ' + SERVICE(), 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const txt = await r.text(); let data = null; try { data = txt ? JSON.parse(txt) : null; } catch (e) { data = txt; }
  return { ok: r.ok, status: r.status, data };
}
module.exports = { URL_, ANON, SERVICE, ALUNO_DOMINIO, json, readBody, faltaConfig, getUser, rest, getRole, adminAuth };
