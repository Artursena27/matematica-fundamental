/* ================= JOGOS DO 4º ANO (Matemática e Português) =================
   Rodadas curtas, mascote, estrelas e confete. Em Matemática os acertos contam no progresso
   do assunto (chaves "j:..." em progress.acertos); em Português dão só XP. */
var JG_R = 5;
var MASCOTE = '🦉';
var JG_OK = ['Isso aí! 🎉','Mandou bem! 🌟','Uau, acertou! 🚀','Craque! 🏆','Perfeito! 💪','Arrasou! ✨'];
var JG_ERR = ['Quase! Vamos ver juntos 🦉','Opa! Bora entender 💡','Não foi dessa vez, mas você aprende! 🌱','Hmm, quase lá! Olha só 👇'];

/* ---------- números por extenso (até 99.999) ---------- */
var EXT_U=['zero','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove'];
var EXT_D=['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
var EXT_C=['','cento','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos'];
function ext999(x){ if(!x) return ''; if(x===100) return 'cem'; var c=Math.floor(x/100), r=x%100, p=[]; if(c) p.push(EXT_C[c]); if(r){ if(r<20) p.push(EXT_U[r]); else p.push(EXT_D[Math.floor(r/10)]+(r%10?' e '+EXT_U[r%10]:'')); } return p.join(' e '); }
function extenso(N){ if(!N) return 'zero'; var mil=Math.floor(N/1000), r=N%1000, s=mil?(mil===1?'mil':ext999(mil)+' mil'):''; if(r) s+=(s?(r<100||r%100===0?' e ':' '):'')+ext999(r); return s; }

/* ---------- utilidades ---------- */
var CASAS=[{v:10000,n:'dezena de milhar',np:'dezenas de milhar',c:'#7E57C2',s:'DM'},{v:1000,n:'unidade de milhar',np:'unidades de milhar',c:'#1E88E5',s:'UM'},{v:100,n:'centena',np:'centenas',c:'#43A047',s:'C'},{v:10,n:'dezena',np:'dezenas',c:'#FB8C00',s:'D'},{v:1,n:'unidade',np:'unidades',c:'#E53935',s:'U'}];
function digitos5(x){ var s=String(x); while(s.length<5) s='0'+s; return s.split('').map(Number); }
function falaCasas(x){ var d=digitos5(x), f=[]; d.forEach(function(q,i){ if(q) f.push(q+' '+(q>1?CASAS[i].np:CASAS[i].n)); }); return f.length>1?f.slice(0,-1).join(', ')+' e '+f[f.length-1]:(f[0]||'zero'); }
function parcelas(x){ var d=digitos5(x), p=[]; d.forEach(function(q,i){ if(q) p.push(n(q*CASAS[i].v)); }); return p; }
function cents(v){ return money(v/100); }
function stripTxt(h){ return String(h).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim(); }
// alternativas: certa + até 3 erradas sem repetir, embaralhadas
function mkEsc(r,o){
  var vistos={}, ops=[o.certa]; vistos[stripTxt(o.certa)]=1;
  (o.erradas||[]).forEach(function(e){ var t=stripTxt(e); if(ops.length<(o.max||4)&&!vistos[t]&&t!==''){ vistos[t]=1; ops.push(e); } });
  ops=r.sh(ops); return {visual:o.visual||'',perg:o.perg,opts:ops,certa:ops.indexOf(o.certa),certaTxt:o.certa,exp:o.exp||[],cols:o.cols};
}
function emojiRep(e,q){ var s=''; for(var i=0;i<q;i++) s+=e; return s; }

/* ---------- desenhos (SVG) ---------- */
function svgPizza(nn,pint,click,size,cor){
  var h='<svg viewBox="0 0 200 200" width="'+(size||190)+'" height="'+(size||190)+'" class="jg-svg" role="img" aria-label="Pizza dividida em '+nn+' pedaços iguais"><circle cx="100" cy="100" r="96" fill="#E8B46A"/>';
  for(var i=0;i<nn;i++){ var on=pint&&pint[i], fill=on?(cor||'#F4511E'):'#FFF3D1';
    if(nn===1){ h+='<circle cx="100" cy="100" r="86" fill="'+fill+'" stroke="#B9772F" stroke-width="3"'+(click?' data-a="jgFatia" data-v="0" style="cursor:pointer"':'')+'/>'; continue; }
    var a0=i/nn*2*Math.PI-Math.PI/2, a1=(i+1)/nn*2*Math.PI-Math.PI/2, x0=100+86*Math.cos(a0), y0=100+86*Math.sin(a0), x1=100+86*Math.cos(a1), y1=100+86*Math.sin(a1);
    h+='<path d="M100 100 L'+x0.toFixed(1)+' '+y0.toFixed(1)+' A86 86 0 '+((a1-a0)>Math.PI?1:0)+' 1 '+x1.toFixed(1)+' '+y1.toFixed(1)+' Z" fill="'+fill+'" stroke="#B9772F" stroke-width="3"'+(click?' data-a="jgFatia" data-v="'+i+'" style="cursor:pointer"':'')+'/>';
    if(on){ var am=(a0+a1)/2; h+='<circle cx="'+(100+52*Math.cos(am)).toFixed(1)+'" cy="'+(100+52*Math.sin(am)).toFixed(1)+'" r="7" fill="#B71C1C" pointer-events="none"/>'; } }
  return h+'</svg>';
}
function svgBarra(nn,pint){ var w=220/nn, h='<svg viewBox="0 0 230 70" width="210" height="64" class="jg-svg" role="img" aria-label="Barra dividida em '+nn+' partes iguais">';
  for(var i=0;i<nn;i++) h+='<rect x="'+(5+i*w).toFixed(1)+'" y="8" width="'+w.toFixed(1)+'" height="54" rx="4" fill="'+(i<pint?'#6D4C41':'#D7CCC8')+'" stroke="#4E342E" stroke-width="2"/>';
  return h+'</svg>'; }
function svgRelogio(hh,mm,size){
  var h='<svg viewBox="0 0 200 200" width="'+(size||200)+'" height="'+(size||200)+'" class="jg-svg" role="img" aria-label="Relógio de ponteiros"><circle cx="100" cy="100" r="94" fill="#fff" stroke="#0E1B3D" stroke-width="7"/>';
  for(var k=0;k<60;k++){ var a=k*6*Math.PI/180, r1=k%5?84:78; h+='<line x1="'+(100+r1*Math.sin(a)).toFixed(1)+'" y1="'+(100-r1*Math.cos(a)).toFixed(1)+'" x2="'+(100+88*Math.sin(a)).toFixed(1)+'" y2="'+(100-88*Math.cos(a)).toFixed(1)+'" stroke="#0E1B3D" stroke-width="'+(k%5?1.5:3)+'"/>'; }
  for(var q=1;q<=12;q++){ var b=q*30*Math.PI/180; h+='<text x="'+(100+64*Math.sin(b)).toFixed(1)+'" y="'+(100-64*Math.cos(b)+7).toFixed(1)+'" text-anchor="middle" font-size="19" font-weight="800" fill="#0E1B3D">'+q+'</text>'; }
  var ah=((hh%12)+mm/60)*30*Math.PI/180, am=mm*6*Math.PI/180;
  h+='<line x1="100" y1="100" x2="'+(100+44*Math.sin(ah)).toFixed(1)+'" y2="'+(100-44*Math.cos(ah)).toFixed(1)+'" stroke="#0E1B3D" stroke-width="9" stroke-linecap="round"/>';
  h+='<line x1="100" y1="100" x2="'+(100+72*Math.sin(am)).toFixed(1)+'" y2="'+(100-72*Math.cos(am)).toFixed(1)+'" stroke="#1E88E5" stroke-width="6" stroke-linecap="round"/>';
  return h+'<circle cx="100" cy="100" r="7" fill="#FFC93C" stroke="#0E1B3D" stroke-width="2"/></svg>';
}
function hhmm4(h,m){ return h+'h'+(m?String(m).padStart(2,'0'):''); }
function svgGrafico(cats){
  var mx=Math.max.apply(null,cats.map(function(c){return c.v;})), top=Math.max(4,Math.ceil(mx/2)*2), W=300, H=210, bw=Math.min(54,180/cats.length), gap=(W-50-bw*cats.length)/(cats.length+1);
  var h='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:340px" class="jg-svg" role="img" aria-label="Gráfico de barras">';
  for(var y=0;y<=top;y+=2){ var py=170-y/top*150; h+='<line x1="36" y1="'+py+'" x2="'+W+'" y2="'+py+'" stroke="#DDE3F0"/><text x="30" y="'+(py+4)+'" text-anchor="end" font-size="12" fill="#55627F">'+y+'</text>'; }
  var cores=['#1E88E5','#E53935','#43A047','#FB8C00','#7E57C2'];
  cats.forEach(function(c,i){ var x=40+gap+i*(bw+gap), bh=c.v/top*150; h+='<rect x="'+x.toFixed(1)+'" y="'+(170-bh).toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+bh.toFixed(1)+'" rx="5" fill="'+cores[i%5]+'"/><text x="'+(x+bw/2).toFixed(1)+'" y="196" text-anchor="middle" font-size="20">'+c.e+'</text>'; });
  return h+'<line x1="36" y1="170" x2="'+W+'" y2="170" stroke="#0E1B3D" stroke-width="2"/></svg>';
}
var CORES_BOLA={vermelha:'#E53935',azul:'#1E88E5',verde:'#43A047',amarela:'#FDD835'};
function svgSaco(cont){
  var bolas=[]; Object.keys(cont).forEach(function(c){ for(var i=0;i<cont[c];i++) bolas.push(CORES_BOLA[c]); });
  var h='<svg viewBox="0 0 220 190" width="210" height="182" class="jg-svg" role="img" aria-label="Saco com bolinhas"><path d="M40 50 Q30 180 110 182 Q190 180 180 50 Z" fill="#D7B98E" stroke="#8D6E63" stroke-width="4"/><path d="M60 50 Q110 30 160 50" fill="none" stroke="#8D6E63" stroke-width="6"/>';
  bolas.forEach(function(c,i){ var col=i%6, lin=Math.floor(i/6); h+='<circle cx="'+(62+col*19+(lin%2)*9)+'" cy="'+(160-lin*20)+'" r="9" fill="'+c+'" stroke="#0005" stroke-width="1.5"/>'; });
  return h+'</svg>';
}
function svgMalha(cols,rows,cel){
  var s=26, h='<svg viewBox="0 0 '+(cols*s+4)+' '+(rows*s+4)+'" width="100%" style="max-width:'+(cols*s+4)+'px" class="jg-svg" role="img" aria-label="Malha quadriculada">';
  for(var y=0;y<rows;y++) for(var x=0;x<cols;x++) h+='<rect x="'+(2+x*s)+'" y="'+(2+y*s)+'" width="'+s+'" height="'+s+'" fill="'+(cel[x+','+y]?'#64B5F6':'#fff')+'" stroke="#90A4AE"/>';
  return h+'</svg>';
}
function svgForma(t){ var p={triângulo:'100,15 185,165 15,165',quadrado:'30,20 170,20 170,160 30,160',retângulo:'10,45 190,45 190,145 10,145',pentágono:'100,12 185,75 152,170 48,170 15,75',hexágono:'55,15 145,15 190,95 145,175 55,175 10,95'}[t];
  return '<svg viewBox="0 0 200 190" width="170" height="160" class="jg-svg" role="img" aria-label="Figura">'+(t==='círculo'?'<circle cx="100" cy="95" r="80" fill="#FFC93C" stroke="#0E1B3D" stroke-width="5"/>':'<polygon points="'+p+'" fill="#FFC93C" stroke="#0E1B3D" stroke-width="5" stroke-linejoin="round"/>')+'</svg>'; }
function svgSolido(t){ var L='stroke="#0E1B3D" stroke-width="4" stroke-linejoin="round"', D='stroke="#0E1B3D" stroke-width="2.5" stroke-dasharray="6 5" fill="none"', h='<svg viewBox="0 0 200 190" width="170" height="160" class="jg-svg" role="img" aria-label="Sólido">';
  if(t==='cubo') h+='<polygon points="40,70 140,70 140,170 40,170" fill="#81D4FA" '+L+'/><polygon points="40,70 80,30 180,30 140,70" fill="#B3E5FC" '+L+'/><polygon points="140,70 180,30 180,130 140,170" fill="#4FC3F7" '+L+'/>';
  else if(t==='prisma') h+='<polygon points="30,160 80,160 55,100" fill="#FFCC80" '+L+'/><polygon points="55,100 135,60 160,120 80,160" fill="#FFE0B2" '+L+'/><polygon points="80,160 160,120 135,60" fill="none" '+L+'/><line x1="30" y1="160" x2="110" y2="120" '+D+'/><line x1="110" y1="120" x2="160" y2="120" '+D+'/><line x1="110" y1="120" x2="135" y2="60" '+D+'/>';
  else if(t==='pirâmide') h+='<polygon points="30,150 130,150 170,115" fill="none" '+L+'/><polygon points="100,20 30,150 130,150" fill="#A5D6A7" '+L+'/><polygon points="100,20 130,150 170,115" fill="#81C784" '+L+'/><line x1="30" y1="150" x2="70" y2="115" '+D+'/><line x1="70" y1="115" x2="170" y2="115" '+D+'/><line x1="100" y1="20" x2="70" y2="115" '+D+'/>';
  else if(t==='esfera') h+='<circle cx="100" cy="95" r="75" fill="#F48FB1" '+L+'/><ellipse cx="100" cy="95" rx="75" ry="22" fill="none" stroke="#0E1B3D" stroke-width="2.5" stroke-dasharray="6 5"/>';
  else if(t==='cilindro') h+='<rect x="45" y="40" width="110" height="115" fill="#CE93D8" stroke="none"/><line x1="45" y1="40" x2="45" y2="155" '+L+'/><line x1="155" y1="40" x2="155" y2="155" '+L+'/><ellipse cx="100" cy="155" rx="55" ry="17" fill="#CE93D8" '+L+'/><ellipse cx="100" cy="40" rx="55" ry="17" fill="#E1BEE7" '+L+'/>';
  return h+'</svg>'; }
function svgRetas(t){ var h='<svg viewBox="0 0 200 160" width="190" height="150" class="jg-svg" role="img" aria-label="Duas retas">', L=' stroke-width="6" stroke-linecap="round"';
  if(t==='paralelas') h+='<line x1="15" y1="50" x2="185" y2="50" stroke="#1E88E5"'+L+'/><line x1="15" y1="110" x2="185" y2="110" stroke="#E53935"'+L+'/>';
  else if(t==='perpendiculares') h+='<line x1="20" y1="80" x2="180" y2="80" stroke="#1E88E5"'+L+'/><line x1="100" y1="10" x2="100" y2="150" stroke="#E53935"'+L+'/><polyline points="100,62 118,62 118,80" fill="none" stroke="#0E1B3D" stroke-width="3"/>';
  else h+='<line x1="20" y1="140" x2="180" y2="20" stroke="#1E88E5"'+L+'/><line x1="20" y1="60" x2="180" y2="110" stroke="#E53935"'+L+'/>';
  return h+'</svg>'; }
function svgAngulo(t){ var a={reto:90,agudo:45,obtuso:130}[t]*Math.PI/180, h='<svg viewBox="0 0 200 160" width="190" height="150" class="jg-svg" role="img" aria-label="Ângulo"><line x1="40" y1="130" x2="185" y2="130" stroke="#0E1B3D" stroke-width="6" stroke-linecap="round"/>';
  var x=40+120*Math.cos(a), y=130-120*Math.sin(a); h+='<line x1="40" y1="130" x2="'+x.toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="#0E1B3D" stroke-width="6" stroke-linecap="round"/>';
  h+=t==='reto'?'<polyline points="40,108 62,108 62,130" fill="none" stroke="#E53935" stroke-width="4"/>':'<path d="M70 130 A30 30 0 0 0 '+(40+30*Math.cos(a)).toFixed(1)+' '+(130-30*Math.sin(a)).toFixed(1)+'" fill="none" stroke="#E53935" stroke-width="4"/>';
  return h+'</svg>'; }
function svgSimetria(t){ var h='<svg viewBox="0 0 200 180" width="180" height="162" class="jg-svg" role="img" aria-label="Figura com uma linha">', F=' fill="#FFC93C" stroke="#0E1B3D" stroke-width="4" stroke-linejoin="round"', ax='<line x1="100" y1="5" x2="100" y2="175" stroke="#E53935" stroke-width="3" stroke-dasharray="8 6"/>';
  if(t==='coracao') h+='<path d="M100 160 C30 110 20 60 55 40 C78 28 95 42 100 58 C105 42 122 28 145 40 C180 60 170 110 100 160 Z"'+F+'/>'+ax;
  else if(t==='isosceles') h+='<polygon points="100,15 175,160 25,160"'+F+'/>'+ax;
  else if(t==='casinha') h+='<polygon points="100,15 175,75 175,165 25,165 25,75"'+F+'/>'+ax;
  else if(t==='letraL') h+='<polygon points="45,15 95,15 95,120 170,120 170,165 45,165"'+F+'/>'+ax;
  else if(t==='torto') h+='<polygon points="40,160 170,160 70,25"'+F+'/>'+ax;
  else h+='<polygon points="20,40 140,40 180,140 60,140"'+F+'/>'+ax;
  return h+'</svg>'; }
function svgBalanca(esq,dir){ return '<svg viewBox="0 0 300 170" width="100%" style="max-width:320px" class="jg-svg" role="img" aria-label="Balança equilibrada"><polygon points="150,70 125,160 175,160" fill="#8D6E63"/><line x1="30" y1="70" x2="270" y2="70" stroke="#5D4037" stroke-width="8" stroke-linecap="round"/><line x1="60" y1="70" x2="60" y2="95" stroke="#5D4037" stroke-width="3"/><line x1="240" y1="70" x2="240" y2="95" stroke="#5D4037" stroke-width="3"/><rect x="5" y="95" width="115" height="44" rx="12" fill="#FFE7A3" stroke="#C79100" stroke-width="3"/><rect x="180" y="95" width="115" height="44" rx="12" fill="#B3E5FC" stroke="#0288D1" stroke-width="3"/><text x="62" y="125" text-anchor="middle" font-size="22" font-weight="900" fill="#0E1B3D">'+esq+'</text><text x="238" y="125" text-anchor="middle" font-size="22" font-weight="900" fill="#0E1B3D">'+dir+'</text></svg>'; }

/* ---------- passos das contas ---------- */
var NOME_COL=['unidades','dezenas','centenas','milhares'];
function passosSoma(a,b){ var da=String(a).split('').reverse(), db=String(b).split('').reverse(), vai=0, out=[];
  for(var i=0;i<Math.max(da.length,db.length);i++){ var x=+(da[i]||0), y=+(db[i]||0), s=x+y+vai; out.push(NOME_COL[i][0].toUpperCase()+NOME_COL[i].slice(1)+': '+x+' + '+y+(vai?' + 1 (que foi)':'')+' = '+s+(s>=10?' → fica '+(s%10)+' e vai 1':'')); vai=s>=10?1:0; }
  if(vai) out.push('Sobrou 1 que vai para a próxima casa.'); out.push('Resultado: '+n(a+b)+' 🎉'); return out; }
function passosSub(a,b){ var da=String(a).split('').reverse().map(Number), db=String(b).split('').reverse().map(Number), out=[], emp=0;
  for(var i=0;i<da.length;i++){ var x=da[i]-emp, y=db[i]||0, nm=NOME_COL[i][0].toUpperCase()+NOME_COL[i].slice(1), pre=emp?'(ficou '+x+' porque emprestou) ':'';
    if(x<0){ out.push(nm+': era 0, então troca 1 da casa ao lado (vira 10) e já deu 1 para a direita → fica 9: 9 − '+y+' = '+(9-y)); emp=1; continue; }
    if(x<y){ out.push(nm+': '+pre+x+' − '+y+' não dá → troca 1 da casa ao lado: '+(x+10)+' − '+y+' = '+(x+10-y)); emp=1; }
    else { if(i>=db.length&&!emp){ out.push(nm+': desce o '+x+'.'); } else out.push(nm+': '+pre+x+' − '+y+' = '+(x-y)); emp=0; } }
  out.push('Resultado: '+n(a-b)+' 🎉'); return out; }
function contaArmada(a,b,op){ var w=Math.max(String(a).length,String(b).length)+2, pad=function(s){ s=String(s); while(s.length<w) s=' '+s; return s; };
  return '<pre class="jg-conta">'+pad(a)+'\n'+op+pad(b).slice(1)+'\n'+'─'.repeat(w)+'</pre>'; }

/* ================= GERADORES — MATEMÁTICA ================= */
function genMonteNum(r,k){ var x; do{ x=(k<2?0:r.i(1,6))*10000+r.i(k<2?1:0,6)*1000+r.i(0,6)*100+r.i(0,6)*10+r.i(0,6); }while(x<1000);
  return {alvo:x,perg:k<3?'Monte o número <b class="jg-big">'+n(x)+'</b> com os blocos!':'Monte o número que se lê assim: <b>'+extenso(x)+'</b>',exp:['Separe por casas: '+falaCasas(x)+'.','Cada bloco vale o número escrito nele.','Juntando: '+parcelas(x).join(' + ')+' = '+n(x)+'.']}; }
function genFabrica(r,k){ var x; do{ x=r.i(1,5)*10000+r.i(0,6)*1000+r.i(0,6)*100+r.i(0,6)*10+r.i(0,6); }while(!(x%1000));
  return {alvo:x,perg:k%2?'Monte o número que tem <b>'+falaCasas(x)+'</b>.':'Monte o número <b>'+parcelas(x).join(' + ')+'</b>.',exp:['Coloque cada pedaço na sua casa: '+falaCasas(x)+'.','Casa vazia fica com zero.','O número é '+n(x)+'.']}; }
function genMaior(r,k){ var a=r.i(1000,99999), b, menor=k%2===1;
  if(k>=2){ var s=String(a), pos=Math.min(s.length-1,r.i(1,3)), arr=s.split(''); var d=+arr[pos]; arr[pos]=String(d===9?d-r.i(1,3):(d===0?d+r.i(1,3):(r.f()<.5?d+1:d-1))); b=+arr.join(''); } else { do{ b=r.i(1000,99999); }while(b===a); }
  if(a===b) b=a+1; var M=Math.max(a,b), m=Math.min(a,b), sa=String(M), sb=String(m), msg;
  if(sa.length!==sb.length) msg=n(M)+' tem mais algarismos que '+n(m)+', então é maior.';
  else { var i=0; while(sa[i]===sb[i]) i++; msg=(i?'As primeiras casas são iguais. ':'')+'Na casa das '+CASAS[5-sa.length+i].np+', '+sa[i]+' é maior que '+sb[i]+'.'; }
  return mkEsc(r,{visual:'',perg:'Toque no número <b>'+(menor?'MENOR 🐭':'MAIOR 🐘')+'</b>',certa:n(menor?m:M),erradas:[n(menor?M:m)],max:2,cols:2,exp:['Compare da esquerda para a direita.',msg,'Então o '+(menor?'menor':'maior')+' é '+n(menor?m:M)+'.']}); }
function genDesmonta(r,k){ var x; do{ x=r.i(1,9)*10000+r.i(0,9)*1000+r.i(0,9)*100+r.i(0,9)*10+r.i(1,9); }while(parcelas(x).length<3);
  var p=parcelas(x).map(function(s){return +s.replace(/\./g,'');}), errs=[];
  var j=r.i(0,p.length-1), e1=p.slice(); e1[j]=e1[j]>=10?e1[j]/10:e1[j]*10; errs.push(e1.map(function(v){return n(v);}).join(' + '));
  var e2=p.slice(); e2[0]=e2[0]/10; errs.push(e2.map(function(v){return n(v);}).join(' + '));
  var e3=p.slice(); e3[p.length-1]=e3[p.length-1]*10; errs.push(e3.map(function(v){return n(v);}).join(' + '));
  return mkEsc(r,{visual:'<div class="jg-big jg-center">'+n(x)+'</div>',perg:'Qual é o jeito <b>certo</b> de desmontar este número? 🔧',certa:p.map(function(v){return n(v);}).join(' + '),erradas:errs,exp:['O número '+n(x)+' tem '+falaCasas(x)+'.','Cada algarismo vale conforme a casa.','Desmontado: '+parcelas(x).join(' + ')+'.']}); }
function genSoma(r,k){ var dig=k<2?2:(k<4?3:4), a, b; do{ a=r.i(Math.pow(10,dig-1),Math.pow(10,dig)-1); b=r.i(Math.pow(10,dig-1),Math.pow(10,dig)-1); }while((a%10)+(b%10)<10||a+b>=10000);
  return {visual:contaArmada(a,b,'+'),perg:'Quanto dá <b>'+n(a)+' + '+n(b)+'</b>? Digite e aperte ✓',resp:String(a+b),respTxt:n(a+b),exp:passosSoma(a,b)}; }
function genSub(r,k){ var dig=k<2?2:(k<4?3:4), a, b; do{ a=r.i(Math.pow(10,dig-1),Math.pow(10,dig)-1); b=r.i(Math.pow(10,dig-1),a); }while((a%10)>=(b%10)||a===b);
  return {visual:contaArmada(a,b,'−'),perg:'Quanto dá <b>'+n(a)+' − '+n(b)+'</b>? Digite e aperte ✓',resp:String(a-b),respTxt:n(a-b),exp:passosSub(a,b)}; }
function genTab(r,k){ var a,b;
  if(k<3){ a=r.i(2,9); b=r.i(2,10); var dica=a===2?'Vezes 2 é o dobro: '+b+' + '+b+'.':a===5?'Vezes 5 é a metade de vezes 10: '+(b*10)+' ÷ 2.':a===9?'Vezes 9 é vezes 10 menos uma vez: '+(b*10)+' − '+b+'.':a===4?'Vezes 4 é o dobro do dobro: '+b+' → '+(2*b)+' → '+(4*b)+'.':'Conte de '+a+' em '+a+' até '+b+' vezes.';
    return {visual:'<div class="jg-big jg-center">'+a+' × '+b+'</div>',perg:'Quanto é <b>'+a+' × '+b+'</b>?',resp:String(a*b),exp:[dica,a+' × '+b+' = '+(a*b)+' 🎉']}; }
  if(k===3){ b=r.i(11,49); a=r.p([2,3]); return {visual:'<div class="jg-big jg-center">'+(a===2?'dobro':'triplo')+' de '+b+'</div>',perg:'Qual é o <b>'+(a===2?'dobro':'triplo')+'</b> de '+b+'?',resp:String(a*b),exp:[(a===2?'Dobro':'Triplo')+' é vezes '+a+'.','Separe: '+(b-b%10)+' × '+a+' = '+((b-b%10)*a)+' e '+(b%10)+' × '+a+' = '+((b%10)*a)+'.','Junte: '+(a*b)+'.']}; }
  a=r.i(12,49); b=r.i(3,6); return {visual:contaArmada(a,b,'×'),perg:'Quanto é <b>'+a+' × '+b+'</b>?',resp:String(a*b),exp:['Unidades: '+(a%10)+' × '+b+' = '+((a%10)*b)+(((a%10)*b)>=10?' → fica '+((a%10)*b%10)+' e vai '+Math.floor((a%10)*b/10):''),'Dezenas: '+Math.floor(a/10)+' × '+b+' = '+(Math.floor(a/10)*b)+(((a%10)*b)>=10?' + '+Math.floor((a%10)*b/10)+' = '+(Math.floor(a/10)*b+Math.floor((a%10)*b/10)):''),'Resultado: '+(a*b)+' 🎉']}; }
var JG_FRUTAS=['🍎','🍓','🍌','🧁','⚽','🌟','🐟','🍪'];
function genGrupos(r,k){ var g=r.i(2,k<2?3:5), m=r.i(2,k<2?4:6), e=r.p(JG_FRUTAS), v='<div class="jg-grupos">';
  for(var i=0;i<g;i++) v+='<div class="jg-grupo">'+emojiRep(e,m)+'</div>';
  return mkEsc(r,{visual:v+'</div>',perg:'Quantos '+e+' há ao todo?',certa:String(g*m),erradas:[String(g+m),String(g*m+m),String(g*m-1),String(g*m+2)],cols:2,exp:['São '+g+' grupos com '+m+' '+e+' em cada.','Grupos iguais → multiplicação: '+g+' × '+m+'.','Total: '+(g*m)+' '+e]}); }
var DOCES=['🍬','🍪','🍓','🧁','🍭'];
function genRepartir(r,k){ var p=r.i(2,k<2?3:5), q=r.i(2,k<2?4:6), resto=k>=2?r.i(k===2?1:0,p-1):0, tot=p*q+resto, e=r.p(DOCES);
  return {total:tot,pratos:p,e:e,perg:'Reparta os <b>'+tot+'</b> '+e+' entre <b>'+p+'</b> pratos. Todos os pratos com a <b>mesma quantidade</b>!',exp:['Cada prato ficou com '+q+' '+e+'.',(resto?'Sobrou '+resto+' (não dava para dar mais um para cada).':'Não sobrou nada!'),'Na conta: '+tot+' ÷ '+p+' = '+q+(resto?' e resto '+resto:'')+'.']}; }
function genDiv(r,k){ var d=r.i(2,k<2?5:9), q=r.i(2,k<2?6:10);
  if(k<3) return {visual:'<div class="jg-big jg-center">'+(d*q)+' ÷ '+d+'</div>',perg:'Reparta <b>'+(d*q)+'</b> figurinhas entre <b>'+d+'</b> amigos. Quantas cada um ganha?',resp:String(q),exp:['Pergunte: '+d+' vezes quanto dá '+(d*q)+'?',d+' × '+q+' = '+(d*q)+'.','Cada amigo ganha '+q+' 🎉']};
  var rs=r.i(1,d-1), tot=d*q+rs; return {visual:'<div class="jg-big jg-center">'+tot+' ÷ '+d+'</div>',perg:'Reparta <b>'+tot+'</b> balas entre <b>'+d+'</b> crianças, todas iguais. Quantas <b>sobram</b>?',resp:String(rs),exp:['Maior número da tabuada do '+d+' que cabe em '+tot+': '+d+' × '+q+' = '+(d*q)+'.','Cada criança ganha '+q+'.','Sobram '+tot+' − '+(d*q)+' = '+rs+'. O resto é sempre menor que '+d+'.']}; }
function genPizza(r,k){ var partes, pintar, den;
  if(k===0){ partes=r.p([2,3,4]); pintar=1; den=partes; } else if(k<3){ partes=r.p([5,6,8,10]); pintar=1; den=partes; }
  else { var op=r.p([[2,8],[4,8],[2,6],[3,6],[2,4],[5,10]]); den=op[0]; partes=op[1]; pintar=partes/den; }
  return {partes:partes,pintar:pintar,perg:'Toque nos pedaços e pinte <b>'+F(1,den)+'</b> da pizza 🍕',exp:pintar===1?['A pizza tem '+partes+' pedaços iguais.',F(1,den)+' é <b>um</b> desses pedaços.','Pinte 1 pedaço.']:['A pizza tem '+partes+' pedaços iguais.',F(1,den)+' quer dizer: divida em '+den+' partes iguais e pegue 1.',partes+' ÷ '+den+' = '+pintar+'. Então pinte '+pintar+' pedaços.']}; }
function genPedaco(r,k){ if(k<3){ var ds=r.sh([2,3,4,5,6,8,10]).slice(0,2), a=ds[0], b=ds[1], mai=Math.min(a,b);
    return mkEsc(r,{visual:'<div class="jg-row2"><div class="jg-center">'+svgBarra(a,1)+'<div>'+F(1,a)+'</div></div><div class="jg-center">'+svgBarra(b,1)+'<div>'+F(1,b)+'</div></div></div>',perg:'Qual pedaço de chocolate é <b>MAIOR</b>? 🍫',certa:F(1,mai),erradas:[F(1,Math.max(a,b))],max:2,cols:2,exp:['A mesma barra foi dividida em '+a+' e em '+b+' partes.','Quanto mais partes, menor fica cada pedaço.','Então '+F(1,mai)+' é maior.']}); }
  var nn=r.p([3,4,5,6,8]); var pin={}; pin[r.i(0,nn-1)]=1;
  return mkEsc(r,{visual:'<div class="jg-center">'+svgPizza(nn,pin,false,170)+'</div>',perg:'Que fração da pizza está pintada?',certa:F(1,nn),erradas:[F(1,nn+1),F(1,nn-1),F(1,nn+2)],cols:2,exp:['Conte os pedaços: são '+nn+' iguais.','Só 1 está pintado.','A fração é '+F(1,nn)+'.']}); }
var ITENS=[['🍦','um sorvete'],['🧃','um suco'],['✏️','um lápis'],['📒','um caderno'],['🍫','um chocolate'],['🧸','um ursinho'],['🎈','um balão'],['🍿','uma pipoca']];
function genMercado(r,k){ var it=r.p(ITENS), v;
  if(k<2) v=r.i(2,15)*100; else if(k<4) v=r.i(1,12)*100+50; else v=r.i(1,9)*100+r.p([25,75,10,35,60,85]);
  return {valor:v,item:it,perg:'Pague <b>exatinho</b>: '+it[0]+' '+it[1]+' custa <b>'+cents(v)+'</b>',exp:['O preço é '+cents(v)+': '+Math.floor(v/100)+' reais e '+(v%100)+' centavos.','Primeiro junte os reais com notas e moedas de real.','Depois junte os centavos com as moedinhas.']}; }
function genTroco(r,k){ var it=r.p(ITENS), v=k<2?r.i(2,9)*100:r.i(1,18)*100+r.p([50,25,75,90]), nota=[500,1000,2000,5000].filter(function(x){return x>v;})[0], t=nota-v;
  return mkEsc(r,{visual:'<div class="jg-center jg-big">'+it[0]+' '+cents(v)+'</div>',perg:'Você comprou '+it[1]+' e pagou com uma nota de <b>'+cents(nota)+'</b> 💵. Qual é o troco?',certa:cents(t),erradas:[cents(t+100),cents(Math.max(5,t-100)),cents(t+50),cents(v)],cols:2,exp:['Conte para cima, como o caixa: de '+cents(v)+' até '+cents(nota)+'.','Falta '+cents(t)+'.','Confira: '+cents(v)+' + '+cents(t)+' = '+cents(nota)+'.']}); }
var PADROES=[['🍎','🍌'],['🐶','🐱','🐭'],['⭐','⭐','🌙'],['🔴','🔵','🔵'],['🌸','🍀','🌸','☀️']];
function genPadrao(r,k){ if(k<2){ var p=r.p(PADROES), seq=[], L=p.length*2+r.i(0,p.length-1); for(var i=0;i<L;i++) seq.push(p[i%p.length]); var cert=p[L%p.length];
    var outros=['🍇','🐸','🚗','❤️'].concat(p).filter(function(e){return e!==cert;});
    return mkEsc(r,{visual:'<div class="jg-seq">'+seq.join(' ')+' <span class="jg-q">?</span></div>',perg:'Qual figura vem depois? 🔮',certa:cert,erradas:r.sh(outros),cols:2,exp:['O grupo que se repete é: '+p.join(' ')+'.','Depois de '+seq[seq.length-1]+' vem '+cert+'.']}); }
  var st=r.i(2,k<4?5:10), a=r.i(1,30), desc=k===4, seq2=[]; if(desc) a+=st*5; for(var j=0;j<4;j++) seq2.push(desc?a-st*j:a+st*j); var c=desc?a-st*4:a+st*4;
  return mkEsc(r,{visual:'<div class="jg-seq">'+seq2.join(', ')+', <span class="jg-q">?</span></div>',perg:'Qual número vem depois? 🔢',certa:String(c),erradas:[String(desc?c-1:c+1),String(desc?c+st:c-st),String(desc?c-st:c+st),String(c+2)],cols:2,exp:['Veja quanto muda: '+seq2[0]+' → '+seq2[1]+' '+(desc?'diminui':'aumenta')+' '+st+'.','A regra é '+(desc?'tirar ':'somar ')+st+'.',seq2[3]+(desc?' − ':' + ')+st+' = '+c+'.']}); }
function genBalanca(r,k){ var a,b,c,x,esq,dir,exp;
  if(k<2){ a=r.i(3,15); x=r.i(2,12); c=a+x; esq=a+' + □'; dir=String(c); exp=['A balança está equilibrada: os dois lados valem '+c+'.','Quanto falta de '+a+' para '+c+'? '+c+' − '+a+' = '+x+'.','□ = '+x]; }
  else if(k<3){ a=r.i(3,15); x=r.i(2,12); c=a+x; esq='□ + '+a; dir=String(c); exp=['Os dois lados valem '+c+'.',c+' − '+a+' = '+x+'.','□ = '+x]; }
  else if(k<4){ a=r.i(2,9); x=r.i(2,9); c=a*x; esq=a+' × □'; dir=String(c); exp=[a+' vezes quanto dá '+c+'?','Use a divisão: '+c+' ÷ '+a+' = '+x+'.','□ = '+x]; }
  else { a=r.i(5,15); b=r.i(2,9); x=r.i(1,a+b-2); c=a+b-x; esq=a+' + '+b; dir=c+' + □'; exp=['O lado esquerdo vale '+a+' + '+b+' = '+(a+b)+'.','O direito também tem que valer '+(a+b)+': '+c+' + □ = '+(a+b)+'.','□ = '+x+' (não é '+(a+b)+'!)']; }
  return mkEsc(r,{visual:svgBalanca(esq,dir),perg:'Que número deixa a balança <b>equilibrada</b>? ⚖️',certa:String(x),erradas:[String(x+1),String(Math.max(0,x-1)),String(k===4?a+b:c),String(x+2)],cols:2,exp:exp}); }
var PLANAS=['triângulo','quadrado','retângulo','pentágono','hexágono','círculo'], LADOS={triângulo:3,quadrado:4,retângulo:4,pentágono:5,hexágono:6};
function genFormas(r,k){ if(k<2){ var f=r.p(PLANAS); return mkEsc(r,{visual:'<div class="jg-center">'+svgForma(f)+'</div>',perg:'Qual é o nome desta figura? 🔷',certa:f,erradas:r.sh(PLANAS.filter(function(x){return x!==f;})),cols:2,exp:[f==='círculo'?'O círculo é redondinho e não tem lados retos.':'Conte os lados: '+LADOS[f]+'.','Essa figura é um '+f+'.']}); }
  if(k===2){ var g=r.p(['triângulo','quadrado','pentágono','hexágono']); return mkEsc(r,{visual:'<div class="jg-center">'+svgForma(g)+'</div>',perg:'Quantos <b>lados</b> tem esta figura?',certa:String(LADOS[g]),erradas:['3','4','5','6','8'],cols:2,exp:['Toque em cada lado com o dedo e conte.','O '+g+' tem '+LADOS[g]+' lados.']}); }
  var S=[['cubo','Cubo','tem 6 faces quadradas, como um dado'],['prisma','Prisma','tem 2 bases iguais (aqui, triângulos), uma de cada lado'],['pirâmide','Pirâmide','tem 1 base e as faces de lado se encontram numa ponta'],['esfera','Esfera','é redonda como uma bola'],['cilindro','Cilindro','tem 2 círculos e uma parte que rola, como uma lata']], s=r.p(S.slice(0,k===3?5:3));
  if(k===3) return mkEsc(r,{visual:'<div class="jg-center">'+svgSolido(s[0])+'</div>',perg:'Que sólido é este? 🧊',certa:s[1],erradas:r.sh(S.map(function(x){return x[1];}).filter(function(x){return x!==s[1];})),cols:2,exp:['Esse sólido '+s[2]+'.','É um(a) '+s[1].toLowerCase()+'.']});
  var faces={cubo:6,prisma:5,pirâmide:5}[s[0]];
  return mkEsc(r,{visual:'<div class="jg-center">'+svgSolido(s[0])+'</div>',perg:'Quantas <b>faces</b> tem este sólido? (Lembre das faces escondidas atrás!)',certa:String(faces),erradas:['4','5','6','8'],cols:2,exp:s[0]==='cubo'?['O cubo é como um dado: 6 faces.']:s[0]==='prisma'?['2 bases de triângulo + 3 faces do lado.','2 + 3 = 5 faces.']:['1 base quadrada + 4 faces triangulares.','1 + 4 = 5 faces.']}); }
function genRetas(r,k){ if(k===0){ var t=r.p(['reto','agudo','obtuso']); return mkEsc(r,{visual:'<div class="jg-center">'+svgAngulo(t)+'</div>',perg:'Este ângulo é…',certa:{reto:'Reto (90°) 📐',agudo:'Menor que o reto',obtuso:'Maior que o reto'}[t],erradas:['Reto (90°) 📐','Menor que o reto','Maior que o reto'],exp:['O ângulo reto é o cantinho de uma folha de caderno.',t==='reto'?'Esse encaixa certinho no canto da folha: é reto.':t==='agudo'?'Esse é mais fechado que o canto da folha.':'Esse é mais aberto que o canto da folha.']}); }
  if(k<3){ var q=r.p(['paralelas','perpendiculares','concorrentes']); return mkEsc(r,{visual:'<div class="jg-center">'+svgRetas(q)+'</div>',perg:'Como são estas duas retas?',certa:{paralelas:'Paralelas 🛤️',perpendiculares:'Perpendiculares ➕',concorrentes:'Se cruzam, mas não em 90°'}[q],erradas:['Paralelas 🛤️','Perpendiculares ➕','Se cruzam, mas não em 90°'],exp:[q==='paralelas'?'Elas nunca se encontram, como os trilhos do trem.':q==='perpendiculares'?'Elas se cruzam formando um cantinho reto (90°).':'Elas se cruzam, mas o canto não é reto.']}); }
  var sim=r.p([['coracao',true],['isosceles',true],['casinha',true],['letraL',false],['torto',false],['paralelogramo',false]]);
  return mkEsc(r,{visual:'<div class="jg-center">'+svgSimetria(sim[0])+'</div>',perg:'Se dobrar na linha vermelha, as duas metades <b>combinam</b>? 🦋',certa:sim[1]?'Sim, combinam!':'Não combinam',erradas:[sim[1]?'Não combinam':'Sim, combinam!'],max:2,cols:2,exp:sim[1]?['Um lado é o espelho do outro.','Essa linha é um eixo de simetria.']:['Os dois lados ficam diferentes.','Essa linha não é eixo de simetria.']}); }
var MEDIDAS=[['✏️','o comprimento de um lápis','centímetro (cm)'],['🛣️','a distância entre duas cidades','quilômetro (km)'],['🍉','a massa de uma melancia','quilograma (kg)'],['🍬','a massa de uma bala','grama (g)'],['🥤','quanto cabe numa garrafa de refrigerante','litro (L)'],['💊','uma colher de xarope','mililitro (mL)'],['🚪','a altura de uma porta','metro (m)'],['🛁','a água de uma banheira','litro (L)'],['🐘','a massa de um elefante','quilograma (kg)'],['🐜','o tamanho de uma formiga','milímetro (mm)']], UNIDS=['centímetro (cm)','metro (m)','quilômetro (km)','grama (g)','quilograma (kg)','mililitro (mL)','litro (L)'];
function genUnidade(r,k){ if(k<3){ var m=r.p(MEDIDAS.slice(0,9)); return mkEsc(r,{visual:'<div class="jg-center" style="font-size:64px">'+m[0]+'</div>',perg:'Para medir <b>'+m[1]+'</b>, qual unidade é melhor?',certa:m[2],erradas:r.sh(UNIDS.filter(function(u){return u!==m[2];})),cols:2,exp:[/massa/.test(m[1])?'Massa (o “peso”) se mede em gramas e quilogramas.':/cabe|água|xarope/.test(m[1])?'Quanto cabe se mede em litros e mililitros.':'Tamanho e distância se medem em cm, m ou km.','O melhor aqui é '+m[2]+'.']}); }
  var c=r.p([['metros','centímetros',100],['quilogramas','gramas',1000],['litros','mililitros',1000]]), q=r.i(2,9);
  return mkEsc(r,{visual:'<div class="jg-big jg-center">'+q+' '+c[0]+'</div>',perg:'Quantos <b>'+c[1]+'</b> há em '+q+' '+c[0]+'?',certa:n(q*c[2]),erradas:[n(q*(c[2]===100?1000:100)),n(q*10),n(q+c[2])],cols:2,exp:['1 '+c[0].slice(0,-1)+' = '+n(c[2])+' '+c[1]+'.',q+' × '+n(c[2])+' = '+n(q*c[2])+'.']}); }
function genQuadradinhos(r,k){ var cel={}, tot=0, w, h, x0, y0, desc;
  if(k<3){ w=r.i(2,k<1?4:6); h=r.i(2,4); x0=r.i(0,8-w); y0=r.i(0,5-h); for(var y=0;y<h;y++) for(var x=0;x<w;x++){ cel[(x0+x)+','+(y0+y)]=1; tot++; } desc=[w+' quadradinhos em cada linha e '+h+' linhas.',w+' × '+h+' = '+tot+'.']; }
  else { var w1=r.i(3,5), h1=r.i(1,2), w2=r.i(1,2), h2=r.i(2,3); for(var a=0;a<h1;a++) for(var b=0;b<w1;b++) cel[(1+b)+','+(1+a)]=1; for(var c2=0;c2<h2;c2++) for(var d=0;d<w2;d++) cel[(1+d)+','+(1+h1+c2)]=1; tot=Object.keys(cel).length; desc=['Divida a figura em dois retângulos.','Parte de cima: '+w1+' × '+h1+' = '+(w1*h1)+'. Parte de baixo: '+w2+' × '+h2+' = '+(w2*h2)+'.','Some: '+(w1*h1)+' + '+(w2*h2)+' = '+tot+'.']; }
  return mkEsc(r,{visual:'<div class="jg-center">'+svgMalha(8,5,cel)+'</div>',perg:'Qual é a <b>área</b> da figura azul? (conte os quadradinhos 🟦)',certa:tot+' quadradinhos',erradas:[(tot+1)+' quadradinhos',(tot-1)+' quadradinhos',(tot+2)+' quadradinhos'],cols:2,exp:desc}); }
function horaAlvo(r,k){ var h=r.i(1,12), m=k===0?0:k===1?30:k===2?r.p([15,45]):r.i(1,11)*5; return [h,m]; }
function genAcerteRelogio(r,k){ var t=horaAlvo(r,k);
  return {h:t[0],m:t[1],perg:'Coloque os ponteiros em <b class="jg-big">'+hhmm4(t[0],t[1])+'</b> ⏰',exp:['O ponteiro <b>grande</b> (azul) mostra os minutos: '+(t[1]?'aponta para o '+(t[1]/5)+' (cada número vale 5 minutos → '+t[1]+' min).':'fica no 12 (hora cheia).'),'O ponteiro <b>pequeno</b> mostra a hora: '+(t[1]?'fica entre o '+t[0]+' e o '+(t[0]%12+1)+'.':'aponta para o '+t[0]+'.')]}; }
function genQueHoras(r,k){ var t=horaAlvo(r,k), h=t[0], m=t[1], er=[hhmm4(h%12+1,m),hhmm4(h,(m+30)%60)];
  if(m&&m/5>=1&&m/5<=12&&h*5<60) er.push(hhmm4(m/5,h*5)); er.push(hhmm4(h===1?12:h-1,m));
  return mkEsc(r,{visual:'<div class="jg-center">'+svgRelogio(h,m,190)+'</div>',perg:'Que horas o relógio está marcando? 🕐',certa:hhmm4(h,m),erradas:er,cols:2,exp:['Ponteiro pequeno (hora): perto do '+h+'.','Ponteiro grande (minutos): '+(m?'no '+(m/5)+' → '+m+' minutos.':'no 12 → hora cheia.'),'São '+hhmm4(h,m)+'.']}); }
var GRAF=[['Fruta preferida',[['🍌','banana'],['🍎','maçã'],['🍇','uva'],['🍓','morango']]],['Bicho preferido',[['🐶','cachorro'],['🐱','gato'],['🐰','coelho'],['🐢','tartaruga']]],['Esporte preferido',[['⚽','futebol'],['🏀','basquete'],['🏐','vôlei'],['🏊','natação']]]];
function genGrafico(r,k){ var g=r.p(GRAF), nc=k<2?3:4, cats=r.sh(g[1]).slice(0,nc), vs=r.sh([2,3,4,5,6,7,8,9,10]).slice(0,nc), data=cats.map(function(c,i){return {e:c[0],nm:c[1],v:vs[i]};});
  var mx=data.slice().sort(function(a,b){return b.v-a.v;}), vis='<div class="jg-center"><b>'+g[0]+' da turma</b>'+svgGrafico(data)+'</div>', alt=data.map(function(d){return d.e+' '+d.nm;}), sum=data.reduce(function(s,d){return s+d.v;},0);
  if(k===0) return mkEsc(r,{visual:vis,perg:'Qual foi o <b>mais escolhido</b>? 📊',certa:mx[0].e+' '+mx[0].nm,erradas:alt,cols:2,exp:['Procure a barra mais alta.','É a de '+mx[0].e+' '+mx[0].nm+', com '+mx[0].v+'.']});
  if(k===1) return mkEsc(r,{visual:vis,perg:'Qual foi o <b>menos escolhido</b>?',certa:mx[nc-1].e+' '+mx[nc-1].nm,erradas:alt,cols:2,exp:['Procure a barra mais baixa.','É a de '+mx[nc-1].e+' '+mx[nc-1].nm+', com '+mx[nc-1].v+'.']});
  var d=r.p(data); if(k===2) return mkEsc(r,{visual:vis,perg:'Quantas crianças escolheram '+d.e+' '+d.nm+'?',certa:String(d.v),erradas:[String(d.v+1),String(d.v-1),String(d.v+2)],cols:2,exp:['Siga o topo da barra de '+d.e+' até os números do lado.','Ela chega no '+d.v+'.']});
  if(k===3) return mkEsc(r,{visual:vis,perg:'Quantos votos '+mx[0].e+' teve <b>a mais</b> que '+mx[nc-1].e+'?',certa:String(mx[0].v-mx[nc-1].v),erradas:[String(mx[0].v+mx[nc-1].v),String(mx[0].v-mx[nc-1].v+1),String(mx[0].v)],cols:2,exp:[mx[0].e+' teve '+mx[0].v+' e '+mx[nc-1].e+' teve '+mx[nc-1].v+'.',mx[0].v+' − '+mx[nc-1].v+' = '+(mx[0].v-mx[nc-1].v)+'.']});
  return mkEsc(r,{visual:vis,perg:'Quantas crianças votaram <b>ao todo</b>?',certa:String(sum),erradas:[String(sum+1),String(sum-2),String(mx[0].v)],cols:2,exp:['Some todas as barras: '+data.map(function(x){return x.v;}).join(' + ')+'.','Total: '+sum+'.']}); }
function genSaco(r,k){ var cores=r.sh(['vermelha','azul','verde','amarela']);
  if(k<3){ var a=r.i(2,8), b=r.i(1,6); if(a===b) a++; var c={}; c[cores[0]]=a; c[cores[1]]=b; var mais=a>b?cores[0]:cores[1];
    return mkEsc(r,{visual:'<div class="jg-center">'+svgSaco(c)+'</div>',perg:'Tirando uma bolinha <b>sem olhar</b>, qual cor é <b>mais provável</b>? 🎱',certa:'Bolinha '+mais,erradas:['Bolinha '+(mais===cores[0]?cores[1]:cores[0])],max:2,cols:2,exp:['Conte: '+a+' '+cores[0]+(a>1?'s':'')+' e '+b+' '+cores[1]+(b>1?'s':'')+'.','A cor que tem mais bolinhas tem mais chance de sair.','Mais provável: '+mais+'. (Mas a outra ainda pode sair!)']}); }
  var tipo=r.p(['certo','possivel','impossivel']), c2={}, pede;
  if(tipo==='certo'){ c2[cores[0]]=r.i(4,9); pede=cores[0]; } else if(tipo==='possivel'){ c2[cores[0]]=r.i(2,6); c2[cores[1]]=r.i(2,6); pede=cores[1]; } else { c2[cores[0]]=r.i(2,6); c2[cores[1]]=r.i(2,6); pede=cores[2]; }
  return mkEsc(r,{visual:'<div class="jg-center">'+svgSaco(c2)+'</div>',perg:'Tirar uma bolinha <b>'+pede+'</b> deste saco é…',certa:{certo:'Certo (sempre acontece) ✅',possivel:'Possível (pode acontecer) 🤞',impossivel:'Impossível (nunca acontece) 🚫'}[tipo],erradas:['Certo (sempre acontece) ✅','Possível (pode acontecer) 🤞','Impossível (nunca acontece) 🚫'],exp:[tipo==='certo'?'Todas as bolinhas são '+pede+'s. Vai sair '+pede+' com certeza!':tipo==='possivel'?'Tem bolinhas '+pede+'s, mas também de outra cor. Pode sair ou não.':'Não tem nenhuma bolinha '+pede+' no saco. Não tem como sair!']}); }

/* ================= CONTEÚDO — PORTUGUÊS ================= */
var PT_TEXTOS=[
 {t:'O piquenique da Lia',x:'No sábado, Lia acordou cedo e arrumou uma cesta com sanduíches, suco de uva e três maçãs. Ela foi ao parque com o avô Zé. Quando abriram a toalha na grama, começou a chover forte. Os dois correram para o coreto e comeram ali mesmo, ouvindo o barulho da chuva.',
  loc:[['Com quem Lia foi ao parque?','Com o avô Zé',['Com a mãe','Com uma amiga','Sozinha']],['Quantas maçãs havia na cesta?','Três',['Duas','Cinco','Nenhuma']],['Que suco Lia levou?','Suco de uva',['Suco de laranja','Suco de maçã','Água']]],
  inf:[['Por que eles correram para o coreto?','Para se proteger da chuva',['Para brincar de pega-pega','Porque estavam atrasados','Para encontrar amigos']],['Qual é a ideia principal do texto?','Um piquenique que a chuva atrapalhou, mas que deu certo no coreto',['Como fazer um sanduíche','Um dia de sol na praia','A Lia brigando com o avô']]]},
 {t:'Bilhete na geladeira',x:'Pedro, fui ao mercado comprar ovos e pão. Volto às 5 horas. Não esqueça de dar comida para o Totó e de fazer o dever de casa! Beijos, mamãe.',
  loc:[['Quem escreveu o bilhete?','A mamãe',['O Pedro','O Totó','A professora']],['A que horas a mamãe volta?','Às 5 horas',['Às 3 horas','À noite','Amanhã']],['O que a mamãe foi comprar?','Ovos e pão',['Leite e queijo','Ração','Um brinquedo']]],
  inf:[['O Totó provavelmente é…','Um animal de estimação, como um cachorro',['Um amigo da escola','O pai do Pedro','Um vizinho']],['Para que serve este texto?','Para dar um recado ao Pedro',['Para contar uma história de mistério','Para ensinar uma receita','Para dar uma notícia na TV']]]},
 {t:'O ninho do bem-te-vi',x:'Na árvore do pátio da escola, um casal de bem-te-vis construiu um ninho. Todos os dias, as crianças olhavam de longe, bem quietinhas, para não assustar os pássaros. Numa manhã, ouviram piados fininhos vindos lá de cima.',
  loc:[['Onde ficava o ninho?','Na árvore do pátio da escola',['No telhado de uma casa','Dentro da sala de aula','Num parque']],['Que pássaros fizeram o ninho?','Bem-te-vis',['Pombos','Papagaios','Beija-flores']]],
  inf:[['Por que as crianças olhavam de longe e quietinhas?','Para não assustar os pássaros',['Porque estavam de castigo','Porque tinham medo da árvore','Porque não enxergavam bem']],['Os piados fininhos mostram que…','Os filhotes nasceram',['Os pássaros foram embora','Começou a chover','A aula acabou']],['Qual é a ideia principal?','Crianças cuidando de longe de um ninho de passarinhos',['Como cortar uma árvore','Uma briga no recreio','Uma viagem de férias']]]},
 {t:'A bicicleta azul',x:'Caio ganhou uma bicicleta azul no aniversário. No começo, caía toda hora e ralou o joelho duas vezes. Mesmo assim, treinou um pouquinho todos os dias. Depois de uma semana, já dava a volta na praça sem ajuda.',
  loc:[['De que cor é a bicicleta?','Azul',['Vermelha','Verde','Amarela']],['Quantas vezes Caio ralou o joelho?','Duas vezes',['Uma vez','Três vezes','Nenhuma']],['Em quanto tempo ele aprendeu?','Em uma semana',['Em um dia','Em um mês','Em um ano']]],
  inf:[['O que o texto mostra sobre o Caio?','Que ele não desiste fácil',['Que ele não gosta de bicicleta','Que ele é medroso','Que ele não treinou']],['Qual é a ideia principal?','Com treino, Caio aprendeu a andar de bicicleta',['Caio quebrou a bicicleta','Caio ganhou um videogame','A praça estava fechada']]]}
];
var PT_GENEROS=[
 ['Vovó, fui jogar bola na casa do Lucas. Volto antes do jantar. Beijo, Bia.','Bilhete'],
 ['Lucas, deixei o lanche na geladeira. Esquente por 1 minuto. Tia Rosa.','Bilhete'],
 ['Davi, a reunião de pais mudou para quinta, às 18h. Avise sua mãe! Prof.ª Carla.','Bilhete'],
 ['Uma tartaruga desafiou uma lebre para uma corrida. A lebre, convencida, parou para dormir no caminho, e a tartaruga venceu. Moral: devagar e sempre se chega longe.','Fábula'],
 ['Um corvo com sede achou um jarro com pouca água. Jogou pedrinhas dentro até a água subir e conseguiu beber. Moral: quem pensa encontra uma saída.','Fábula'],
 ['Um leão poupou um ratinho. Dias depois, o ratinho roeu a rede que prendia o leão e o salvou. Moral: os pequenos também podem ajudar os grandes.','Fábula'],
 ['Recife, 12 de março — A prefeitura abriu ontem uma nova biblioteca no bairro da Várzea. O espaço tem 3 mil livros e funciona de segunda a sábado.','Notícia'],
 ['Olinda, terça-feira — Uma chuva forte alagou ruas do centro nesta manhã. Duas escolas cancelaram as aulas, segundo a Defesa Civil.','Notícia'],
 ['São Paulo, domingo — Mais de 5 mil crianças participaram de uma corrida de rua no parque do Ibirapuera, informou a organização.','Notícia'],
 ['Ana tinha 24 figurinhas e ganhou mais 15 da prima. Quantas figurinhas Ana tem agora?','Problema matemático'],
 ['Uma caixa tem 6 fileiras com 8 ovos em cada uma. Quantos ovos há na caixa?','Problema matemático'],
 ['Rui comprou um caderno de R$ 12,00 e pagou com R$ 20,00. Quanto recebeu de troco?','Problema matemático']];
var PT_PISTA={'Bilhete':'Tem um recado curto para alguém e o nome de quem escreveu','Fábula':'Os bichos agem como gente e tem uma moral no final','Notícia':'Conta um fato real, com lugar e data','Problema matemático':'Tem números e uma pergunta para fazer uma conta'};
var PT_SIN=[['feliz','alegre'],['bonito','lindo'],['rápido','veloz'],['começar','iniciar'],['falar','dizer'],['enorme','gigante'],['pular','saltar'],['medo','pavor'],['casa','lar'],['cheiroso','perfumado'],['bravo','zangado']];
var PT_ANT=[['alto','baixo'],['quente','frio'],['cheio','vazio'],['abrir','fechar'],['dia','noite'],['feliz','triste'],['entrar','sair'],['grande','pequeno'],['claro','escuro'],['limpo','sujo'],['perto','longe'],['rápido','devagar']];
var PT_FRASES_CLASSE=[
 [['O','x'],['gato','s'],['preto','a'],['dormiu','v'],['no','x'],['sofá','s'],['macio','a']],
 [['A','x'],['menina','s'],['alegre','a'],['pulou','v'],['corda','s']],
 [['Meu','x'],['irmão','s'],['comeu','v'],['uma','x'],['maçã','s'],['vermelha','a']],
 [['O','x'],['cachorro','s'],['bravo','a'],['latiu','v'],['para','x'],['o','x'],['carteiro','s']],
 [['As','x'],['crianças','s'],['felizes','a'],['cantaram','v'],['no','x'],['pátio','s']],
 [['O','x'],['sol','s'],['quente','a'],['secou','v'],['a','x'],['roupa','s'],['molhada','a']],
 [['Vovó','s'],['fez','v'],['um','x'],['bolo','s'],['delicioso','a']],
 [['O','x'],['passarinho','s'],['pequeno','a'],['voou','v'],['até','x'],['a','x'],['árvore','s']],
 [['Pedro','s'],['chutou','v'],['a','x'],['bola','s'],['nova','a']],
 [['A','x'],['professora','s'],['gentil','a'],['leu','v'],['uma','x'],['história','s'],['engraçada','a']]];
var CLASSE={s:['substantivo','Substantivo (nome) 🏷️','os substantivos (nomes de pessoas, bichos, coisas e lugares)','Substantivo dá nome: pessoa, bicho, coisa ou lugar.'],a:['adjetivo','Adjetivo (característica) 🎨','os adjetivos (palavras que dizem como algo é)','Adjetivo diz como é: cor, tamanho, jeito.'],v:['verbo','Verbo (ação) 🏃','os verbos (ações)','Verbo mostra uma ação: o que alguém fez ou faz.']};
var PT_PONTO=[['Eu moro em Recife','.'],['O ônibus chegou atrasado','.'],['Minha mochila é azul','.'],['Amanhã tem aula de música','.'],['Qual é o seu nome','?'],['Você quer brincar comigo','?'],['Onde está o meu lápis','?'],['Que horas são','?'],['Que gol lindo','!'],['Socorro','!'],['Parabéns pelo seu aniversário','!'],['Cuidado com o degrau','!']];
var PT_VIRGULA=[['Comprei banana, maçã, uva e pera.','Comprei, banana maçã, uva e pera.','Comprei banana maçã uva, e pera.','Numa lista, a vírgula separa as coisas. Antes do “e” não precisa.'],
 ['Mariana, venha jantar!','Mariana venha, jantar!','Mariana venha jantar, !','Quando chamamos alguém pelo nome, a vírgula vem logo depois do nome.'],
 ['Recife, 5 de maio de 2026.','Recife 5, de maio de 2026.','Recife 5 de, maio de 2026.','Na data, a vírgula separa o nome da cidade do dia.'],
 ['Na festa tinha bolo, brigadeiro, pipoca e suco.','Na festa, tinha bolo brigadeiro, pipoca e suco.','Na festa tinha bolo brigadeiro pipoca, e suco.','Numa lista, a vírgula separa cada coisa.'],
 ['Pedro, você viu meu caderno?','Pedro você, viu meu caderno?','Pedro você viu, meu caderno?','Chamou alguém pelo nome? Vírgula depois do nome.']];
var PT_ORDENAR=['O gato dormiu no sofá.','Minha avó faz bolo de milho.','As crianças brincam no parque.','O sapo pulou na lagoa.','Eu gosto de ler gibis.','A lua brilha no céu.','Meu time ganhou o jogo.','O peixe nada no aquário.','Hoje é dia de festa.','A borboleta pousou na flor.'];
var PT_COMPLETAR=[['O passarinho ___ no galho.','cantou',['caneta','azul','mesa']],['Eu bebi um copo de ___.','suco',['cadeira','correr','triste']],['Está chovendo, leve o ___.','guarda-chuva',['sorvete','dormir','alto']],['O bolo ficou muito ___.','gostoso',['pular','lápis','ontem']],['Nós ___ futebol no recreio.','jogamos',['bola','feliz','escola']],['À noite, o céu fica ___.','escuro',['correndo','cadeira','comer']],['Lavei as mãos com água e ___.','sabão',['nuvem','cantar','rápido']],['A tartaruga anda bem ___.','devagar',['pulou','janela','sopa']]];

/* ================= GERADORES — PORTUGUÊS ================= */
function caixaTexto(t){ return '<div class="jg-texto"><b>'+esc(t.t)+'</b><p>'+esc(t.x)+'</p></div>'; }
function genLeitor(r,k){ var t=PT_TEXTOS[(k+r.i(0,3))%PT_TEXTOS.length], q=r.p(t.loc);
  return mkEsc(r,{visual:caixaTexto(t),perg:'Leia com calma e responda: <b>'+q[0]+'</b> 🔎',certa:q[1],erradas:q[2],exp:['A resposta está escrita no texto. Volte e procure!','Resposta: '+q[1]+'.']}); }
function genDetetive(r,k){ var t=PT_TEXTOS[(k+r.i(0,3))%PT_TEXTOS.length], q=r.p(t.inf);
  return mkEsc(r,{visual:caixaTexto(t),perg:'Seja um detetive 🕵️: <b>'+q[0]+'</b>',certa:q[1],erradas:q[2],exp:['Essa resposta não está escrita igualzinha: use as pistas do texto.','Resposta: '+q[1]+'.']}); }
var GENEROS=['Bilhete','Fábula','Notícia','Problema matemático'];
function genGenero(r,k){ var g=PT_GENEROS[r.i(0,PT_GENEROS.length-1)];
  return mkEsc(r,{visual:'<div class="jg-texto"><p>'+esc(g[0])+'</p></div>',perg:'Que tipo de texto é este? 📚',certa:g[1],erradas:GENEROS,cols:2,exp:['Pista: '+PT_PISTA[g[1]]+'.','É '+(g[1]==='Notícia'||g[1]==='Fábula'?'uma ':'um ')+g[1].toLowerCase()+'.']}); }
function genPista(r,k){ var g=PT_GENEROS[r.i(0,PT_GENEROS.length-1)];
  return mkEsc(r,{visual:'<div class="jg-texto"><p>'+esc(g[0])+'</p></div>',perg:'Este texto é '+(g[1]==='Notícia'||g[1]==='Fábula'?'uma <b>':'um <b>')+g[1].toLowerCase()+'</b>. Qual é a <b>pista</b>? 🔍',certa:PT_PISTA[g[1]],erradas:GENEROS.map(function(x){return PT_PISTA[x];}),exp:['Cada tipo de texto tem um jeitinho próprio.','Pista do(a) '+g[1].toLowerCase()+': '+PT_PISTA[g[1]].toLowerCase()+'.']}); }
function genMesmoContrario(r,k){ var sin=k%2===0, L=sin?PT_SIN:PT_ANT, p=r.p(L), w=p[0], c=p[1];
  var erradas=r.sh((sin?PT_ANT:PT_SIN).map(function(x){return x[1];}).concat(L.map(function(x){return x[1];}).filter(function(x){return x!==c;}))).slice(0,6);
  if(sin){ var ant=PT_ANT.filter(function(x){return x[0]===w;})[0]; if(ant) erradas.unshift(ant[1]); } else { var s2=PT_SIN.filter(function(x){return x[0]===w;})[0]; if(s2) erradas.unshift(s2[1]); }
  return mkEsc(r,{visual:'<div class="jg-big jg-center">'+w+'</div>',perg:sin?'Qual palavra quer dizer <b>O MESMO</b> que “'+w+'”? 🤝':'Qual palavra é o <b>CONTRÁRIO</b> de “'+w+'”? 🔄',certa:c,erradas:erradas,cols:2,exp:[sin?'Sinônimos são palavras com significado parecido.':'Antônimos são palavras com significado contrário.','“'+w+'” e “'+c+'” são '+(sin?'sinônimos':'antônimos')+'.']}); }
function genPares(r,k){ var sin=k%2===0, ps=r.sh(sin?PT_SIN:PT_ANT).slice(0,4);
  return {pares:ps,perg:'Ligue cada palavra com o seu '+(sin?'<b>sinônimo</b> (quer dizer o mesmo) 🤝':'<b>antônimo</b> (o contrário) 🔄')+'. Toque numa da esquerda e depois na da direita.',exp:ps.map(function(p){return p[0]+' ↔ '+p[1];})}; }
function genCacaClasse(r,k){ var f=PT_FRASES_CLASSE[r.i(0,PT_FRASES_CLASSE.length-1)], cls=['v','s','a'][k%3]; if(!f.some(function(t){return t[1]===cls;})) cls='s';
  var alvo=[]; f.forEach(function(t,i){ if(t[1]===cls) alvo.push(i); });
  return {tokens:f.map(function(t){return t[0];}),alvo:alvo,perg:'Toque em <b>todos</b> '+CLASSE[cls][2]+'.',exp:[CLASSE[cls][3],'Na frase: '+alvo.map(function(i){return '“'+f[i][0]+'”';}).join(', ')+'.']}; }
function genQualClasse(r,k){ var f=PT_FRASES_CLASSE[r.i(0,PT_FRASES_CLASSE.length-1)], ix=f.map(function(t,i){return t[1]!=='x'?i:-1;}).filter(function(i){return i>=0;}), j=r.p(ix), cls=f[j][1];
  var frase=f.map(function(t,i){return i===j?'<b class="hl">'+t[0]+'</b>':t[0];}).join(' ')+'.';
  return mkEsc(r,{visual:'<div class="jg-texto jg-frase">'+frase+'</div>',perg:'A palavra destacada é…',certa:CLASSE[cls][1],erradas:[CLASSE.s[1],CLASSE.a[1],CLASSE.v[1]],exp:[CLASSE[cls][3],'“'+f[j][0]+'” é '+CLASSE[cls][0]+'.']}); }
var PONTO_EXP={'.':'Ponto final (.) termina uma frase que conta ou informa algo.','?':'Ponto de interrogação (?) aparece quando fazemos uma pergunta.','!':'Ponto de exclamação (!) mostra emoção: alegria, susto, surpresa ou um pedido forte.'};
function genPonto(r,k){ var p=r.p(PT_PONTO);
  return mkEsc(r,{visual:'<div class="jg-texto jg-frase">'+esc(p[0])+' <span class="jg-q">__</span></div>',perg:'Que sinal fecha esta frase? ✍️',certa:p[1]+' '+({'.':'Ponto final','?':'Interrogação','!':'Exclamação'}[p[1]]),erradas:['. Ponto final','? Interrogação','! Exclamação'],exp:[PONTO_EXP[p[1]],'Fica: '+p[0]+p[1]]}); }
function genVirgula(r,k){ var v=PT_VIRGULA[(k+r.i(0,4))%PT_VIRGULA.length];
  return mkEsc(r,{visual:'',perg:'Qual frase está com a <b>vírgula no lugar certo</b>? 🐛',certa:v[0],erradas:[v[1],v[2]],exp:[v[3],'Certo: '+v[0]]}); }
function genOrdenar(r,k){ var f=PT_ORDENAR[(k+r.i(0,9))%PT_ORDENAR.length]; return {palavras:f.split(' '),perg:'Toque nas palavras na ordem certa e <b>monte a frase</b> 🧩',exp:['A frase começa com letra maiúscula e termina com ponto.','Frase: '+f]}; }
function genCompletar(r,k){ var c=PT_COMPLETAR[(k+r.i(0,7))%PT_COMPLETAR.length];
  return mkEsc(r,{visual:'<div class="jg-texto jg-frase">'+esc(c[0]).replace('___','<span class="jg-q">____</span>')+'</div>',perg:'Qual palavra completa a frase e faz sentido? 🧠',certa:c[1],erradas:c[2],cols:2,exp:['Leia a frase com cada palavra e veja qual faz sentido.',c[0].replace('___',c[1])]}); }

/* ================= CATÁLOGO DE JOGOS ================= */
function J(id,nome,emoji,motor,gen,desc){ return {id:id,nome:nome,emoji:emoji,motor:motor,gen:gen,desc:desc}; }
var JOGOS={
 '4-sistema-decimal':[J('monte-num','Monte o número','🧱','blocos',genMonteNum,'Junte blocos de 10.000, 1.000, 100, 10 e 1.'),J('maior','Quem é maior?','🐘','escolha',genMaior,'Compare números grandes.')],
 '4-composicao-decomposicao':[J('fabrica','Fábrica de números','🏭','blocos',genFabrica,'Monte números com pedaços.'),J('desmonta','Desmonta o número','🔧','escolha',genDesmonta,'Ache o jeito certo de desmontar.')],
 '4-adicao-subtracao-reagrupamento':[J('foguete-soma','Foguete da soma','🚀','teclado',genSoma,'Acerte as somas e leve o foguete até a Lua.'),J('foguete-sub','Disco da subtração','🛸','teclado',genSub,'Contas de tirar com troca.')],
 '4-multiplicacao':[J('tabuada','Foguete da tabuada','🚀','teclado',genTab,'Tabuada, dobro e triplo.'),J('grupos','Grupos iguais','🍎','escolha',genGrupos,'Conte grupos rapidinho com a multiplicação.')],
 '4-divisao':[J('repartir','Reparte os docinhos','🍬','repartir',genRepartir,'Divida os doces nos pratos, todos iguais.'),J('div-relampago','Divisão relâmpago','⚡','teclado',genDiv,'Quanto cada um ganha? Quanto sobra?')],
 '4-fracoes-unitarias':[J('pizzaria','Pizzaria das frações','🍕','pizza',genPizza,'Pinte a fração pedida da pizza.'),J('pedaco','Qual pedaço é maior?','🍫','escolha',genPedaco,'Compare pedaços de chocolate e pizza.')],
 '4-decimais-dinheiro':[J('mercadinho','Mercadinho','🛒','moedas',genMercado,'Pague exatinho com notas e moedas.'),J('troco','Qual é o troco?','💰','escolha',genTroco,'Faça a conta do troco.')],
 '4-sequencias-igualdade':[J('padrao','Qual vem depois?','🔮','escolha',genPadrao,'Descubra a regra secreta.'),J('balanca','Balança equilibrada','⚖️','escolha',genBalanca,'Ache o número que equilibra.')],
 '4-geometria':[J('formas','Caça-formas','🔷','escolha',genFormas,'Figuras planas e sólidos.'),J('retas','Retas, ângulos e simetria','📐','escolha',genRetas,'Paralelas, perpendiculares e espelho.')],
 '4-medidas-area':[J('unidade','Qual é a medida?','📏','escolha',genUnidade,'Escolha a unidade certa.'),J('quadradinhos','Conte os quadradinhos','🟦','escolha',genQuadradinhos,'Área na malha quadriculada.')],
 '4-horas-duracao':[J('acerte-relogio','Acerte o relógio','⏰','relogio',genAcerteRelogio,'Mexa os ponteiros até a hora certa.'),J('que-horas','Que horas são?','🕐','escolha',genQueHoras,'Leia o relógio de ponteiros.')],
 '4-tabelas-graficos-probabilidade':[J('grafico','Detetive do gráfico','📊','escolha',genGrafico,'Leia o gráfico de barras.'),J('saco','Saco de bolinhas','🎱','escolha',genSaco,'Mais provável, certo ou impossível?')],
 'pt4-1':[J('leitor','Leitor esperto','🔎','escolha',genLeitor,'Ache a resposta escrita no texto.'),J('detetive','Detetive do texto','🕵️','escolha',genDetetive,'Use as pistas para descobrir.')],
 'pt4-2':[J('genero','Que texto é esse?','📚','escolha',genGenero,'Bilhete, notícia, fábula ou problema?'),J('pista','Caça-pistas','🔍','escolha',genPista,'Qual é o jeitinho de cada texto?')],
 'pt4-3':[J('mesmo-contrario','Mesmo ou contrário?','🔄','escolha',genMesmoContrario,'Sinônimos e antônimos.'),J('pares','Ligue os pares','🤝','pares',genPares,'Ligue as palavras que combinam.')],
 'pt4-4':[J('caca-classe','Caça-palavras da frase','🎯','palavras',genCacaClasse,'Toque nos verbos, nomes ou características.'),J('qual-classe','Que palavra é essa?','🏷️','escolha',genQualClasse,'Substantivo, adjetivo ou verbo?')],
 'pt4-5':[J('ponto','Ponto certo','✍️','escolha',genPonto,'Ponto final, interrogação ou exclamação?'),J('virgula','Detetive da vírgula','🐛','escolha',genVirgula,'Onde mora a vírgula?')],
 'pt4-6':[J('monte-frase','Monte a frase','🧩','ordenar',genOrdenar,'Coloque as palavras na ordem.'),J('completar','Complete a frase','🧠','escolha',genCompletar,'Escolha a palavra que faz sentido.')]
};
function temJogos(id){ return !!JOGOS[id]; }

/* ================= MOTORES ================= */
var MOTOR={};
function jgBtn(a,v,txt,cls,extra){ return '<button class="btn '+(cls||'ghost')+'" data-a="'+a+'"'+(v!=null?' data-v="'+v+'"':'')+(extra||'')+'>'+txt+'</button>'; }
function jgConferirBtn(){ return '<button class="btn primary block jg-conferir" data-a="jgConferir">✓ Conferir</button>'; }
MOTOR.escolha={ ini:function(){ return {}; },
  render:function(jg){ var R_=jg.ronda, fb=jg.fb; return (R_.visual?'<div class="jg-vis">'+R_.visual+'</div>':'')+'<div class="jg-opts'+(R_.cols===2?' c2':'')+'">'+R_.opts.map(function(o,i){ var cls=''; if(fb){ if(i===R_.certa) cls=' certo'; else if(i===jg.cur.pick) cls=' errado'; } return '<button class="jg-opt'+cls+'" data-a="jgEscolhe" data-v="'+i+'"'+(fb?' disabled':'')+'>'+o+'</button>'; }).join('')+'</div>'; } };
MOTOR.teclado={ ini:function(){ return {v:''}; },
  render:function(jg){ var pos=jg.k+(jg.fb&&jg.fb.ok?1:0), trilha='<div class="jg-trilha" aria-hidden="true"><span>🌍</span><div class="jg-trilho"><i style="left:'+(pos/JG_R*100)+'%">'+(jg.g.emoji==='🛸'?'🛸':'🚀')+'</i></div><span>🌙</span></div>';
    return trilha+'<div class="jg-vis">'+jg.ronda.visual+'</div><div class="jg-visor'+(jg.fb?(jg.fb.ok?' ok':' bad'):'')+'">'+(jg.cur.v||'<span class="muted">?</span>')+'</div>'+(jg.fb?'':'<div class="jg-teclas">'+[1,2,3,4,5,6,7,8,9].map(function(d){return '<button data-a="jgTecla" data-v="'+d+'">'+d+'</button>';}).join('')+'<button data-a="jgTecla" data-v="apagar" aria-label="Apagar">⌫</button><button data-a="jgTecla" data-v="0">0</button><button class="ok" data-a="jgConferir" aria-label="Conferir">✓</button></div>'); },
  conferir:function(jg){ if(!jg.cur.v){ toast('Digite sua resposta primeiro 😉'); return null; } return jg.cur.v===String(jg.ronda.resp); },
  certa:function(R_){ return R_.respTxt||R_.resp; } };
MOTOR.blocos={ ini:function(){ return {c:[0,0,0,0,0]}; },
  render:function(jg){ var c=jg.cur.c, tot=c.reduce(function(s,q,i){return s+q*CASAS[i].v;},0);
    return '<div class="jg-blocos">'+CASAS.map(function(k,i){ var cub=''; for(var q=0;q<c[i];q++) cub+='<i style="background:'+k.c+'"></i>'; return '<div class="jg-casa"><b style="color:'+k.c+'">'+n(k.v)+'</b><div class="jg-cubos">'+cub+'</div><div class="jg-cnt">'+c[i]+'</div>'+(jg.fb?'':'<button data-a="jgBloco" data-c="'+i+'" data-v="1" aria-label="Mais um bloco de '+n(k.v)+'">＋</button><button data-a="jgBloco" data-c="'+i+'" data-v="-1" aria-label="Menos um bloco de '+n(k.v)+'">－</button>')+'</div>'; }).join('')+'</div><div class="jg-total">Você montou: <b>'+n(tot)+'</b></div>'+(jg.fb?'':jgConferirBtn()); },
  conferir:function(jg){ var tot=jg.cur.c.reduce(function(s,q,i){return s+q*CASAS[i].v;},0); return tot===jg.ronda.alvo; },
  certa:function(R_){ return n(R_.alvo); } };
MOTOR.repartir={ ini:function(R_){ var p=[]; for(var i=0;i<R_.pratos;i++) p.push(0); return {pilha:R_.total,p:p,hist:[]}; },
  render:function(jg){ var c=jg.cur, e=jg.ronda.e;
    return '<div class="jg-pilha"><div class="small muted">Para repartir ('+c.pilha+')</div>'+(emojiRep(e,c.pilha)||'—')+'</div><div class="jg-pratos">'+c.p.map(function(q,i){ return '<button class="jg-prato" data-a="jgPrato" data-v="'+i+'"'+(jg.fb?' disabled':'')+'><span>'+emojiRep(e,q)+'</span><b>'+q+'</b></button>'; }).join('')+'</div>'+(jg.fb?'':'<div class="jg-acoes">'+jgBtn('jgRodada',null,'🔄 Dar 1 para cada','gold')+jgBtn('jgDesfazer',null,'↩️ Desfazer')+'</div>'+jgConferirBtn())+'<p class="small muted jg-center">Toque num prato para colocar 1 doce nele.</p>'; },
  conferir:function(jg){ var c=jg.cur, k=c.p.length; if(c.p.some(function(q){return q!==c.p[0];})){ toast('Ops! Os pratos não estão iguais. Conte de novo 😉'); return null; } if(c.pilha>=k){ toast('Ainda dá para dar mais 1 para cada! 🍬'); return null; } return true; },
  certa:function(R_){ return Math.floor(R_.total/R_.pratos)+' em cada'; } };
MOTOR.pizza={ ini:function(){ return {s:{}}; },
  render:function(jg){ var q=Object.keys(jg.cur.s).length; return '<div class="jg-center">'+svgPizza(jg.ronda.partes,jg.cur.s,!jg.fb,230)+'</div><div class="jg-total">Pintou <b>'+q+'</b> de '+jg.ronda.partes+' pedaços</div>'+(jg.fb?'':jgConferirBtn()); },
  conferir:function(jg){ return Object.keys(jg.cur.s).length===jg.ronda.pintar; },
  certa:function(R_){ return R_.pintar+' pedaço'+(R_.pintar>1?'s':''); } };
var DINHEIRO=[[2000,'R$ 20','nota'],[1000,'R$ 10','nota'],[500,'R$ 5','nota'],[200,'R$ 2','nota'],[100,'R$ 1','moeda'],[50,'50¢','moeda'],[25,'25¢','moeda'],[10,'10¢','moeda'],[5,'5¢','moeda']];
MOTOR.moedas={ ini:function(){ return {c:[]}; },
  render:function(jg){ var tot=jg.cur.c.reduce(function(s,v){return s+v;},0), alvo=jg.ronda.valor, cor=tot===alvo?'var(--ok)':tot>alvo?'var(--bad)':'var(--ink)';
    return '<div class="jg-vis jg-center" style="font-size:56px">'+jg.ronda.item[0]+'</div><div class="jg-total">Você deu: <b style="color:'+cor+'">'+cents(tot)+'</b>'+(tot>alvo?' <span class="small" style="color:var(--bad)">(passou!)</span>':'')+'</div><div class="jg-bandeja">'+(jg.cur.c.map(function(v){ var d=DINHEIRO.filter(function(x){return x[0]===v;})[0]; return '<span class="jg-din '+d[2]+'">'+d[1]+'</span>'; }).join('')||'<span class="muted small">Toque no dinheiro abaixo 👇</span>')+'</div>'+(jg.fb?'':'<div class="jg-carteira">'+DINHEIRO.map(function(d){ return '<button class="jg-din '+d[2]+'" data-a="jgMoeda" data-v="'+d[0]+'">'+d[1]+'</button>'; }).join('')+'</div><div class="jg-acoes">'+jgBtn('jgDesfazer',null,'↩️ Desfazer')+jgBtn('jgLimpar',null,'🧹 Limpar')+'</div>'+jgConferirBtn()); },
  conferir:function(jg){ if(!jg.cur.c.length){ toast('Toque nas notas e moedas para pagar 💵'); return null; } return jg.cur.c.reduce(function(s,v){return s+v;},0)===jg.ronda.valor; },
  certa:function(R_){ return cents(R_.valor); } };
MOTOR.relogio={ ini:function(){ return {h:12,m:0}; },
  render:function(jg){ return '<div class="jg-center">'+svgRelogio(jg.cur.h,jg.cur.m,230)+'</div>'+(jg.fb?'':'<div class="jg-relbt"><div><span class="small muted">Ponteiro pequeno (hora)</span><div class="jg-acoes">'+jgBtn('jgRel','h-1','⬅️ hora')+jgBtn('jgRel','h1','hora ➡️')+'</div></div><div><span class="small muted">Ponteiro grande (minutos)</span><div class="jg-acoes">'+jgBtn('jgRel','m-5','⬅️ 5 min')+jgBtn('jgRel','m5','5 min ➡️')+'</div></div></div>'+jgConferirBtn()); },
  conferir:function(jg){ return (jg.cur.h%12)===(jg.ronda.h%12)&&jg.cur.m===jg.ronda.m; },
  certa:function(R_){ return hhmm4(R_.h,R_.m); } };
MOTOR.pares={ ini:function(R_){ var dir=R_.pares.map(function(p,i){return i;}); return {sel:null,feitos:{},erros:0,dir:R(hashStr(R_.pares[0][0])).sh(dir)}; },
  render:function(jg){ var P=jg.ronda.pares, c=jg.cur; return '<div class="jg-pares"><div>'+P.map(function(p,i){ return '<button class="jg-par'+(c.feitos[i]?' feito':'')+(c.sel===i?' sel':'')+'" data-a="jgParE" data-v="'+i+'"'+(c.feitos[i]||jg.fb?' disabled':'')+'>'+p[0]+'</button>'; }).join('')+'</div><div>'+c.dir.map(function(i){ return '<button class="jg-par'+(c.feitos[i]?' feito':'')+'" data-a="jgParD" data-v="'+i+'"'+(c.feitos[i]||jg.fb?' disabled':'')+'>'+P[i][1]+'</button>'; }).join('')+'</div></div>'+(c.erros?'<p class="small muted jg-center">Tentativas erradas: '+c.erros+'</p>':''); },
  certa:function(R_){ return R_.pares.map(function(p){return p[0]+' ↔ '+p[1];}).join(' · '); } };
MOTOR.palavras={ ini:function(){ return {s:{}}; },
  render:function(jg){ var R_=jg.ronda, fb=jg.fb; return '<div class="jg-palavras">'+R_.tokens.map(function(t,i){ var on=jg.cur.s[i], cls=on?' on':''; if(fb){ var alvo=R_.alvo.indexOf(i)>=0; cls=alvo?' certo':(on?' errado':''); } return '<button class="jg-pal'+cls+'" data-a="jgPal" data-v="'+i+'"'+(fb?' disabled':'')+'>'+esc(t)+'</button>'; }).join('')+'<span class="jg-pal-ponto">.</span></div>'+(fb?'':jgConferirBtn()); },
  conferir:function(jg){ var sel=Object.keys(jg.cur.s).map(Number).sort(), a=jg.ronda.alvo.slice().sort(); if(!sel.length){ toast('Toque nas palavras primeiro 👆'); return null; } return sel.join(',')===a.join(','); },
  certa:function(R_){ return R_.alvo.map(function(i){return R_.tokens[i];}).join(', '); } };
MOTOR.ordenar={ ini:function(R_){ var idx=R_.palavras.map(function(p,i){return i;}), r_=R(hashStr(R_.palavras.join(' '))); var b; do{ b=r_.sh(idx); }while(b.join()===idx.join()&&idx.length>1); return {usadas:[],banco:b}; },
  render:function(jg){ var P=jg.ronda.palavras, c=jg.cur; return '<div class="jg-linha'+(jg.fb?(jg.fb.ok?' ok':' bad'):'')+'">'+(c.usadas.map(function(i,k){ return '<button class="jg-pal on" data-a="jgTira" data-v="'+k+'"'+(jg.fb?' disabled':'')+'>'+esc(P[i])+'</button>'; }).join('')||'<span class="muted small">Toque nas palavras abaixo 👇</span>')+'</div><div class="jg-palavras">'+c.banco.filter(function(i){return c.usadas.indexOf(i)<0;}).map(function(i){ return '<button class="jg-pal" data-a="jgPoe" data-v="'+i+'"'+(jg.fb?' disabled':'')+'>'+esc(P[i])+'</button>'; }).join('')+'</div>'+(jg.fb?'':jgConferirBtn()); },
  conferir:function(jg){ var P=jg.ronda.palavras; if(jg.cur.usadas.length<P.length){ toast('Use todas as palavras 🧩'); return null; } return jg.cur.usadas.map(function(i){return P[i];}).join(' ')===P.join(' '); },
  certa:function(R_){ return R_.palavras.join(' '); } };

/* ================= TELA DO JOGO ================= */
function jgEstrelas(jg){ var h=''; for(var i=0;i<JG_R;i++) h+='<span>'+(i<jg.res.length?(jg.res[i]?'⭐':'☁️'):'⚪')+'</span>'; return '<div class="jg-estrelas" aria-label="'+jg.res.filter(Boolean).length+' estrelas">'+h+'</div>'; }
function jgMelhor(gid){ try{ return +localStorage.getItem('jgbest-'+gid)||0; }catch(e){ return 0; } }
function jgListaHTML(tid){ var L=JOGOS[tid]||[]; if(!L.length) return '';
  return '<div class="jg-masc"><span class="jg-coruja">'+MASCOTE+'</span><div class="jg-balao">Oi'+(ST.me&&!isProf()?', '+esc(primeiroNome(ST.me.nome)):'')+'! Escolha um jogo para brincar 👇</div></div><div class="stack">'+L.map(function(g){ var b=jgMelhor(g.id); return '<button class="jg-card" data-a="jgAbrir" data-t="'+tid+'" data-g="'+g.id+'"><span class="jg-card-emoji">'+g.emoji+'</span><span class="grow"><b>'+g.nome+'</b><span class="small muted" style="display:block">'+g.desc+'</span>'+(b?'<span class="small">Recorde: '+emojiRep('⭐',b)+'</span>':'')+'</span><span class="jg-play">▶</span></button>'; }).join('')+'</div>'; }
function jgTela(tid){ var jg=ST.jg; if(!jg||jg.tid!==tid) return jgListaHTML(tid);
  var h='<div class="jg"><div class="jg-topo"><button class="btn sm ghost" data-a="jgSair" aria-label="Sair do jogo">✕</button><b class="grow">'+jg.g.emoji+' '+jg.g.nome+'</b>'+jgEstrelas(jg)+'</div>';
  if(jg.fim){ var e=jg.res.filter(Boolean).length; return h+'<div class="jg-fim"><div class="jg-trofeu">'+(e===JG_R?'🏆':e>=3?'🥇':'💪')+'</div><h2>'+(e===JG_R?'Perfeito! Você é craque!':e>=3?'Muito bem!':'Bora treinar mais um pouco!')+'</h2><div class="jg-fim-est">'+emojiRep('⭐',e)+emojiRep('☁️',JG_R-e)+'</div><p>Você acertou <b>'+e+' de '+JG_R+'</b>'+(isProf()?'':' e ganhou <b>+'+jg.xp+' XP</b> 🔥')+'</p><div class="stack">'+jgBtn('jgDeNovo',null,'🔁 Jogar de novo','primary block')+jgBtn('jgSair',null,'🎮 Escolher outro jogo','ghost block')+'</div></div></div>'; }
  h+='<div class="jg-masc"><span class="jg-coruja">'+MASCOTE+'</span><div class="jg-balao">'+jg.ronda.perg+'</div></div>';
  h+='<div class="jg-area">'+MOTOR[jg.g.motor].render(jg)+'</div>';
  if(jg.fb){ var M=MOTOR[jg.g.motor], certa=M.certa?M.certa(jg.ronda):jg.ronda.certaTxt;
    h+='<div class="jg-fb '+(jg.fb.ok?'ok':'bad')+'" id="jgFb"><div class="jg-fb-tit">'+jg.fb.msg+'</div>'+(jg.fb.ok?'':'<p style="margin:6px 0"><b>Resposta certa:</b> '+certa+'</p>')+(jg.ronda.exp&&jg.ronda.exp.length?'<ol>'+jg.ronda.exp.map(function(s){return '<li>'+s+'</li>';}).join('')+'</ol>':'')+jgBtn('jgProxima',null,jg.k>=JG_R-1?'Ver resultado 🏆':'Próxima ➜','primary block')+'</div>'; }
  return h+'</div>'; }
function jgPaint(){ var jg=ST.jg; if(!jg) return; var tb=document.getElementById('tabBody'); if(tb) tb.innerHTML=jgTela(jg.tid); }
function jgNovaRonda(){ var jg=ST.jg, r=R(hashStr(jg.g.id)+jg.seed*7919+jg.k*104729+jg.tent*31); jg.ronda=jg.g.gen(r,jg.k); jg.cur=MOTOR[jg.g.motor].ini(jg.ronda); jg.fb=null; }
function confete(){ var c=document.createElement('div'); c.className='confete'; c.setAttribute('aria-hidden','true'); var cores=['#FFC93C','#E53935','#1E88E5','#43A047','#7E57C2','#FB8C00'];
  for(var i=0;i<32;i++){ var s=document.createElement('i'); s.style.left=Math.random()*100+'%'; s.style.background=cores[i%cores.length]; s.style.animationDelay=(Math.random()*.4)+'s'; s.style.transform='rotate('+(Math.random()*360)+'deg)'; c.appendChild(s); }
  document.body.appendChild(c); setTimeout(function(){ c.remove(); },2200); try{ if(navigator.vibrate) navigator.vibrate(40); }catch(e){} }
async function jgResolver(ok){ var jg=ST.jg; if(!jg||jg.fb||ok==null) return;
  jg.fb={ok:ok,msg:(ok?JG_OK:JG_ERR)[Math.floor(Math.random()*(ok?JG_OK:JG_ERR).length)]}; jg.res.push(ok);
  if(ok) confete(); jgPaint(); var f=document.getElementById('jgFb'); if(f) f.scrollIntoView({behavior:'smooth',block:'center'});
  if(ok&&!isProf()&&TBY[jg.tid]){ var ac=Object.assign({},(ST.prog[jg.tid]&&ST.prog[jg.tid].acertos)||{}); var kk='j:'+jg.g.id+':'+jg.seed+':'+jg.k; if(ac[kk]===undefined){ ac[kk]=true; await saveProg(jg.tid,{acertos:ac}); updHdr(jg.tid); } } }
A.jgAbrir=function(el){ var tid=el.dataset.t, g=(JOGOS[tid]||[]).filter(function(x){return x.id===el.dataset.g;})[0]; if(!g) return; var seed=0; try{ seed=(+localStorage.getItem('jgseed-'+g.id)||0)+1; localStorage.setItem('jgseed-'+g.id,seed); }catch(e){ seed=Date.now()%100000; }
  ST.jg={tid:tid,g:g,seed:seed,k:0,tent:0,res:[]}; jgNovaRonda(); jgPaint(); window.scrollTo(0,0); };
A.jgSair=function(){ var tid=ST.jg&&ST.jg.tid; ST.jg=null; var tb=document.getElementById('tabBody'); if(tb&&tid) tb.innerHTML=jgListaHTML(tid); window.scrollTo(0,0); };
A.jgDeNovo=function(){ var jg=ST.jg; if(!jg) return; A.jgAbrir({dataset:{t:jg.tid,g:jg.g.id}}); };
A.jgProxima=async function(){ var jg=ST.jg; if(!jg||!jg.fb) return; jg.k++; window.scrollTo(0,0);
  if(jg.k>=JG_R){ var e=jg.res.filter(Boolean).length; jg.fim=true; jg.xp=e*3+2; try{ if(e>jgMelhor(jg.g.id)) localStorage.setItem('jgbest-'+jg.g.id,e); }catch(x){} jgPaint(); if(e>=4) confete();
    if(!isProf()){ logEv('jogo',jg.tid,{jogo:jg.g.nome,acertos:e,de:JG_R},0); await addXP(jg.xp); } return; }
  jgNovaRonda(); jgPaint(); };
A.jgEscolhe=function(el){ var jg=ST.jg; if(!jg||jg.fb) return; var v=+el.dataset.v; jg.cur.pick=v; jgResolver(v===jg.ronda.certa); };
A.jgConferir=function(){ var jg=ST.jg; if(!jg||jg.fb) return; jgResolver(MOTOR[jg.g.motor].conferir(jg)); };
A.jgTecla=function(el){ var jg=ST.jg; if(!jg||jg.fb) return; var v=el.dataset.v; if(v==='apagar') jg.cur.v=jg.cur.v.slice(0,-1); else if(jg.cur.v.length<6) jg.cur.v=(jg.cur.v==='0'?'':jg.cur.v)+v; jgPaint(); };
A.jgBloco=function(el){ var jg=ST.jg; if(!jg||jg.fb) return; var i=+el.dataset.c, d=+el.dataset.v, c=jg.cur.c;
  if(d<0){ if(c[i]>0) c[i]--; } else if(c[i]<9) c[i]++; else if(i>0&&c[i-1]<9){ c[i]=0; c[i-1]++; toast('🔁 10 blocos de '+n(CASAS[i].v)+' viraram 1 bloco de '+n(CASAS[i-1].v)+'!'); } else toast('Essa casa já está cheia 😉');
  jgPaint(); };
A.jgPrato=function(el){ var jg=ST.jg; if(!jg||jg.fb) return; var c=jg.cur; if(!c.pilha){ toast('Acabaram os doces! Agora confira ✓'); return; } c.pilha--; c.p[+el.dataset.v]++; c.hist.push([+el.dataset.v]); jgPaint(); };
A.jgRodada=function(){ var jg=ST.jg; if(!jg||jg.fb) return; var c=jg.cur, k=c.p.length; if(c.pilha<k){ toast('Não dá mais para dar 1 para cada 🤔'); return; } var h=[]; for(var i=0;i<k;i++){ c.p[i]++; h.push(i); } c.pilha-=k; c.hist.push(h); jgPaint(); };
A.jgDesfazer=function(){ var jg=ST.jg; if(!jg||jg.fb) return; var c=jg.cur;
  if(jg.g.motor==='repartir'){ var h=c.hist.pop(); if(h) h.forEach(function(i){ c.p[i]--; c.pilha++; }); }
  else if(jg.g.motor==='moedas') c.c.pop(); jgPaint(); };
A.jgLimpar=function(){ var jg=ST.jg; if(!jg||jg.fb) return; jg.cur.c=[]; jgPaint(); };
A.jgFatia=function(el){ var jg=ST.jg; if(!jg||jg.fb) return; var i=el.dataset?el.dataset.v:el.getAttribute('data-v'); if(jg.cur.s[i]) delete jg.cur.s[i]; else jg.cur.s[i]=1; jgPaint(); };
A.jgMoeda=function(el){ var jg=ST.jg; if(!jg||jg.fb) return; if(jg.cur.c.length>=30) return; jg.cur.c.push(+el.dataset.v); jgPaint(); };
A.jgRel=function(el){ var jg=ST.jg; if(!jg||jg.fb) return; var v=el.dataset.v, c=jg.cur;
  if(v==='h1') c.h=c.h%12+1; else if(v==='h-1') c.h=c.h===1?12:c.h-1;
  else if(v==='m5'){ c.m+=5; if(c.m>=60){ c.m=0; c.h=c.h%12+1; } } else { c.m-=5; if(c.m<0){ c.m=55; c.h=c.h===1?12:c.h-1; } }
  jgPaint(); };
A.jgParE=function(el){ var jg=ST.jg; if(!jg||jg.fb) return; jg.cur.sel=+el.dataset.v; jgPaint(); };
A.jgParD=function(el){ var jg=ST.jg; if(!jg||jg.fb) return; var c=jg.cur, i=+el.dataset.v; if(c.sel==null){ toast('Primeiro toque numa palavra da esquerda 👈'); return; }
  if(c.sel===i){ c.feitos[i]=1; c.sel=null; if(Object.keys(c.feitos).length===jg.ronda.pares.length){ jgResolver(c.erros<=1); return; } } else { c.erros++; c.sel=null; toast('Hmm, esses dois não combinam 🤔'); } jgPaint(); };
A.jgPal=function(el){ var jg=ST.jg; if(!jg||jg.fb) return; var i=el.dataset.v; if(jg.cur.s[i]) delete jg.cur.s[i]; else jg.cur.s[i]=1; jgPaint(); };
A.jgPoe=function(el){ var jg=ST.jg; if(!jg||jg.fb) return; jg.cur.usadas.push(+el.dataset.v); jgPaint(); };
A.jgTira=function(el){ var jg=ST.jg; if(!jg||jg.fb) return; jg.cur.usadas.splice(+el.dataset.v,1); jgPaint(); };

/* ================= PORTUGUÊS: página do assunto ================= */
var PT_TEORIA={
'pt4-1':`<h3>O que é interpretar?</h3><p>Interpretar é <b>entender</b> o texto, como um detetive 🕵️. Existem três jeitos de perguntar sobre um texto:</p>
<div class="ex"><b>1. Localizar 🔎</b> — a resposta está <b>escrita</b> no texto.<ol><li>“Lia levou suco de uva.” Pergunta: que suco Lia levou?</li><li>Volte ao texto e ache: <b>suco de uva</b>.</li></ol></div>
<div class="ex"><b>2. Inferir 🧠</b> — a resposta <b>não está escrita</b>, mas as pistas mostram.<ol><li>“Ela pegou o guarda-chuva e a capa.”</li><li>Não está escrito “estava chovendo”, mas as pistas mostram que <b>estava chovendo</b>!</li></ol></div>
<div class="ex"><b>3. Ideia principal 💡</b> — do que o texto fala, no geral?<ol><li>Pense: se fosse contar o texto em <b>uma frase só</b>, o que diria?</li><li>Essa frase é a ideia principal.</li></ol></div>
<p class="tip"><b>Dica de ouro:</b> leia a pergunta, volte ao texto e sublinhe a parte que responde.</p>`,
'pt4-2':`<h3>Cada texto tem um jeitinho</h3><p>Os textos servem para coisas diferentes. Olhe as <b>pistas</b> para saber qual é qual:</p>
<div class="ex"><b>📝 Bilhete</b> — um recado curto para alguém.<ol><li>Tem para quem é: “Pedro,”</li><li>Tem o recado: “fui ao mercado”.</li><li>Tem quem escreveu: “Beijos, mamãe.”</li></ol></div>
<div class="ex"><b>📰 Notícia</b> — conta um fato que aconteceu de verdade.<ol><li>Diz <b>onde</b> e <b>quando</b>: “Recife, 12 de março”.</li><li>Conta o que aconteceu, quem participou.</li></ol></div>
<div class="ex"><b>🦊 Fábula</b> — historinha curta com bichos que falam e agem como gente.<ol><li>No final tem uma <b>moral</b>: um ensinamento.</li></ol></div>
<div class="ex"><b>🔢 Problema matemático</b> — um texto com números e uma <b>pergunta</b> para resolver com conta.<ol><li>“Ana tinha 24 figurinhas e ganhou 15. Quantas tem agora?”</li></ol></div>`,
'pt4-3':`<h3>Sinônimos 🤝 e antônimos 🔄</h3>
<div class="ex"><b>Sinônimos</b> são palavras que querem dizer <b>quase a mesma coisa</b>.<ol><li>feliz = alegre</li><li>bonito = lindo</li><li>rápido = veloz</li></ol></div>
<div class="ex"><b>Antônimos</b> são palavras que querem dizer <b>o contrário</b>.<ol><li>alto ↔ baixo</li><li>quente ↔ frio</li><li>abrir ↔ fechar</li></ol></div>
<p class="tip"><b>Para que serve?</b> Para não repetir palavras no seu texto: em vez de “feliz, feliz, feliz”, use “alegre” e “contente”.</p>`,
'pt4-4':`<h3>As palavras têm “profissões”</h3>
<div class="ex"><b>🏷️ Substantivo</b> dá <b>nome</b>: pessoas, bichos, coisas e lugares.<ol><li>Pedro, gato, bola, escola, Recife.</li></ol></div>
<div class="ex"><b>🎨 Adjetivo</b> diz <b>como é</b>: cor, tamanho, jeito.<ol><li>gato <b>preto</b>, bola <b>nova</b>, menina <b>alegre</b>.</li></ol></div>
<div class="ex"><b>🏃 Verbo</b> mostra uma <b>ação</b>: o que alguém faz ou fez.<ol><li>correr, pulou, comeu, canta.</li><li>Truque: dá para colocar “eu” ou “ele” na frente? “Ele <b>pulou</b>.” Então é verbo!</li></ol></div>
<p class="tip">Na frase “O gato <b>preto</b> <b>dormiu</b> no sofá”: gato e sofá são substantivos, preto é adjetivo, dormiu é verbo.</p>`,
'pt4-5':`<h3>Os sinais que dão o tom</h3>
<div class="ex"><b>. Ponto final</b> — termina uma frase que conta algo.<ol><li>Eu moro em Recife.</li></ol></div>
<div class="ex"><b>? Ponto de interrogação</b> — aparece nas perguntas.<ol><li>Qual é o seu nome?</li></ol></div>
<div class="ex"><b>! Ponto de exclamação</b> — mostra emoção: alegria, susto, surpresa.<ol><li>Que gol lindo!</li></ol></div>
<div class="ex"><b>, Vírgula</b> — faz uma pausinha.<ol><li>Separa coisas numa lista: banana, maçã, uva e pera.</li><li>Vem depois do nome de quem chamamos: Mariana, venha jantar!</li></ol></div>`,
'pt4-6':`<h3>Como montar uma frase bonita</h3>
<div class="ex"><b>Toda frase tem:</b><ol><li>Letra <b>maiúscula</b> no começo.</li><li>Um <b>sentido</b>: quem fez o quê.</li><li>Um <b>sinal</b> no final: . ? ou !</li></ol></div>
<div class="ex"><b>Exemplo:</b> as palavras “sofá / O / dormiu / gato / no.”<ol><li>Quem? <b>O gato</b> (começa com maiúscula).</li><li>Fez o quê? <b>dormiu</b>.</li><li>Onde? <b>no sofá.</b> (tem o ponto final).</li><li>Frase: <b>O gato dormiu no sofá.</b></li></ol></div>
<div class="ex"><b>Deixe a frase mais legal:</b><ol><li>O gato dormiu.</li><li>O gato <b>preto</b> dormiu <b>no sofá macio</b>.</li><li>Use adjetivos e diga onde e quando!</li></ol></div>`
};
function ptTopico(id){ return PORTUGUES_TOPICS.filter(function(t){return t.id===id;})[0]; }
async function vPt(id,tab){ var t=ptTopico(id); if(!t){ location.hash='#/assuntos'; return; }
  tab=tab||ST.tab[id]||'jogos'; ST.tab[id]=tab; var prof=isProf();
  var h='<div class="row wrap"><span class="badge">'+t.ano+'</span><span class="badge gray">Português</span></div><h1 style="margin-top:8px">'+esc(t.nome)+'</h1>';
  var tabs=[['jogos','🎮 Jogar'],['aprender','📖 Aprender'],['pdfs','📄 PDFs']];
  h+='<div class="tabs" role="tablist">'+tabs.map(function(x){return '<button role="tab" aria-selected="'+(tab===x[0])+'" class="'+(tab===x[0]?'on':'')+'" data-a="ptTab" data-id="'+id+'" data-v="'+x[0]+'">'+x[1]+'</button>';}).join('')+'</div><div id="tabBody"></div>';
  page({title:'Português',sub:t.ano,back:true,nav:prof?'conteudo':'assuntos',body:h});
  if(!prof) logEv('assunto',id);
  var tb=document.getElementById('tabBody');
  if(tab==='jogos') tb.innerHTML=jgTela(id);
  else if(tab==='aprender') tb.innerHTML='<div class="card teoria">'+fx(PT_TEORIA[id]||'')+'</div><button class="btn gold block" style="margin-top:12px" data-a="ptTab" data-id="'+id+'" data-v="jogos">🎮 Agora vamos jogar!</button>';
  else { tb.innerHTML='<div class="loading">Carregando…</div>'; var L=[]; try{ L=((await server('materiais',{acao:'listar',disciplina:'Português'})).materiais||[]).filter(function(m){return m.assunto===t.nome;}); }catch(e){}
    L.forEach(function(m){ (ST.mats=ST.mats||{})[m.id]=m; }); if(prof) await getAlunos();
    tb.innerHTML=(L.length?'<div class="stack">'+L.map(matItem).join('')+'</div>':'<p class="empty">'+(prof?'Nenhum PDF neste assunto ainda.':'O professor ainda não mandou PDFs deste assunto.')+'</p>')+(prof?'<button class="btn gold block" style="margin-top:10px" data-a="novoMat" data-disc="Português" data-ano="'+t.ano+'" data-assunto="'+esc(t.nome)+'">+ Enviar PDF para este assunto</button>':''); }
}
A.ptTab=function(el){ ST.tab[el.dataset.id]=el.dataset.v; vPt(el.dataset.id,el.dataset.v); window.scrollTo(0,0); };
