const fs=require('fs'),vm=require('vm');
const code=['core','t1','t1b','t2','t3'].map(f=>fs.readFileSync('src/'+f+'.js','utf8')).join('\n')+'\nthis.TOPICS=TOPICS;this.lista=lista;';
const ctx={console};vm.createContext(ctx);vm.runInContext(code,ctx);
let bad=0;const ids={};
for(const t of ctx.TOPICS){ if(ids[t.id])console.log('DUP',t.id); ids[t.id]=1;
 for(let s=0;s<6;s++){ let L; try{L=ctx.lista(t,s);}catch(e){console.log('ERR',t.id,s,e.message);bad++;break;}
  if(L.length<20){console.log('SHORT',t.id,s,L.length);bad++;}
  for(const g of L){const txt=g.q+'|'+g.a+'|'+[].concat(g.s||'').join('|'); if(/NaN|undefined|Infinity|\[object|null/.test(txt)){console.log('BADTXT',t.id,txt.slice(0,300));bad++;break;}}
 }}
console.log('topics',ctx.TOPICS.length,'bad',bad);
