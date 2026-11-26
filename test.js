const fs=require('fs'),vm=require('vm');
const code=['core','t1','t1b','t2','t3','t3b','t4','teoria1','teoria2','teoria3','teoria4','teoria5','teoria6','didatica'].map(f=>fs.readFileSync('src/'+f+'.js','utf8')).join('\n')+'\nthis.TOPICS=TOPICS;this.lista=lista;';
const ctx={console};vm.createContext(ctx);vm.runInContext(code,ctx);
let bad=0;const ids={};
for(const t of ctx.TOPICS){ if(ids[t.id])console.log('DUP',t.id); ids[t.id]=1;
 for(let s=0;s<6;s++){ let L; try{L=ctx.lista(t,s);}catch(e){console.log('ERR',t.id,s,e.message);bad++;break;}
  if(L.length<20){console.log('SHORT',t.id,s,L.length);bad++;}
  for(const g of L){const txt=g.q+'|'+g.a+'|'+[].concat(g.s||'').join('|'); if(/NaN|undefined|Infinity|\[object|null/.test(txt)){console.log('BADTXT',t.id,txt.slice(0,300));bad++;break;}}
 }}
console.log('topics',ctx.TOPICS.length,'bad',bad);
if(bad) process.exitCode=1;
// teoria e camada didática
const ctx2=ctx; vm.runInContext('this.TEORIA=TEORIA;this.INTRO=INTRO;this.fx=fx;this.didatTeste=didatTeste;',ctx2);
for(const t of ctx.TOPICS){ if(!ctx.TEORIA[t.id]&&!t.teoria)console.log('SEM TEORIA',t.id); if(!ctx.INTRO[t.id])console.log('SEM INTRO',t.id); const h=ctx.fx(ctx.TEORIA[t.id]||t.teoria||''); if(/\{[^}]*\/[^}]*\}/.test(h.replace(/<svg[\s\S]*?<\/svg>/g,'')))console.log('FX?',t.id); ctx.didatTeste(t); }
for(const k in ctx.INTRO) if(!ctx.TOPICS.find(t=>t.id===k)) console.log('INTRO órfã',k);
// jogos do 4º ano (Matemática e Português): toda rodada precisa ser jogável
{
  const jc={console,esc:s=>String(s==null?'':s),ST:{},A:{},toast(){},isProf:()=>false,primeiroNome:s=>s,TBY:{},PORTUGUES_TOPICS:[],document:{}};
  vm.createContext(jc);
  vm.runInContext(fs.readFileSync('src/core.js','utf8')+'\n'+fs.readFileSync('src/jogos.js','utf8')+';this.JOGOS=JOGOS;this.MOTOR=MOTOR;this.JG_R=JG_R;',jc);
  let jbad=0, njogos=0, nr=0;
  const ruim=/NaN|undefined|Infinity|\[object|null/;
  for(const tid in jc.JOGOS) for(const g of jc.JOGOS[tid]){ njogos++;
    if(!jc.MOTOR[g.motor]){ console.log('MOTOR?',g.id); jbad++; continue; }
    for(let seed=1;seed<=40;seed++) for(let k=0;k<jc.JG_R;k++){ nr++;
      let ro; try{ ro=g.gen(jc.R(jc.hashStr(g.id)+seed*7919+k*104729),k); jc.MOTOR[g.motor].ini(ro); }catch(e){ console.log('ERRO',g.id,seed,k,e.message); jbad++; continue; }
      const txt=JSON.stringify(ro); if(ruim.test(txt.replace(/"visual":"[^"]*<svg[\s\S]*?<\/svg>/g,''))){ console.log('TXT',g.id,k,txt.slice(0,240)); jbad++; }
      if(g.motor==='escolha'){ if(!(ro.opts.length>=2&&ro.certa>=0&&ro.opts[ro.certa]===ro.certaTxt)){ console.log('OPTS',g.id,k,ro.opts,ro.certa); jbad++; } }
      if(g.motor==='teclado'&&!/^\d+$/.test(ro.resp)){ console.log('RESP',g.id,ro.resp); jbad++; }
      if(g.motor==='blocos'&&!(ro.alvo>0&&ro.alvo<100000)){ console.log('ALVO',g.id,ro.alvo); jbad++; }
      if(g.motor==='pizza'&&!(ro.pintar>=1&&ro.pintar<ro.partes||ro.partes===ro.pintar&&ro.partes===1)){ console.log('PIZZA',g.id,ro); jbad++; }
    } }
  console.log('jogos',njogos,'rodadas',nr,'bad',jbad); if(jbad) process.exitCode=1;
}
