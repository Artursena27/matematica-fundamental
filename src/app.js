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
    profiles:[{id:'p1',role:'professor',nome:'Artur Sena',username:null,ano:null},{id:'a1',role:'aluno',nome:'Maria Clara Souza',username:'mariaclara',ano:'8º ano'},{id:'a2',role:'aluno',nome:'João Pedro Lima',username:'joaopedro',ano:'7º ano'}],
    progress:[{student_id:'a1',topic_id:'fracoes',teoria:true,acertos:{},pct:90,updated_at:now},{student_id:'a1',topic_id:'equacao-1-grau',teoria:true,acertos:{},pct:45,updated_at:now},{student_id:'a1',topic_id:'mmc',teoria:false,acertos:{},pct:15,updated_at:now},{student_id:'a1',topic_id:'pitagoras',teoria:true,acertos:{},pct:68,updated_at:now}],
    notes:[{id:1,student_id:'a1',topic_id:'equacao-1-grau',texto:'Não entendo quando o número negativo passa dividindo.',dificuldade:true,created_at:now}],
    plan_items:[{id:2,student_id:'a1',topic_id:'equacao-1-grau',titulo:'Terminar exercícios de equação',data:d(1),feito:false},{id:3,student_id:'a1',topic_id:'pitagoras',titulo:'Revisar Pitágoras para a prova',data:d(-1),feito:false},{id:4,student_id:'a1',topic_id:null,titulo:'Levar caderno na aula',data:null,feito:true}],
    exercises:[{id:5,topic_id:'fracoes',q:'Uma pizza foi dividida em 8 fatias e comi 3. Que fração comi?',a:'3/8',s:'São 8 partes iguais.\nComi 3 delas.',criado_por:'p1'}],
    assignments:[{id:6,student_id:'a1',titulo:'Lista de frações',topic_id:'fracoes',itens:getList('fracoes',0).slice(0,3),prazo:d(3),status:'enviada',respostas:null,correcao:null,nota:null,feedback:null,created_at:now},{id:7,student_id:'a1',titulo:'MMC — revisão',topic_id:'mmc',itens:getList('mmc',0).slice(0,2),prazo:d(-2),status:'entregue',respostas:['30','12'],correcao:null,nota:null,feedback:null,created_at:now,entregue_em:now}],
    doubts:[{id:8,student_id:'a1',topic_id:'pitagoras',texto:'Na questão da escada, por que a escada é a hipotenusa?',imagem:null,status:'aberta',resposta:null,created_at:now}]
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
    '<button class="avatar" data-a="perfil" aria-label="Meu perfil">'+esc(iniciais(ST.me.nome))+'</button></header>';
  $app.innerHTML=top+'<main id="main"'+(o.fab?' class="has-fab"':'')+'>'+o.body+'</main>'+(o.fab||'')+navHTML(o.nav);
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
  if(!isProf()) ST.prog=await loadProg(ST.me.id);
  await refreshBadges();
  if(!location.hash || location.hash==='#/' ) location.hash = isProf()?'#/painel':'#/inicio'; else render();
}
async function refreshBadges(){
  try{ var b={};
    if(isProf()){ b['p-listas']=(await DB.q('assignments',{eq:{status:'entregue'},select:'id'})).length||0; b['p-duvidas']=(await DB.q('doubts',{eq:{status:'aberta'},select:'id'})).length||0; }
    else { b['listas']=(await DB.q('assignments',{eq:{student_id:ST.me.id,status:'enviada'},select:'id'})).length||0; }
    ST.badges=b; }catch(e){ ST.badges={}; }
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
  var h='<div class="hero"><h1>Olá, '+esc(primeiroNome(me.nome))+'! 👋</h1><p>'+esc(me.ano||'')+' · seu progresso no ano</p><div style="margin-top:12px;display:flex;align-items:center;gap:10px"><div style="flex:1">'+ruler(media,true)+'</div><b style="font-size:22px">'+media+'%</b></div></div>';
  if(cont){ var t=TBY[cont.topic_id]; h+='<h2>Continuar de onde parei</h2>'+topicCard(t,cont.pct); }
  h+='<h2>Listas para fazer</h2>'+(pend.length?'<div class="stack">'+pend.map(asgItem).join('')+'</div>':'<p class="muted">Nenhuma lista pendente. 🎉</p>');
  var atras=plan.filter(function(p){return p.data && new Date(p.data+'T12:00')<hoje();});
  h+='<h2>Próximas tarefas</h2>'+(plan.length?'<div class="stack">'+plan.slice(0,4).map(planItem).join('')+'</div>'+(atras.length?'<p class="small" style="color:var(--bad);font-weight:700">'+atras.length+' tarefa(s) atrasada(s)</p>':''):'<p class="muted">Sem tarefas. Monte seu plano na aba <a href="#/plano">Plano</a>.</p>');
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
  var q=ST.busca||'', anoSel=ST.anoSel||'Todos';
  var words=norm(q).split(/\s+/).filter(Boolean);
  var L=TOPICS.filter(function(t){ if(anoSel!=='Todos'&&t.ano!==anoSel) return false; var hay=norm(t.nome+' '+t.tags+' '+t.area+' '+t.ano); return words.every(function(w){return hay.indexOf(w)>=0;}); });
  var prof=isProf();
  var h='<div class="search">'+ic('search','#55627F',20)+'<input id="busca" type="search" placeholder="Pesquisar assunto: frações, MMC, Pitágoras…" value="'+esc(q)+'" aria-label="Pesquisar assunto" autocomplete="off"></div>'+
    '<div class="chips" style="margin-top:10px" role="group" aria-label="Filtrar por ano">'+['Todos'].concat(ANOS).map(function(a){return '<button class="chip'+(a===anoSel?' on':'')+'" data-a="anoSel" data-v="'+a+'">'+a+'</button>';}).join('')+'</div>';
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
    tb.innerHTML='<div class="card teoria">'+t.teoria+'</div>'+(prof?'':'<div style="margin-top:12px"><button class="btn block '+(lido?'ghost':'gold')+'" data-a="lido" data-id="'+id+'">'+(lido?'✓ Teoria estudada (vale 20%)':'Marcar teoria como estudada (+20%)')+'</button></div>')+'<button class="btn primary block" style="margin-top:10px" data-a="tab" data-id="'+id+'" data-v="ex">Ir para os exercícios →</button>';
  } else if(tab==='ex'){ renderQuiz(id); }
  else if(tab==='notas'){ renderNotas(id); }
  else if(tab==='meus'){ renderMeusEx(id); }
}
A.tab=function(el){ ST.tab[el.dataset.id]=el.dataset.v; vAssunto(el.dataset.id,el.dataset.v); window.scrollTo(0,0); };
A.lido=async function(el){ var id=el.dataset.id; var cur=ST.prog[id]&&ST.prog[id].teoria; await saveProg(id,{teoria:!cur}); toast(cur?'Desmarcado':'Boa! +20% neste assunto'); vAssunto(id,'teoria'); };

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
  if(!isProf()){ var ac=Object.assign({},(ST.prog[id]&&ST.prog[id].acertos)||{}); var kk=s.seed+':'+s.idx; if(ac[kk]===undefined){ ac[kk]=ok; await saveProg(id,{acertos:ac}); } }
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
FORMS.nota=async function(f){ try{ await DB.ins('notes',{student_id:ST.me.id,topic_id:f.dataset.id,texto:f.t.value.trim(),dificuldade:f.d.checked}); toast('Anotação salva'); renderNotas(f.dataset.id); }catch(e){ toast(erroMsg(e)); } };
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
  try{ await DB.ins('doubts',{student_id:ST.me.id,topic_id:f.t.value||null,texto:f.x.value.trim(),imagem:ST.duvImg||null}); ST.duvImg=null; closeSheet(); toast('Dúvida enviada! O professor vai responder aqui.'); if(/#\/duvidas/.test(location.hash)) render(); }
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
  try{ await DB.upd('assignments',{id:id},{respostas:resp,status:'entregue',entregue_em:new Date().toISOString()}); try{ localStorage.removeItem('rasc-'+id); }catch(e){} toast('Lista entregue!'); await refreshBadges(); vLista(id); }catch(e){ toast(erroMsg(e)); } };

/* ----- Perfil do aluno ----- */
async function vPerfil(){
  var me=ST.me; var notes=await DB.q('notes',{eq:{student_id:me.id},order:['created_at',false]});
  var prog=Object.values(ST.prog).filter(function(p){return TBY[p.topic_id];});
  var conc=prog.filter(function(p){return p.pct>=90;}).length, media=prog.length?Math.round(prog.reduce(function(s,p){return s+p.pct;},0)/prog.length):0;
  var h='<div class="card row"><span class="avatar" style="width:56px;height:56px;font-size:20px">'+esc(iniciais(me.nome))+'</span><div class="grow"><b style="font-size:18px">'+esc(me.nome)+'</b><span class="muted small">@'+esc(me.username||'')+' · '+esc(me.ano||'')+'</span></div></div>';
  h+='<div class="stats" style="margin-top:12px"><div class="stat"><b>'+prog.length+'</b><span>assuntos iniciados</span></div><div class="stat"><b>'+conc+'</b><span>concluídos (≥ 90%)</span></div><div class="stat"><b>'+media+'%</b><span>média nos iniciados</span></div><div class="stat"><b>'+notes.length+'</b><span>anotações</span></div></div>';
  h+='<h2>Meu andamento</h2>'+(prog.length?'<div class="grid g3">'+prog.sort(function(a,b){return b.pct-a.pct;}).map(function(p){return topicCard(TBY[p.topic_id],p.pct);}).join('')+'</div>':'<p class="muted">Comece um assunto na aba Assuntos.</p>');
  h+='<h2>Minhas anotações</h2>'+(notes.length?'<div class="stack">'+notes.map(noteItem).join('')+'</div>':'<p class="muted">Nenhuma anotação.</p>');
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
  h+='<div class="grid" style="margin-top:12px"><button class="btn primary" data-a="novoAluno">+ Cadastrar aluno</button><a class="btn gold" href="#/nova-lista">+ Mandar lista</a></div>';
  h+='<h2>Listas para corrigir</h2>'+(asg.length?'<div class="stack">'+asg.slice(0,5).map(asgItem).join('')+'</div>':'<p class="muted">Nenhuma entrega pendente.</p>');
  h+='<h2>Dúvidas abertas</h2>'+(dv.length?'<div class="stack">'+dv.slice(0,3).map(doubtItem).join('')+'</div>':'<p class="muted">Nenhuma dúvida aberta.</p>');
  h+='<h2>O que os alunos acham difícil</h2>'+(nt.length?'<div class="stack">'+nt.map(noteItem).join('')+'</div>':'<p class="muted">Nenhuma anotação de dificuldade.</p>');
  page({title:'Painel do professor',nav:'painel',body:h});
}
async function vAlunos(){
  loading('Alunos','alunos'); var al=await getAlunos(true); var pr=await DB.q('progress',{select:'student_id,pct'});
  var med={}; pr.forEach(function(p){ (med[p.student_id]=med[p.student_id]||[]).push(p.pct); });
  var h='<button class="btn primary block" data-a="novoAluno">+ Cadastrar aluno</button>'+(al.length?'<div class="stack" style="margin-top:12px">'+al.map(function(a){ var m=med[a.id]||[]; var v=m.length?Math.round(m.reduce(function(s,x){return s+x;},0)/m.length):0; return '<a class="item" style="text-decoration:none" href="#/aluno/'+a.id+'"><span class="avatar">'+esc(iniciais(a.nome))+'</span><div class="grow"><b>'+esc(a.nome)+'</b><span class="small muted">@'+esc(a.username)+' · '+esc(a.ano||'')+' · '+m.length+' assunto(s)</span><div style="margin-top:6px">'+ruler(v)+'</div></div><b style="color:'+pctColor(v)+'">'+v+'%</b></a>'; }).join('')+'</div>':'<p class="empty">Nenhum aluno ainda. Cadastre o primeiro!</p>');
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
  var tabs=[['prog','Progresso'],['notas','Anotações'],['plano','Plano'],['listas','Listas'],['conta','Conta']];
  h+='<div class="chips" style="margin-top:12px">'+tabs.map(function(x){return '<button class="chip'+(tab===x[0]?' on':'')+'" data-a="alTab" data-id="'+id+'" data-v="'+x[0]+'">'+x[1]+'</button>';}).join('')+'</div><div id="alBody" style="margin-top:6px"></div>';
  page({title:esc(a.nome),sub:esc(a.ano||''),back:true,nav:'alunos',body:h});
  var b=document.getElementById('alBody'), x='';
  if(tab==='prog'){ x='<p class="small muted">'+ps.length+' assunto(s) iniciados.</p>'+(ps.length?'<div class="grid g3">'+ps.sort(function(p,q){return q.pct-p.pct;}).map(function(p){return topicCard(TBY[p.topic_id],p.pct,'#/assunto/'+p.topic_id);}).join('')+'</div>':'<p class="empty">Ainda não começou nenhum assunto.</p>')+'<h2>Assuntos do '+esc(a.ano||'ano')+' ainda não iniciados</h2><div class="stack">'+TOPICS.filter(function(t){return t.ano===a.ano&&!prog[t.id];}).map(function(t){return '<div class="item"><div class="grow"><b>'+t.nome+'</b></div><span class="badge bad">0%</span></div>';}).join('')+'</div>'; }
  else if(tab==='notas'){ var nn=await DB.q('notes',{eq:{student_id:id},order:['created_at',false]}); x=nn.length?'<div class="stack">'+nn.map(noteItem).join('')+'</div>':'<p class="empty">Nenhuma anotação.</p>'; }
  else if(tab==='plano'){ x=await vPlano(id,true); }
  else if(tab==='listas'){ var ls=await DB.q('assignments',{eq:{student_id:id},order:['created_at',false]}); ls.forEach(function(l){l._aluno=a.nome;}); x='<a class="btn gold block" href="#/nova-lista/'+id+'">+ Mandar lista para '+esc(primeiroNome(a.nome))+'</a>'+(ls.length?'<div class="stack" style="margin-top:12px">'+ls.map(asgItem).join('')+'</div>':'<p class="empty">Nenhuma lista enviada.</p>'); }
  else if(tab==='conta'){ x='<form class="card" data-form="senha" data-id="'+id+'"><label for="ns" style="margin-top:0">Nova senha para @'+esc(a.username)+'</label><input id="ns" name="s" minlength="6" required><button class="btn primary block" style="margin-top:10px">Trocar senha</button></form><button class="btn danger block" style="margin-top:16px" data-a="removerAluno" data-id="'+id+'">Remover aluno</button>'; }
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
  try{ await DB.ins('assignments',al.map(function(id){return {student_id:id,titulo:nl.titulo.trim(),topic_id:nl.topic||null,itens:itens,prazo:nl.prazo||null,status:'enviada'};})); toast('Lista enviada para '+al.length+' aluno(s)!'); ST.nl={reset:true}; location.hash='#/p-listas'; }
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
  var nota=document.getElementById('cn').value; try{ await DB.upd('assignments',{id:c.id},{correcao:c.cor,nota:nota===''?null:+nota,feedback:document.getElementById('cf').value.trim()||null,status:'corrigida',corrigida_em:new Date().toISOString()}); toast('Correção salva!'); await refreshBadges(); location.hash='#/p-listas'; }catch(e){ toast(erroMsg(e)); el.disabled=false; } };
A.delLista=async function(el){ if(!confirmar('Cancelar e apagar esta lista?')) return; await DB.del('assignments',{id:+el.dataset.id}); toast('Lista apagada'); location.hash='#/p-listas'; };
async function vPDuvidas(){
  loading('Dúvidas','p-duvidas'); await getAlunos(); var f=ST.dvf||'aberta'; var L=await DB.q('doubts',{eq:{status:f},order:['created_at',f==='aberta']}); L.forEach(function(d){d._aluno=nomeAluno(d.student_id);});
  var h='<div class="seg" role="group"><button class="'+(f==='aberta'?'on':'')+'" data-a="dvf" data-v="aberta">Abertas</button><button class="'+(f==='respondida'?'on':'')+'" data-a="dvf" data-v="respondida">Respondidas</button></div>'+(L.length?'<div class="stack" style="margin-top:12px">'+L.map(doubtItem).join('')+'</div>':'<p class="empty">Nenhuma dúvida aqui.</p>');
  page({title:'Dúvidas dos alunos',nav:'p-duvidas',body:h});
}
A.dvf=function(el){ ST.dvf=el.dataset.v; vPDuvidas(); };
FORMS.responder=async function(f){ try{ await DB.upd('doubts',{id:+f.dataset.id},{resposta:f.r.value.trim(),status:'respondida',respondida_em:new Date().toISOString()}); toast('Resposta enviada'); await refreshBadges(); render(); }catch(e){ toast(erroMsg(e)); } };
async function renderMeusEx(id){
  var tb=document.getElementById('tabBody'); var L=await DB.q('exercises',{eq:{topic_id:id},order:['created_at',false]});
  tb.innerHTML='<form class="card" data-form="exAdd" data-id="'+id+'"><label for="eq" style="margin-top:0">Enunciado</label><textarea id="eq" name="q" required></textarea><label for="ea">Resposta</label><input id="ea" name="a" required><label for="es">Passo a passo (um passo por linha)</label><textarea id="es" name="s"></textarea><button class="btn primary block" style="margin-top:10px">Adicionar exercício</button><p class="small muted" style="margin-bottom:0">Seus exercícios aparecem para todos os alunos no fim da Lista 1 deste assunto e podem ser mandados em listas.</p></form><h2>Meus exercícios ('+L.length+')</h2>'+(L.length?'<div class="stack">'+L.map(function(e){return '<div class="item"><div class="grow">'+nl2br(e.q)+'<div class="small muted">Resposta: '+esc(e.a)+'</div></div><button class="btn sm ghost" data-a="exDel" data-id="'+e.id+'" data-t="'+id+'">✕</button></div>';}).join('')+'</div>':'<p class="muted">Nenhum ainda.</p>');
}
FORMS.exAdd=async function(f){ try{ await DB.ins('exercises',{topic_id:f.dataset.id,q:f.q.value.trim(),a:f.a.value.trim(),s:f.s.value.trim()||null,criado_por:ST.me.id}); delete ST.exProf[f.dataset.id]; toast('Exercício adicionado'); renderMeusEx(f.dataset.id); }catch(e){ toast(erroMsg(e)); } };
A.exDel=async function(el){ if(!confirmar('Apagar este exercício?')) return; await DB.del('exercises',{id:+el.dataset.id}); delete ST.exProf[el.dataset.t]; renderMeusEx(el.dataset.t); };
function vMeuPerfil(){ page({title:'Minha conta',back:true,nav:'',body:'<div class="card row"><span class="avatar" style="width:56px;height:56px">'+esc(iniciais(ST.me.nome))+'</span><div class="grow"><b style="font-size:18px">'+esc(ST.me.nome)+'</b><span class="muted small">Professor</span></div></div><p class="small muted">Para os alunos entrarem: '+esc(location.origin)+'</p><button class="btn danger block" style="margin-top:16px" data-a="sair">Sair da conta</button>'}); }

/* ================= ROTEADOR ================= */
async function render(){
  if(!ST.me) return; if(!ST.keepSheet) closeSheet(); ST.keepSheet=false;
  var p=location.hash.replace(/^#\/?/,'').split('/'); var r=p[0]||(isProf()?'painel':'inicio');
  try{
    if(isProf()){
      if(r==='painel') return await vPainel(); if(r==='alunos') return await vAlunos(); if(r==='aluno') return await vAluno(p[1],p[2]);
      if(r==='p-listas') return await vPListas(); if(r==='nova-lista'){ if(!ST.nl||ST.nl.reset||p[1]) ST.nl=null; return await vNovaLista(p[1]); }
      if(r==='corrigir'||r==='ver-lista') return await vCorrigir(p[1]); if(r==='p-duvidas') return await vPDuvidas();
      if(r==='conteudo'||r==='assuntos') return vAssuntos(); if(r==='assunto') return await vAssunto(p[1],p[2]); if(r==='meu-perfil') return vMeuPerfil();
      location.hash='#/painel'; return;
    }
    if(r==='inicio') return await vInicio(); if(r==='assuntos') return vAssuntos(); if(r==='assunto') return await vAssunto(p[1],p[2]);
    if(r==='plano') return await vPlano(); if(r==='listas') return await vListas(); if(r==='lista') return await vLista(p[1]);
    if(r==='duvidas') return await vDuvidas(); if(r==='perfil') return await vPerfil();
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
