// Roda todo dia às 19h (horário de Brasília) pelo agendador da Vercel.
// Avisa quem está com a sequência em risco e quem tem lista vencendo amanhã.
const { json, rest } = require('./_lib');
const { enviar } = require('./_push');
function diaBR(offset) { const d = new Date(Date.now() - 3 * 3600 * 1000 + (offset || 0) * 86400000); return d.toISOString().slice(0, 10); }
module.exports = async (req, res) => {
  const ua = String(req.headers['user-agent'] || '');
  const auth = String(req.headers.authorization || '');
  if (!/vercel-cron/i.test(ua) && !(process.env.CRON_SECRET && auth === 'Bearer ' + process.env.CRON_SECRET)) return json(res, 403, { erro: 'Somente o agendador.' });
  try {
    const hoje = diaBR(0), amanha = diaBR(1), inicio = diaBR(-60);
    const alunos = (await rest('profiles?select=id,nome,meta_xp&role=eq.aluno')).data || [];
    const ativ = (await rest('atividade?select=student_id,dia,xp&dia=gte.' + inicio)).data || [];
    const porAluno = {}; ativ.forEach((a) => { (porAluno[a.student_id] = porAluno[a.student_id] || {})[a.dia] = a.xp; });
    let enviados = 0, avisos = 0;
    for (const al of alunos) {
      const meta = al.meta_xp || 20, dias = porAluno[al.id] || {};
      if ((dias[hoje] || 0) >= meta) continue;
      let seq = 0; for (let k = 1; k <= 60; k++) { const d = diaBR(-k); if ((dias[d] || 0) >= meta) seq++; else break; }
      const nome = String(al.nome || '').split(' ')[0];
      const titulo = seq > 0 ? '🔥 Sua sequência de ' + seq + (seq > 1 ? ' dias' : ' dia') + ' está em risco!' : '📚 Bora estudar uns minutinhos hoje?';
      const texto = seq > 0 ? nome + ', faltam ' + (meta - (dias[hoje] || 0)) + ' XP para manter a chama acesa. Termina à meia-noite!' : nome + ', uns 10 minutos de exercícios já começam uma nova sequência.';
      if (seq > 0 || new Date(hoje + 'T12:00:00Z').getUTCDay() % 2 === 0) {
        await rest('avisos', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: { para: al.id, titulo, texto, link: '#/assuntos', tipo: 'sequencia' } }); avisos++;
        enviados += await enviar([al.id], { titulo, texto, link: '#/assuntos' });
      }
    }
    const listas = (await rest('assignments?select=id,student_id,titulo&status=eq.enviada&prazo=eq.' + amanha)).data || [];
    for (const l of listas) {
      const titulo = '⏰ A lista "' + l.titulo + '" vence amanhã', texto = 'Entregue antes do prazo para o professor corrigir.';
      await rest('avisos', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: { para: l.student_id, titulo, texto, link: '#/lista/' + l.id, tipo: 'prazo' } }); avisos++;
      enviados += await enviar([l.student_id], { titulo, texto, link: '#/lista/' + l.id });
    }
    // LGPD: registros de atividade ficam só 90 dias
    await rest('eventos?created_at=lt.' + diaBR(-90), { method: 'DELETE', headers: { Prefer: 'return=minimal' } }).catch(() => {});
    json(res, 200, { ok: true, avisos, enviados });
  } catch (e) { json(res, 500, { erro: e.message }); }
};
