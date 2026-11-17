// Horários públicos da agenda (sem o nome de quem ocupa). Pode ser lido de outros sites.
const { json, rest } = require('./_lib');
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
  const r = await rest('horarios?select=dia,hora,ocupado&order=dia.asc,hora.asc');
  if (!r.ok) return json(res, 500, { erro: 'Agenda indisponível' });
  json(res, 200, { horarios: r.data });
};
