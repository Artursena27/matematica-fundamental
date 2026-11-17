// Envio de notificações (Web Push). As chaves VAPID são geradas pelo próprio servidor na 1ª vez e guardadas em academy.config.
const webpush = require('web-push');
const { rest } = require('./_lib');
let cache = null;
async function vapid() {
  if (cache) return cache;
  const r = await rest('config?select=chave,valor&chave=in.(vapid_public,vapid_private)');
  let pub = null, priv = null;
  (r.data || []).forEach((x) => { if (x.chave === 'vapid_public') pub = x.valor; if (x.chave === 'vapid_private') priv = x.valor; });
  if (!pub || !priv) {
    const k = webpush.generateVAPIDKeys(); pub = k.publicKey; priv = k.privateKey;
    await rest('config', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: [{ chave: 'vapid_public', valor: pub }, { chave: 'vapid_private', valor: priv }] });
  }
  webpush.setVapidDetails('mailto:artursena270107@gmail.com', pub, priv);
  cache = { pub, priv };
  return cache;
}
// envia para todos os aparelhos dos usuários; apaga inscrições vencidas
async function enviar(userIds, payload) {
  if (!userIds || !userIds.length) return 0;
  await vapid();
  const r = await rest('push_subs?select=id,endpoint,sub&user_id=in.(' + userIds.map(encodeURIComponent).join(',') + ')');
  let ok = 0;
  for (const s of r.data || []) {
    try { await webpush.sendNotification(s.sub, JSON.stringify(payload), { TTL: 60 * 60 * 12 }); ok++; }
    catch (e) { if (e.statusCode === 404 || e.statusCode === 410) await rest('push_subs?id=eq.' + s.id, { method: 'DELETE' }); }
  }
  return ok;
}
module.exports = { vapid, enviar };
