/* ===== Matemática Academy — aplicativo (aluno + professor) ===== */
(function(){
'use strict';
var WA = '5581982267438';
var $app = document.getElementById('app');
var MOCK = /[?&]demo=(aluno|professor)/.exec(location.search);
var ST = { cfg:null, sb:null, me:null, prog:{}, exProf:{}, quiz:{}, tab:{}, nl:null, chat:null };
var A = {}; // ações disparadas por data-a

/* ---------- utilidades ---------- */
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function strip(h){ var d=document.createElement('div'); d.innerHTML=String(h||'').replace(/<span class="fr"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,'($1)/($2)').replace(/<sup>(.*?)<\/sup>/g,'^$1'); return d.textContent.replace(/\s+/g,' ').trim(); }
function nl2br(s){ return esc(s).replace(/\n/g,'<br>'); }
function toast(m){ var t=document.createElement('div'); t.className='toast'; t.textContent=m; document.body.appendChild(t); setTimeout(function(){t.remove();},2600); }
function pctColor(p){ return 'hsl('+Math.round(p*1.2)+',72%,'+(p>40&&p<75?'36%':'40%')+')'; }
function ruler(p,big){ p=Math.max(0,Math.min(100,p||0)); return '<div class="ruler'+(big?' big-ruler':'')+'" role="img" aria-label="'+p+'% concluído"><i style="left:'+p+'%"></i><s style="left:'+p+'%"></s></div>'; }
function pctBadge(p){ return '<span class="pct" style="background:'+pctColor(p||0)+'">'+(p||0)+'%</span>'; }
function fmtData(d){ if(!d) return ''; var x=new Date(d.length<=10? d+'T12:00:00': d); return x.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.',''); }
function hoje(){ var d=new Date(); d.setHours(0,0,0,0); return d; }
function isoDate(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function iniciais(n){ return String(n||'?').trim().split(/\s+/).slice(0,2).map(function(x){return x[0];}).join('').toUpperCase(); }
function isProf(){ return ST.me && ST.me.role==='professor'; }
function steps(s){ if(!s) return []; if(Array.isArray(s)) return s; return String(s).replace(/\.\s+(?=[A-ZÀ-Ú0-9(√−\[])/g,'.\u0001').split('\u0001'); }
function primeiroNome(n){ return String(n||'').split(' ')[0]; }
var ICON = {
 home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
 book:'<path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M8 8h6"/>',
 cal:'<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
 list:'<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3 6 1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 17"/>',
 chat:'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.5a5 5 0 0 1 5.5 5"/>',
 grid:'<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
 back:'<path d="M15 5l-7 7 7 7"/>',
 send:'<path d="M4 12 20 4l-6 16-3-7z"/>',
 cam:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
 spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 check:'<path d="m5 12 5 5 9-10"/>',
 bell:'<path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
 share:'<path d="M12 3v12M8 7l4-4 4 4"/><path d="M6 11H5v10h14V11h-1"/>',
 plusq:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/>',
 file:'<path d="M6 2.5h8l5 5V21.5H6z"/><path d="M14 2.5v5h5M9 13h6M9 17h6"/>',
 report:'<path d="M6 3h9l4 4v14H6z"/><path d="M9 13h2v4H9zM13 10h2v7h-2z"/>',
 wa:'<path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a3.5 3.5 0 0 1-1.8-1.8l.8-1-1-2z"/>'
};
function ic(n,c,w){ return '<svg viewBox="0 0 24 24" width="'+(w||24)+'" height="'+(w||24)+'" fill="none" stroke="'+(c||'currentColor')+'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICON[n]+'</svg>'; }

/* ---------- conteúdo ---------- */
TOPICS.forEach(function(t){ if(TEORIA[t.id]) t.teoria = fx(TEORIA[t.id]); });
var TBY = {}; TOPICS.forEach(function(t){ TBY[t.id]=t; });
var AREAS = ['Números','Álgebra','Geometria','Grandezas e medidas','Estatística e probabilidade'];
var ANOS = ['6º ano','7º ano','8º ano','9º ano'];
var listCache = {};
function getList(id,seed){ var k=id+'|'+seed; if(!listCache[k]) listCache[k]=lista(TBY[id],seed); return listCache[k]; }
function norm(s){ return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,''); }

/* ---------- acesso a dados (Supabase ou modo demonstração) ---------- */
var MEM = null;
function mockInit(role){
  var now=new Date().toISOString(); var d=function(n){var x=hoje();x.setDate(x.getDate()+n);return isoDate(x);};
  MEM={ seq:100,
    profiles:[{id:'p1',role:'professor',nome:'Artur Sena',username:null,ano:null},{id:'a1',role:'aluno',nome:'Maria Clara Souza',username:'mariaclara',ano:'8º ano',meta_xp:20,diagnostico:(/diag=1/.test(location.search)?null:{pulado:true}),responsavel_whatsapp:'81999999999',valor_hora:30,horario:{desde:d(-8),slots:[{dia:2,hora:'18:00',dur:60},{dia:3,hora:'18:00',dur:60},{dia:5,hora:'18:00',dur:60}]}},{id:'a2',role:'aluno',nome:'João Pedro Lima',username:'joaopedro',ano:'7º ano'}],
    progress:[{student_id:'a1',topic_id:'fracoes',teoria:true,acertos:{},pct:90,updated_at:now},{student_id:'a1',topic_id:'equacao-1-grau',teoria:true,acertos:{},pct:45,updated_at:now},{student_id:'a1',topic_id:'mmc',teoria:false,acertos:{},pct:15,updated_at:now},{student_id:'a1',topic_id:'pitagoras',teoria:true,acertos:{},pct:68,updated_at:now}],
    notes:[{id:1,student_id:'a1',topic_id:'equacao-1-grau',texto:'Não entendo quando o número negativo passa dividindo.',dificuldade:true,created_at:now}],
    plan_items:[{id:2,student_id:'a1',topic_id:'equacao-1-grau',titulo:'Terminar exercícios de equação',data:d(1),feito:false},{id:3,student_id:'a1',topic_id:'pitagoras',titulo:'Revisar Pitágoras para a prova',data:d(-1),feito:false},{id:4,student_id:'a1',topic_id:null,titulo:'Levar caderno na aula',data:null,feito:true}],
    exercises:[{id:5,topic_id:'fracoes',q:'Uma pizza foi dividida em 8 fatias e comi 3. Que fração comi?',a:'3/8',s:'São 8 partes iguais.\nComi 3 delas.',criado_por:'p1'}],
    assignments:[{id:6,student_id:'a1',titulo:'Lista de frações',topic_id:'fracoes',itens:getList('fracoes',0).slice(0,3),prazo:d(3),status:'enviada',respostas:null,correcao:null,nota:null,feedback:null,created_at:now},{id:7,student_id:'a1',titulo:'MMC — revisão',topic_id:'mmc',itens:getList('mmc',0).slice(0,2),prazo:d(-2),status:'entregue',respostas:['30','12'],correcao:null,nota:null,feedback:null,created_at:now,entregue_em:now}],
    doubts:[{id:8,student_id:'a1',topic_id:'pitagoras',texto:'Na questão da escada, por que a escada é a hipotenusa?',imagem:null,status:'aberta',resposta:null,created_at:now}],
    atividade:[1,2,3,4].map(function(k){return {student_id:'a1',dia:diaBR(-k),xp:25};}),
    avisos:[{id:9,para:'a1',titulo:'Nova lista: Lista de frações',texto:'Prazo: em 3 dias',link:'#/lista/6',tipo:'lista',lido:false,created_at:now},{id:10,para:'p1',titulo:'Nova dúvida de Maria Clara',texto:'Na questão da escada…',link:'#/p-duvidas',tipo:'aluno',lido:false,created_at:now}],
    push_subs:[], materiais:[], blobs:{}, config:[{chave:'pub_pix',valor:'(81) 98226-7438'}],
    aulas:[{id:301,student_id:'a1',data:d(-5),hora:'19:00',duracao_min:60,valor:null,status:'pendente',obs:'Aula extra',created_at:now},{id:302,student_id:'a1',data:d(-10),hora:'18:00',duracao_min:60,valor:30,status:'paga',pago_em:now,created_at:now}],
    horarios:[[1,'18:00',0],[1,'19:00',0],[1,'20:00',0],[2,'18:00',1],[2,'19:00',0],[2,'20:00',0],[3,'18:00',1],[3,'19:00',0],[4,'19:00',0],[5,'18:00',1],[6,'08:00',0],[6,'09:00',0]].map(function(h,k){return {id:200+k,dia:h[0],hora:h[1],ocupado:!!h[2],obs:h[2]?'Maria Clara':null};})
  };
  return role==='professor'?MEM.profiles[0]:MEM.profiles[1];
}
function mockMatch(r,eq){ for(var k in eq){ if(r[k]!==eq[k]) return false; } return true; }
var DB = {
  q: async function(t,o){ o=o||{};
    if(MOCK){ var rows=MEM[t].filter(function(r){ return mockMatch(r,o.eq||{}) && (!o.neq || Object.keys(o.neq).every(function(k){return r[k]!==o.neq[k];})); }).map(function(r){return JSON.parse(JSON.stringify(r));});
      if(o.order){ var c=o.order[0],asc=o.order[1]!==false; rows.sort(function(a,b){return (a[c]>b[c]?1:a[c]<b[c]?-1:0)*(asc?1:-1);}); } return o.limit?rows.slice(0,o.limit):rows; }
    var x=ST.sb.from(t).select(o.select||'*'); var k;
    for(k in (o.eq||{})) x=x.eq(k,o.eq[k]);
    for(k in (o.neq||{})) x=x.neq(k,o.neq[k]);
    if(o.order) x=x.order(o.order[0],{ascending:o.order[1]!==false});
    if(o.limit) x=x.limit(o.limit);
    var r=await x; if(r.error) throw r.error; return r.data; },
  ins: async function(t,rows){ rows=Array.isArray(rows)?rows:[rows];
    if(MOCK){ var out=rows.map(function(r){ var n=Object.assign({id:++MEM.seq,created_at:new Date().toISOString()},r); if(t!=='exercises'&&!n.student_id) n.student_id=ST.me.id; MEM[t].push(n); return n; }); return out; }
    var r=await ST.sb.from(t).insert(rows).select(); if(r.error) throw r.error; return r.data; },
  upd: async function(t,match,patch){
    if(MOCK){ var out=[]; MEM[t].forEach(function(r){ if(mockMatch(r,match)){ Object.assign(r,patch); out.push(r);} }); return out; }
    var x=ST.sb.from(t).update(patch); for(var k in match) x=x.eq(k,match[k]); var r=await x.select(); if(r.error) throw r.error; return r.data; },
  del: async function(t,match){
    if(MOCK){ MEM[t]=MEM[t].filter(function(r){ return !mockMatch(r,match); }); return; }
    var x=ST.sb.from(t).delete(); for(var k in match) x=x.eq(k,match[k]); var r=await x; if(r.error) throw r.error; },
  ups: async function(t,row,conflict){
    if(MOCK){ var ex=MEM[t].filter(function(r){ return conflict.split(',').every(function(c){return r[c]===row[c];}); })[0]; if(ex) Object.assign(ex,row); else MEM[t].push(Object.assign({},row)); return row; }
    var r=await ST.sb.from(t).upsert(row,{onConflict:conflict}).select(); if(r.error) throw r.error; return r.data[0]; }
};
async function server(path,body){
  if(MOCK){ if(path==='alunos'&&body.acao==='criar'){ var p={id:'m'+(++MEM.seq),role:'aluno',nome:body.nome,username:body.usuario,ano:body.ano}; MEM.profiles.push(p); return {ok:true,aluno:p}; }
    if(path==='alunos'&&body.acao==='remover'){ MEM.profiles=MEM.profiles.filter(function(p){return p.id!==body.id;}); return {ok:true}; }
    if(path==='materiais') return mockMat(body);
    if(path==='professor'){ await new Promise(function(r){setTimeout(r,700);}); return {resposta:'(Modo demonstração) Vamos por partes:\n1. Leia o enunciado com calma.\n2. Identifique o que o problema pede.\n\nQuer tentar o primeiro passo?'}; }
    return {ok:true}; }
  var s=(await ST.sb.auth.getSession()).data.session; var tok=s?s.access_token:'';
  var r=await fetch('/api/'+path,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+tok},body:JSON.stringify(body)});
  var d=await r.json().catch(function(){return {erro:'Falha de conexão. Verifique a internet.'};});
  if(!r.ok) throw new Error(d.erro||'Erro');
  return d;
}
function erroMsg(e){ var m=(e&&(e.message||e.erro))||String(e); if(/JWT|session|token/i.test(m)) return 'Sua sessão expirou. Entre de novo.'; if(/Failed to fetch|NetworkError/i.test(m)) return 'Sem conexão com a internet.'; return m; }

/* ---------- progresso ---------- */
function calcPct(p){ if(!p) return 0; var ac=0; for(var k in (p.acertos||{})) if(p.acertos[k]===true) ac++; return Math.min(100,(p.teoria?20:0)+Math.round(80*Math.min(ac,20)/20)); }
async function loadProg(uid){ var rows=await DB.q('progress',{eq:{student_id:uid}}); var m={}; rows.forEach(function(r){m[r.topic_id]=r;}); return m; }
async function saveProg(tid,patch){
  var cur=ST.prog[tid]||{student_id:ST.me.id,topic_id:tid,teoria:false,acertos:{},pct:0};
  var n=Object.assign({},cur,patch); n.pct=calcPct(n); n.updated_at=new Date().toISOString(); ST.prog[tid]=n;
  try{ await DB.ups('progress',{student_id:ST.me.id,topic_id:tid,teoria:n.teoria,acertos:n.acertos,pct:n.pct,updated_at:n.updated_at},'student_id,topic_id'); }catch(e){ toast('Não salvou o progresso: '+erroMsg(e)); }
}
function pctOf(tid,prog){ var p=(prog||ST.prog)[tid]; return p?p.pct:0; }

/* ---------- layout ---------- */
function navHTML(cur){
  var items = isProf()
    ? [['painel','Painel','home'],['alunos','Alunos','users'],['p-listas','Listas','list'],['p-duvidas','Dúvidas','chat'],['conteudo','Conteúdo','book']]
    : [['inicio','Início','home'],['assuntos','Assuntos','book'],['plano','Plano','cal'],['listas','Listas','list'],['duvidas','Dúvidas','chat']];
  return '<nav class="nav" aria-label="Menu principal">'+items.map(function(it){ var b=(ST.badges||{})[it[0]]; return '<a href="#/'+it[0]+'" class="'+(cur===it[0]?'on':'')+'"'+(cur===it[0]?' aria-current="page"':'')+'>'+ic(it[2])+it[1]+(b?'<span class="dot">'+b+'</span>':'')+'</a>'; }).join('')+'</nav>';
}
function page(o){
  // o: {title, sub, back, nav, body, fab}
  var top='<header class="top">'+(o.back?'<button class="back" data-a="voltar" aria-label="Voltar">'+ic('back','#fff')+'</button>':'<span class="logo">∑</span>')+
    '<div class="tt"><b>'+o.title+'</b>'+(o.sub?'<small>'+o.sub+'</small>':'')+'</div>'+
    topExtras()+'<button class="avatar" data-a="perfil" aria-label="Meu perfil">'+esc(iniciais(ST.me.nome))+'</button></header>';
  $app.innerHTML=top+'<main id="main"'+(o.fab?' class="has-fab"':'')+'>'+o.body+'</main>'+(o.fab||'')+navHTML(o.nav);
  maybeCelebrate();
}
function topExtras(){
  var h='';
  if(!isProf()){ var s=streakInfo(); h+='<button class="streakchip'+(s.metHoje?' on':(s.emRisco?' risk':''))+'" data-a="irSeq" aria-label="Sequência de '+s.seq+' dias">'+flame(22,s.metHoje?'on':'off')+'<b>'+s.seq+'</b></button>'; }
  var u=ST.unread||0; h+='<button class="bell" data-a="irAvisos" aria-label="Avisos'+(u?', '+u+' não lidos':'')+'">'+ic('bell','#fff',22)+(u?'<span>'+(u>9?'9+':u)+'</span>':'')+'</button>';
  return h;
}
function loading(title,nav){ page({title:title,nav:nav,body:'<div class="loading">Carregando…</div>'}); }
function sheet(title,body,footer){
  closeSheet(); var bg=document.createElement('div'); bg.className='sheet-bg'; bg.id='sheet';
  bg.innerHTML='<div class="sheet" role="dialog" aria-modal="true" aria-label="'+esc(strip(title))+'"><header><b>'+title+'</b><button class="x" data-a="fecharSheet" aria-label="Fechar">×</button></header><div class="body" id="sheetBody">'+body+'</div>'+(footer?'<footer>'+footer+'</footer>':'')+'</div>';
  bg.addEventListener('click',function(e){ if(e.target===bg) closeSheet(); });
  document.body.appendChild(bg); document.body.style.overflow='hidden';
  return bg;
}
function closeSheet(){ var s=document.getElementById('sheet'); if(s) s.remove(); document.body.style.overflow=''; }
A.fecharSheet=closeSheet;
A.voltar=function(){ if(history.length>1) history.back(); else location.hash='#/'; };
A.perfil=function(){ location.hash = isProf()?'#/meu-perfil':'#/perfil'; };

/* ---------- cartões de assunto ---------- */
function topicCard(t,p,href){
  return '<a class="tcard" href="'+(href||'#/assunto/'+t.id)+'"><span class="badge'+(p==null?'':' gray')+'">'+t.ano+'</span><b>'+t.nome+'</b>'+(p==null?'':pctBadge(p)+ruler(p))+'</a>';
}
function topicGrid(list,prog,showPct,hrefFn){
  if(!list.length) return '<p class="empty">Nenhum assunto encontrado. Tente outra palavra.</p>';
  var h=''; AREAS.forEach(function(a){ var L=list.filter(function(t){return t.area===a;}); if(!L.length) return;
    h+='<h2>'+a+' <span class="muted small">('+L.length+')</span></h2><div class="grid g3">'+L.map(function(t){ return topicCard(t, showPct?pctOf(t.id,prog):null, hrefFn?hrefFn(t):null); }).join('')+'</div>'; });
  return h;
}

/* ================= TELAS DE ENTRADA ================= */
function screenMsg(title,html){ $app.innerHTML='<div class="login"><div class="logo">∑</div><h1>'+title+'</h1>'+html+'</div>'; }
function screenConfig(f){
  screenMsg('Quase pronto!','<p>A plataforma está publicada, mas falta o professor colocar as chaves na Vercel:</p><ul>'+f.map(function(x){return '<li><b>'+esc(x)+'</b></li>';}).join('')+'</ul><p class="muted small">Vercel → projeto → Settings → Environment Variables. Depois faça um novo deploy.</p>');
}
function screenSetup(){
  screenMsg('Criar conta do professor','<p class="muted">Primeiro acesso: crie a conta de professor. Depois disso esta tela não aparece mais.</p><form data-form="setup"><label for="sn">Seu nome</label><input id="sn" name="nome" required autocomplete="name"><label for="se">E-mail</label><input id="se" name="email" type="email" required autocomplete="email"><label for="ss">Senha (mínimo 6)</label><input id="ss" name="senha" type="password" minlength="6" required autocomplete="new-password"><div id="msg"></div><button class="btn primary block" style="margin-top:16px">Criar conta</button></form>');
}
function screenLogin(msg){
  screenMsg('Entrar','<p class="muted" style="margin-top:-6px">Matemática Academy · 6º ao 9º ano</p><form data-form="login"><label for="lu">Usuário (ou e-mail do professor)</label><input id="lu" name="u" required autocapitalize="none" autocorrect="off" autocomplete="username"><label for="lp">Senha</label><input id="lp" name="p" type="password" required autocomplete="current-password"><div id="msg">'+(msg?'<div class="err">'+esc(msg)+'</div>':'')+'</div><button class="btn primary block" style="margin-top:16px">Entrar</button></form><p class="muted small" style="margin-top:18px">Esqueceu a senha? Fale com o professor pelo <a href="https://wa.me/'+WA+'" target="_blank" rel="noopener">WhatsApp</a>.</p>');
}
var FORMS = {};
FORMS.setup=async function(f){ var b=f.querySelector('button'); b.disabled=true; var m=document.getElementById('msg');
  try{ var r=await fetch('/api/setup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nome:f.nome.value,email:f.email.value,senha:f.senha.value})}); var d=await r.json(); if(!r.ok) throw new Error(d.erro);
    var s=await ST.sb.auth.signInWithPassword({email:f.email.value.trim().toLowerCase(),password:f.senha.value}); if(s.error) throw s.error; await afterLogin(); }
  catch(e){ m.innerHTML='<div class="err">'+esc(erroMsg(e))+'</div>'; b.disabled=false; } };
FORMS.login=async function(f){ var b=f.querySelector('button'); b.disabled=true; b.innerHTML='<span class="spin"></span>'; var m=document.getElementById('msg');
  var u=f.u.value.trim().toLowerCase(); var email=u.indexOf('@')>=0?u:u+'@'+ST.cfg.dominio;
  var s=await ST.sb.auth.signInWithPassword({email:email,password:f.p.value});
  if(s.error){ m.innerHTML='<div class="err">Usuário ou senha incorretos.</div>'; b.disabled=false; b.textContent='Entrar'; return; }
  await afterLogin(); };
async function afterLogin(){
  if(!MOCK){ var u=(await ST.sb.auth.getUser()).data.user; var p=await DB.q('profiles',{eq:{id:u.id}}); if(!p.length){ await ST.sb.auth.signOut(); return screenLogin('Seu acesso ainda não foi liberado pelo professor.'); } ST.me=p[0]; }
  if(!isProf()){ ST.prog=await loadProg(ST.me.id); ST.ativ=await loadAtiv(ST.me.id); }
  await refreshBadges();
  if(!isProf() && ST.me.diagnostico==null){ if(location.hash==='#/diagnostico') render(); else location.hash='#/diagnostico'; return; }
  if(!location.hash || location.hash==='#/' ) location.hash = isProf()?'#/painel':'#/inicio'; else render();
  setTimeout(installNudge,1200);
}
async function refreshBadges(){
  try{ var b={};
    if(isProf()){ b['p-listas']=(await DB.q('assignments',{eq:{status:'entregue'},select:'id'})).length||0; b['p-duvidas']=(await DB.q('doubts',{eq:{status:'aberta'},select:'id'})).length||0; }
    else { b['listas']=(await DB.q('assignments',{eq:{student_id:ST.me.id,status:'enviada'},select:'id'})).length||0; }
    ST.badges=b; }catch(e){ ST.badges={}; }
  try{ ST.unread=(await DB.q('avisos',{eq:{para:ST.me.id,lido:false},select:'id'})).length; }catch(e){ ST.unread=0; }
}
A.sair=async function(){ if(!MOCK) await ST.sb.auth.signOut(); ST.me=null; ST.prog={}; location.hash=''; screenLogin(); };

/* ================= ALUNO ================= */
async function vInicio(){
  loading('Início','inicio');
  var me=ST.me; var plan=await DB.q('plan_items',{eq:{student_id:me.id,feito:false},order:['data',true]});
  var asg=await DB.q('assignments',{eq:{student_id:me.id},order:['created_at',false]});
  var dv=await DB.q('doubts',{eq:{student_id:me.id,status:'respondida'},order:['respondida_em',false],limit:3});
  var meus=TOPICS.filter(function(t){return t.ano===me.ano;}); var media=meus.length?Math.round(meus.reduce(function(s,t){return s+pctOf(t.id);},0)/meus.length):0;
  var started=Object.values(ST.prog).sort(function(a,b){return a.updated_at<b.updated_at?1:-1;});
  var cont=started.filter(function(p){return p.pct<100 && TBY[p.topic_id];})[0];
  var pend=asg.filter(function(a){return a.status==='enviada';});
  var h=installCard()+pushCard()+streakCard()+'<div class="hero" style="margin-top:12px"><h1>Olá, '+esc(primeiroNome(me.nome))+'! 👋</h1><p>'+esc(me.ano||'')+' · seu progresso no ano</p><div style="margin-top:12px;display:flex;align-items:center;gap:10px"><div style="flex:1">'+ruler(media,true)+'</div><b style="font-size:22px">'+media+'%</b></div></div>';
  if(cont){ var t=TBY[cont.topic_id]; h+='<h2>Continuar de onde parei</h2>'+topicCard(t,cont.pct); }
  h+='<h2>Listas para fazer</h2>'+(pend.length?'<div class="stack">'+pend.map(asgItem).join('')+'</div>':'<p class="muted">Nenhuma lista pendente. 🎉</p>');
  var atras=plan.filter(function(p){return p.data && new Date(p.data+'T12:00')<hoje();});
  h+='<h2>Próximas tarefas</h2>'+(plan.length?'<div class="stack">'+plan.slice(0,4).map(planItem).join('')+'</div>'+(atras.length?'<p class="small" style="color:var(--bad);font-weight:700">'+atras.length+' tarefa(s) atrasada(s)</p>':''):'<p class="muted">Sem tarefas. Monte seu plano na aba <a href="#/plano">Plano</a>.</p>');
  try{ var fp=await DB.q('aulas',{eq:{student_id:me.id,status:'pendente'}}); if(fp.length){ var ft=fp.reduce(function(s2,a){return s2+valorAula(a,me);},0); h+='<a class="card" href="#/financeiro" style="display:block;text-decoration:none;margin-top:12px;background:var(--badbg);border-color:#F2BDBD"><b style="color:var(--bad)">💰 '+fp.length+' aula(s) a pagar · '+brl(ft)+'</b><span class="small muted" style="display:block">Toque para ver os detalhes e a chave PIX</span></a>'; } }catch(e){}
  var mats=[]; try{ mats=(await server('materiais',{acao:'listar',limite:3})).materiais||[]; }catch(e){}
  if(mats.length) h+='<h2>Materiais do professor</h2><div class="stack">'+mats.map(matItem).join('')+'</div><a class="btn ghost block" style="margin-top:8px" href="#/materiais">Ver todos os materiais</a>';
  if(dv.length) h+='<h2>Dúvidas respondidas</h2><div class="stack">'+dv.map(doubtItem).join('')+'</div>';
  page({title:'Matemática Academy',sub:esc(me.nome),nav:'inicio',body:h});
}
function asgItem(a){
  var st={enviada:'<span class="badge">Para fazer</span>',entregue:'<span class="badge gray">Entregue</span>',corrigida:'<span class="badge ok">Corrigida'+(a.nota!=null?' · nota '+String(a.nota).replace('.',','):'')+'</span>'}[a.status];
  var late=a.status==='enviada'&&a.prazo&&new Date(a.prazo+'T23:59')<new Date();
  return '<a class="item" style="text-decoration:none" href="#/'+(isProf()?(a.status==='entregue'?'corrigir/':'ver-lista/'):'lista/')+a.id+'"><div class="grow"><b>'+esc(a.titulo)+'</b><span class="small muted">'+(a._aluno?esc(a._aluno)+' · ':'')+(a.itens?a.itens.length:0)+' questões'+(a.prazo?' · prazo '+fmtData(a.prazo):'')+'</span>'+(late?'<div class="small" style="color:var(--bad);font-weight:800">Atrasada</div>':'')+'</div>'+st+'</a>';
}
function planItem(p){
  var t=p.topic_id&&TBY[p.topic_id]; var late=!p.feito&&p.data&&new Date(p.data+'T12:00')<hoje();
  return '<div class="item"><button class="check'+(p.feito?' on':'')+'" data-a="togglePlan" data-id="'+p.id+'" aria-label="'+(p.feito?'Desmarcar':'Marcar como feito')+'">'+(p.feito?ic('check','#fff',18):'')+'</button><div class="grow"><b style="'+(p.feito?'text-decoration:line-through;color:var(--muted)':'')+'">'+esc(p.titulo)+'</b><span class="small" style="color:'+(late?'var(--bad)':'var(--muted)')+';font-weight:'+(late?800:500)+'">'+(p.data?(late?'Atrasada · ':'')+fmtData(p.data):'Sem data')+(t?' · <a href="#/assunto/'+t.id+'">'+t.nome+'</a>':'')+'</span>'+(t&&!isProf()?'<div style="margin-top:6px">'+ruler(pctOf(t.id))+'</div>':'')+'</div>'+(String(p.criado_por)===String(ST.me.id)||isProf()?'<button class="btn sm ghost" data-a="delPlan" data-id="'+p.id+'" aria-label="Apagar tarefa">✕</button>':'')+'</div>';
}
function doubtItem(d){
  var t=d.topic_id&&TBY[d.topic_id];
  return '<div class="card"><div class="row wrap" style="justify-content:space-between"><span class="small muted">'+(d._aluno?'<b>'+esc(d._aluno)+'</b> · ':'')+(t?t.nome+' · ':'')+fmtData(d.created_at)+'</span>'+(d.status==='aberta'?'<span class="badge">Aguardando</span>':'<span class="badge ok">Respondida</span>')+'</div><p style="margin:8px 0 0">'+nl2br(d.texto)+'</p>'+(d.imagem?'<img src="'+esc(d.imagem)+'" alt="Foto enviada" style="max-width:100%;border-radius:12px;margin-top:8px" data-a="zoom">':'')+(d.resposta?'<div class="answer" style="margin-top:10px"><b>Resposta do professor:</b><br>'+nl2br(d.resposta)+'</div>':'')+(isProf()&&d.status==='aberta'?'<form data-form="responder" data-id="'+d.id+'" style="margin-top:10px"><label for="r'+d.id+'">Sua resposta</label><textarea id="r'+d.id+'" name="r" required></textarea><button class="btn primary block" style="margin-top:8px">Responder</button></form>':'')+'</div>';
}
A.zoom=function(el){ sheet('Foto','<img src="'+esc(el.getAttribute('src'))+'" alt="Foto ampliada" style="width:100%;border-radius:12px">'); };

function vAssuntos(){
  var meuAno=!isProf()&&ST.me.ano&&ANOS.indexOf(ST.me.ano)>=0?ST.me.ano:null; var q=ST.busca||'', anoSel=ST.anoSel||meuAno||'Todos';
  var words=norm(q).split(/\s+/).filter(Boolean);
  var L=TOPICS.slice().sort(function(x,y){ return (x.ano===meuAno?0:1)-(y.ano===meuAno?0:1); }).filter(function(t){ if(anoSel!=='Todos'&&t.ano!==anoSel&&!words.length) return false; var hay=norm(t.nome+' '+t.tags+' '+t.area+' '+t.ano); return words.every(function(w){return hay.indexOf(w)>=0;}); });
  var prof=isProf();
  var h='<div class="search">'+ic('search','#55627F',20)+'<input id="busca" type="search" placeholder="Pesquisar assunto: frações, MMC, Pitágoras…" value="'+esc(q)+'" aria-label="Pesquisar assunto" autocomplete="off"></div>'+
    '<div class="chips" style="margin-top:10px" role="group" aria-label="Filtrar por ano">'+(meuAno?[meuAno]:[]).concat(['Todos'],ANOS.filter(function(a){return a!==meuAno;})).map(function(a){return '<button class="chip'+(a===anoSel?' on':'')+'" data-a="anoSel" data-v="'+a+'">'+(a===meuAno?'⭐ Meu ano ('+a+')':a)+'</button>';}).join('')+'</div>';
  if(prof) h='<a class="btn gold block" style="margin-bottom:12px" href="#/materiais">'+ic('file')+' Materiais em PDF</a>'+h;
  h+='<div id="lista">'+topicGrid(L,ST.prog,!prof)+'</div>';
  page({title:prof?'Conteúdo':'Assuntos',sub:L.length+' assuntos',nav:prof?'conteudo':'assuntos',body:h});
  var inp=document.getElementById('busca'); inp.addEventListener('input',function(){ ST.busca=inp.value; var pos=inp.selectionStart; vAssuntos(); var n=document.getElementById('busca'); n.focus(); try{n.setSelectionRange(pos,pos);}catch(e){} });
}
A.anoSel=function(el){ ST.anoSel=el.dataset.v; vAssuntos(); };

async function vAssunto(id,tab){
  var t=TBY[id]; if(!t){ location.hash='#/assuntos'; return; }
  tab=tab||ST.tab[id]||'teoria'; ST.tab[id]=tab;
  var prof=isProf();
  if(!ST.exProf[id]){ try{ ST.exProf[id]=(await DB.q('exercises',{eq:{topic_id:id},order:['created_at',true]})).map(function(e){return {q:esc(e.q),a:esc(e.a),s:String(e.s||'').split('\n').filter(Boolean).map(esc),prof:true,id:e.id};}); }catch(e){ ST.exProf[id]=[]; } }
  var p=prof?null:pctOf(id);
  var h='<div class="row wrap"><span class="badge">'+t.ano+'</span><span class="badge gray">'+t.area+'</span></div><h1 style="margin-top:8px">'+t.nome+'</h1>';
  if(!prof) h+='<div class="row"><div style="flex:1">'+ruler(p,true)+'</div><b style="color:'+pctColor(p)+'">'+p+'%</b></div>';
  var tabs=prof?[['teoria','Teoria'],['ex','Exercícios'],['meus','Meus exercícios']]:[['teoria','Teoria'],['ex','Exercícios'],['notas','Anotações']];
  h+='<div class="tabs" role="tablist">'+tabs.map(function(x){return '<button role="tab" aria-selected="'+(tab===x[0])+'" class="'+(tab===x[0]?'on':'')+'" data-a="tab" data-id="'+id+'" data-v="'+x[0]+'">'+x[1]+'</button>';}).join('')+'</div><div id="tabBody"></div>';
  var fab=prof?'':'<div class="fab"><button class="ia" data-a="abrirIA" data-id="'+id+'">'+ic('spark','#FFC93C',20)+'Professor IA</button><button class="duv" data-a="novaDuvida" data-id="'+id+'">'+ic('chat','#0E1B3D',20)+'Dúvida</button></div>';
  page({title:t.nome,sub:t.ano,back:true,nav:prof?'conteudo':'assuntos',body:h,fab:fab});
  var tb=document.getElementById('tabBody');
  if(tab==='teoria'){
    var lido=!prof&&ST.prog[id]&&ST.prog[id].teoria;
    var dI=didatIndice(t.teoria);tb.innerHTML='<div class="card teoria">'+didatTopo(t)+dI.idx+dI.html+didatTeste(t)+'</div>'+(prof?'':'<div style="margin-top:12px"><button class="btn block '+(lido?'ghost':'gold')+'" data-a="lido" data-id="'+id+'">'+(lido?'✓ Teoria estudada (vale 20%)':'Marcar teoria como estudada (+20%)')+'</button></div>')+'<button class="btn primary block" style="margin-top:10px" data-a="tab" data-id="'+id+'" data-v="ex">Ir para os exercícios →</button><div id="matTopico"></div>';
    matTopico(id);
  } else if(tab==='ex'){ renderQuiz(id); }
  else if(tab==='notas'){ renderNotas(id); }
  else if(tab==='meus'){ renderMeusEx(id); }
}
A.tab=function(el){ ST.tab[el.dataset.id]=el.dataset.v; vAssunto(el.dataset.id,el.dataset.v); window.scrollTo(0,0); };
A.irsec=function(el){var e=document.getElementById(el.dataset.v);if(e)e.scrollIntoView({behavior:'smooth',block:'start'});};
A.lido=async function(el){ var id=el.dataset.id; var cur=ST.prog[id]&&ST.prog[id].teoria; await saveProg(id,{teoria:!cur}); if(!cur) await addXP(15); toast(cur?'Desmarcado':'Boa! +20% neste assunto'); vAssunto(id,'teoria'); };

function quizState(id){ if(!ST.quiz[id]) ST.quiz[id]={seed:0,idx:0,mode:'quiz',shown:{}}; return ST.quiz[id]; }
function fullList(id,seed){ return getList(id,seed).concat(seed===0?(ST.exProf[id]||[]):[]); }
function renderQuiz(id){
  var s=quizState(id), L=fullList(id,s.seed), prof=isProf(); if(s.idx>=L.length) s.idx=0;
  var ac=(!prof&&ST.prog[id]&&ST.prog[id].acertos)||{};
  var h='<div class="row wrap" style="justify-content:space-between"><div class="seg" role="group" aria-label="Modo"><button class="'+(s.mode==='quiz'?'on':'')+'" data-a="qmode" data-id="'+id+'" data-v="quiz">Quiz</button><button class="'+(s.mode==='gab'?'on':'')+'" data-a="qmode" data-id="'+id+'" data-v="gab">Com gabarito</button></div><div class="row"><span class="small muted" style="font-weight:700">Lista '+(s.seed+1)+'</span>'+(s.seed>0?'<button class="btn sm ghost" data-a="seed" data-id="'+id+'" data-v="-1" aria-label="Lista anterior">←</button>':'')+'<button class="btn sm gold" data-a="seed" data-id="'+id+'" data-v="1">Nova lista ↻</button></div></div>';
  if(s.mode==='quiz'){
    var g=L[s.idx], key=s.seed+':'+s.idx, shown=!!s.shown[s.idx], st=ac[key];
    h+='<div class="card" style="margin-top:12px"><div class="row" style="justify-content:space-between"><span class="qnum">QUESTÃO '+(s.idx+1)+' DE '+L.length+'</span>'+(g.prof?'<span class="badge">do professor</span>':'')+'</div><div class="progress"><i style="width:'+((s.idx+1)/L.length*100)+'%"></i></div><div class="qtext">'+g.q+'</div>';
    var opts=quizOpts(id,s.seed,s.idx,g); var esc_=s.pick&&s.pick[s.idx];
    h+='<div class="stack" style="margin-top:14px" role="group" aria-label="Alternativas">'+opts.map(function(o,k){ var cls='btn ghost block opt'; if(shown){ if(o===g.a) cls='btn block opt on-ok'; else if(esc_===k) cls='btn block opt on-bad'; } return '<button class="'+cls+'" style="justify-content:flex-start;text-align:left" data-a="escolhe" data-id="'+id+'" data-v="'+k+'"'+(shown?' disabled':'')+'><b style="margin-right:6px">'+'ABCD'[k]+')</b> <span>'+o+'</span></button>'; }).join('')+'</div>';
    if(shown){ h+='<div class="'+(st===false?'err':'okmsg')+'" style="margin-top:12px">'+(st===false?'Não foi dessa vez. Veja a resolução:':'Acertou! 🎉')+'</div>'+ansHTML(g); }
    else h+='<button class="btn sm ghost" style="margin-top:10px" data-a="revela" data-id="'+id+'">Não sei — ver a resolução</button>';
    h+='<div class="qnav"><button class="btn ghost" data-a="qnav" data-id="'+id+'" data-v="-1" '+(s.idx===0?'disabled':'')+'>← Anterior</button><button class="btn '+(shown?'primary':'ghost')+'" data-a="qnav" data-id="'+id+'" data-v="1" '+(s.idx===L.length-1?'disabled':'')+'>Próxima →</button></div>';
    h+='<div class="dots" aria-label="Ir para a questão">'+L.map(function(_,k){ var v=ac[s.seed+':'+k]; return '<button data-a="qjump" data-id="'+id+'" data-v="'+k+'" class="'+(k===s.idx?'cur ':'')+(v===true?'ok':v===false?'bad':'')+'" aria-label="Questão '+(k+1)+'">'+(k+1)+'</button>'; }).join('')+'</div>';
    if(!prof) h+='<p class="small muted" style="margin-top:10px">Escolha uma alternativa. Cada acerto vale 4% do assunto (até 20 acertos); a teoria vale 20%. Vale a primeira tentativa.</p>';
    h+='</div>';
  } else {
    h+='<div class="stack" style="margin-top:12px">'+L.map(function(g,k){ return '<div class="card"><div class="row" style="justify-content:space-between"><span class="qnum">QUESTÃO '+(k+1)+'</span>'+(g.prof?'<span class="badge">do professor</span>':'')+'</div><div class="qtext" style="font-size:17px;margin-top:6px">'+g.q+'</div>'+ansHTML(g)+'</div>'; }).join('')+'</div><button class="btn block noprint" style="margin-top:12px" data-a="imprimir">Imprimir lista</button>';
  }
  document.getElementById('tabBody').innerHTML=h;
}
function quizOpts(id,seed,idx,g){
  var key=id+'|'+seed+'|'+idx; ST.opts=ST.opts||{}; if(ST.opts[key]) return ST.opts[key];
  var corr=g.a, sc=strip(corr);
  if(/^(Sim|Não)$/.test(sc)) return ST.opts[key]=['Sim','Não'];
  var pool=[]; [0,1,2,3].forEach(function(d){ getList(id,seed+d*37).forEach(function(x){ pool.push(x.a); }); });
  var seen={}; seen[sc]=1; var first=sc.split(/\s/)[0], last=sc.split(/\s/).pop(), hasFr=/class="fr"/.test(corr), isNum=/^[−\d.,]+$/.test(sc);
  var cand=[]; pool.forEach(function(p){ var t=strip(p); if(seen[t]) return; seen[t]=1; var s=0; if(t.split(/\s/)[0]===first) s+=2; if(t.split(/\s/).pop()===last) s+=2; if(/class="fr"/.test(p)===hasFr) s+=1; if(/^[−\d.,]+$/.test(t)===isNum) s+=2; if(Math.abs(t.length-sc.length)<=4) s+=1; cand.push([s,p]); });
  var r=R(hashStr(key)); cand=r.sh(cand).sort(function(x,y){return y[0]-x[0];});
  var out=[corr].concat(cand.slice(0,3).map(function(c){return c[1];}));
  if(out.length<4 && isNum){ var v=parseFloat(sc.replace(/\./g,'').replace(',','.').replace('−','-')); [1,-1,2,10].forEach(function(dv){ if(out.length<4){ var w=n(v+dv); if(out.map(strip).indexOf(w)<0) out.push(w);} }); }
  return ST.opts[key]=r.sh(out);
}
A.escolhe=async function(el){ var id=el.dataset.id, s=quizState(id); var L=fullList(id,s.seed), g=L[s.idx]; var opts=quizOpts(id,s.seed,s.idx,g); var k=+el.dataset.v; var ok=opts[k]===g.a;
  s.pick=s.pick||{}; s.pick[s.idx]=k; s.shown[s.idx]=1;
  if(!isProf()){ var ac=Object.assign({},(ST.prog[id]&&ST.prog[id].acertos)||{}); var kk=s.seed+':'+s.idx; if(ac[kk]===undefined){ ac[kk]=ok; await saveProg(id,{acertos:ac}); await addXP(ok?10:3); } }
  renderQuiz(id); updHdr(id); };
function updHdr(id){ if(!ST.prog[id]) return; var hdr=document.querySelector('#main .row b'); if(hdr){ hdr.textContent=ST.prog[id].pct+'%'; hdr.style.color=pctColor(ST.prog[id].pct); var rr=document.querySelector('#main .big-ruler'); if(rr) rr.outerHTML=ruler(ST.prog[id].pct,true); } }
function ansHTML(g){ var st=steps(g.s); return '<div class="answer"><div class="small muted" style="font-weight:800;letter-spacing:.08em">RESPOSTA</div><div class="ans">'+g.a+'</div>'+(st.length?'<div style="margin-top:8px;font-weight:800">Passo a passo:</div><ol class="steps">'+st.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ol>':'')+'</div>'; }
A.qmode=function(el){ quizState(el.dataset.id).mode=el.dataset.v; renderQuiz(el.dataset.id); };
A.seed=function(el){ var s=quizState(el.dataset.id); s.seed=Math.max(0,s.seed+ +el.dataset.v); s.idx=0; s.shown={}; s.pick={}; renderQuiz(el.dataset.id); };
A.revela=async function(el){ var id=el.dataset.id, s=quizState(id); s.shown[s.idx]=1; if(!isProf()){ var ac=Object.assign({},(ST.prog[id]&&ST.prog[id].acertos)||{}); var kk=s.seed+':'+s.idx; if(ac[kk]===undefined){ ac[kk]=false; await saveProg(id,{acertos:ac}); } } renderQuiz(id); updHdr(id); };
A.qnav=function(el){ var s=quizState(el.dataset.id); var L=fullList(el.dataset.id,s.seed); s.idx=Math.max(0,Math.min(L.length-1,s.idx+ +el.dataset.v)); renderQuiz(el.dataset.id); };
A.qjump=function(el){ quizState(el.dataset.id).idx=+el.dataset.v; renderQuiz(el.dataset.id); };
A.imprimir=function(){ try{ window.print(); }catch(e){} };
A.marca=async function(el){ var id=el.dataset.id, s=quizState(id); var ac=Object.assign({},(ST.prog[id]&&ST.prog[id].acertos)||{}); ac[s.seed+':'+s.idx]=el.dataset.v==='1'; await saveProg(id,{acertos:ac});
  var L=fullList(id,s.seed); if(el.dataset.v==='1') toast('Boa! '+ST.prog[id].pct+'% concluído'); if(s.idx<L.length-1){ s.idx++; } renderQuiz(id); var hdr=document.querySelector('#main .row b'); if(hdr){ hdr.textContent=ST.prog[id].pct+'%'; hdr.style.color=pctColor(ST.prog[id].pct); var r=document.querySelector('#main .big-ruler'); if(r) r.outerHTML=ruler(ST.prog[id].pct,true); } };
document.addEventListener('keydown',function(e){ var m=/^#\/assunto\/([^/]+)/.exec(location.hash); if(!m||document.getElementById('sheet')||/INPUT|TEXTAREA/.test(e.target.tagName)) return; var s=ST.quiz[m[1]]; if(!s||s.mode!=='quiz'||ST.tab[m[1]]!=='ex') return; if(e.key==='ArrowRight') A.qnav({dataset:{id:m[1],v:'1'}}); else if(e.key==='ArrowLeft') A.qnav({dataset:{id:m[1],v:'-1'}}); else if(e.key===' '){ e.preventDefault(); A.revela({dataset:{id:m[1]}}); } else if(/^[1-4abcd]$/i.test(e.key)){ var k='1234'.indexOf(e.key)>=0?'1234'.indexOf(e.key):'abcd'.indexOf(e.key.toLowerCase()); var b=document.querySelector('[data-a="escolhe"][data-v="'+k+'"]'); if(b&&!b.disabled) b.click(); } });

async function renderNotas(id){
  var tb=document.getElementById('tabBody'); tb.innerHTML='<div class="loading">Carregando…</div>';
  var notes=await DB.q('notes',{eq:{student_id:ST.me.id,topic_id:id},order:['created_at',false]});
  tb.innerHTML='<form class="card" data-form="nota" data-id="'+id+'"><label for="nt" style="margin-top:0">Escreva o que aprendeu ou o que está difícil</label><textarea id="nt" name="t" required placeholder="Ex.: Não entendi por que o sinal muda quando passa para o outro lado."></textarea><label class="row" style="font-weight:600;gap:10px;margin-top:10px"><input type="checkbox" name="d" style="width:22px;height:22px"> É uma dificuldade (o professor vai ver)</label><button class="btn primary block" style="margin-top:10px">Salvar anotação</button></form><h2>Minhas anotações</h2>'+(notes.length?'<div class="stack">'+notes.map(noteItem).join('')+'</div>':'<p class="muted">Nenhuma anotação ainda.</p>');
}
function noteItem(n){ var t=n.topic_id&&TBY[n.topic_id]; return '<div class="item"><div class="grow">'+(n._aluno?'<b>'+esc(n._aluno)+'</b>':'')+'<span class="small muted">'+(t?t.nome+' · ':'')+fmtData(n.created_at)+(n.dificuldade?' · <span class="badge bad">dificuldade</span>':'')+'</span><p style="margin:6px 0 0">'+nl2br(n.texto)+'</p></div>'+(!isProf()?'<button class="btn sm ghost" data-a="delNota" data-id="'+n.id+'" data-t="'+(n.topic_id||'')+'" aria-label="Apagar anotação">✕</button>':'')+'</div>'; }
FORMS.nota=async function(f){ try{ await DB.ins('notes',{student_id:ST.me.id,topic_id:f.dataset.id,texto:f.t.value.trim(),dificuldade:f.d.checked}); toast('Anotação salva (+5 XP)'); addXP(5); renderNotas(f.dataset.id); }catch(e){ toast(erroMsg(e)); } };
A.delNota=async function(el){ if(!confirmar('Apagar esta anotação?')) return; await DB.del('notes',{id:+el.dataset.id||el.dataset.id}); if(el.dataset.t&&/#\/assunto\//.test(location.hash)) renderNotas(el.dataset.t); else render(); };
function confirmar(m){ try{ return window.confirm(m); }catch(e){ return true; } }

/* ----- Professor IA ----- */
A.abrirIA=function(el){
  var id=el.dataset.id, t=TBY[id]; var s=ST.quiz[id]; var ctx='Assunto: '+t.nome+' ('+t.ano+').';
  if(ST.tab[id]==='ex'&&s){ var g=fullList(id,s.seed)[s.idx]; ctx+='\nO aluno está na questão: '+strip(g.q)+'\nGabarito: '+strip(g.a)+'\nResolução: '+steps(g.s).map(strip).join(' ');}
  if(!ST.chat||ST.chat.id!==id) ST.chat={id:id,ctx:ctx,msgs:[{de:'ia',texto:'Oi! Sou o Professor IA. Pode perguntar sobre **'+t.nome+'** ou mandar a foto de um exercício. Como posso ajudar?'}],img:null};
  else ST.chat.ctx=ctx;
  sheet(ic('spark','#C79100',20)+' Professor IA','<div class="msgs" id="msgs"></div>','<div class="small muted" id="imgInfo" style="margin-bottom:6px"></div><div class="chips" style="margin-bottom:8px"><button class="chip" data-a="iaSug" data-v="Explique esta questão passo a passo, bem devagar.">Explique passo a passo</button><button class="chip" data-a="iaSug" data-v="Me dê só uma dica, sem a resposta.">Só uma dica</button><button class="chip" data-a="iaSug" data-v="Me passe um exercício parecido para eu treinar.">Exercício parecido</button></div><form class="chatbar" data-form="ia"><label class="iconbtn" aria-label="Enviar foto">'+ic('cam','#0E1B3D',22)+'<input type="file" accept="image/*" capture="environment" class="hidden" data-change="iaFoto"></label><textarea name="m" placeholder="Escreva sua dúvida…" rows="1" aria-label="Mensagem"></textarea><button class="iconbtn primary" aria-label="Enviar">'+ic('send','#fff',22)+'</button></form>');
  drawChat();
};
function iaFmt(t){ return esc(t).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>'); }
function drawChat(){ var m=document.getElementById('msgs'); if(!m) return; m.innerHTML=ST.chat.msgs.map(function(x){ return '<div class="msg '+(x.de==='ia'?'ia':'eu')+'">'+iaFmt(x.texto)+(x.img?'<img src="'+x.img+'" alt="Foto enviada">':'')+'</div>'; }).join('')+(ST.chat.busy?'<div class="msg ia typing">Professor IA está escrevendo…</div>':''); var b=document.getElementById('sheetBody'); b.scrollTop=b.scrollHeight; var ii=document.getElementById('imgInfo'); if(ii) ii.textContent=ST.chat.img?'📷 Foto anexada à próxima mensagem':''; }
A.iaSug=function(el){ var f=document.querySelector('[data-form="ia"]'); f.m.value=el.dataset.v; FORMS.ia(f); };
var CHANGE={};
CHANGE.iaFoto=async function(inp){ if(!inp.files[0]) return; ST.chat.img=await compress(inp.files[0]); drawChat(); };
FORMS.ia=async function(f){ var txt=f.m.value.trim(); if(!txt&&!ST.chat.img) return; if(ST.chat.busy) return; var c=ST.chat;
  c.msgs.push({de:'eu',texto:txt||'(foto)',img:c.img}); var img=c.img; c.img=null; f.m.value=''; c.busy=true; drawChat();
  try{ var d=await server('professor',{mensagens:c.msgs.filter(function(x,i){return i>0;}).map(function(x){return {de:x.de,texto:x.texto};}),contexto:c.ctx,imagem:img}); c.msgs.push({de:'ia',texto:d.resposta}); }
  catch(e){ c.msgs.push({de:'ia',texto:'⚠️ '+erroMsg(e)}); }
  c.busy=false; drawChat(); };
function compress(file){ return new Promise(function(ok,fail){ var r=new FileReader(); r.onload=function(){ var im=new Image(); im.onload=function(){ var M=1100,w=im.width,h=im.height; if(w>M||h>M){ var k=M/Math.max(w,h); w=Math.round(w*k); h=Math.round(h*k);} var cv=document.createElement('canvas'); cv.width=w; cv.height=h; cv.getContext('2d').drawImage(im,0,0,w,h); ok(cv.toDataURL('image/jpeg',0.72)); }; im.onerror=fail; im.src=r.result; }; r.onerror=fail; r.readAsDataURL(file); }); }

/* ----- Dúvidas ----- */
A.novaDuvida=function(el){
  var id=el&&el.dataset&&el.dataset.id||'';
  sheet('Mandar dúvida para o professor','<form id="fd" data-form="duvida"><label for="dt" style="margin-top:0">Assunto</label><select id="dt" name="t"><option value="">Outro / não sei</option>'+TOPICS.map(function(t){return '<option value="'+t.id+'"'+(t.id===id?' selected':'')+'>'+t.nome+'</option>';}).join('')+'</select><label for="dx">Qual é a sua dúvida?</label><textarea id="dx" name="x" required placeholder="Escreva o exercício e onde você travou."></textarea><label>Foto do caderno (opcional)</label><label class="btn ghost block">'+ic('cam')+' <span id="fotoLbl">Tirar ou escolher foto</span><input type="file" accept="image/*" capture="environment" class="hidden" data-change="duvFoto"></label><img id="fotoPrev" class="hidden" alt="Prévia da foto" style="max-width:100%;border-radius:12px;margin-top:8px"></form>','<div class="stack"><button class="btn primary block" form="fd">Enviar para o professor</button><button class="btn wa block" data-a="duvWa">'+ic('wa','#fff',20)+' Mandar no WhatsApp</button></div>');
};
CHANGE.duvFoto=async function(inp){ if(!inp.files[0]) return; ST.duvImg=await compress(inp.files[0]); var p=document.getElementById('fotoPrev'); p.src=ST.duvImg; p.classList.remove('hidden'); document.getElementById('fotoLbl').textContent='Trocar foto'; };
FORMS.duvida=async function(f){ var b=document.querySelector('[form="fd"]'); b.disabled=true;
  try{ await DB.ins('doubts',{student_id:ST.me.id,topic_id:f.t.value||null,texto:f.x.value.trim(),imagem:ST.duvImg||null}); ST.duvImg=null; closeSheet(); toast('Dúvida enviada! O professor vai responder aqui.'); server('push',{titulo:'❓ Nova dúvida de '+primeiroNome(ST.me.nome),texto:f.x.value.trim().slice(0,120),link:'#/p-duvidas',tipo:'aluno'}).catch(function(){}); if(/#\/duvidas/.test(location.hash)) render(); }
  catch(e){ toast(erroMsg(e)); b.disabled=false; } };
A.duvWa=function(){ var f=document.getElementById('fd'); var t=f.t.value&&TBY[f.t.value]; var msg='Olá, professor! Aqui é '+ST.me.nome+'. Tenho uma dúvida'+(t?' em '+t.nome:'')+':\n'+(f.x.value||''); if(ST.duvImg) msg+='\n(vou mandar a foto em seguida)'; window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank'); };
async function vDuvidas(){
  loading('Dúvidas','duvidas'); var L=await DB.q('doubts',{eq:{student_id:ST.me.id},order:['created_at',false]});
  page({title:'Minhas dúvidas',nav:'duvidas',body:'<button class="btn gold block" data-a="novaDuvida">'+ic('chat')+' Nova dúvida para o professor</button><a class="btn wa block" style="margin-top:10px" href="https://wa.me/'+WA+'" target="_blank" rel="noopener">'+ic('wa','#fff',20)+' Falar no WhatsApp</a><p class="small muted">Dica: dentro de cada assunto também tem o <b>Professor IA</b>, que responde na hora.</p>'+(L.length?'<div class="stack">'+L.map(doubtItem).join('')+'</div>':'<p class="empty">Você ainda não mandou dúvidas.</p>')});
}

/* ----- Plano / cronograma / checklist ----- */
async function vPlano(uid,embed){
  var me=uid||ST.me.id; if(!embed) loading('Plano','plano');
  var L=await DB.q('plan_items',{eq:{student_id:me},order:['data',true]});
  var h0=hoje(); var grupos={atras:[],prox:[],sem:[],feito:[]};
  L.forEach(function(p){ if(p.feito) grupos.feito.push(p); else if(!p.data) grupos.sem.push(p); else if(new Date(p.data+'T12:00')<h0) grupos.atras.push(p); else grupos.prox.push(p); });
  var tot=L.length, ok=grupos.feito.length;
  var h=(embed?'':'<div class="hero"><h1>Meu plano</h1><p>Cronograma e checklist de estudos</p><div style="margin-top:12px;display:flex;align-items:center;gap:10px"><div style="flex:1">'+ruler(tot?Math.round(ok/tot*100):0,true)+'</div><b>'+ok+'/'+tot+'</b></div></div>')+
    '<div class="grid" style="margin-top:12px"><button class="btn primary" data-a="addPlan" data-u="'+me+'">+ Nova tarefa</button><button class="btn ghost" data-a="montarPlano" data-u="'+me+'">Montar plano de assuntos</button></div>';
  function sec(t,arr,cor){ return arr.length?'<h2 style="'+(cor?'color:'+cor:'')+'">'+t+' <span class="muted small">('+arr.length+')</span></h2><div class="stack">'+arr.map(planItem).join('')+'</div>':''; }
  h+=sec('Atrasadas',grupos.atras,'var(--bad)')+sec('Próximas',grupos.prox)+sec('Sem data',grupos.sem)+sec('Concluídas',grupos.feito);
  if(!L.length) h+='<p class="empty">Nenhuma tarefa ainda. Toque em <b>Montar plano de assuntos</b> para criar um cronograma automático.</p>';
  if(embed) return h;
  page({title:'Plano de estudos',nav:'plano',body:h});
}
A.togglePlan=async function(el){ var id=+el.dataset.id; var on=!el.classList.contains('on'); el.classList.toggle('on',on); el.innerHTML=on?ic('check','#fff',18):''; try{ await DB.upd('plan_items',{id:id},{feito:on}); }catch(e){ toast(erroMsg(e)); } setTimeout(render,250); };
A.delPlan=async function(el){ if(!confirmar('Apagar esta tarefa?')) return; await DB.del('plan_items',{id:+el.dataset.id}); render(); };
A.addPlan=function(el){ var u=el.dataset.u; sheet('Nova tarefa','<form id="fp" data-form="plan" data-u="'+u+'"><label for="pt" style="margin-top:0">O que fazer</label><input id="pt" name="t" required placeholder="Ex.: Fazer 10 questões de frações"><label for="pd">Data</label><input id="pd" name="d" type="date"><label for="pa">Assunto (opcional)</label><select id="pa" name="a"><option value="">—</option>'+TOPICS.map(function(t){return '<option value="'+t.id+'">'+t.ano+' · '+t.nome+'</option>';}).join('')+'</select></form>','<button class="btn primary block" form="fp">Salvar tarefa</button>'); };
FORMS.plan=async function(f){ try{ await DB.ins('plan_items',{student_id:f.dataset.u,titulo:f.t.value.trim(),data:f.d.value||null,topic_id:f.a.value||null,feito:false,criado_por:ST.me.id}); closeSheet(); toast('Tarefa salva'); render(); }catch(e){ toast(erroMsg(e)); } };
A.montarPlano=async function(el){
  var u=el.dataset.u; var aluno=u===ST.me.id?ST.me:(await DB.q('profiles',{eq:{id:u}}))[0]; var prog=u===ST.me.id?ST.prog:await loadProg(u);
  sheet('Montar plano de assuntos','<form id="fm" data-form="montar" data-u="'+u+'"><p style="margin-top:0">Cria uma tarefa para cada assunto ainda não concluído (menos de 90%), com datas espaçadas.</p><label for="ma">Ano</label><select id="ma" name="a">'+ANOS.map(function(a){return '<option'+(a===aluno.ano?' selected':'')+'>'+a+'</option>';}).join('')+'</select><label for="mi">Começar em</label><input id="mi" name="i" type="date" value="'+isoDate(hoje())+'"><label for="mf">Um assunto a cada</label><select id="mf" name="f"><option value="1">1 dia</option><option value="2">2 dias</option><option value="3" selected>3 dias</option><option value="7">1 semana</option></select></form>','<button class="btn primary block" form="fm">Criar plano</button>');
  ST.planProg=prog;
};
FORMS.montar=async function(f){ var u=f.dataset.u, prog=ST.planProg||{}; var ts=TOPICS.filter(function(t){return t.ano===f.a.value && pctOf(t.id,prog)<90;}); var d=new Date(f.i.value+'T12:00'); var step=+f.f.value;
  var rows=ts.map(function(t,k){ var x=new Date(d); x.setDate(d.getDate()+k*step); return {student_id:u,topic_id:t.id,titulo:'Estudar: '+t.nome,data:isoDate(x),feito:false,criado_por:ST.me.id}; });
  if(!rows.length){ toast('Todos os assuntos desse ano já estão concluídos!'); return; }
  try{ await DB.ins('plan_items',rows); closeSheet(); toast(rows.length+' tarefas criadas'); render(); }catch(e){ toast(erroMsg(e)); } };

/* ----- Listas do aluno ----- */
async function vListas(){
  loading('Listas','listas'); var L=await DB.q('assignments',{eq:{student_id:ST.me.id},order:['created_at',false]});
  var g=function(s){return L.filter(function(a){return a.status===s;});};
  var h=['enviada','entregue','corrigida'].map(function(s,i){ var a=g(s); return '<h2>'+['Para fazer','Entregues (aguardando correção)','Corrigidas'][i]+' <span class="muted small">('+a.length+')</span></h2>'+(a.length?'<div class="stack">'+a.map(asgItem).join('')+'</div>':'<p class="muted small">Nada aqui.</p>'); }).join('');
  page({title:'Minhas listas',nav:'listas',body:h});
}
function itemQ(it){ return it.prof?esc(strip(it.q)):it.q; }
async function vLista(id){
  loading('Lista','listas'); var a=(await DB.q('assignments',{eq:{id:+id}}))[0]; if(!a){ location.hash='#/listas'; return; }
  var t=a.topic_id&&TBY[a.topic_id]; var draftKey='rasc-'+a.id; var draft={}; try{ draft=JSON.parse(localStorage.getItem(draftKey)||'{}'); }catch(e){}
  var h='<h1>'+esc(a.titulo)+'</h1><p class="muted" style="margin-top:-6px">'+(t?t.nome+' · ':'')+a.itens.length+' questões'+(a.prazo?' · prazo '+fmtData(a.prazo):'')+'</p>';
  if(a.status==='corrigida'){ var ac=(a.correcao||[]).filter(function(c){return c&&c.ok;}).length;
    h+='<div class="card" style="text-align:center"><div class="muted small" style="font-weight:800">NOTA</div><div style="font-size:40px;font-weight:900;color:'+pctColor((a.nota||0)*10)+'">'+String(a.nota==null?'—':a.nota).replace('.',',')+'</div><div class="muted">'+ac+' de '+a.itens.length+' certas</div>'+(a.feedback?'<p style="text-align:left;margin-bottom:0"><b>Recado do professor:</b><br>'+nl2br(a.feedback)+'</p>':'')+'</div>';
    h+='<div class="stack" style="margin-top:12px">'+a.itens.map(function(it,k){ var c=(a.correcao||[])[k]||{}; return '<div class="card"><div class="row" style="justify-content:space-between"><span class="qnum">QUESTÃO '+(k+1)+'</span>'+(c.ok?'<span class="badge ok">Certa</span>':'<span class="badge bad">Errada</span>')+'</div><div class="qtext" style="font-size:17px">'+itemQ(it)+'</div><div class="studans"><b>Sua resposta:</b> '+nl2br((a.respostas||[])[k]||'(em branco)')+'</div>'+(c.c?'<p style="margin:8px 0 0"><b>Comentário:</b> '+nl2br(c.c)+'</p>':'')+(it.prof?'<div class="answer"><div class="ans">'+esc(strip(it.a))+'</div></div>':ansHTML(it))+'</div>'; }).join('')+'</div>';
  } else if(a.status==='entregue'){
    h+='<div class="okmsg">Lista entregue! Aguarde a correção do professor.</div><div class="stack" style="margin-top:12px">'+a.itens.map(function(it,k){ return '<div class="card"><span class="qnum">QUESTÃO '+(k+1)+'</span><div class="qtext" style="font-size:17px">'+itemQ(it)+'</div><div class="studans"><b>Sua resposta:</b> '+nl2br((a.respostas||[])[k]||'(em branco)')+'</div></div>'; }).join('')+'</div>';
  } else {
    h+='<p class="small muted">Responda cada questão (pode escrever a conta). Suas respostas ficam salvas neste aparelho até você entregar.</p><form data-form="entregar" data-id="'+a.id+'" class="stack">'+a.itens.map(function(it,k){ return '<div class="card"><span class="qnum">QUESTÃO '+(k+1)+'</span><div class="qtext" style="font-size:17px">'+itemQ(it)+'</div><label for="r'+k+'">Sua resposta</label><textarea id="r'+k+'" name="r'+k+'" data-draft="'+draftKey+'" data-k="'+k+'">'+esc(draft[k]||'')+'</textarea></div>'; }).join('')+'<button class="btn primary block">Entregar lista</button></form>';
  }
  page({title:esc(a.titulo),back:true,nav:'listas',body:h});
  $app.querySelectorAll('[data-draft]').forEach(function(ta){ ta.addEventListener('input',function(){ try{ var d=JSON.parse(localStorage.getItem(ta.dataset.draft)||'{}'); d[ta.dataset.k]=ta.value; localStorage.setItem(ta.dataset.draft,JSON.stringify(d)); }catch(e){} }); });
}
FORMS.entregar=async function(f){ var id=+f.dataset.id; var n=f.querySelectorAll('textarea').length; var resp=[]; for(var k=0;k<n;k++) resp.push(f['r'+k].value.trim());
  var vazias=resp.filter(function(x){return !x;}).length; if(vazias&&!confirmar(vazias+' questão(ões) em branco. Entregar mesmo assim?')) return;
  try{ await DB.upd('assignments',{id:id},{respostas:resp,status:'entregue',entregue_em:new Date().toISOString()}); try{ localStorage.removeItem('rasc-'+id); }catch(e){} toast('Lista entregue! +25 XP'); await addXP(25); await refreshBadges(); vLista(id); }catch(e){ toast(erroMsg(e)); } };

/* ----- Perfil do aluno ----- */
async function vPerfil(){
  var me=ST.me; var notes=await DB.q('notes',{eq:{student_id:me.id},order:['created_at',false]});
  var prog=Object.values(ST.prog).filter(function(p){return TBY[p.topic_id];});
  var conc=prog.filter(function(p){return p.pct>=90;}).length, media=prog.length?Math.round(prog.reduce(function(s,p){return s+p.pct;},0)/prog.length):0;
  var h='<div class="card row"><span class="avatar" style="width:56px;height:56px;font-size:20px">'+esc(iniciais(me.nome))+'</span><div class="grow"><b style="font-size:18px">'+esc(me.nome)+'</b><span class="muted small">@'+esc(me.username||'')+' · '+esc(me.ano||'')+'</span></div></div>';
  h+='<div class="stats" style="margin-top:12px"><div class="stat"><b>'+prog.length+'</b><span>assuntos iniciados</span></div><div class="stat"><b>'+conc+'</b><span>concluídos (≥ 90%)</span></div><div class="stat"><b>'+media+'%</b><span>média nos iniciados</span></div><div class="stat"><b>'+notes.length+'</b><span>anotações</span></div></div>';
  h+='<h2>Meu andamento</h2>'+(prog.length?'<div class="grid g3">'+prog.sort(function(a,b){return b.pct-a.pct;}).map(function(p){return topicCard(TBY[p.topic_id],p.pct);}).join('')+'</div>':'<p class="muted">Comece um assunto na aba Assuntos.</p>');
  h+='<h2>Minhas anotações</h2>'+(notes.length?'<div class="stack">'+notes.map(noteItem).join('')+'</div>':'<p class="muted">Nenhuma anotação.</p>');
  h+='<h2>Configurações</h2><div class="stack"><a class="btn ghost block" href="#/financeiro">💰 Meus pagamentos</a><a class="btn ghost block" href="#/sequencia">'+flame(20,'on')+' Minha sequência e meta diária</a><a class="btn ghost block" href="#/diagnostico">Refazer teste de nivelamento</a>'+pushBtn()+'</div>'+installCard();
  h+='<button class="btn danger block" style="margin-top:24px" data-a="sair">Sair da conta</button>';
  page({title:'Meu perfil',back:true,nav:'',body:h});
}

/* ================= PROFESSOR ================= */
var ALUNOS=null;
async function getAlunos(force){ if(!ALUNOS||force) ALUNOS=await DB.q('profiles',{eq:{role:'aluno'},order:['nome',true]}); return ALUNOS; }
function nomeAluno(id){ var a=(ALUNOS||[]).filter(function(x){return x.id===id;})[0]; return a?a.nome:'Aluno'; }
async function vPainel(){
  loading('Painel','painel'); var al=await getAlunos(true);
  var asg=await DB.q('assignments',{eq:{status:'entregue'},order:['entregue_em',true]});
  var dv=await DB.q('doubts',{eq:{status:'aberta'},order:['created_at',true]});
  var nt=await DB.q('notes',{eq:{dificuldade:true},order:['created_at',false],limit:10});
  asg.forEach(function(a){a._aluno=nomeAluno(a.student_id);}); dv.forEach(function(d){d._aluno=nomeAluno(d.student_id);}); nt.forEach(function(n){n._aluno=nomeAluno(n.student_id);});
  var h='<div class="hero"><h1>Olá, professor '+esc(primeiroNome(ST.me.nome))+'!</h1><p>Resumo da sua turma</p></div><div class="stats" style="margin-top:12px"><a class="stat" href="#/alunos" style="text-decoration:none"><b>'+al.length+'</b><span>alunos</span></a><a class="stat" href="#/p-listas" style="text-decoration:none"><b>'+asg.length+'</b><span>listas para corrigir</span></a><a class="stat" href="#/p-duvidas" style="text-decoration:none"><b>'+dv.length+'</b><span>dúvidas abertas</span></a><div class="stat"><b>'+nt.length+'</b><span>dificuldades recentes</span></div></div>';
  h+='<div class="grid" style="margin-top:12px"><button class="btn primary" data-a="novoAluno">+ Cadastrar aluno</button><a class="btn gold" href="#/nova-lista">+ Mandar lista</a><a class="btn ghost" href="#/agenda-prof">'+ic('cal')+' Minha agenda</a><button class="btn ghost" data-a="novoAviso">'+ic('bell')+' Enviar aviso</button><a class="btn ghost" href="#/financeiro">💰 Financeiro</a><a class="btn ghost" href="#/materiais">'+ic('file')+' Materiais (PDF)</a><button class="btn ghost" data-a="novoMat">+ Enviar PDF</button></div>'+installCard();
  h+='<h2>Listas para corrigir</h2>'+(asg.length?'<div class="stack">'+asg.slice(0,5).map(asgItem).join('')+'</div>':'<p class="muted">Nenhuma entrega pendente.</p>');
  h+='<h2>Dúvidas abertas</h2>'+(dv.length?'<div class="stack">'+dv.slice(0,3).map(doubtItem).join('')+'</div>':'<p class="muted">Nenhuma dúvida aberta.</p>');
  h+='<h2>O que os alunos acham difícil</h2>'+(nt.length?'<div class="stack">'+nt.map(noteItem).join('')+'</div>':'<p class="muted">Nenhuma anotação de dificuldade.</p>');
  page({title:'Painel do professor',nav:'painel',body:h});
}
async function vAlunos(){
  loading('Alunos','alunos'); var al=await getAlunos(true); var pr=await DB.q('progress',{select:'student_id,pct'});
  var med={}; pr.forEach(function(p){ (med[p.student_id]=med[p.student_id]||[]).push(p.pct); }); var at={}; try{ (await DB.q('atividade',{select:'student_id,dia,xp'})).forEach(function(r){ (at[r.student_id]=at[r.student_id]||{})[r.dia]=r.xp; }); }catch(e){}
  var h='<div class="grid"><button class="btn primary" data-a="novoAluno">+ Cadastrar aluno</button><a class="btn gold" href="#/financeiro">💰 Financeiro</a></div>'+(al.length?'<div class="stack" style="margin-top:12px">'+al.map(function(a){ var m=med[a.id]||[]; var v=m.length?Math.round(m.reduce(function(s,x){return s+x;},0)/m.length):0; return '<a class="item" style="text-decoration:none" href="#/aluno/'+a.id+'"><span class="avatar">'+esc(iniciais(a.nome))+'</span><div class="grow"><b>'+esc(a.nome)+'</b><span class="small muted">@'+esc(a.username)+' · '+esc(a.ano||'')+' · '+m.length+' assunto(s) · 🔥 '+streakInfo(at[a.id]||{},a.meta_xp||20).seq+'</span><div style="margin-top:6px">'+ruler(v)+'</div></div><b style="color:'+pctColor(v)+'">'+v+'%</b></a>'; }).join('')+'</div>':'<p class="empty">Nenhum aluno ainda. Cadastre o primeiro!</p>');
  page({title:'Alunos',sub:al.length+' cadastrados',nav:'alunos',body:h});
}
A.novoAluno=function(){ sheet('Cadastrar aluno','<form id="fa" data-form="aluno"><label for="an" style="margin-top:0">Nome completo</label><input id="an" name="n" required><label for="aa">Ano</label><select id="aa" name="a">'+ANOS.map(function(a){return '<option>'+a+'</option>';}).join('')+'</select><label for="au">Usuário (para o login)</label><input id="au" name="u" required autocapitalize="none" autocorrect="off" placeholder="ex.: mariaclara" pattern="[a-z0-9._\\-]{3,30}"><p class="small muted" style="margin:4px 0 0">Só letras minúsculas sem acento, números, ponto ou hífen.</p><label for="as">Senha inicial (mínimo 6)</label><input id="as" name="s" required minlength="6" value="'+Math.random().toString(36).slice(2,8)+'"><div id="amsg"></div></form>','<button class="btn primary block" form="fa">Cadastrar</button>');
  var n=document.getElementById('an'), u=document.getElementById('au'); n.addEventListener('input',function(){ if(!u.dataset.mexeu) u.value=norm(n.value).replace(/[^a-z\s]/g,'').trim().split(/\s+/).slice(0,2).join(''); }); u.addEventListener('input',function(){u.dataset.mexeu=1;}); };
FORMS.aluno=async function(f){ var b=document.querySelector('[form="fa"]'); b.disabled=true; var m=document.getElementById('amsg');
  try{ await server('alunos',{acao:'criar',nome:f.n.value.trim(),ano:f.a.value,usuario:f.u.value.trim().toLowerCase(),senha:f.s.value});
    var txt='Acesso à plataforma de matemática:\n'+location.origin+'\nUsuário: '+f.u.value.trim().toLowerCase()+'\nSenha: '+f.s.value;
    document.getElementById('sheetBody').innerHTML='<div class="okmsg">Aluno cadastrado!</div><p>Envie os dados de acesso para o aluno (ou responsável):</p><div class="studans">'+nl2br(txt)+'</div>';
    var ft=document.querySelector('#sheet footer'); ft.innerHTML='<div class="stack"><a class="btn wa block" target="_blank" rel="noopener" href="https://wa.me/?text='+encodeURIComponent(txt)+'">'+ic('wa','#fff',20)+' Enviar pelo WhatsApp</a><button class="btn block" data-a="copiar" data-v="'+esc(txt)+'">Copiar</button></div>';
    await getAlunos(true); if(/#\/(alunos|painel)/.test(location.hash)){ ST.keepSheet=true; render(); } }
  catch(e){ m.innerHTML='<div class="err">'+esc(erroMsg(e))+'</div>'; b.disabled=false; } };
A.copiar=async function(el){ try{ await navigator.clipboard.writeText(el.dataset.v); toast('Copiado!'); }catch(e){ toast('Não consegui copiar; selecione o texto.'); } };
async function vAluno(id,tab){
  await getAlunos(); var a=(ALUNOS||[]).filter(function(x){return x.id===id;})[0]; if(!a){ location.hash='#/alunos'; return; }
  tab=tab||ST.tab['al'+id]||'prog'; ST.tab['al'+id]=tab; loading(esc(a.nome),'alunos');
  var prog=await loadProg(id); var ps=Object.values(prog).filter(function(p){return TBY[p.topic_id];});
  var media=ps.length?Math.round(ps.reduce(function(s,p){return s+p.pct;},0)/ps.length):0;
  var h='<div class="card row"><span class="avatar" style="width:52px;height:52px">'+esc(iniciais(a.nome))+'</span><div class="grow"><b style="font-size:18px">'+esc(a.nome)+'</b><span class="small muted">@'+esc(a.username)+' · '+esc(a.ano||'')+'</span><div style="margin-top:6px">'+ruler(media)+'</div></div><b style="color:'+pctColor(media)+'">'+media+'%</b></div>';
  var tabs=[['prog','Progresso'],['fin','Financeiro'],['notas','Anotações'],['plano','Plano'],['listas','Listas'],['conta','Conta']];
  h+='<div class="grid" style="margin-top:10px"><a class="btn gold" href="#/relatorio/'+id+'">'+ic('report')+' Relatório para os pais</a><button class="btn ghost" data-a="novoAviso" data-id="'+id+'">'+ic('bell')+' Mandar aviso</button></div>';
  h+='<div class="chips" style="margin-top:12px">'+tabs.map(function(x){return '<button class="chip'+(tab===x[0]?' on':'')+'" data-a="alTab" data-id="'+id+'" data-v="'+x[0]+'">'+x[1]+'</button>';}).join('')+'</div><div id="alBody" style="margin-top:6px"></div>';
  page({title:esc(a.nome),sub:esc(a.ano||''),back:true,nav:'alunos',body:h});
  var b=document.getElementById('alBody'), x='';
  if(tab==='prog'){ x=diagResumo(a)+'<p class="small muted">'+ps.length+' assunto(s) iniciados.</p>'+(ps.length?'<div class="grid g3">'+ps.sort(function(p,q){return q.pct-p.pct;}).map(function(p){return topicCard(TBY[p.topic_id],p.pct,'#/assunto/'+p.topic_id);}).join('')+'</div>':'<p class="empty">Ainda não começou nenhum assunto.</p>')+'<h2>Assuntos do '+esc(a.ano||'ano')+' ainda não iniciados</h2><div class="stack">'+TOPICS.filter(function(t){return t.ano===a.ano&&!prog[t.id];}).map(function(t){return '<div class="item"><div class="grow"><b>'+t.nome+'</b></div><span class="badge bad">0%</span></div>';}).join('')+'</div>'; }
  else if(tab==='fin'){ x=await finProfHTML(a); }
  else if(tab==='notas'){ var nn=await DB.q('notes',{eq:{student_id:id},order:['created_at',false]}); x=nn.length?'<div class="stack">'+nn.map(noteItem).join('')+'</div>':'<p class="empty">Nenhuma anotação.</p>'; }
  else if(tab==='plano'){ x=await vPlano(id,true); }
  else if(tab==='listas'){ var ls=await DB.q('assignments',{eq:{student_id:id},order:['created_at',false]}); ls.forEach(function(l){l._aluno=a.nome;}); x='<a class="btn gold block" href="#/nova-lista/'+id+'">+ Mandar lista para '+esc(primeiroNome(a.nome))+'</a>'+(ls.length?'<div class="stack" style="margin-top:12px">'+ls.map(asgItem).join('')+'</div>':'<p class="empty">Nenhuma lista enviada.</p>'); }
  else if(tab==='conta'){ x='<form class="card" data-form="resp" data-id="'+id+'" style="margin-bottom:12px"><label for="rw" style="margin-top:0">WhatsApp do responsável</label><input id="rw" name="w" inputmode="tel" placeholder="(81) 9 9999-9999" value="'+esc(a.responsavel_whatsapp||'')+'"><button class="btn primary block" style="margin-top:10px">Salvar</button></form><form class="card" data-form="senha" data-id="'+id+'"><label for="ns" style="margin-top:0">Nova senha para @'+esc(a.username)+'</label><input id="ns" name="s" minlength="6" required><button class="btn primary block" style="margin-top:10px">Trocar senha</button></form><button class="btn danger block" style="margin-top:16px" data-a="removerAluno" data-id="'+id+'">Remover aluno</button>'; }
  b.innerHTML=x;
}
A.alTab=function(el){ ST.tab['al'+el.dataset.id]=el.dataset.v; vAluno(el.dataset.id,el.dataset.v); };
FORMS.senha=async function(f){ try{ await server('alunos',{acao:'senha',id:f.dataset.id,senha:f.s.value}); toast('Senha trocada'); f.reset(); }catch(e){ toast(erroMsg(e)); } };
A.removerAluno=async function(el){ if(!confirmar('Remover este aluno e todos os dados dele? Isso não pode ser desfeito.')) return; try{ await server('alunos',{acao:'remover',id:el.dataset.id}); await getAlunos(true); toast('Aluno removido'); location.hash='#/alunos'; }catch(e){ toast(erroMsg(e)); } };

async function vPListas(){
  loading('Listas','p-listas'); await getAlunos(); var L=await DB.q('assignments',{order:['created_at',false]}); L.forEach(function(a){a._aluno=nomeAluno(a.student_id);});
  var g=function(s){return L.filter(function(a){return a.status===s;});};
  var h='<a class="btn gold block" href="#/nova-lista">+ Nova lista</a>'+[['entregue','Para corrigir'],['enviada','Enviadas (aluno ainda não entregou)'],['corrigida','Corrigidas']].map(function(x){ var a=g(x[0]); return '<h2>'+x[1]+' <span class="muted small">('+a.length+')</span></h2>'+(a.length?'<div class="stack">'+a.map(asgItem).join('')+'</div>':'<p class="muted small">Nada aqui.</p>'); }).join('');
  page({title:'Listas',nav:'p-listas',body:h});
}
async function vNovaLista(alunoId){
  await getAlunos();
  if(!ST.nl||ST.nl.reset){ ST.nl={alunos:{},topic:'',seed:0,sel:{},extra:[]}; if(alunoId) ST.nl.alunos[alunoId]=1; }
  var nl=ST.nl; var h='<h1>Nova lista</h1>';
  h+='<div class="card"><label style="margin-top:0">Para quais alunos?</label><div class="stack">'+(ALUNOS.length?ALUNOS.map(function(a){return '<label class="row" style="font-weight:600;margin:0"><input type="checkbox" style="width:22px;height:22px" data-nlal="'+a.id+'"'+(nl.alunos[a.id]?' checked':'')+'> '+esc(a.nome)+' <span class="muted small">'+esc(a.ano||'')+'</span></label>';}).join(''):'<p class="muted">Cadastre alunos primeiro.</p>')+'</div>'+
    '<label for="nlt">Título</label><input id="nlt" value="'+esc(nl.titulo||'')+'" placeholder="Ex.: Lista de frações — semana 1"><label for="nlp">Prazo</label><input id="nlp" type="date" value="'+esc(nl.prazo||'')+'"><label for="nla">Assunto</label><select id="nla"><option value="">Escolha…</option>'+TOPICS.map(function(t){return '<option value="'+t.id+'"'+(t.id===nl.topic?' selected':'')+'>'+t.ano+' · '+t.nome+'</option>';}).join('')+'</select></div>';
  var nsel=Object.keys(nl.sel).length+nl.extra.length;
  if(nl.topic){
    if(!ST.exProf[nl.topic]) ST.exProf[nl.topic]=(await DB.q('exercises',{eq:{topic_id:nl.topic}})).map(function(e){return {q:esc(e.q),a:esc(e.a),s:String(e.s||'').split('\n').filter(Boolean).map(esc),prof:true,id:e.id};});
    var L=getList(nl.topic,nl.seed), P=ST.exProf[nl.topic]||[];
    h+='<div class="row wrap" style="justify-content:space-between;margin-top:16px"><h2 style="margin:0">Escolha as questões</h2><div class="row"><span class="small muted">Lista '+(nl.seed+1)+'</span><button class="btn sm gold" data-a="nlSeed">Outras ↻</button></div></div><div class="row" style="margin:8px 0"><button class="btn sm ghost" data-a="nlTodas">Marcar todas</button><button class="btn sm ghost" data-a="nlNenhuma">Desmarcar</button></div><div class="stack">';
    h+=L.map(function(g,k){ var key=nl.topic+'|'+nl.seed+'|'+k; return '<label class="item" style="margin:0;font-weight:500"><input type="checkbox" style="width:22px;height:22px;flex-shrink:0" data-nlq="'+key+'"'+(nl.sel[key]?' checked':'')+'><div class="grow">'+g.q+'<div class="small muted" style="margin-top:4px">Resposta: '+g.a+'</div></div></label>'; }).join('');
    h+=P.map(function(g){ var key=nl.topic+'|p|'+g.id; return '<label class="item" style="margin:0;font-weight:500"><input type="checkbox" style="width:22px;height:22px;flex-shrink:0" data-nlq="'+key+'"'+(nl.sel[key]?' checked':'')+'><div class="grow"><span class="badge">seu</span> '+g.q+'<div class="small muted" style="margin-top:4px">Resposta: '+g.a+'</div></div></label>'; }).join('')+'</div>';
  }
  h+='<h2>Questões escritas por você</h2>'+(nl.extra.length?'<div class="stack">'+nl.extra.map(function(e,k){return '<div class="item"><div class="grow">'+esc(e.q)+'<div class="small muted">Resposta: '+esc(e.a)+'</div></div><button class="btn sm ghost" data-a="nlDelExtra" data-v="'+k+'">✕</button></div>';}).join('')+'</div>':'')+'<button class="btn ghost block" style="margin-top:8px" data-a="nlExtra">+ Escrever questão</button>';
  h+='<div style="height:12px"></div><div style="position:sticky;bottom:calc(76px + var(--safeb));margin-top:16px;box-shadow:0 -8px 16px var(--bg)"><button class="btn primary block" data-a="nlEnviar">Enviar lista ('+nsel+' questões)</button></div>';
  page({title:'Nova lista',back:true,nav:'p-listas',body:h});
  ['nlt','nlp'].forEach(function(i){ document.getElementById(i).addEventListener('input',function(e){ nl[i==='nlt'?'titulo':'prazo']=e.target.value; }); });
  document.getElementById('nla').addEventListener('change',function(e){ nl.topic=e.target.value; nl.seed=0; if(!nl.titulo&&TBY[nl.topic]) nl.titulo='Lista: '+TBY[nl.topic].nome; vNovaLista(); });
  $app.querySelectorAll('[data-nlal]').forEach(function(c){ c.addEventListener('change',function(){ if(c.checked) nl.alunos[c.dataset.nlal]=1; else delete nl.alunos[c.dataset.nlal]; }); });
  $app.querySelectorAll('[data-nlq]').forEach(function(c){ c.addEventListener('change',function(){ if(c.checked) nl.sel[c.dataset.nlq]=1; else delete nl.sel[c.dataset.nlq]; var b=$app.querySelector('[data-a="nlEnviar"]'); b.textContent='Enviar lista ('+(Object.keys(nl.sel).length+nl.extra.length)+' questões)'; }); });
}
A.nlSeed=function(){ ST.nl.seed++; vNovaLista(); };
A.nlTodas=function(){ var nl=ST.nl; getList(nl.topic,nl.seed).forEach(function(_,k){ nl.sel[nl.topic+'|'+nl.seed+'|'+k]=1; }); vNovaLista(); };
A.nlNenhuma=function(){ ST.nl.sel={}; vNovaLista(); };
A.nlExtra=function(){ sheet('Escrever questão','<form id="fx" data-form="nlExtra"><label for="xq" style="margin-top:0">Enunciado</label><textarea id="xq" name="q" required></textarea><label for="xa">Resposta</label><input id="xa" name="a" required><label for="xs">Passo a passo (um passo por linha, opcional)</label><textarea id="xs" name="s"></textarea></form>','<button class="btn primary block" form="fx">Adicionar à lista</button>'); };
FORMS.nlExtra=function(f){ ST.nl.extra.push({q:f.q.value.trim(),a:f.a.value.trim(),s:f.s.value.trim()}); closeSheet(); vNovaLista(); };
A.nlDelExtra=function(el){ ST.nl.extra.splice(+el.dataset.v,1); vNovaLista(); };
A.nlEnviar=async function(el){ var nl=ST.nl; var al=Object.keys(nl.alunos);
  var itens=Object.keys(nl.sel).map(function(key){ var p=key.split('|'); if(p[1]==='p'){ var e=(ST.exProf[p[0]]||[]).filter(function(x){return String(x.id)===p[2];})[0]; return e?{q:strip(e.q),a:strip(e.a),s:e.s.map(strip),prof:true}:null; } var g=getList(p[0],+p[1])[+p[2]]; return {q:g.q,a:g.a,s:g.s}; }).filter(Boolean)
    .concat(nl.extra.map(function(e){return {q:e.q,a:e.a,s:e.s.split('\n').filter(Boolean),prof:true};}));
  if(!al.length) return toast('Escolha pelo menos um aluno.'); if(!itens.length) return toast('Escolha pelo menos uma questão.'); if(!(nl.titulo||'').trim()) return toast('Dê um título para a lista.');
  el.disabled=true;
  try{ await DB.ins('assignments',al.map(function(id){return {student_id:id,titulo:nl.titulo.trim(),topic_id:nl.topic||null,itens:itens,prazo:nl.prazo||null,status:'enviada'};})); toast('Lista enviada para '+al.length+' aluno(s)!'); pushPara(al,'📝 Nova lista: '+nl.titulo.trim(),nl.prazo?'Prazo: '+fmtData(nl.prazo):'Responda quando puder.','#/listas'); ST.nl={reset:true}; location.hash='#/p-listas'; }
  catch(e){ toast(erroMsg(e)); el.disabled=false; } };
async function vCorrigir(id,soVer){
  loading('Correção','p-listas'); await getAlunos(); var a=(await DB.q('assignments',{eq:{id:+id}}))[0]; if(!a){ location.hash='#/p-listas'; return; }
  var cor=a.correcao||a.itens.map(function(){return {ok:null,c:''};}); ST.cor={id:a.id,cor:cor,n:a.itens.length};
  var h='<h1>'+esc(a.titulo)+'</h1><p class="muted" style="margin-top:-6px">'+esc(nomeAluno(a.student_id))+' · '+a.itens.length+' questões · '+({enviada:'aguardando entrega',entregue:'entregue '+fmtData(a.entregue_em),corrigida:'corrigida'}[a.status])+'</p>';
  if(a.status==='enviada'){ h+='<div class="card"><p style="margin-top:0">O aluno ainda não entregou. Questões enviadas:</p><ol>'+a.itens.map(function(it){return '<li style="margin:6px 0">'+itemQ(it)+'</li>';}).join('')+'</ol></div><button class="btn danger block" style="margin-top:12px" data-a="delLista" data-id="'+a.id+'">Cancelar esta lista</button>'; page({title:'Lista',back:true,nav:'p-listas',body:h}); return; }
  h+='<div class="stack">'+a.itens.map(function(it,k){ var c=cor[k]||{}; return '<div class="correct-item"><span class="qnum">QUESTÃO '+(k+1)+'</span><div class="qtext" style="font-size:17px">'+itemQ(it)+'</div><div class="small" style="margin-top:6px"><b>Gabarito:</b> '+(it.prof?esc(strip(it.a)):it.a)+'</div><div class="studans"><b>Resposta do aluno:</b><br>'+nl2br((a.respostas||[])[k]||'(em branco)')+'</div><div class="selfcheck"><button class="btn'+(c.ok===true?' on-ok':'')+'" data-a="corMarca" data-k="'+k+'" data-v="1">✓ Certa</button><button class="btn'+(c.ok===false?' on-bad':'')+'" data-a="corMarca" data-k="'+k+'" data-v="0">✗ Errada</button></div><input placeholder="Comentário (opcional)" style="margin-top:8px" data-corc="'+k+'" value="'+esc(c.c||'')+'"></div>'; }).join('')+'</div>';
  h+='<div class="card" style="margin-top:12px"><label for="cn" style="margin-top:0">Nota (0 a 10)</label><input id="cn" type="number" min="0" max="10" step="0.5" value="'+(a.nota!=null?a.nota:'')+'"><label for="cf">Recado para o aluno</label><textarea id="cf">'+esc(a.feedback||'')+'</textarea></div><button class="btn primary block" style="margin-top:12px" data-a="corSalvar">Salvar correção</button>';
  page({title:'Corrigir lista',back:true,nav:'p-listas',body:h});
  $app.querySelectorAll('[data-corc]').forEach(function(i){ i.addEventListener('input',function(){ ST.cor.cor[+i.dataset.corc].c=i.value; }); });
}
A.corMarca=function(el){ var k=+el.dataset.k, v=el.dataset.v==='1'; var c=ST.cor.cor; c[k]=c[k]||{}; c[k].ok=v; var row=el.parentNode; row.children[0].className='btn'+(v?' on-ok':''); row.children[1].className='btn'+(!v?' on-bad':'');
  var feitas=c.filter(function(x){return x&&x.ok!=null;}).length; if(feitas===ST.cor.n){ var ac=c.filter(function(x){return x.ok;}).length; document.getElementById('cn').value=Math.round(ac/ST.cor.n*20)/2; } };
A.corSalvar=async function(el){ var c=ST.cor; if(c.cor.some(function(x){return !x||x.ok==null;})&&!confirmar('Há questões sem marcar certo/errado. Salvar mesmo assim?')) return; el.disabled=true;
  var nota=document.getElementById('cn').value; try{ await DB.upd('assignments',{id:c.id},{correcao:c.cor,nota:nota===''?null:+nota,feedback:document.getElementById('cf').value.trim()||null,status:'corrigida',corrigida_em:new Date().toISOString()}); toast('Correção salva!'); var ca=(await DB.q('assignments',{eq:{id:c.id},select:'student_id,titulo'}))[0]; if(ca) pushPara([ca.student_id],'✅ Lista corrigida: '+ca.titulo,nota===''?'Veja a correção.':'Nota: '+String(nota).replace('.',','),'#/lista/'+c.id); await refreshBadges(); location.hash='#/p-listas'; }catch(e){ toast(erroMsg(e)); el.disabled=false; } };
A.delLista=async function(el){ if(!confirmar('Cancelar e apagar esta lista?')) return; await DB.del('assignments',{id:+el.dataset.id}); toast('Lista apagada'); location.hash='#/p-listas'; };
async function vPDuvidas(){
  loading('Dúvidas','p-duvidas'); await getAlunos(); var f=ST.dvf||'aberta'; var L=await DB.q('doubts',{eq:{status:f},order:['created_at',f==='aberta']}); L.forEach(function(d){d._aluno=nomeAluno(d.student_id);});
  var h='<div class="seg" role="group"><button class="'+(f==='aberta'?'on':'')+'" data-a="dvf" data-v="aberta">Abertas</button><button class="'+(f==='respondida'?'on':'')+'" data-a="dvf" data-v="respondida">Respondidas</button></div>'+(L.length?'<div class="stack" style="margin-top:12px">'+L.map(doubtItem).join('')+'</div>':'<p class="empty">Nenhuma dúvida aqui.</p>');
  page({title:'Dúvidas dos alunos',nav:'p-duvidas',body:h});
}
A.dvf=function(el){ ST.dvf=el.dataset.v; vPDuvidas(); };
FORMS.responder=async function(f){ try{ var dr=await DB.upd('doubts',{id:+f.dataset.id},{resposta:f.r.value.trim(),status:'respondida',respondida_em:new Date().toISOString()}); toast('Resposta enviada'); if(dr&&dr[0]) pushPara([dr[0].student_id],'💬 O professor respondeu sua dúvida',f.r.value.trim().slice(0,120),'#/duvidas'); await refreshBadges(); render(); }catch(e){ toast(erroMsg(e)); } };
async function renderMeusEx(id){
  var tb=document.getElementById('tabBody'); var L=await DB.q('exercises',{eq:{topic_id:id},order:['created_at',false]});
  tb.innerHTML='<form class="card" data-form="exAdd" data-id="'+id+'"><label for="eq" style="margin-top:0">Enunciado</label><textarea id="eq" name="q" required></textarea><label for="ea">Resposta</label><input id="ea" name="a" required><label for="es">Passo a passo (um passo por linha)</label><textarea id="es" name="s"></textarea><button class="btn primary block" style="margin-top:10px">Adicionar exercício</button><p class="small muted" style="margin-bottom:0">Seus exercícios aparecem para todos os alunos no fim da Lista 1 deste assunto e podem ser mandados em listas.</p></form><h2>Meus exercícios ('+L.length+')</h2>'+(L.length?'<div class="stack">'+L.map(function(e){return '<div class="item"><div class="grow">'+nl2br(e.q)+'<div class="small muted">Resposta: '+esc(e.a)+'</div></div><button class="btn sm ghost" data-a="exDel" data-id="'+e.id+'" data-t="'+id+'">✕</button></div>';}).join('')+'</div>':'<p class="muted">Nenhum ainda.</p>');
}
FORMS.exAdd=async function(f){ try{ await DB.ins('exercises',{topic_id:f.dataset.id,q:f.q.value.trim(),a:f.a.value.trim(),s:f.s.value.trim()||null,criado_por:ST.me.id}); delete ST.exProf[f.dataset.id]; toast('Exercício adicionado'); renderMeusEx(f.dataset.id); }catch(e){ toast(erroMsg(e)); } };
A.exDel=async function(el){ if(!confirmar('Apagar este exercício?')) return; await DB.del('exercises',{id:+el.dataset.id}); delete ST.exProf[el.dataset.t]; renderMeusEx(el.dataset.t); };
/* ================= MATERIAIS EM PDF ================= */
var MAT_MAX = 25*1024*1024;
function fmtTam(b){ if(!b) return ''; return b<1024*1024? Math.max(1,Math.round(b/1024))+' KB' : (b/1048576).toFixed(1).replace('.',',')+' MB'; }
function matItem(m){
  var t=m.topic_id&&TBY[m.topic_id]; var para=isProf()?(m.para?nomeAluno(m.para):'Todos os alunos'):'';
  var info=[t?strip(t.nome):'Geral'].concat(para?[para]:[],m.tamanho?[fmtTam(m.tamanho)]:[],[fmtData(m.updated_at||m.created_at)]).map(esc).join(' · ');
  return '<div class="item"><span style="flex-shrink:0;color:var(--bad)">'+ic('file','currentColor',28)+'</span><div class="grow"><b>'+esc(m.titulo)+'</b>'+(m.descricao?'<span class="small" style="display:block">'+nl2br(m.descricao)+'</span>':'')+'<span class="small muted">'+info+'</span></div><div class="row" style="flex-shrink:0;gap:6px">'+(m.url?'<a class="btn sm primary" href="'+esc(m.url)+'" target="_blank" rel="noopener">Abrir</a>':'<span class="small muted">indisponível</span>')+(isProf()?'<button class="btn sm ghost" data-a="editMat" data-id="'+m.id+'" aria-label="Editar material">Editar</button>':'')+'</div></div>';
}
async function vMateriais(){
  var prof=isProf(); loading('Materiais',prof?'conteudo':'assuntos'); if(prof) await getAlunos();
  var L=[], erro=''; try{ L=(await server('materiais',{acao:'listar'})).materiais||[]; }catch(e){ erro=erroMsg(e); }
  ST.mats={}; L.forEach(function(m){ ST.mats[m.id]=m; });
  var f=ST.matf||'todos'; var usados={}; L.forEach(function(m){ usados[m.topic_id||'']=1; });
  var V=L.filter(function(m){ return f==='todos' || (m.topic_id||'')===(f==='geral'?'':f); });
  var h=(prof?'<button class="btn gold block" data-a="novoMat">'+ic('file')+' Enviar novo PDF</button><p class="small muted">Você escolhe o assunto e se o PDF é para todos ou para um aluno só. Dá para editar o título, trocar o arquivo ou apagar depois.</p>':'');
  if(erro) h+='<div class="err">'+esc(erro)+'</div>';
  if(Object.keys(usados).length>1) h+='<div class="chips" style="margin-top:10px" role="group" aria-label="Filtrar por assunto"><button class="chip'+(f==='todos'?' on':'')+'" data-a="matf" data-v="todos">Todos</button>'+Object.keys(usados).map(function(k){ return '<button class="chip'+(f===(k||'geral')?' on':'')+'" data-a="matf" data-v="'+esc(k||'geral')+'">'+esc(k&&TBY[k]?strip(TBY[k].nome):'Geral')+'</button>'; }).join('')+'</div>';
  h+=V.length?'<div class="stack" style="margin-top:12px">'+V.map(matItem).join('')+'</div>':(erro?'':'<p class="empty">'+(prof?'Nenhum PDF enviado ainda.':'O professor ainda não mandou materiais.')+'</p>');
  page({title:'Materiais',sub:L.length+' PDF(s)',back:true,nav:prof?'conteudo':'assuntos',body:h});
}
A.matf=function(el){ ST.matf=el.dataset.v; vMateriais(); };
async function matTopico(id){
  var L; try{ L=(await server('materiais',{acao:'listar',topic_id:id})).materiais||[]; }catch(e){ return; }
  L.forEach(function(m){ (ST.mats=ST.mats||{})[m.id]=m; });
  var box=document.getElementById('matTopico'); if(!box) return;
  if(L.length||isProf()) box.innerHTML='<h2>PDFs do professor</h2>'+(L.length?'<div class="stack">'+L.map(matItem).join('')+'</div>':'')+(isProf()?'<button class="btn ghost block" style="margin-top:8px" data-a="novoMat" data-t="'+esc(id)+'">+ Enviar PDF para este assunto</button>':'');
}
A.novoMat=async function(el){ await getAlunos(); matForm(null, el&&el.dataset&&el.dataset.t); };
A.editMat=async function(el){ await getAlunos(); var m=(ST.mats||{})[el.dataset.id]; if(m) matForm(m); };
function matForm(m,topico){
  var novo=!m; m=m||{}; var tp=m.topic_id||topico||'';
  sheet(novo?'Enviar PDF':'Editar material','<form id="fmat" data-form="mat"'+(novo?'':' data-id="'+m.id+'"')+'>'+
    '<label for="mf" style="margin-top:0">'+(novo?'Arquivo PDF':'Trocar o PDF (opcional)')+'</label><input id="mf" name="f" type="file" accept="application/pdf,.pdf"'+(novo?' required':'')+' data-change="matArq">'+
    (novo?'':'<p class="small muted" style="margin:4px 0 0">Arquivo atual: '+esc(m.nome_arquivo||'PDF')+(m.tamanho?' · '+fmtTam(m.tamanho):'')+(m.url?' · <a href="'+esc(m.url)+'" target="_blank" rel="noopener">abrir</a>':'')+'</p>')+
    '<label for="mt">Título</label><input id="mt" name="t" required maxlength="120" value="'+esc(m.titulo||'')+'" placeholder="Ex.: Resumo de frações">'+
    '<label for="md">Descrição (opcional)</label><textarea id="md" name="d" maxlength="500" placeholder="Ex.: Leia antes da aula de quinta.">'+esc(m.descricao||'')+'</textarea>'+
    '<label for="ma">Assunto</label><select id="ma" name="a"><option value="">Geral (sem assunto)</option>'+ANOS.map(function(an){ return '<optgroup label="'+an+'">'+TOPICS.filter(function(t){return t.ano===an;}).map(function(t){return '<option value="'+t.id+'"'+(t.id===tp?' selected':'')+'>'+esc(strip(t.nome))+'</option>';}).join('')+'</optgroup>'; }).join('')+'</select>'+
    '<label for="mp">Para quem</label><select id="mp" name="p"><option value="">Todos os alunos</option>'+(ALUNOS||[]).map(function(a){return '<option value="'+a.id+'"'+(a.id===m.para?' selected':'')+'>'+esc(a.nome)+'</option>';}).join('')+'</select>'+
    '<label class="row" style="gap:8px;font-weight:600;margin-top:14px"><input type="checkbox" name="v"'+(novo?' checked':'')+' style="width:auto;min-height:0"> Avisar os alunos (sino 🔔 e notificação)</label>'+
    '<div id="matMsg"></div></form>',
    '<button class="btn primary block" form="fmat" id="matBtn">'+(novo?'Enviar PDF':'Salvar alterações')+'</button>'+(novo?'':'<button class="btn danger block" style="margin-top:8px" data-a="delMat" data-id="'+m.id+'">Apagar material</button>'));
}
CHANGE.matArq=function(inp){ var f=inp.files[0], t=document.getElementById('mt'), msg=document.getElementById('matMsg'); msg.innerHTML=''; if(!f) return;
  if(!/pdf$/i.test(f.type)&&!/\.pdf$/i.test(f.name)){ msg.innerHTML='<div class="err">Escolha um arquivo PDF.</div>'; inp.value=''; return; }
  if(f.size>MAT_MAX){ msg.innerHTML='<div class="err">Esse PDF tem '+fmtTam(f.size)+'. O limite é 25 MB; comprima e tente de novo.</div>'; inp.value=''; return; }
  if(t&&!t.value.trim()) t.value=f.name.replace(/\.pdf$/i,'').replace(/[_-]+/g,' ').trim().slice(0,120); };
function subirArquivo(url,file,onProg){ return new Promise(function(ok,fail){
  if(MOCK){ MEM.blobs[url]=URL.createObjectURL(file); var p=0; var iv=setInterval(function(){ p+=25; onProg(Math.min(p,100)); if(p>=100){ clearInterval(iv); ok(); } },120); return; }
  var fd=new FormData(); fd.append('cacheControl','3600'); fd.append('',file,file.name);
  var x=new XMLHttpRequest(); x.open('PUT',url); x.setRequestHeader('x-upsert','false');
  x.upload.onprogress=function(e){ if(e.lengthComputable) onProg(Math.round(e.loaded/e.total*100)); };
  x.onload=function(){ if(x.status>=200&&x.status<300) ok(); else { var m=''; try{ m=JSON.parse(x.responseText).message; }catch(e){} fail(new Error('O envio do arquivo falhou'+(m?': '+m:'')+'.')); } };
  x.onerror=function(){ fail(new Error('Sem conexão com a internet.')); };
  x.send(fd); }); }
FORMS.mat=async function(f){ var b=document.getElementById('matBtn'), msg=document.getElementById('matMsg'), lbl=b.textContent; var file=f.f.files[0], up=null;
  b.disabled=true; msg.innerHTML='';
  try{
    if(file){ if(file.size>MAT_MAX) throw new Error('O limite é 25 MB.');
      var pr=await server('materiais',{acao:'preparar',tamanho:file.size}); b.textContent='Enviando… 0%';
      await subirArquivo(pr.uploadUrl,file,function(p){ b.textContent='Enviando… '+p+'%'; }); up=pr.path; b.textContent='Salvando…'; }
    var body={acao:'salvar',titulo:f.t.value,descricao:f.d.value,topic_id:f.a.value||null,para:f.p.value||null,avisar:f.v.checked};
    if(f.dataset.id) body.id=+f.dataset.id||f.dataset.id;
    if(up){ body.path=up; body.nome_arquivo=file.name; body.tamanho=file.size; }
    await server('materiais',body); closeSheet(); toast(f.dataset.id?'Material atualizado':'PDF enviado!'); render();
  }catch(e){ if(up) server('materiais',{acao:'descartar',path:up}).catch(function(){}); msg.innerHTML='<div class="err">'+esc(erroMsg(e))+'</div>'; b.disabled=false; b.textContent=lbl; }
};
A.delMat=async function(el){ if(!confirmar('Apagar este material? Os alunos deixam de ver o PDF.')) return; el.disabled=true;
  try{ await server('materiais',{acao:'apagar',id:+el.dataset.id||el.dataset.id}); closeSheet(); toast('Material apagado'); render(); }catch(e){ toast(erroMsg(e)); el.disabled=false; } };
function mockMat(b){
  var me=ST.me, prof=isProf();
  if(b.acao==='listar'){ var L=MEM.materiais.filter(function(m){ return (prof||!m.para||m.para===me.id) && (!b.topic_id||m.topic_id===b.topic_id); }).slice().reverse().map(function(m){ return Object.assign({},m,{url:MEM.blobs[m.path]||null}); }); return {materiais:b.limite?L.slice(0,b.limite):L}; }
  if(!prof) throw new Error('Só o professor pode fazer isso.');
  if(b.acao==='preparar'){ var p='m'+(++MEM.seq)+'.pdf'; return {path:p,uploadUrl:p}; }
  if(b.acao==='salvar'){ var row={titulo:b.titulo,descricao:b.descricao||null,topic_id:b.topic_id,para:b.para,updated_at:new Date().toISOString()}; if(b.path){ row.path=b.path; row.nome_arquivo=b.nome_arquivo; row.tamanho=b.tamanho; }
    if(b.id){ var cur=MEM.materiais.filter(function(m){return m.id===b.id;})[0]; Object.assign(cur,row); return {ok:true,material:cur}; }
    var n=Object.assign({id:++MEM.seq,created_at:row.updated_at},row); MEM.materiais.push(n); return {ok:true,material:n}; }
  if(b.acao==='apagar'){ MEM.materiais=MEM.materiais.filter(function(m){return m.id!==b.id;}); return {ok:true}; }
  return {ok:true};
}
/* ================= FINANCEIRO ================= */
var DIAS_C=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'], DIAS_L=['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
function brl(v){ return (+v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
function durTxt(m){ m=+m||60; return m%60===0? (m/60)+'h' : (m>60? Math.floor(m/60)+'h'+String(m%60).padStart(2,'0') : m+' min'); }
function dataLonga(iso){ var d=new Date(iso+'T12:00:00'); return DIAS_C[d.getDay()]+' '+fmtData(iso); }
function valorAula(a,al){ if(a.valor!=null&&a.valor!=='') return +a.valor; return al&&al.valor_hora? Math.round(al.valor_hora*(+a.duracao_min||60)/60*100)/100 : 0; }
function horarioDe(al){ var h=al&&al.horario; if(typeof h==='string'){ try{ h=JSON.parse(h); }catch(e){ h=null; } } return h&&h.slots?h:{desde:null,slots:[]}; }
// aulas do horário fixo entre duas datas (inclusive)
function slotsEntre(al,de,ate){ var h=horarioDe(al), out=[]; if(!h.slots.length) return out; var d=new Date(de+'T12:00:00'), fim=new Date(ate+'T12:00:00'); if(h.desde){ var ds=new Date(h.desde+'T12:00:00'); if(ds>d) d=ds; }
  for(;d<=fim;d.setDate(d.getDate()+1)){ var iso=isoDate(d); h.slots.forEach(function(s){ if(+s.dia===d.getDay()) out.push({data:iso,hora:s.hora,duracao_min:+s.dur||60}); }); } return out; }
function finResumo(al,aulas){
  var hojeIso=isoDate(hoje()), mes=hojeIso.slice(0,7);
  var pend=aulas.filter(function(a){return a.status==='pendente';}).sort(function(a,b){return a.data<b.data?-1:1;});
  var pagas=aulas.filter(function(a){return a.status==='paga';}).sort(function(a,b){return (b.pago_em||b.data)<(a.pago_em||a.data)?-1:1;});
  var tem={}; aulas.forEach(function(a){ tem[a.data+'|'+(a.hora||'')]=1; });
  var ini=new Date(hoje()); ini.setDate(ini.getDate()-28);
  var confirmar=slotsEntre(al,isoDate(ini),hojeIso).filter(function(s){ return !tem[s.data+'|'+s.hora]; });
  var fim=new Date(hoje()); fim.setDate(fim.getDate()+7); var amanha=new Date(hoje()); amanha.setDate(amanha.getDate()+1);
  var prox=slotsEntre(al,isoDate(amanha),isoDate(fim)).filter(function(s){ return !tem[s.data+'|'+s.hora]; });
  return { pend:pend, pagas:pagas, confirmar:confirmar, prox:prox,
    totPend:pend.reduce(function(s,a){return s+valorAula(a,al);},0),
    recMes:pagas.filter(function(a){return String(a.pago_em||a.data).slice(0,7)===mes;}).reduce(function(s,a){return s+valorAula(a,al);},0),
    totProx:prox.reduce(function(s,a){return s+valorAula(a,al);},0) };
}
function aulaLinha(a,al,acoes){ return '<div class="item">'+(acoes&&a.status==='pendente'?'<input type="checkbox" class="finsel" value="'+a.id+'" aria-label="Selecionar aula de '+esc(dataLonga(a.data))+'" style="width:22px;height:22px;min-height:0;margin-top:2px;flex-shrink:0">':'')+'<div class="grow"><b>'+esc(dataLonga(a.data))+(a.hora?' · '+esc(a.hora):'')+'</b><span class="small muted">'+durTxt(a.duracao_min)+(a.status==='paga'&&a.pago_em?' · pago em '+fmtData(a.pago_em):'')+(a.obs?' · '+esc(a.obs):'')+'</span></div><b style="white-space:nowrap">'+brl(valorAula(a,al))+'</b>'+(acoes?'<div class="row" style="gap:6px;flex-shrink:0">'+(a.status==='pendente'?'<button class="btn sm" style="background:var(--okbg);border-color:#B7DFC5;color:var(--ok)" data-a="finPagar" data-id="'+a.id+'">Pago</button>':'')+'<button class="btn sm ghost" data-a="finEditar" data-id="'+a.id+'" aria-label="Editar aula">✎</button></div>':'')+'</div>'; }
function finCards(r,al){
  var semValor=!al.valor_hora&&r.pend.some(function(a){return a.valor==null;});
  return '<div class="stats"><div class="stat" style="border-color:'+(r.totPend?'#F2BDBD':'var(--line)')+';background:'+(r.totPend?'var(--badbg)':'#fff')+'"><b style="color:'+(r.totPend?'var(--bad)':'var(--ok)')+'">'+brl(r.totPend)+'</b><span>'+(r.pend.length?r.pend.length+' aula(s) a pagar':'nada pendente 🎉')+'</span></div><div class="stat"><b>'+brl(r.recMes)+'</b><span>pago neste mês</span></div></div>'+(semValor&&isProf()?'<div class="err" style="margin-top:10px">Defina o valor da hora em "Horário e valor" para calcular os totais.</div>':'');
}
async function loadFin(al){ var aulas=await DB.q('aulas',{eq:{student_id:al.id},order:['data',false]}); ST.fin={al:al,aulas:aulas,by:{}}; aulas.forEach(function(a){ ST.fin.by[a.id]=a; }); return finResumo(al,aulas); }
async function getPix(){ try{ var r=await DB.q('config',{eq:{chave:'pub_pix'}}); return r[0]?r[0].valor:''; }catch(e){ return ''; } }

// aba Financeiro dentro do aluno (professor)
async function finProfHTML(al){
  var r=await loadFin(al); var h=horarioDe(al);
  var x=finCards(r,al);
  x+='<div class="grid" style="margin-top:12px"><button class="btn gold" data-a="finAvulsa" data-id="'+al.id+'">+ Lançar aula</button><button class="btn ghost" data-a="finHorario" data-id="'+al.id+'">'+ic('cal')+' Horário e valor</button></div>';
  x+='<p class="small muted" style="margin:8px 0 0">'+(h.slots.length?'Aulas fixas: '+h.slots.map(function(s){return DIAS_C[s.dia]+' '+s.hora+' ('+durTxt(s.dur)+')';}).join(', '):'Sem horário fixo cadastrado.')+(al.valor_hora?' · '+brl(al.valor_hora)+'/hora':'')+'</p>';
  if(r.confirmar.length) x+='<h2>Aulas da agenda para confirmar <span class="muted small">('+r.confirmar.length+')</span></h2><p class="small muted" style="margin-top:-4px">Confirme as aulas que você deu. Elas entram como pendentes de pagamento.</p><div class="stack">'+r.confirmar.slice().reverse().map(function(s){ return '<div class="item"><div class="grow"><b>'+esc(dataLonga(s.data))+' · '+esc(s.hora)+'</b><span class="small muted">'+durTxt(s.duracao_min)+' · '+brl(valorAula(s,al))+'</span></div><div class="row" style="gap:6px;flex-shrink:0"><button class="btn sm primary" data-a="finConfirma" data-id="'+al.id+'" data-d="'+s.data+'" data-h="'+esc(s.hora)+'" data-m="'+s.duracao_min+'">Dei a aula</button><button class="btn sm ghost" data-a="finFalta" data-id="'+al.id+'" data-d="'+s.data+'" data-h="'+esc(s.hora)+'" data-m="'+s.duracao_min+'">Não teve</button></div></div>'; }).join('')+'</div>';
  x+='<h2>Pagamentos pendentes <span class="muted small">('+r.pend.length+')</span></h2>';
  if(r.pend.length){ x+='<div class="stack">'+r.pend.map(function(a){return aulaLinha(a,al,true);}).join('')+'</div><div class="grid" style="margin-top:10px"><button class="btn primary" data-a="finPagarSel" data-id="'+al.id+'">✓ Marcar selecionadas como pagas</button><button class="btn wa" data-a="finCobrar" data-id="'+al.id+'">'+ic('wa','#fff',20)+' Cobrar os pais no WhatsApp</button></div><button class="btn gold block" style="margin-top:10px" data-a="finLembrar">'+ic('bell')+' Lembrar '+esc(primeiroNome(al.nome))+' no celular</button>'; }
  else x+='<p class="muted">Nenhuma aula esperando pagamento.</p>';
  if(r.prox.length) x+='<h2>Próximas aulas (7 dias)</h2><div class="card"><div class="small muted">'+r.prox.map(function(s){return esc(dataLonga(s.data))+' '+esc(s.hora);}).join(' · ')+'</div><b style="display:block;margin-top:6px">Previsto: '+brl(r.totProx)+'</b></div>';
  if(r.pagas.length) x+='<details style="margin-top:18px"><summary style="font-weight:800;cursor:pointer">Histórico de pagas ('+r.pagas.length+')</summary><div class="stack" style="margin-top:10px">'+r.pagas.slice(0,40).map(function(a){return aulaLinha(a,al,true);}).join('')+'</div></details>';
  return x;
}
function finRecarregar(){ var al=ST.fin&&ST.fin.al; if(!al) return render(); if(/#\/financeiro/.test(location.hash)) return render(); ST.tab['al'+al.id]='fin'; vAluno(al.id,'fin'); }
async function finAluno(id){ await getAlunos(true); return (ALUNOS||[]).filter(function(a){return a.id===id;})[0]; }
A.finConfirma=async function(el){ el.disabled=true; var al=ST.fin.al; try{ await DB.ins('aulas',{student_id:al.id,data:el.dataset.d,hora:el.dataset.h,duracao_min:+el.dataset.m,status:'pendente'}); toast('Aula lançada como pendente'); finRecarregar(); }catch(e){ toast(erroMsg(e)); el.disabled=false; } };
A.finFalta=async function(el){ el.disabled=true; var al=ST.fin.al; try{ await DB.ins('aulas',{student_id:al.id,data:el.dataset.d,hora:el.dataset.h,duracao_min:+el.dataset.m,status:'cancelada',obs:'Não teve aula'}); toast('Marcado: não teve aula'); finRecarregar(); }catch(e){ toast(erroMsg(e)); el.disabled=false; } };
async function finMarcarPagas(ids){ var al=ST.fin.al, agora=new Date().toISOString();
  for(var i=0;i<ids.length;i++){ var a=ST.fin.by[ids[i]]; await DB.upd('aulas',{id:a.id},{status:'paga',pago_em:agora,valor:valorAula(a,al)}); } }
A.finPagar=async function(el){ el.disabled=true; try{ await finMarcarPagas([+el.dataset.id||el.dataset.id]); toast('Pagamento registrado'); finRecarregar(); }catch(e){ toast(erroMsg(e)); el.disabled=false; } };
A.finPagarSel=async function(el){ var ids=[].map.call(document.querySelectorAll('.finsel:checked'),function(c){return +c.value||c.value;});
  if(!ids.length){ if(!confirmar('Nenhuma aula selecionada. Marcar TODAS as pendentes como pagas?')) return; ids=ST.fin.aulas.filter(function(a){return a.status==='pendente';}).map(function(a){return a.id;}); }
  el.disabled=true; try{ await finMarcarPagas(ids); toast(ids.length+' aula(s) marcada(s) como paga(s)'); finRecarregar(); }catch(e){ toast(erroMsg(e)); el.disabled=false; } };
A.finCobrar=async function(){ var al=ST.fin.al, r=finResumo(al,ST.fin.aulas), pix=await getPix();
  var t='Olá! Aqui é o Prof. '+primeiroNome(ST.me.nome)+'. Segue o resumo das aulas de matemática de '+primeiroNome(al.nome)+' que ainda não foram pagas:\n\n'+r.pend.map(function(a){return '• '+dataLonga(a.data)+(a.hora?' às '+a.hora:'')+' ('+durTxt(a.duracao_min)+') — '+brl(valorAula(a,al));}).join('\n')+'\n\n*Total: '+brl(r.totPend)+'*'+(pix?'\n\nPIX: '+pix:'')+'\n\nObrigado!';
  var w=waNum(al.responsavel_whatsapp); window.open('https://wa.me/'+(w||'')+'?text='+encodeURIComponent(t),'_blank'); };
function finForm(al,a){ var novo=!a; a=a||{data:isoDate(hoje()),hora:'18:00',duracao_min:60,status:'pendente'};
  sheet(novo?'Lançar aula':'Editar aula','<form id="ffa" data-form="finAula"'+(novo?'':' data-id="'+a.id+'"')+'><div class="grid"><div><label for="fd" style="margin-top:0">Data</label><input id="fd" name="d" type="date" required value="'+esc(a.data)+'"></div><div><label for="fh" style="margin-top:0">Hora</label><input id="fh" name="h" type="time" value="'+esc(a.hora||'')+'"></div></div>'+
    '<div class="grid"><div><label for="fm">Duração (min)</label><input id="fm" name="m" type="number" min="15" step="15" required value="'+(+a.duracao_min||60)+'"></div><div><label for="fv">Valor (R$)</label><input id="fv" name="v" type="number" min="0" step="0.01" inputmode="decimal" placeholder="'+(al.valor_hora?'pelo valor da hora':'ex.: 40')+'" value="'+(a.valor!=null?a.valor:'')+'"></div></div>'+
    '<label for="fs">Situação</label><select id="fs" name="s"><option value="pendente"'+(a.status==='pendente'?' selected':'')+'>Pendente (não pago)</option><option value="paga"'+(a.status==='paga'?' selected':'')+'>Paga</option><option value="cancelada"'+(a.status==='cancelada'?' selected':'')+'>Não teve aula</option></select>'+
    '<label for="fo">Observação (opcional)</label><input id="fo" name="o" maxlength="120" value="'+esc(a.obs||'')+'" placeholder="Ex.: aula extra antes da prova"></form>',
    '<button class="btn primary block" form="ffa">'+(novo?'Lançar aula':'Salvar')+'</button>'+(novo?'':'<button class="btn danger block" style="margin-top:8px" data-a="finApagar" data-id="'+a.id+'">Apagar lançamento</button>')); }
A.finAvulsa=function(){ finForm(ST.fin.al); };
A.finEditar=function(el){ var a=ST.fin.by[el.dataset.id]; if(a) finForm(ST.fin.al,a); };
FORMS.finAula=async function(f){ var al=ST.fin.al, id=f.dataset.id&&(+f.dataset.id||f.dataset.id), old=id?ST.fin.by[id]:null;
  var row={data:f.d.value,hora:f.h.value||null,duracao_min:+f.m.value||60,valor:f.v.value===''?null:+f.v.value,status:f.s.value,obs:f.o.value.trim()||null};
  if(row.status==='paga'){ if(!old||old.status!=='paga') row.pago_em=new Date().toISOString(); if(row.valor==null) row.valor=valorAula(row,al); } else row.pago_em=null;
  try{ if(id) await DB.upd('aulas',{id:id},row); else { row.student_id=al.id; await DB.ins('aulas',row); } closeSheet(); toast(id?'Aula atualizada':'Aula lançada'); finRecarregar(); }catch(e){ toast(erroMsg(e)); } };
A.finApagar=async function(el){ if(!confirmar('Apagar este lançamento?')) return; try{ await DB.del('aulas',{id:+el.dataset.id||el.dataset.id}); closeSheet(); toast('Lançamento apagado'); finRecarregar(); }catch(e){ toast(erroMsg(e)); } };
A.finHorario=function(){ var al=ST.fin.al, h=horarioDe(al), by={}; h.slots.forEach(function(s){ by[s.dia]=s; });
  sheet('Horário e valor de '+esc(primeiroNome(al.nome)),'<form id="fho" data-form="finHorario"><label for="vh" style="margin-top:0">Valor da hora-aula (R$)</label><input id="vh" name="vh" type="number" min="0" step="0.01" inputmode="decimal" value="'+(al.valor_hora!=null?al.valor_hora:'')+'" placeholder="Ex.: 30">'+
    '<label style="margin-top:16px">Dias de aula fixos</label><div class="stack">'+[1,2,3,4,5,6,0].map(function(d){ var s=by[d]; return '<div class="item" style="align-items:center;padding:8px 12px"><label class="row grow" style="gap:8px;margin:0;font-weight:700"><input type="checkbox" name="d'+d+'"'+(s?' checked':'')+' style="width:22px;height:22px;min-height:0"> '+DIAS_L[d]+'</label><input type="time" name="h'+d+'" value="'+esc(s?s.hora:'18:00')+'" aria-label="Hora de '+DIAS_L[d]+'" style="width:110px"><input type="number" name="m'+d+'" min="15" step="15" value="'+(s?s.dur:60)+'" aria-label="Duração em minutos de '+DIAS_L[d]+'" style="width:76px"><span class="small muted">min</span></div>'; }).join('')+'</div>'+
    '<label for="hd">Contar aulas fixas a partir de</label><input id="hd" name="desde" type="date" value="'+esc(h.desde||isoDate(hoje()))+'"><p class="small muted">As aulas fixas a partir dessa data aparecem para você confirmar com um toque. Aulas fora do horário você lança em "+ Lançar aula".</p></form>',
    '<button class="btn primary block" form="fho">Salvar</button>'); };
FORMS.finHorario=async function(f){ var al=ST.fin.al, slots=[]; [1,2,3,4,5,6,0].forEach(function(d){ if(f['d'+d].checked) slots.push({dia:d,hora:f['h'+d].value||'18:00',dur:+f['m'+d].value||60}); });
  var patch={valor_hora:f.vh.value===''?null:+f.vh.value,horario:{desde:f.desde.value||isoDate(hoje()),slots:slots}};
  try{ await DB.upd('profiles',{id:al.id},patch); Object.assign(al,patch); await getAlunos(true); closeSheet(); toast('Horário salvo'); finRecarregar(); }catch(e){ toast(erroMsg(e)); } };

function finDiasTxt(pend){ var hj=isoDate(hoje()), ont=new Date(hoje()); ont.setDate(ont.getDate()-1); ont=isoDate(ont);
  if(pend.length>3) return 'das últimas '+pend.length+' aulas';
  var L=pend.map(function(a){ if(a.data===hj) return 'de hoje'; if(a.data===ont) return 'de ontem'; var d=new Date(a.data+'T12:00:00'); var dias=Math.round((hoje()-d)/86400000); var passada=dias>hoje().getDay(); return 'de '+DIAS_L[d.getDay()]+(d.getDay()>0&&d.getDay()<6?'-feira':'')+(passada&&dias<14?(d.getDay()===0||d.getDay()===6?' passado':' passada'):'')+(dias>=14?' ('+a.data.slice(8,10)+'/'+a.data.slice(5,7)+')':''); });
  return (L.length>1? 'das aulas '+L.slice(0,-1).join(', ')+' e '+L[L.length-1] : 'da aula '+L[0]); }
A.finLembrar=function(){ var al=ST.fin.al, r=finResumo(al,ST.fin.aulas); if(!r.pend.length){ toast('Nenhuma aula pendente.'); return; }
  var txt='Oi, '+primeiroNome(al.nome)+'! 😊 Passando só pra lembrar do pagamento '+finDiasTxt(r.pend)+' ('+brl(r.totPend)+'). Quando puder, toque aqui para ver a chave PIX. Obrigado!';
  sheet('Lembrete para '+esc(primeiroNome(al.nome)),'<form id="flb" data-form="finLembrar"><label for="lt" style="margin-top:0">Título</label><input id="lt" name="t" maxlength="80" required value="Lembrete das aulas 💰"><label for="lx">Mensagem</label><textarea id="lx" name="x" maxlength="200" required rows="5">'+esc(txt.slice(0,200))+'</textarea><p class="small muted">Chega como notificação no celular do aluno (se ele ativou as notificações) e fica no sino 🔔 do app. Ao tocar, ele abre a tela de pagamentos com a chave PIX.</p></form>','<button class="btn primary block" form="flb">Enviar lembrete</button>'); };
FORMS.finLembrar=async function(f){ var b=document.querySelector('[form="flb"]'); b.disabled=true; var al=ST.fin.al;
  try{ if(MOCK){ closeSheet(); toast('Lembrete enviado (demonstração)'); return; }
    var r=await server('push',{para:[al.id],titulo:f.t.value.trim(),texto:f.x.value.trim(),link:'#/financeiro',tipo:'pagamento',salvarAviso:true});
    closeSheet(); toast(r.enviados?'Lembrete enviado ao celular de '+primeiroNome(al.nome):'Lembrete salvo no app. '+primeiroNome(al.nome)+' ainda não ativou as notificações no celular.'); }catch(e){ toast(erroMsg(e)); b.disabled=false; } };
// tela geral do professor
async function vFinProf(){
  loading('Financeiro','alunos'); var al=await getAlunos(true); var todas=await DB.q('aulas',{order:['data',false]}); var pix=await getPix();
  var tot=0, rec=0, conf=0, linhas=al.map(function(a){ var r=finResumo(a,todas.filter(function(x){return x.student_id===a.id;})); tot+=r.totPend; rec+=r.recMes; conf+=r.confirmar.length; return {a:a,r:r}; }).sort(function(x,y){return y.r.totPend-x.r.totPend;});
  var h='<div class="stats"><div class="stat" style="background:'+(tot?'var(--badbg)':'#fff')+'"><b style="color:'+(tot?'var(--bad)':'var(--ok)')+'">'+brl(tot)+'</b><span>a receber</span></div><div class="stat"><b>'+brl(rec)+'</b><span>recebido neste mês</span></div></div>'+(conf?'<div class="card" style="margin-top:10px;border-color:var(--accent)"><b>'+conf+' aula(s) da agenda para confirmar</b><span class="small muted" style="display:block">Abra o aluno para marcar "Dei a aula".</span></div>':'');
  h+='<h2>Por aluno</h2>'+(linhas.length?'<div class="stack">'+linhas.map(function(l){ return '<a class="item" style="text-decoration:none" href="#/aluno/'+l.a.id+'/fin"><span class="avatar">'+esc(iniciais(l.a.nome))+'</span><div class="grow"><b>'+esc(l.a.nome)+'</b><span class="small muted">'+(l.r.pend.length?l.r.pend.length+' aula(s) pendente(s)':'em dia')+(l.r.confirmar.length?' · '+l.r.confirmar.length+' para confirmar':'')+'</span></div><b style="color:'+(l.r.totPend?'var(--bad)':'var(--ok)')+';white-space:nowrap">'+brl(l.r.totPend)+'</b></a>'; }).join('')+'</div>':'<p class="empty">Nenhum aluno cadastrado.</p>');
  h+='<h2>Chave PIX</h2><form class="card" data-form="pix"><label for="px" style="margin-top:0">Aparece para os alunos na tela de pagamentos e na cobrança</label><input id="px" name="p" value="'+esc(pix)+'" placeholder="CPF, telefone, e-mail ou chave aleatória"><button class="btn primary block" style="margin-top:10px">Salvar chave PIX</button></form>';
  page({title:'Financeiro',sub:'aulas e pagamentos',back:true,nav:'alunos',body:h});
}
FORMS.pix=async function(f){ try{ await DB.ups('config',{chave:'pub_pix',valor:f.p.value.trim()},'chave'); toast('Chave PIX salva'); }catch(e){ toast(erroMsg(e)); } };

// tela do aluno (só leitura)
async function vFinAluno(){
  loading('Pagamentos',''); var al=ST.me; var r=await loadFin(al); var pix=await getPix();
  var h=finCards(r,al);
  if(r.pend.length){ h+='<h2>A pagar</h2><div class="stack">'+r.pend.map(function(a){return aulaLinha(a,al,false);}).join('')+'</div>';
    h+='<div class="card" style="margin-top:12px"><b>Como pagar</b>'+(pix?'<p style="margin:6px 0">PIX: <b style="word-break:break-all">'+esc(pix)+'</b></p><button class="btn ghost block" data-a="copiar" data-v="'+esc(pix)+'">Copiar chave PIX</button>':'<p class="muted small" style="margin:6px 0">Combine com o professor.</p>')+'<a class="btn wa block" style="margin-top:8px" target="_blank" rel="noopener" href="https://wa.me/'+WA+'?text='+encodeURIComponent('Olá, professor! Aqui é '+al.nome+'. Fiz o pagamento de '+brl(r.totPend)+' das aulas. Segue o comprovante:')+'">'+ic('wa','#fff',20)+' Enviar comprovante</a></div>'; }
  if(r.prox.length) h+='<h2>Próximas aulas</h2><div class="card small">'+r.prox.map(function(s){return esc(dataLonga(s.data))+' às '+esc(s.hora);}).join('<br>')+'</div>';
  h+='<h2>Pagas</h2>'+(r.pagas.length?'<div class="stack">'+r.pagas.slice(0,30).map(function(a){return aulaLinha(a,al,false);}).join('')+'</div>':'<p class="muted">Nenhum pagamento registrado ainda.</p>');
  page({title:'Pagamentos',sub:'suas aulas',back:true,nav:'',body:h});
}
function vMeuPerfil(){ page({title:'Minha conta',back:true,nav:'',body:installCard()+'<div class="stack" style="margin:12px 0">'+pushBtn()+'<a class="btn ghost block" href="#/agenda-prof">'+ic('cal')+' Minha agenda</a></div><div class="card row"><span class="avatar" style="width:56px;height:56px">'+esc(iniciais(ST.me.nome))+'</span><div class="grow"><b style="font-size:18px">'+esc(ST.me.nome)+'</b><span class="muted small">Professor</span></div></div><p class="small muted">Para os alunos entrarem: '+esc(location.origin)+'</p><button class="btn danger block" style="margin-top:16px" data-a="sair">Sair da conta</button>'}); }

/* ================= SEQUÊNCIA (estilo Duolingo) ================= */
function diaBR(off){ var d=new Date(Date.now()-3*3600*1000+(off||0)*86400000); return d.toISOString().slice(0,10); }
function diaSemana(iso){ return new Date(iso+'T12:00:00Z').getUTCDay(); }
async function loadAtiv(uid){ var m={}; try{ (await DB.q('atividade',{eq:{student_id:uid},order:['dia',false],limit:400})).forEach(function(r){ m[r.dia]=r.xp; }); }catch(e){} return m; }
function streakInfo(ativ,meta){
  ativ=ativ||ST.ativ||{}; meta=meta||(ST.me&&ST.me.meta_xp)||20;
  var hoje=diaBR(0), xpHoje=ativ[hoje]||0, met=xpHoje>=meta, seq=0;
  for(var k=met?0:1;k<400;k++){ if((ativ[diaBR(-k)]||0)>=meta) seq++; else break; }
  var rec=0,cur=0; Object.keys(ativ).sort().forEach(function(d,i,arr){ if(ativ[d]>=meta){ var prev=i>0?arr[i-1]:null; var dd=new Date(d+'T12:00Z'), pp=prev?new Date(prev+'T12:00Z'):null; cur=(pp&&(dd-pp)===86400000&&ativ[prev]>=meta)?cur+1:1; rec=Math.max(rec,cur);} });
  return {seq:seq,metHoje:met,xpHoje:xpHoje,meta:meta,emRisco:!met&&seq>0,recorde:Math.max(rec,seq)};
}
function flame(sz,st){ var on=st!=='off'; return '<svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" aria-hidden="true"><path d="M12 2c1 3.5 5.5 6 5.5 11.2A5.6 5.6 0 0 1 12 19a5.6 5.6 0 0 1-5.5-5.8c0-2.6 1.4-4.4 2.6-5.4.1 1.7.9 3 2 3.6C11 9 10.6 5.4 12 2z" fill="'+(on?'#FF9600':'#C4CBDB')+'"/><path d="M12 11.5c.6 1.6 2.6 2.6 2.6 4.6a2.6 2.6 0 0 1-5.2 0c0-1.3.8-2.2 1.5-2.7.2.8.6 1.3 1.1 1.5-.2-1.2-.3-2.3 0-3.4z" fill="'+(on?'#FFD23F':'#E3E7F0')+'"/></svg>'; }
async function addXP(n){
  if(isProf()||!n) return; var d=diaBR(0), meta=ST.me.meta_xp||20; var antes=ST.ativ[d]||0, depois=antes+n; ST.ativ[d]=depois;
  try{ await DB.ups('atividade',{student_id:ST.me.id,dia:d,xp:depois,updated_at:new Date().toISOString()},'student_id,dia'); }catch(e){}
  if(antes<meta&&depois>=meta) ST.celebrar=true;
  var chip=document.querySelector('.streakchip'); if(chip){ var t=document.createElement('div'); t.innerHTML=topExtras(); chip.replaceWith(t.firstChild); }
  maybeCelebrate();
}
function semanaHTML(ativ,meta){
  var nomes=['D','S','T','Q','Q','S','S'], h='<div class="week">';
  for(var k=6;k>=0;k--){ var d=diaBR(-k), ok=(ativ[d]||0)>=meta, hoje=k===0; h+='<div class="wd'+(ok?' ok':'')+(hoje?' hoje':'')+'"><span>'+nomes[diaSemana(d)]+'</span><i>'+(ok?'✓':'')+'</i></div>'; }
  return h+'</div>';
}
function streakCard(){
  if(isProf()) return ''; var s=streakInfo(), pct=Math.min(100,Math.round(s.xpHoje/s.meta*100));
  var msg=s.metHoje?'Meta de hoje cumprida! Volte amanhã para manter a chama. 🔥':(s.emRisco?'Sua sequência de '+s.seq+' dia'+(s.seq>1?'s':'')+' acaba à meia-noite! Faltam '+(s.meta-s.xpHoje)+' XP.':'Faça '+s.meta+' XP hoje para começar uma sequência.');
  return '<a class="streakcard'+(s.emRisco?' risk':'')+'" href="#/sequencia"><div class="row"><div class="flamebig">'+flame(48,s.metHoje||s.seq?'on':'off')+'</div><div class="grow"><b style="font-size:22px">'+s.seq+' dia'+(s.seq===1?'':'s')+' seguido'+(s.seq===1?'':'s')+'</b><span class="small">'+msg+'</span></div></div><div class="xpbar"><i style="width:'+pct+'%"></i><span>'+s.xpHoje+' / '+s.meta+' XP hoje</span></div>'+semanaHTML(ST.ativ,s.meta)+'</a>';
}
function maybeCelebrate(){
  if(!ST.celebrar||document.getElementById('celebra')) return; ST.celebrar=false; var s=streakInfo();
  var bg=document.createElement('div'); bg.className='sheet-bg'; bg.id='celebra'; bg.style.alignItems='center';
  bg.innerHTML='<div class="celebra" role="dialog" aria-label="Sequência aumentou"><div class="flameanim">'+flame(120,'on')+'</div><div class="bignum">'+s.seq+'</div><b style="font-size:22px">dia'+(s.seq===1?'':'s')+' de sequência!</b><p class="muted">'+(s.seq===1?'Começou uma nova sequência. Volte amanhã!':'Você manteve a chama acesa. Continue amanhã!')+'</p>'+semanaHTML(ST.ativ,s.meta)+'<button class="btn gold block" style="margin-top:14px" data-a="fecharCelebra">Continuar</button></div>';
  document.body.appendChild(bg); try{ if(navigator.vibrate) navigator.vibrate([60,40,60]); }catch(e){}
}
A.fecharCelebra=function(){ var c=document.getElementById('celebra'); if(c) c.remove(); };
A.irSeq=function(){ location.hash='#/sequencia'; };
function vSequencia(){
  var s=streakInfo(), ativ=ST.ativ||{};
  var h='<div class="streakhero"><div class="flameanim">'+flame(110,s.seq||s.metHoje?'on':'off')+'</div><div class="bignum">'+s.seq+'</div><b>dia'+(s.seq===1?'':'s')+' de sequência</b><p>'+(s.metHoje?'Meta de hoje cumprida! ✅':(s.emRisco?'⚠️ Faça '+(s.meta-s.xpHoje)+' XP até meia-noite para não perder!':'Faça '+s.meta+' XP hoje para acender a chama.'))+'</p></div>';
  h+='<div class="xpbar" style="margin-top:12px"><i style="width:'+Math.min(100,Math.round(s.xpHoje/s.meta*100))+'%"></i><span>'+s.xpHoje+' / '+s.meta+' XP hoje</span></div>'+semanaHTML(ativ,s.meta);
  h+='<div class="stats" style="margin-top:14px"><div class="stat"><b>'+s.recorde+'</b><span>recorde de dias</span></div><div class="stat"><b>'+Object.keys(ativ).filter(function(d){return ativ[d]>=s.meta;}).length+'</b><span>dias com meta batida</span></div></div>';
  h+='<h2>Últimas 5 semanas</h2><div class="cal">'; var ini=-(28+diaSemana(diaBR(0))); h+=['D','S','T','Q','Q','S','S'].map(function(x){return '<b>'+x+'</b>';}).join(''); for(var k=ini;k<=0;k++){ var d=diaBR(k), x=ativ[d]||0; h+='<i title="'+fmtData(d)+': '+x+' XP" class="'+(x>=s.meta?'ok':(x>0?'meio':''))+(k===0?' hoje':'')+'"></i>'; } h+='</div><p class="small muted">Laranja = meta batida · claro = estudou um pouco</p>';
  h+='<h2>Meta diária</h2><div class="grid g3">'+[[10,'Leve','~5 min'],[20,'Normal','~10 min'],[40,'Puxado','~20 min']].map(function(m){return '<button class="btn '+(s.meta===m[0]?'gold':'ghost')+'" data-a="meta" data-v="'+m[0]+'">'+m[1]+' · '+m[0]+' XP<br><span class="small" style="font-weight:600">'+m[2]+'</span></button>';}).join('')+'</div>';
  h+='<h2>Como ganhar XP</h2><div class="card"><ul style="margin:0;padding-left:20px"><li>Acertar uma questão: <b>+10 XP</b> (errar ainda vale +3)</li><li>Marcar a teoria como estudada: <b>+15 XP</b></li><li>Entregar uma lista: <b>+25 XP</b></li><li>Fazer uma anotação: <b>+5 XP</b></li><li>Teste de nivelamento: <b>+20 XP</b></li></ul></div>'+pushCard(true);
  page({title:'Minha sequência',back:true,nav:'',body:h});
}
A.meta=async function(el){ var m=+el.dataset.v; try{ if(!MOCK){ var r=await ST.sb.rpc('salvar_meta',{m:m}); if(r.error) throw r.error; } ST.me.meta_xp=m; toast('Meta diária: '+m+' XP'); vSequencia(); }catch(e){ toast(erroMsg(e)); } };

/* ================= AVISOS ================= */
A.irAvisos=function(){ location.hash='#/avisos'; };
var AVICON={lista:'📝',correcao:'✅',duvida:'💬',sequencia:'🔥',prazo:'⏰',recado:'📣',aluno:'❓',material:'📄',pagamento:'💰',info:'🔔'};
async function vAvisos(){
  loading('Avisos',''); var L=await DB.q('avisos',{eq:{para:ST.me.id},order:['created_at',false],limit:60});
  var h=(isProf()?'<button class="btn gold block" data-a="novoAviso">'+ic('bell')+' Enviar aviso para alunos</button>':'')+pushCard(true);
  h+=L.length?'<div class="stack" style="margin-top:12px">'+L.map(function(v){ return '<a class="item aviso'+(v.lido?'':' novo')+'" href="'+esc(v.link||'#/')+'" style="text-decoration:none"><span style="font-size:24px">'+(AVICON[v.tipo]||'🔔')+'</span><div class="grow"><b>'+esc(v.titulo)+'</b>'+(v.texto?'<span class="small muted">'+esc(v.texto)+'</span>':'')+'<span class="small muted">'+fmtData(v.created_at)+'</span></div>'+(v.lido?'':'<span class="dotnew" aria-label="não lido"></span>')+'</a>'; }).join('')+'</div>':'<p class="empty">Nenhum aviso por enquanto.</p>';
  page({title:'Avisos',back:true,nav:'',body:h});
  var nao=L.filter(function(v){return !v.lido;}); if(nao.length){ try{ await DB.upd('avisos',{para:ST.me.id,lido:false},{lido:true}); ST.unread=0; var b=document.querySelector('.bell span'); if(b) b.remove(); }catch(e){} }
}
A.novoAviso=async function(el){ var al=await getAlunos(); var pre=el&&el.dataset&&el.dataset.id;
  sheet('Enviar aviso','<form id="fav" data-form="aviso"><label for="vp" style="margin-top:0">Para</label><select id="vp" name="p"><option value="todos">Todos os alunos</option>'+al.map(function(a){return '<option value="'+a.id+'"'+(a.id===pre?' selected':'')+'>'+esc(a.nome)+'</option>';}).join('')+'</select><label for="vt">Título</label><input id="vt" name="t" required maxlength="80" placeholder="Ex.: Aula de sábado remarcada"><label for="vx">Mensagem</label><textarea id="vx" name="x" maxlength="200"></textarea><p class="small muted">Aparece no sino 🔔 do aluno e chega como notificação no celular de quem ativou os lembretes.</p></form>','<button class="btn primary block" form="fav">Enviar aviso</button>'); };
FORMS.aviso=async function(f){ var b=document.querySelector('[form="fav"]'); b.disabled=true; var todos=f.p.value==='todos';
  try{ if(MOCK){ toast('Aviso enviado (demonstração)'); closeSheet(); return; } var r=await server('push',{todos:todos,para:todos?[]:[f.p.value],titulo:f.t.value.trim(),texto:f.x.value.trim(),link:'#/avisos',tipo:'recado',salvarAviso:true}); closeSheet(); toast('Aviso enviado'+(r.enviados?' · '+r.enviados+' notificação(ões)':'')); }catch(e){ toast(erroMsg(e)); b.disabled=false; } };
function pushPara(ids,titulo,texto,link){ if(MOCK||!ids||!ids.length) return; server('push',{para:ids,titulo:titulo,texto:texto,link:link}).catch(function(){}); }

/* ================= NOTIFICAÇÕES E INSTALAÇÃO ================= */
function isStandalone(){ try{ return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true; }catch(e){ return false; } }
function isIOS(){ var u=navigator.userAgent||''; return /iphone|ipad|ipod/i.test(u) || (navigator.platform==='MacIntel' && navigator.maxTouchPoints>1); }
function isInApp(){ return /Instagram|FBAN|FBAV|Line\/|WhatsApp|TikTok/i.test(navigator.userAgent||''); }
function isIOSnotSafari(){ var u=navigator.userAgent||''; return isIOS() && (/CriOS|FxiOS|EdgiOS|OPiOS/i.test(u) || isInApp()); }
function pushOK(){ return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window; }
window.addEventListener('beforeinstallprompt',function(e){ e.preventDefault(); ST.bip=e; });
window.addEventListener('appinstalled',function(){ ST.bip=null; toast('App instalado! 🎉'); });
function installCard(){
  if(isStandalone()||MOCK&&/instalado=1/.test(location.search)) return '';
  return '<div class="installcard"><div class="row"><img src="/icons/icon-192.png" alt="" width="52" height="52" style="border-radius:14px"><div class="grow"><b>Instale o app no celular</b><span class="small">Abre direto pelo ícone ∑, em tela cheia, e recebe os lembretes da sequência 🔥</span></div></div><button class="btn gold block" style="margin-top:10px" data-a="instalar">📲 Instalar agora</button></div>';
}
function installNudge(){ if(isStandalone()) return; var k='inst-nudge', last=0; try{ last=+localStorage.getItem(k)||0; }catch(e){} if(Date.now()-last<2*86400000) return; try{ localStorage.setItem(k,Date.now()); }catch(e){} A.instalar(); }
A.instalar=async function(){
  if(ST.bip){ ST.bip.prompt(); try{ await ST.bip.userChoice; }catch(e){} ST.bip=null; return; }
  var step=function(n,html){ return '<div class="istep"><span class="inum">'+n+'</span><div>'+html+'</div></div>'; };
  var body;
  if(isIOS()){
    if(isIOSnotSafari()) body='<div class="err" style="margin-top:0">No iPhone o app só pode ser instalado pelo <b>Safari</b>.</div>'+step(1,'Toque em <b>⋯</b> ou no menu deste navegador e escolha <b>“Abrir no Safari”</b>.<br><span class="small muted">Ou copie o endereço e cole no Safari.</span>')+'<button class="btn block" style="margin-top:8px" data-a="copiarLink">Copiar endereço</button>'+step(2,'No Safari, toque em Instalar de novo e siga os passos.');
    else body='<p style="margin-top:0">Leva 10 segundos e deixa o app na tela de início do iPhone, com notificações dos lembretes. 📲</p>'+
      step(1,'Toque no botão <b>Compartilhar</b> '+'<span class="kbd">'+ic('share','#007AFF',20)+'</span> na barra do Safari (embaixo no iPhone, em cima no iPad).')+
      step(2,'Role a lista para baixo e toque em <b>“Adicionar à Tela de Início”</b> <span class="kbd">'+ic('plusq','#1C1C1E',20)+'</span>.')+
      step(3,'Toque em <b>“Adicionar”</b>, no canto de cima.')+
      step(4,'Feche o Safari e abra o app pelo ícone <img src="/icons/icon-192.png" alt="" width="22" height="22" style="vertical-align:middle;border-radius:6px"> na tela de início. Lá dentro, ative os <b>lembretes</b>.')+
      '<div class="arrowhint" aria-hidden="true">⬇</div><p class="small muted">Precisa do iOS 16.4 ou mais novo para receber notificações.</p>';
  } else {
    body='<p style="margin-top:0">Deixe o app na tela inicial do celular, abrindo em tela cheia e com notificações. 📲</p>'+
      step(1,'Toque no menu <b>⋮</b> do Chrome (canto de cima).')+step(2,'Toque em <b>“Instalar app”</b> ou <b>“Adicionar à tela inicial”</b>.')+step(3,'Confirme em <b>Instalar</b> e abra pelo ícone ∑.');
  }
  sheet('📲 Instalar o app',body,'<button class="btn ghost block" data-a="fecharSheet">Agora não</button>');
};
A.copiarLink=async function(){ try{ await navigator.clipboard.writeText(location.origin); toast('Endereço copiado! Cole no Safari.'); }catch(e){ toast(location.origin); } };
function pushStatus(){ if(!pushOK()) return isIOS()&&!isStandalone()?'instalar':'sem'; return Notification.permission; }
function pushCard(force){
  var st=pushStatus(); if(st==='granted'||st==='sem') return '';
  if(st==='instalar') return force?'<div class="card" style="margin-top:12px"><b>🔔 Lembretes no iPhone</b><p class="small" style="margin:6px 0 10px">Para receber o aviso antes de perder a sequência, instale o app na tela de início primeiro.</p><button class="btn gold block" data-a="instalar">Ver como instalar</button></div>':'';
  if(st==='denied') return force?'<div class="card" style="margin-top:12px"><b>🔕 Notificações bloqueadas</b><p class="small" style="margin:6px 0 0">Libere nas configurações do celular: Ajustes → Notificações → Mat Academy.</p></div>':'';
  return '<div class="card pushcard" style="margin-top:12px"><b>🔔 Ative os lembretes</b><p class="small" style="margin:6px 0 10px">Avisamos antes de você perder a sequência, quando chegar lista nova e quando o professor responder.</p><button class="btn primary block" data-a="ativarPush">Ativar notificações</button></div>';
}
function pushBtn(){ var st=pushStatus(); if(st==='granted') return '<div class="okmsg" style="margin:0">🔔 Notificações ativadas neste aparelho</div>'; if(st==='sem') return ''; return '<button class="btn ghost block" data-a="'+(st==='instalar'?'instalar':'ativarPush')+'">🔔 Ativar notificações</button>'; }
function b64u(s){ var p='='.repeat((4-s.length%4)%4), b=(s+p).replace(/-/g,'+').replace(/_/g,'/'), raw=atob(b), out=new Uint8Array(raw.length); for(var i=0;i<raw.length;i++) out[i]=raw.charCodeAt(i); return out; }
A.ativarPush=async function(el){
  if(!pushOK()) return A.instalar(); if(el) el.disabled=true;
  try{ var perm=await Notification.requestPermission(); if(perm!=='granted'){ toast('Notificações não foram permitidas.'); render(); return; }
    var reg=await navigator.serviceWorker.ready; var k=await fetch('/api/push').then(function(r){return r.json();});
    var sub=await reg.pushManager.getSubscription() || await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:b64u(k.publicKey)});
    await DB.ups('push_subs',{user_id:ST.me.id,endpoint:sub.endpoint,sub:sub.toJSON()},'endpoint');
    toast('Lembretes ativados! 🔔'); render(); }
  catch(e){ toast('Não consegui ativar: '+erroMsg(e)); if(el) el.disabled=false; } };

/* ================= TESTE DE NIVELAMENTO ================= */
function diagTopics(ano){ var i=ANOS.indexOf(ano); if(i<0) i=0; var anos=[ANOS[i]]; if(i>0) anos.unshift(ANOS[i-1]); var ts=TOPICS.filter(function(t){return anos.indexOf(t.ano)>=0;}); if(ts.length<=14) return ts; var out=[]; for(var k=0;k<14;k++) out.push(ts[Math.floor(k*ts.length/14)]); return out; }
function vDiag(){
  var d=ST.diag;
  if(!d||d.fim===undefined&&!d.qs){ ST.diag=d={inicio:true}; }
  if(d.inicio){
    var n=diagTopics(ST.me.ano).length;
    page({title:'Teste de nivelamento',nav:'',body:'<div class="hero" style="text-align:center"><div style="font-size:52px">🎯</div><h1>Vamos ver o que você já sabe?</h1><p>'+n+' perguntas rápidas de múltipla escolha · uns 10 minutos</p></div><div class="card" style="margin-top:12px"><ul style="margin:0;padding-left:20px"><li>Não vale nota. Se não souber, toque em <b>“Não sei”</b>.</li><li>No final você vê o que já domina e o que precisa reforçar.</li><li>O professor usa o resultado para montar seu plano.</li></ul></div><button class="btn gold block" style="margin-top:14px" data-a="diagIni">Começar o teste</button><button class="btn ghost block" style="margin-top:10px" data-a="diagPular">Pular por agora</button><p class="small muted" style="text-align:center">Dá para fazer depois em Perfil → Refazer teste de nivelamento.</p>'}); return;
  }
  if(d.fim){ return diagFim(); }
  var q=d.qs[d.i], tot=d.qs.length, resp=d.res[q.t.id];
  var h='<div class="row" style="justify-content:space-between"><span class="qnum">PERGUNTA '+(d.i+1)+' DE '+tot+'</span><button class="btn sm ghost" data-a="diagPular">Pular teste</button></div><div class="progress"><i style="width:'+((d.i+1)/tot*100)+'%"></i></div><span class="badge gray">'+q.t.ano+' · '+q.t.nome+'</span><div class="qtext" style="margin-top:10px">'+q.g.q+'</div>';
  h+='<div class="stack" style="margin-top:14px">'+q.opts.map(function(o,k){ var cls='btn ghost block opt'; if(resp!==undefined){ if(o===q.g.a) cls='btn block opt on-ok'; else if(d.pick===k) cls='btn block opt on-bad'; } return '<button class="'+cls+'" style="justify-content:flex-start;text-align:left" data-a="diagResp" data-v="'+k+'"'+(resp!==undefined?' disabled':'')+'><b style="margin-right:6px">'+'ABCD'[k]+')</b> <span>'+o+'</span></button>'; }).join('')+'<button class="btn ghost block" data-a="diagResp" data-v="-1"'+(resp!==undefined?' disabled':'')+'>🤷 Não sei</button></div>';
  if(resp!==undefined) h+='<div class="'+(resp?'okmsg':'err')+'">'+(resp?'Acertou! ✅':'Tudo bem, isso vai para o seu plano de reforço.')+'</div><button class="btn primary block" style="margin-top:12px" data-a="diagProx">'+(d.i===tot-1?'Ver resultado':'Próxima →')+'</button>';
  page({title:'Teste de nivelamento',nav:'',body:h});
}
A.diagIni=function(){ var ts=diagTopics(ST.me.ano); ST.diag={i:0,res:{},qs:ts.map(function(t){ var g=getList(t.id,7)[0]; return {t:t,g:g,opts:quizOpts(t.id,7,0,g)}; })}; vDiag(); };
A.diagResp=function(el){ var d=ST.diag, q=d.qs[d.i], k=+el.dataset.v; d.pick=k; d.res[q.t.id]=k>=0&&q.opts[k]===q.g.a; vDiag(); };
A.diagProx=function(){ var d=ST.diag; d.pick=null; if(d.i<d.qs.length-1){ d.i++; vDiag(); window.scrollTo(0,0); } else { d.fim=true; diagSalvar(); } };
A.diagPular=async function(){ if(ST.diag&&ST.diag.qs&&!confirmar('Sair do teste? Você pode fazer depois pelo seu perfil.')) return; await salvarDiag({pulado:true,em:new Date().toISOString()}); ST.diag=null; location.hash='#/inicio'; setTimeout(installNudge,800); };
async function salvarDiag(obj){ ST.me.diagnostico=obj; if(MOCK) return; try{ var r=await ST.sb.rpc('salvar_diagnostico',{d:obj}); if(r.error) throw r.error; }catch(e){ toast('Não salvou o teste: '+erroMsg(e)); } }
async function diagSalvar(){ var d=ST.diag, ac=0; for(var id in d.res){ if(d.res[id]){ ac++; var p=Object.assign({},(ST.prog[id]&&ST.prog[id].acertos)||{}); p['diag']=true; await saveProg(id,{acertos:p}); } }
  d.nota=Math.round(ac/d.qs.length*100); await salvarDiag({em:new Date().toISOString(),nota:d.nota,resultados:d.res}); await addXP(20); diagFim(); }
function diagFim(){ var d=ST.diag, ok=[], ruim=[]; d.qs.forEach(function(q){ (d.res[q.t.id]?ok:ruim).push(q.t); });
  var h='<div class="hero" style="text-align:center"><div style="font-size:48px">'+(d.nota>=70?'🏆':d.nota>=40?'💪':'🌱')+'</div><h1>'+d.nota+'% de acerto</h1><p>'+ok.length+' de '+d.qs.length+' assuntos já dominados</p></div>';
  h+='<h2>✅ Você já sabe</h2>'+(ok.length?'<div class="stack">'+ok.map(function(t){return '<div class="item"><div class="grow"><b>'+t.nome+'</b><span class="small muted">'+t.ano+'</span></div><span class="badge ok">ok</span></div>';}).join('')+'</div>':'<p class="muted">Ainda nenhum — é para isso que estamos aqui! 💪</p>');
  h+='<h2>📌 Precisa reforçar</h2>'+(ruim.length?'<div class="stack">'+ruim.map(function(t){return '<a class="item" style="text-decoration:none" href="#/assunto/'+t.id+'"><div class="grow"><b>'+t.nome+'</b><span class="small muted">'+t.ano+'</span></div><span class="badge bad">reforçar</span></a>';}).join('')+'</div><button class="btn gold block" style="margin-top:12px" data-a="diagPlano">Criar meu plano com esses assuntos</button>':'<p class="muted">Nada! Mandou muito bem. 🎉</p>');
  h+='<a class="btn primary block" style="margin-top:12px" href="#/inicio">Ir para o início</a>';
  page({title:'Resultado do nivelamento',nav:'',body:h}); }
A.diagPlano=async function(el){ var d=ST.diag; var ruim=d.qs.filter(function(q){return !d.res[q.t.id];}); el.disabled=true;
  var rows=ruim.map(function(q,k){ var x=hoje(); x.setDate(x.getDate()+k*2); return {student_id:ST.me.id,topic_id:q.t.id,titulo:'Reforçar: '+q.t.nome,data:isoDate(x),feito:false,criado_por:ST.me.id}; });
  try{ await DB.ins('plan_items',rows); toast(rows.length+' tarefas no seu plano'); ST.diag=null; location.hash='#/plano'; }catch(e){ toast(erroMsg(e)); el.disabled=false; } };
function diagResumo(a){ var g=a.diagnostico; if(!g) return '<div class="card" style="margin-bottom:10px"><b>Nivelamento:</b> <span class="muted">ainda não fez</span></div>'; if(g.pulado) return '<div class="card" style="margin-bottom:10px"><b>Nivelamento:</b> <span class="muted">pulou o teste</span></div>';
  var r=g.resultados||{}, ok=[], ruim=[]; Object.keys(r).forEach(function(id){ if(TBY[id]) (r[id]?ok:ruim).push(TBY[id].nome); });
  return '<div class="card" style="margin-bottom:10px"><b>Nivelamento: '+(g.nota||0)+'% de acerto</b> <span class="small muted">('+fmtData(g.em)+')</span>'+(ruim.length?'<p class="small" style="margin:6px 0 0"><b>Reforçar:</b> '+ruim.join(', ')+'</p>':'')+(ok.length?'<p class="small muted" style="margin:4px 0 0"><b>Já sabe:</b> '+ok.join(', ')+'</p>':'')+'</div>'; }

/* ================= RELATÓRIO PARA OS PAIS ================= */
async function vRelatorio(id){
  await getAlunos(); var a=(ALUNOS||[]).filter(function(x){return x.id===id;})[0]; if(!a){ location.hash='#/alunos'; return; }
  loading('Relatório',''); var per=ST.relPer||30; var desde=diaBR(-(per-1));
  var prog=await loadProg(id), ativ=await loadAtiv(id), asg=await DB.q('assignments',{eq:{student_id:id},order:['created_at',false]}), notes=await DB.q('notes',{eq:{student_id:id,dificuldade:true},order:['created_at',false]});
  var s=streakInfo(ativ,a.meta_xp||20); var diasEst=Object.keys(ativ).filter(function(d){return d>=desde&&ativ[d]>0;}).length; var xpPer=Object.keys(ativ).filter(function(d){return d>=desde;}).reduce(function(t,d){return t+ativ[d];},0);
  var ps=Object.values(prog).filter(function(p){return TBY[p.topic_id];}).sort(function(x,y){return y.pct-x.pct;});
  var corr=asg.filter(function(l){return l.status==='corrigida'&&(l.corrigida_em||'').slice(0,10)>=desde;}); var media=corr.filter(function(l){return l.nota!=null;}); var med=media.length?Math.round(media.reduce(function(t,l){return t+ +l.nota;},0)/media.length*10)/10:null;
  var pend=asg.filter(function(l){return l.status==='enviada';});
  var nts=notes.filter(function(n){return (n.created_at||'').slice(0,10)>=desde;});
  var com=''; try{ com=localStorage.getItem('rel-com-'+id)||''; }catch(e){}
  var hoje_=fmtData(diaBR(0)), de=fmtData(desde);
  var h='<div class="noprint row wrap" style="justify-content:space-between"><div class="seg">'+[[7,'7 dias'],[30,'30 dias'],[90,'3 meses']].map(function(p){return '<button class="'+(per===p[0]?'on':'')+'" data-a="relPer" data-v="'+p[0]+'" data-id="'+id+'">'+p[1]+'</button>';}).join('')+'</div></div>';
  h+='<div class="report" id="report"><div class="reporthead"><div class="logo" style="width:44px;height:44px;border-radius:12px;background:var(--accent);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:24px;color:var(--navy)">∑</div><div><b style="font-size:19px">Relatório de Matemática</b><div class="small muted">'+esc(a.nome)+' · '+esc(a.ano||'')+' · '+de+' a '+hoje_+'</div></div></div>';
  h+='<div class="stats" style="margin-top:12px"><div class="stat"><b>'+diasEst+'</b><span>dias estudando</span></div><div class="stat"><b>🔥 '+s.seq+'</b><span>sequência atual (recorde '+s.recorde+')</span></div><div class="stat"><b>'+xpPer+'</b><span>XP no período</span></div><div class="stat"><b>'+(med==null?'—':String(med).replace('.',','))+'</b><span>média nas listas ('+corr.length+')</span></div></div>';
  if(a.diagnostico&&a.diagnostico.nota!=null) h+='<p class="small" style="margin:10px 0 0"><b>Nivelamento inicial:</b> '+a.diagnostico.nota+'% de acerto ('+fmtData(a.diagnostico.em)+').</p>';
  h+='<h3>Andamento por assunto</h3>'+(ps.length?'<div class="stack">'+ps.map(function(p){var t=TBY[p.topic_id];return '<div class="reprow"><div class="grow"><b>'+t.nome+'</b><div style="margin-top:4px">'+ruler(p.pct)+'</div></div><b style="color:'+pctColor(p.pct)+';min-width:44px;text-align:right">'+p.pct+'%</b></div>';}).join('')+'</div>':'<p class="muted">Ainda não começou nenhum assunto.</p>');
  h+='<h3>Listas</h3>'+(corr.length?'<div class="stack">'+corr.map(function(l){return '<div class="reprow"><div class="grow">'+esc(l.titulo)+'</div><b>'+(l.nota==null?'—':String(l.nota).replace('.',','))+'</b></div>';}).join('')+'</div>':'<p class="muted small">Nenhuma lista corrigida no período.</p>')+(pend.length?'<p class="small" style="color:var(--bad);font-weight:700">'+pend.length+' lista(s) ainda não entregue(s).</p>':'');
  h+='<h3>Dificuldades que o aluno anotou</h3>'+(nts.length?'<ul>'+nts.map(function(n){return '<li>'+(n.topic_id&&TBY[n.topic_id]?'<b>'+TBY[n.topic_id].nome+':</b> ':'')+esc(n.texto)+'</li>';}).join('')+'</ul>':'<p class="muted small">Nenhuma anotada no período.</p>');
  h+='<h3>Comentário do professor</h3><textarea id="relcom" class="noprint" placeholder="Ex.: Maria evoluiu muito em frações; vamos focar em equações nas próximas aulas.">'+esc(com)+'</textarea><div class="printonly" id="relcomp">'+nl2br(com)+'</div><p class="small muted" style="margin-top:14px">Professor '+esc(ST.me.nome)+' · Aulas particulares de Matemática</p></div>';
  h+='<div class="noprint stack" style="margin-top:14px"><label for="relw" style="margin:0">WhatsApp do responsável</label><input id="relw" inputmode="tel" placeholder="(81) 9 9999-9999" value="'+esc(a.responsavel_whatsapp||'')+'"><button class="btn wa block" data-a="relWa" data-id="'+id+'">'+ic('wa','#fff',20)+' Enviar resumo no WhatsApp</button><button class="btn primary block" data-a="imprimir">Imprimir / salvar em PDF</button></div>';
  page({title:'Relatório · '+esc(primeiroNome(a.nome)),back:true,nav:'alunos',body:h});
  var ta=document.getElementById('relcom'); ta.addEventListener('input',function(){ try{ localStorage.setItem('rel-com-'+id,ta.value); }catch(e){} document.getElementById('relcomp').innerHTML=nl2br(ta.value); });
  ST.rel={a:a,s:s,diasEst:diasEst,ps:ps,corr:corr,med:med,pend:pend,nts:nts,de:de,ate:hoje_};
}
A.relPer=function(el){ ST.relPer=+el.dataset.v; vRelatorio(el.dataset.id); };
function waNum(v){ var d=String(v||'').replace(/\D/g,''); if(!d) return ''; if(d.length<=11) d='55'+d; return d; }
A.relWa=async function(el){ var r=ST.rel, a=r.a, w=document.getElementById('relw').value.trim(), com=document.getElementById('relcom').value.trim();
  if(w!==(a.responsavel_whatsapp||'')){ try{ await DB.upd('profiles',{id:a.id},{responsavel_whatsapp:w||null}); a.responsavel_whatsapp=w; }catch(e){} }
  var t='📊 *Relatório de Matemática*\n'+a.nome+' — '+(a.ano||'')+'\nPeríodo: '+r.de+' a '+r.ate+'\n\n✅ Dias estudando: '+r.diasEst+'\n🔥 Sequência atual: '+r.s.seq+' dia(s) (recorde '+r.s.recorde+')\n';
  if(r.corr.length) t+='📝 Listas corrigidas: '+r.corr.length+(r.med!=null?' · média '+String(r.med).replace('.',','):'')+'\n';
  if(r.pend.length) t+='⏳ Listas pendentes: '+r.pend.length+'\n';
  if(r.ps.length) t+='\n📚 *Assuntos*\n'+r.ps.slice(0,8).map(function(p){return '• '+TBY[p.topic_id].nome+': '+p.pct+'%';}).join('\n')+'\n';
  if(r.nts.length) t+='\n⚠️ *Dificuldades anotadas*\n'+r.nts.slice(0,4).map(function(n){return '• '+(n.topic_id&&TBY[n.topic_id]?TBY[n.topic_id].nome+': ':'')+n.texto;}).join('\n')+'\n';
  if(com) t+='\n💬 *Comentário do professor*\n'+com+'\n';
  t+='\n— Prof. '+ST.me.nome;
  window.open('https://wa.me/'+waNum(w)+'?text='+encodeURIComponent(t),'_blank'); };
FORMS.resp=async function(f){ try{ await DB.upd('profiles',{id:f.dataset.id},{responsavel_whatsapp:f.w.value.trim()||null}); await getAlunos(true); toast('Salvo'); }catch(e){ toast(erroMsg(e)); } };

/* ================= AGENDA DO PROFESSOR ================= */
var DIAS=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
async function vAgendaProf(){
  loading('Agenda',''); var L=await DB.q('horarios',{order:['hora',true]}); var por={}; L.forEach(function(x){ (por[x.dia]=por[x.dia]||[]).push(x); });
  var livres=L.filter(function(x){return !x.ocupado;}).length;
  var h='<div class="card"><b>'+livres+' horário(s) livre(s)</b> de '+L.length+'. <span class="small muted">Os alunos e pais veem isso na agenda pública (o nome no campo de observação fica só para você).</span><div class="grid" style="margin-top:10px"><a class="btn ghost" href="https://agenda-aulas-neon.vercel.app" target="_blank" rel="noopener">Ver agenda pública ↗</a><button class="btn primary" data-a="novoHorario">+ Novo horário</button></div></div>';
  [1,2,3,4,5,6,0].forEach(function(d){ var hs=por[d]; if(!hs) return; h+='<h2>'+DIAS[d]+'</h2><div class="stack">'+hs.map(function(x){ return '<div class="item" style="align-items:center"><b style="min-width:58px;font-size:18px">'+esc(x.hora)+'</b><div class="grow"><button class="btn sm '+(x.ocupado?'danger':'gold')+'" data-a="toggleHora" data-id="'+x.id+'" data-v="'+(x.ocupado?1:0)+'">'+(x.ocupado?'Ocupado':'Livre')+'</button><input class="obs" data-obs="'+x.id+'" placeholder="Obs. (ex.: nome do aluno)" value="'+esc(x.obs||'')+'" style="margin-top:6px;padding:8px 10px"></div><button class="btn sm ghost" data-a="delHora" data-id="'+x.id+'" aria-label="Apagar horário">✕</button></div>'; }).join('')+'</div>'; });
  page({title:'Minha agenda',back:true,nav:'painel',body:h});
  $app.querySelectorAll('[data-obs]').forEach(function(i){ i.addEventListener('change',async function(){ try{ await DB.upd('horarios',{id:+i.dataset.obs},{obs:i.value.trim()||null}); toast('Salvo'); }catch(e){ toast(erroMsg(e)); } }); });
}
A.toggleHora=async function(el){ var oc=el.dataset.v!=='1'; try{ await DB.upd('horarios',{id:+el.dataset.id},{ocupado:oc}); vAgendaProf(); }catch(e){ toast(erroMsg(e)); } };
A.delHora=async function(el){ if(!confirmar('Apagar este horário?')) return; await DB.del('horarios',{id:+el.dataset.id}); vAgendaProf(); };
A.novoHorario=function(){ sheet('Novo horário','<form id="fh" data-form="horario"><label for="hd" style="margin-top:0">Dia</label><select id="hd" name="d">'+[1,2,3,4,5,6,0].map(function(d){return '<option value="'+d+'">'+DIAS[d]+'</option>';}).join('')+'</select><label for="hh">Hora de início (aula de 1 h)</label><input id="hh" name="h" type="time" required value="18:00"><label class="row" style="font-weight:600;gap:10px;margin-top:12px"><input type="checkbox" name="o" style="width:22px;height:22px"> Já está ocupado</label></form>','<button class="btn primary block" form="fh">Adicionar</button>'); };
FORMS.horario=async function(f){ try{ await DB.ins('horarios',{dia:+f.d.value,hora:f.h.value,ocupado:f.o.checked}); closeSheet(); vAgendaProf(); }catch(e){ toast(erroMsg(e)); } };

/* ================= ROTEADOR ================= */
async function render(){
  if(!ST.me) return; if(!ST.keepSheet) closeSheet(); ST.keepSheet=false;
  var p=location.hash.replace(/^#\/?/,'').split('/'); var r=p[0]||(isProf()?'painel':'inicio'); if(r!=='diagnostico') ST.diag=null;
  try{
    if(isProf()){
      if(r==='painel') return await vPainel(); if(r==='alunos') return await vAlunos(); if(r==='aluno') return await vAluno(p[1],p[2]);
      if(r==='p-listas') return await vPListas(); if(r==='nova-lista'){ if(!ST.nl||ST.nl.reset||p[1]) ST.nl=null; return await vNovaLista(p[1]); }
      if(r==='corrigir'||r==='ver-lista') return await vCorrigir(p[1]); if(r==='p-duvidas') return await vPDuvidas();
      if(r==='conteudo'||r==='assuntos') return vAssuntos(); if(r==='assunto') return await vAssunto(p[1],p[2]); if(r==='meu-perfil') return vMeuPerfil(); if(r==='materiais') return await vMateriais(); if(r==='financeiro') return await vFinProf();
      if(r==='avisos') return await vAvisos(); if(r==='relatorio') return await vRelatorio(p[1]); if(r==='agenda-prof') return await vAgendaProf();
      location.hash='#/painel'; return;
    }
    if(r==='inicio') return await vInicio(); if(r==='assuntos') return vAssuntos(); if(r==='assunto') return await vAssunto(p[1],p[2]);
    if(r==='plano') return await vPlano(); if(r==='listas') return await vListas(); if(r==='lista') return await vLista(p[1]);
    if(r==='duvidas') return await vDuvidas(); if(r==='perfil') return await vPerfil(); if(r==='materiais') return await vMateriais(); if(r==='financeiro') return await vFinAluno();
    if(r==='sequencia') return vSequencia(); if(r==='avisos') return await vAvisos(); if(r==='diagnostico') return vDiag();
    location.hash='#/inicio';
  }catch(e){ console.error(e); page({title:'Ops',nav:'',body:'<div class="err">'+esc(erroMsg(e))+'</div><button class="btn block" style="margin-top:12px" data-a="recarregar">Tentar de novo</button>'}); }
}
A.recarregar=function(){ render(); };
window.addEventListener('hashchange',function(){ render(); window.scrollTo(0,0); });

/* ---------- eventos delegados ---------- */
document.addEventListener('click',function(e){ var el=e.target.closest('[data-a]'); if(!el) return; var fn=A[el.dataset.a]; if(!fn) return; if(el.tagName==='A') e.preventDefault(); fn(el,e); });
document.addEventListener('submit',function(e){ var f=e.target; if(!f.dataset||!f.dataset.form) return; e.preventDefault(); var fn=FORMS[f.dataset.form]; if(fn) fn(f); });
document.addEventListener('change',function(e){ var el=e.target; if(el.dataset&&el.dataset.change&&CHANGE[el.dataset.change]) CHANGE[el.dataset.change](el); });
document.addEventListener('keydown',function(e){ if(e.key==='Escape') closeSheet(); if(e.key==='Enter'&&!e.shiftKey&&e.target.form&&e.target.form.dataset.form==='ia'&&window.innerWidth>700){ e.preventDefault(); FORMS.ia(e.target.form); } });

/* ---------- início ---------- */
async function boot(){
  try{ if('serviceWorker' in navigator && !MOCK) navigator.serviceWorker.register('/sw.js'); }catch(e){}
  if(MOCK){ ST.cfg={dominio:'alunos.matematica.app'}; ST.me=mockInit(MOCK[1]); return afterLogin(); }
  try{ ST.cfg=await fetch('/api/config').then(function(r){return r.json();}); }catch(e){ return screenMsg('Sem conexão','<p>Não consegui falar com o servidor. Verifique a internet e recarregue a página.</p>'); }
  if(ST.cfg.faltando&&ST.cfg.faltando.length) return screenConfig(ST.cfg.faltando);
  ST.sb=window.supabase.createClient(ST.cfg.url,ST.cfg.anon,{db:{schema:'academy'},auth:{persistSession:true,autoRefreshToken:true}});
  var s=(await ST.sb.auth.getSession()).data.session;
  if(s) return afterLogin();
  try{ var st=await fetch('/api/setup').then(function(r){return r.json();}); if(st.precisaSetup) return screenSetup(); }catch(e){}
  screenLogin();
}
boot();
})();
