// Entrega ao site o endereço e a chave PÚBLICA (anon) do Supabase.
const { URL_, ANON, json, faltaConfig } = require('./_lib');
module.exports = async (req, res) => {
  json(res, 200, { url: URL_(), anon: ANON(), dominio: require('./_lib').ALUNO_DOMINIO, faltando: faltaConfig(), ia: !!process.env.GEMINI_API_KEY });
};
