/* ===== núcleo: aleatório com semente, formatação e frações ===== */
var TOPICS = [];
var MINUS = '−';
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function hashStr(s){var h=2166136261;for(var k=0;k<s.length;k++){h^=s.charCodeAt(k);h=Math.imul(h,16777619);}return h>>>0;}
function R(seed){
  var f=mulberry32(seed);
  var o={f:f};
  o.i=function(a,b){return a+Math.floor(f()*(b-a+1));};
  o.p=function(arr){return arr[Math.floor(f()*arr.length)];};
  o.nz=function(a,b){var x;do{x=o.i(a,b);}while(x===0);return x;};
  o.sh=function(arr){var c=arr.slice();for(var k=c.length-1;k>0;k--){var j=Math.floor(f()*(k+1));var t=c[k];c[k]=c[j];c[j]=t;}return c;};
  o.s=function(){return f()<0.5?-1:1;};
  return o;
}
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=b;b=a%b;a=t;}return a;}
function lcm(a,b){return Math.abs(a*b)/gcd(a,b);}
function rnd(x,dp){var m=Math.pow(10,dp===undefined?6:dp);return Math.round(x*m)/m;}
/* número no formato brasileiro (vírgula decimal) */
function n(x,dp){
  if(dp===undefined) dp=4;
  x=rnd(x,dp); if(Object.is(x,-0)) x=0;
  var a=Math.abs(x), parts=String(a).split('.');
  var ip=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,'.');
  if(parts[0].length<=4) ip=parts[0];
  var s=ip+(parts[1]?','+parts[1]:'');
  return (x<0?MINUS:'')+s;
}
function p(x){return x<0?'('+n(x)+')':n(x);}
function money(x){var s=rnd(x,2).toFixed(2).split('.');var ip=s[0].replace(/\B(?=(\d{3})+(?!\d))/g,'.');return 'R$ '+ip+','+s[1];}
/* frações */
function Q(a,b){if(b===undefined)b=1;if(b<0){a=-a;b=-b;}var g=gcd(a,b)||1;return {n:a/g,d:b/g};}
function qa(x,y){return Q(x.n*y.d+y.n*x.d,x.d*y.d);}
function qs(x,y){return Q(x.n*y.d-y.n*x.d,x.d*y.d);}
function qm(x,y){return Q(x.n*y.n,x.d*y.d);}
function qd(x,y){return Q(x.n*y.d,x.d*y.n);}
function F(a,b){if(typeof a!=='number'||typeof b!=='number')return '<span class="fr"><span>'+a+'</span><span>'+b+'</span></span>';var neg=(a<0)!==(b<0);a=Math.abs(a);b=Math.abs(b);return (neg&&a!==0?MINUS:'')+'<span class="fr"><span>'+a+'</span><span>'+b+'</span></span>';}
function FQ(q){return q.d===1?n(q.n):F(q.n,q.d);}
function pFQ(q){return q.n<0?'('+FQ(q)+')':FQ(q);}
/* polinômio: [[coef,'x²'],[coef,'x'],[coef,'']] */
function poly(terms){
  var s='';
  terms.forEach(function(t){
    var c=t[0],v=t[1];if(c===0)return;
    var a=Math.abs(c);var cs=(a===1&&v)?'':n(a);
    if(s===''){s=(c<0?MINUS:'')+cs+v;}else{s+=(c<0?' − ':' + ')+cs+v;}
  });
  return s||'0';
}
function sup(e){return '<sup>'+e+'</sup>';}
function raiz(x){return '√<span class="ov">'+x+'</span>';}
function mix(i,fns){return fns[i%fns.length]();}
function topic(t){t.disciplina=t.disciplina||'Matemática';TOPICS.push(t);}
function lista(t,seed){
  var r=R(hashStr(t.id)+(seed||0)*7919);var out=[],seen={},tries=0;
  while(out.length<20&&tries<600){tries++;var g=t.gen(r,tries-1);if(seen[g.q])continue;seen[g.q]=1;out.push(g);}
  return out;
}
