// IA Professor: usa a API gratuita do Gemini com a chave guardada na Vercel.
const { json, readBody, getUser } = require('./_lib');
const SISTEMA = `Você é o "Professor IA" de uma plataforma de reforço de matemática para alunos do 4º ao 9º ano no Brasil.
Regras:
- Fale português do Brasil, simples, acolhedor e paciente, como um bom professor particular explicando para alguém que tem dificuldade.
- Explique em passos curtos e numerados. Mostre cada conta. Use exemplos do dia a dia quando ajudar.
- Se o aluno pedir para resolver um exercício, primeiro dê uma dica e pergunte se ele quer tentar; se ele insistir ou já tiver tentado, mostre a resolução completa, passo a passo.
- Verifique as contas com cuidado antes de responder. Se não tiver certeza, diga.
- Não use LaTeX. Escreva frações como 3/4, potências como x² e raízes como √9.
- Fique só em matemática e estudo. Se o assunto fugir disso, gentilmente traga de volta para a matéria.
- Respostas curtas e diretas (no máximo uns 12 passos). Termine com uma pergunta curta para checar se o aluno entendeu.`;
const MODELOS = () => [process.env.GEMINI_MODEL, 'gemini-flash-latest', 'gemini-2.5-flash', 'gemini-3.5-flash', 'gemini-flash-lite-latest'].filter(Boolean);
module.exports = async (req, res) => {
  if (req.method !== 'POST') return json(res, 405, { erro: 'Use POST' });
  const key = process.env.GEMINI_API_KEY;
  if (!key) return json(res, 500, { erro: 'O professor ainda não configurou a IA (falta a chave GEMINI_API_KEY na Vercel).' });
  const user = await getUser(req); if (!user) return json(res, 401, { erro: 'Faça login para usar o Professor IA.' });
  const b = await readBody(req);
  const msgs = Array.isArray(b.mensagens) ? b.mensagens.slice(-12) : [];
  if (!msgs.length) return json(res, 400, { erro: 'Mensagem vazia.' });
  let sistema = SISTEMA;
  if (b.contexto) sistema += '\n\nContexto da tela em que o aluno está:\n' + String(b.contexto).slice(0, 3000);
  const contents = msgs.map((m, i) => {
    const parts = [{ text: String(m.texto || '').slice(0, 4000) }];
    if (i === msgs.length - 1 && b.imagem && /^data:image\/(jpeg|png|webp);base64,/.test(b.imagem)) {
      const [meta, data] = b.imagem.split(','); parts.push({ inline_data: { mime_type: meta.slice(5, meta.indexOf(';')), data } });
    }
    return { role: m.de === 'ia' ? 'model' : 'user', parts };
  });
  const body = { systemInstruction: { parts: [{ text: sistema }] }, contents, generationConfig: { temperature: 0.3, maxOutputTokens: 1500 } };
  let ultimoErro = '';
  for (const modelo of MODELOS()) {
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + modelo + ':generateContent', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key }, body: JSON.stringify(body)
    });
    if (r.status === 404) { ultimoErro = 'modelo ' + modelo + ' indisponível'; continue; }
    const d = await r.json().catch(() => ({}));
    if (r.status === 429) return json(res, 429, { erro: 'O Professor IA atingiu o limite gratuito por agora. Tente de novo em alguns minutos ou mande a dúvida para o professor.' });
    if (!r.ok) { ultimoErro = (d.error && d.error.message) || ('erro ' + r.status); continue; }
    const txt = (((d.candidates || [])[0] || {}).content || {}).parts;
    const resposta = (txt || []).map((p) => p.text || '').join('').trim();
    if (resposta) return json(res, 200, { resposta, modelo });
    ultimoErro = 'resposta vazia';
  }
  json(res, 502, { erro: 'O Professor IA não respondeu agora (' + ultimoErro + '). Tente de novo ou mande a dúvida para o professor.' });
};
