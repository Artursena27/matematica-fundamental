/* ===== NÚMEROS ===== */
function fact(x){var f=[],d=2;while(x>1){var e=0;while(x%d===0){x/=d;e++;}if(e)f.push([d,e]);d++;}return f;}
function factStr(x){return fact(x).map(function(t){return t[0]+(t[1]>1?sup(t[1]):'');}).join(' × ');}
function divisores(x){var d=[];for(var k=1;k<=x;k++)if(x%k===0)d.push(k);return d;}
function isPrime(x){if(x<2)return false;for(var k=2;k*k<=x;k++)if(x%k===0)return false;return true;}
function moneyS(x){return (x<0?MINUS:'')+money(Math.abs(x));}
function ps(x){return x>0?'(+'+x+')':'('+n(x)+')';}
var ORDENS=['unidades','dezenas','centenas','unidades de milhar','dezenas de milhar','centenas de milhar','unidades de milhão'];

topic({id:'sistema-numeracao',nome:'Sistema de numeração decimal',ano:'6º ano',area:'Números',
tags:'valor posicional ordem classe decomposição arredondamento algarismo',
teoria:'<p>Usamos 10 algarismos (0 a 9). O <b>valor de um algarismo depende da posição</b> que ele ocupa: cada posição vale 10 vezes a posição à sua direita.</p><table class="t"><tr><th>Classe dos milhões</th><th colspan="3">Classe dos milhares</th><th colspan="3">Classe das unidades simples</th></tr><tr><td>U. milhão</td><td>C. milhar</td><td>D. milhar</td><td>U. milhar</td><td>Centena</td><td>Dezena</td><td>Unidade</td></tr></table><ul><li><b>Valor absoluto</b>: o próprio algarismo. <b>Valor posicional (relativo)</b>: algarismo × valor da posição.</li><li><b>Decompor</b> é escrever o número como soma dos valores posicionais: 4.705 = 4 × 1000 + 7 × 100 + 5.</li><li><b>Arredondar</b>: olhe o algarismo logo à direita da ordem pedida. Se for 5 ou mais, aumenta 1; se for menor que 5, mantém. O resto vira zero.</li></ul><div class="ex"><b>Exemplo:</b> em 36.482, o 6 está nas unidades de milhar e vale 6.000. Arredondando para a centena: 36.500 (porque o 8 ≥ 5).</div>',
gen:function(r,i){return mix(i,[
function(){var len=r.i(5,7),N=r.i(Math.pow(10,len-1),Math.pow(10,len)-1);var s=String(N);var pos;do{pos=r.i(0,len-1);}while(s[len-1-pos]==='0');var d=+s[len-1-pos];
 var shown=n(N);var cnt=-1,html='';for(var k=shown.length-1;k>=0;k--){var ch=shown[k];if(ch!=='.')cnt++;html=((ch!=='.'&&cnt===pos)?'<b class="hl">'+ch+'</b>':ch)+html;}
 return {q:'No número '+html+', qual é o valor posicional do algarismo destacado?',a:n(d*Math.pow(10,pos)),s:'O '+d+' está na ordem das '+ORDENS[pos]+', então vale '+d+' × '+n(Math.pow(10,pos))+' = '+n(d*Math.pow(10,pos))+'.'};},
function(){var parts=[],N=0;var ex=r.sh([0,1,2,3,4,5]).slice(0,r.i(3,4)).sort(function(a,b){return b-a;});ex.forEach(function(e){var d=r.i(1,9);N+=d*Math.pow(10,e);parts.push(d+' × '+n(Math.pow(10,e)));});
 return {q:'Qual número é representado por '+parts.join(' + ')+'?',a:n(N),s:'Somando os valores posicionais: '+ex.map(function(e,k){return n(+parts[k].split(' × ')[0]*Math.pow(10,e));}).join(' + ')+' = '+n(N)+'.'};},
function(){var N=r.i(1000,99999);var ord=r.p([[10,'dezena'],[100,'centena'],[1000,'unidade de milhar']]);var R_=Math.round(N/ord[0])*ord[0];var dig=Math.floor(N/(ord[0]/10))%10;
 return {q:'Arredonde '+n(N)+' para a '+ord[1]+' mais próxima.',a:n(R_),s:'O algarismo à direita da '+ord[1]+' é '+dig+(dig>=5?' (≥ 5), então aumentamos 1':' (< 5), então mantemos')+'. Resultado: '+n(R_)+'.'};},
function(){var N=r.i(1001,99999);var s=String(N),parts=[];for(var k=0;k<s.length;k++){var d=+s[k],e=s.length-1-k;if(d)parts.push(e===0?String(d):d+' × '+n(Math.pow(10,e)));}
 return {q:'Decomponha o número '+n(N)+' usando potências de 10 (ex.: 3 × 100).',a:parts.join(' + '),s:'Cada algarismo diferente de zero vezes o valor da sua posição.'};}
]);}});

topic({id:'expressoes-numericas',nome:'Expressões numéricas',ano:'6º ano',area:'Números',
tags:'ordem das operações parênteses colchetes chaves prioridade',
teoria:'<p>Para resolver uma expressão numérica siga sempre esta ordem:</p><ol><li>Resolva o que está dentro de <b>( )</b>, depois <b>[ ]</b>, depois <b>{ }</b>.</li><li>Dentro de cada um: primeiro <b>potências e raízes</b>;</li><li>depois <b>multiplicações e divisões</b>, na ordem em que aparecem (da esquerda para a direita);</li><li>por último <b>adições e subtrações</b>, também da esquerda para a direita.</li></ol><div class="ex"><b>Exemplo:</b> 20 − 3 × 4 + 8 ÷ 2 = 20 − 12 + 4 = 12.<br>[10 + (6 − 2) × 3] ÷ 2 = [10 + 4 × 3] ÷ 2 = [10 + 12] ÷ 2 = 22 ÷ 2 = 11.</div><p class="tip">Erro comum: fazer 20 − 3 = 17 antes da multiplicação. Multiplicação vem antes!</p>',
gen:function(r,i){return mix(i,[
function(){var a=r.i(2,30),b=r.i(2,12),c=r.i(2,12);return {q:'Calcule: '+a+' + '+b+' × '+c,a:n(a+b*c),s:'Primeiro a multiplicação: '+b+' × '+c+' = '+(b*c)+'. Depois: '+a+' + '+(b*c)+' = '+(a+b*c)+'.'};},
function(){var a=r.i(3,12),b=r.i(3,12),d=r.i(2,9),q=r.i(2,10),c=d*q;var v=a*b-q;return {q:'Calcule: '+a+' × '+b+' − '+c+' ÷ '+d,a:n(v),s:a+' × '+b+' = '+(a*b)+' e '+c+' ÷ '+d+' = '+q+'. Então '+(a*b)+' − '+q+' = '+n(v)+'.'};},
function(){var a=r.i(2,15),b=r.i(2,15),c=r.i(2,9),d=r.i(1,(a+b)*c-1);var v=(a+b)*c-d;return {q:'Calcule: ('+a+' + '+b+') × '+c+' − '+d,a:n(v),s:'Parênteses: '+a+' + '+b+' = '+(a+b)+'. Depois '+(a+b)+' × '+c+' = '+((a+b)*c)+'. Por fim '+((a+b)*c)+' − '+d+' = '+v+'.'};},
function(){var e=r.i(2,6),q=r.i(3,12),inner=e*q,d=r.i(2,5),kmax=Math.min(6,Math.floor((inner-1)/d));if(kmax<1){kmax=1;inner=d+e*Math.ceil((d+1)/e);q=inner/e;}var k=r.i(1,kmax),a=inner-k*d;if(a<1){a=1;inner=a+k*d;}
 var c=r.i(1,9),b=c+k;if(inner%e!==0){e=1;q=inner;}
 return {q:'Calcule: ['+a+' + ('+b+' − '+c+') × '+d+'] ÷ '+e,a:n(inner/e),s:'('+b+' − '+c+') = '+k+'; '+k+' × '+d+' = '+(k*d)+'; ['+a+' + '+(k*d)+'] = '+inner+'; '+inner+' ÷ '+e+' = '+n(inner/e)+'.'};},
function(){var a=r.i(2,5),b=r.i(2,3),c=r.i(2,9),d=r.i(1,20);var v=Math.pow(a,b)+c*d;return {q:'Calcule: '+a+sup(b)+' + '+c+' × '+d,a:n(v),s:'Potência primeiro: '+a+sup(b)+' = '+Math.pow(a,b)+'. Multiplicação: '+c+' × '+d+' = '+(c*d)+'. Soma: '+v+'.'};}
]);}});

topic({id:'potenciacao',nome:'Potenciação',ano:'6º ano',area:'Números',
tags:'potência expoente base quadrado cubo potências de 10',
teoria:'<p>Potência é uma multiplicação de fatores iguais: <b>a<sup>n</sup> = a × a × … × a</b> (n vezes). <i>a</i> é a <b>base</b> e <i>n</i> o <b>expoente</b>.</p><ul><li>a<sup>1</sup> = a &nbsp;&nbsp; a<sup>0</sup> = 1 (a ≠ 0)</li><li>Quadrado: a<sup>2</sup>; cubo: a<sup>3</sup>.</li><li>10<sup>n</sup> = 1 seguido de n zeros.</li></ul><p><b>Propriedades</b> (mesma base):</p><ul><li>a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup> (conserva a base, soma expoentes)</li><li>a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup> (subtrai expoentes)</li><li>(a<sup>m</sup>)<sup>n</sup> = a<sup>m×n</sup></li></ul><div class="ex"><b>Exemplo:</b> 2<sup>5</sup> = 2×2×2×2×2 = 32. &nbsp; 3<sup>4</sup> × 3<sup>2</sup> = 3<sup>6</sup>.</div><p class="tip">Cuidado: 2<sup>3</sup> não é 2 × 3! É 2 × 2 × 2 = 8.</p>',
gen:function(r,i){return mix(i,[
function(){var a=r.i(2,9),e=r.i(2,4);if(a>5)e=r.i(2,3);var v=Math.pow(a,e);return {q:'Calcule '+a+sup(e)+'.',a:n(v),s:Array(e).fill(a).join(' × ')+' = '+n(v)+'.'};},
function(){var a=r.i(11,20);return {q:'Calcule '+a+sup(2)+'.',a:n(a*a),s:a+' × '+a+' = '+(a*a)+'.'};},
function(){var a=r.i(2,50),e=r.p([0,1]);return {q:'Quanto vale '+a+sup(e)+'?',a:n(e?a:1),s:e?'Todo número elevado a 1 é ele mesmo.':'Todo número diferente de zero elevado a 0 é igual a 1.'};},
function(){var a=r.i(2,9),m=r.i(2,8),k=r.i(2,8),t=r.i(0,2);var q,ans,s;
 if(t===0){q=a+sup(m)+' × '+a+sup(k);ans=a+sup(m+k);s='Mesma base na multiplicação: soma os expoentes ('+m+' + '+k+' = '+(m+k)+').';}
 else if(t===1){var M=Math.max(m,k)+1,K=Math.min(m,k);q=a+sup(M)+' ÷ '+a+sup(K);ans=a+sup(M-K);s='Mesma base na divisão: subtrai os expoentes ('+M+' − '+K+' = '+(M-K)+').';}
 else{q='('+a+sup(m)+')'+sup(k);ans=a+sup(m*k);s='Potência de potência: multiplica os expoentes ('+m+' × '+k+' = '+(m*k)+').';}
 return {q:'Escreva como uma única potência: '+q,a:ans,s:s};},
function(){var e=r.i(2,9),d=r.i(1,9);return {q:'Calcule '+d+' × 10'+sup(e)+'.',a:n(d*Math.pow(10,e)),s:'10'+sup(e)+' é 1 seguido de '+e+' zeros; vezes '+d+' dá '+n(d*Math.pow(10,e))+'.'};}
]);}});

topic({id:'radiciacao',nome:'Radiciação (raiz quadrada e cúbica)',ano:'6º ano',area:'Números',
tags:'raiz quadrada raiz cúbica quadrado perfeito radical',
teoria:'<p>A radiciação é a operação <b>inversa da potenciação</b>.</p><ul><li><b>Raiz quadrada</b>: √a = b porque b<sup>2</sup> = a. Ex.: √49 = 7, pois 7<sup>2</sup> = 49.</li><li><b>Raiz cúbica</b>: ∛a = b porque b<sup>3</sup> = a. Ex.: ∛64 = 4.</li><li><b>Quadrados perfeitos</b>: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225…</li><li>Se o número não é quadrado perfeito, a raiz fica entre dois inteiros: √30 está entre 5 e 6 (25 &lt; 30 &lt; 36).</li><li>Raiz de fração: √(a/b) = √a / √b.</li></ul><div class="ex"><b>Exemplo:</b> √144 + ∛27 = 12 + 3 = 15.</div>',
gen:function(r,i){return mix(i,[
function(){var k=r.i(2,20);return {q:'Calcule '+raiz(k*k)+'.',a:n(k),s:k+sup(2)+' = '+(k*k)+', então '+raiz(k*k)+' = '+k+'.'};},
function(){var k=r.i(2,6);return {q:'Calcule ∛'+(k*k*k)+'.',a:n(k),s:k+sup(3)+' = '+(k*k*k)+', então a raiz cúbica é '+k+'.'};},
function(){var x;do{x=r.i(2,200);}while(Math.sqrt(x)%1===0);var f=Math.floor(Math.sqrt(x));return {q:raiz(x)+' está entre quais números inteiros consecutivos?',a:f+' e '+(f+1),s:f+sup(2)+' = '+(f*f)+' e '+(f+1)+sup(2)+' = '+((f+1)*(f+1))+'. Como '+(f*f)+' &lt; '+x+' &lt; '+((f+1)*(f+1))+', a raiz está entre '+f+' e '+(f+1)+'.'};},
function(){var a=r.i(1,12),b;do{b=r.i(2,12);}while(gcd(a,b)!==1);return {q:'Calcule '+raiz(F(a*a,b*b))+'.',a:F(a,b),s:raiz(a*a)+' = '+a+' e '+raiz(b*b)+' = '+b+'.'};},
function(){var a=r.i(2,15),b=r.i(2,15);return {q:'Calcule '+raiz(a*a)+' + '+raiz(b*b)+'.',a:n(a+b),s:a+' + '+b+' = '+(a+b)+'.'};}
]);}});

topic({id:'multiplos-divisores',nome:'Múltiplos, divisores e critérios de divisibilidade',ano:'6º ano',area:'Números',
tags:'múltiplo divisor divisibilidade critério divisível',
teoria:'<ul><li><b>Múltiplos</b> de um número: resultados de multiplicá-lo por 0, 1, 2, 3… M(4) = {0, 4, 8, 12, …} (infinitos).</li><li><b>Divisores</b>: números que dividem exatamente (resto zero). D(12) = {1, 2, 3, 4, 6, 12} (finitos).</li></ul><p><b>Critérios de divisibilidade</b></p><table class="t"><tr><td><b>2</b></td><td>termina em 0, 2, 4, 6 ou 8 (é par)</td></tr><tr><td><b>3</b></td><td>soma dos algarismos é divisível por 3</td></tr><tr><td><b>4</b></td><td>os dois últimos algarismos formam número divisível por 4 (ou terminam em 00)</td></tr><tr><td><b>5</b></td><td>termina em 0 ou 5</td></tr><tr><td><b>6</b></td><td>divisível por 2 e por 3</td></tr><tr><td><b>9</b></td><td>soma dos algarismos é divisível por 9</td></tr><tr><td><b>10</b></td><td>termina em 0</td></tr></table><div class="ex"><b>Exemplo:</b> 2.358 é divisível por 3? 2+3+5+8 = 18, que é divisível por 3 → sim (e também por 9).</div>',
gen:function(r,i){return mix(i,[
function(){var x=r.p([12,18,20,24,28,30,32,36,40,42,45,48,50,54,56,60,63,64,72,80,84,90,96,100]);return {q:'Quais são os divisores de '+x+'?',a:'D('+x+') = {'+divisores(x).join(', ')+'}',s:'Teste as divisões exatas em pares: '+divisores(x).filter(function(d){return d*d<=x;}).map(function(d){return d+' × '+(x/d);}).join(', ')+'.'};},
function(){var k=r.i(3,15);var m=[0,1,2,3,4,5].map(function(t){return t*k;});return {q:'Escreva os seis primeiros múltiplos naturais de '+k+'.',a:m.join(', '),s:'Multiplique '+k+' por 0, 1, 2, 3, 4 e 5.'};},
function(){var d=r.p([2,3,4,5,6,9,10]),N=r.i(100,9999);if(r.f()<0.5)N=N-N%d;var sd=String(N).split('').reduce(function(s,c){return s+ +c;},0);var ok=N%d===0;var why;
 if(d===2)why='termina em '+(N%10)+(N%2===0?' (par)':' (ímpar)');else if(d===3||d===9)why='a soma dos algarismos é '+sd+(sd%d===0?', que é':', que não é')+' divisível por '+d;else if(d===4)why='os dois últimos algarismos formam '+(N%100)+(N%100%4===0?', divisível':', não divisível')+' por 4';else if(d===5)why='termina em '+(N%10);else if(d===10)why='termina em '+(N%10);else why=(N%2===0?'é par':'não é par')+' e a soma dos algarismos é '+sd+(sd%3===0?' (divisível por 3)':' (não divisível por 3)');
 return {q:'O número '+n(N)+' é divisível por '+d+'?',a:ok?'Sim':'Não',s:'Porque '+why+'.'};},
function(){var b=r.i(3,15),a=r.f()<0.5?b*r.i(2,15):r.i(20,200);var ok=a%b===0;return {q:a+' é múltiplo de '+b+'?',a:ok?'Sim':'Não',s:ok?a+' = '+b+' × '+(a/b)+'.':a+' ÷ '+b+' deixa resto '+(a%b)+'.'};}
]);}});

topic({id:'primos-fatoracao',nome:'Números primos e fatoração',ano:'6º ano',area:'Números',
tags:'primo composto decomposição fatores primos fatoração',
teoria:'<ul><li><b>Número primo</b>: tem exatamente dois divisores, 1 e ele mesmo. Primos até 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.</li><li><b>Composto</b>: tem mais de dois divisores. O 1 não é primo nem composto. O 2 é o único primo par.</li><li><b>Fatoração</b>: escrever o número como produto de primos. Divida sucessivamente pelo menor primo possível.</li></ul><div class="ex"><b>Exemplo:</b><br>60 | 2<br>30 | 2<br>15 | 3<br>&nbsp;5 | 5<br>&nbsp;1 &nbsp;→ 60 = 2<sup>2</sup> × 3 × 5</div><p class="tip">Para saber se n é primo, teste a divisão pelos primos até √n.</p>',
gen:function(r,i){return mix(i,[
function(){var x;do{x=1;var c=r.i(2,4);for(var k=0;k<c;k++)x*=r.p([2,2,2,3,3,5,7,11,13]);}while(x>1000||x<12);return {q:'Fatore '+n(x)+' em fatores primos.',a:factStr(x),s:'Divisões sucessivas: '+fact(x).map(function(t){return Array(t[1]).fill(t[0]).join(', ');}).join(', ')+'.'};},
function(){var x=r.i(2,120);var ok=isPrime(x);var dv=ok?0:divisores(x)[1];return {q:'O número '+x+' é primo?',a:ok?'Sim':'Não',s:ok?'Seus únicos divisores são 1 e '+x+'.':x+' é divisível por '+dv+' ('+x+' = '+dv+' × '+(x/dv)+').'};},
function(){var a=r.i(1,80),b=a+r.i(10,20);var L=[];for(var k=a;k<=b;k++)if(isPrime(k))L.push(k);return {q:'Liste os números primos entre '+a+' e '+b+' (incluindo esses, se forem primos).',a:L.length?L.join(', '):'Nenhum',s:'Teste cada número dividindo pelos primos 2, 3, 5, 7.'};}
]);}});

topic({id:'mmc',nome:'MMC — mínimo múltiplo comum',ano:'6º ano',area:'Números',
tags:'mínimo múltiplo comum mmc problemas encontro',
teoria:'<p>O <b>MMC</b> de dois ou mais números é o menor múltiplo (diferente de zero) comum a todos.</p><p><b>Método da fatoração simultânea:</b> divida todos os números ao mesmo tempo pelos primos até que todos virem 1; o MMC é o produto dos primos usados.</p><div class="ex"><b>Exemplo:</b> MMC(12, 18)<br>12, 18 | 2<br>&nbsp;6, &nbsp;9 | 2<br>&nbsp;3, &nbsp;9 | 3<br>&nbsp;1, &nbsp;3 | 3<br>&nbsp;1, &nbsp;1 → 2 × 2 × 3 × 3 = 36</div><p><b>Quando usar:</b> problemas de “acontecer junto de novo” (ônibus, alarmes, luzes que piscam) e para somar frações.</p>',
gen:function(r,i){function L(arr){return arr.reduce(lcm);}return mix(i,[
function(){var a=r.i(2,30),b;do{b=r.i(2,30);}while(b===a);var m=L([a,b]);return {q:'Calcule o MMC('+a+', '+b+').',a:n(m),s:a+' = '+factStr(a)+'; '+b+' = '+factStr(b)+'. Pegue cada primo com o maior expoente: '+factStr(m)+' = '+m+'.'};},
function(){var a=r.i(2,12),b=r.i(2,12),c=r.i(2,12);if(a===b||b===c||a===c)c=a+b;var m=L([a,b,c]);return {q:'Calcule o MMC('+a+', '+b+', '+c+').',a:n(m),s:'Fatorando: '+[a,b,c].map(function(x){return x+' = '+factStr(x);}).join('; ')+'. MMC = '+factStr(m)+' = '+m+'.'};},
function(){var a=r.p([10,12,15,18,20,25,30,40]),b;do{b=r.p([8,12,15,20,24,30,36,45]);}while(b===a);var m=L([a,b]);var h=8+Math.floor(m/60),mi=m%60;return {q:'Dois ônibus saem juntos do terminal às 8h. Um sai a cada '+a+' minutos e o outro a cada '+b+' minutos. Depois de quantos minutos eles sairão juntos novamente? A que horas?',a:m+' minutos, às '+h+'h'+(mi<10?'0':'')+mi,s:'MMC('+a+', '+b+') = '+m+' minutos depois das 8h.'};},
function(){var a=r.p([2,3,4,5,6,8]),b;do{b=r.p([3,4,5,6,9,10,12]);}while(b===a);var m=L([a,b]);return {q:'Uma luz pisca a cada '+a+' segundos e outra a cada '+b+' segundos. Se piscaram juntas agora, daqui a quantos segundos piscarão juntas de novo?',a:m+' segundos',s:'MMC('+a+', '+b+') = '+m+'.'};}
]);}});

topic({id:'mdc',nome:'MDC — máximo divisor comum',ano:'6º ano',area:'Números',
tags:'máximo divisor comum mdc problemas dividir em partes iguais',
teoria:'<p>O <b>MDC</b> de dois ou mais números é o maior número que divide todos eles exatamente.</p><ul><li><b>Pela fatoração:</b> multiplique só os primos <b>comuns</b>, com o <b>menor</b> expoente.</li><li><b>Divisões sucessivas (Euclides):</b> divida o maior pelo menor; depois o divisor pelo resto, até o resto ser 0. O último divisor é o MDC.</li></ul><div class="ex"><b>Exemplo:</b> MDC(24, 36): 24 = 2<sup>3</sup> × 3; 36 = 2<sup>2</sup> × 3<sup>2</sup> → 2<sup>2</sup> × 3 = 12.</div><p><b>Quando usar:</b> dividir coisas em partes iguais do <b>maior tamanho possível</b>, montar o maior número de kits iguais.</p><p class="tip">Se MDC = 1, os números são primos entre si.</p>',
gen:function(r,i){return mix(i,[
function(){var g=r.i(2,15),x=r.i(2,9),y;do{y=r.i(2,9);}while(y===x||gcd(x,y)!==1);var a=g*x,b=g*y;return {q:'Calcule o MDC('+a+', '+b+').',a:n(g),s:a+' = '+factStr(a)+'; '+b+' = '+factStr(b)+'. Fatores comuns com menor expoente: '+(g>1?factStr(g):'1')+' = '+g+'.'};},
function(){var g=r.i(2,8),xs=r.sh([2,3,5,7]).slice(0,3);var arr=xs.map(function(x){return x*g;});return {q:'Calcule o MDC('+arr.join(', ')+').',a:n(g),s:'Todos são múltiplos de '+g+' e, divididos por ele, dão '+xs.join(', ')+', que não têm divisor comum além de 1.'};},
function(){var g=r.p([5,6,8,10,12,15,20,25]),x=r.i(2,7),y;do{y=r.i(2,7);}while(gcd(x,y)!==1||y===x);var a=g*x,b=g*y;return {q:'Duas fitas medem '+a+' cm e '+b+' cm. Quero cortá-las em pedaços do mesmo tamanho, o maior possível, sem sobrar nada. Qual o tamanho de cada pedaço e quantos pedaços terei?',a:g+' cm cada; '+(x+y)+' pedaços',s:'MDC('+a+', '+b+') = '+g+'. Pedaços: '+a+' ÷ '+g+' + '+b+' ÷ '+g+' = '+x+' + '+y+' = '+(x+y)+'.'};},
function(){var g=r.i(3,12),x=r.i(2,6),y;do{y=r.i(2,6);}while(gcd(x,y)!==1||y===x);var a=g*x,b=g*y;return {q:'Tenho '+a+' lápis e '+b+' borrachas e quero montar o maior número possível de kits iguais, sem sobrar nada. Quantos kits e o que vai em cada um?',a:g+' kits, cada um com '+x+' lápis e '+y+' borrachas',s:'MDC('+a+', '+b+') = '+g+'. '+a+' ÷ '+g+' = '+x+' e '+b+' ÷ '+g+' = '+y+'.'};}
]);}});

topic({id:'fracoes',nome:'Frações: conceito, equivalência e simplificação',ano:'6º ano',area:'Números',
tags:'fração numerador denominador equivalente simplificar irredutível fração de quantidade número misto',
teoria:'<p>Uma fração <span class="fr"><span>a</span><span>b</span></span> representa <b>a partes</b> de um inteiro dividido em <b>b partes iguais</b>. a é o <b>numerador</b>, b é o <b>denominador</b>.</p><ul><li><b>Frações equivalentes</b>: multiplicando ou dividindo numerador e denominador pelo mesmo número, a fração não muda: '+'<span class="fr"><span>1</span><span>2</span></span> = <span class="fr"><span>2</span><span>4</span></span> = <span class="fr"><span>3</span><span>6</span></span>.</li><li><b>Simplificar</b>: dividir os dois termos pelo MDC até ficar <b>irredutível</b>.</li><li><b>Fração de quantidade</b>: divida pelo denominador e multiplique pelo numerador. <span class="fr"><span>3</span><span>4</span></span> de 80 = 80 ÷ 4 × 3 = 60.</li><li><b>Número misto</b>: 2 <span class="fr"><span>1</span><span>3</span></span> = <span class="fr"><span>2×3+1</span><span>3</span></span> = <span class="fr"><span>7</span><span>3</span></span>.</li></ul>',
gen:function(r,i){return mix(i,[
function(){var x,y;do{x=r.i(1,9);y=r.i(2,12);}while(gcd(x,y)!==1||x>=y);var k=r.i(2,9);return {q:'Simplifique '+F(x*k,y*k)+' até a forma irredutível.',a:F(x,y),s:'MDC('+(x*k)+', '+(y*k)+') = '+k+'. Dividindo os dois termos por '+k+': '+F(x,y)+'.'};},
function(){var x,y;do{x=r.i(1,9);y=r.i(2,10);}while(gcd(x,y)!==1);var k=r.i(2,8);return {q:'Complete para que as frações sejam equivalentes: '+F(x,y)+' = <span class="fr"><span>?</span><span>'+(y*k)+'</span></span>',a:n(x*k),s:'O denominador foi multiplicado por '+k+' ('+y+' × '+k+' = '+(y*k)+'), então o numerador também: '+x+' × '+k+' = '+(x*k)+'.'};},
function(){var b=r.p([2,3,4,5,6,8,10]),a=r.i(1,b-1),N=b*r.i(3,30);return {q:'Quanto é '+F(a,b)+' de '+N+'?',a:n(N/b*a),s:N+' ÷ '+b+' = '+(N/b)+'; '+(N/b)+' × '+a+' = '+(N/b*a)+'.'};},
function(){var b=r.i(2,9),w=r.i(1,5),a=r.i(1,b-1);if(r.f()<0.5)return {q:'Transforme o número misto '+w+' '+F(a,b)+' em fração imprópria.',a:F(w*b+a,b),s:w+' × '+b+' + '+a+' = '+(w*b+a)+'; mantém o denominador '+b+'.'};
 return {q:'Transforme '+F(w*b+a,b)+' em número misto.',a:w+' '+F(a,b),s:(w*b+a)+' ÷ '+b+' = '+w+' e resto '+a+'.'};}
]);}});

topic({id:'comparacao-fracoes',nome:'Comparação e ordenação de frações',ano:'6º ano',area:'Números',
tags:'comparar frações maior menor ordem crescente decrescente',
teoria:'<ul><li><b>Mesmo denominador</b>: maior numerador → maior fração. <span class="fr"><span>5</span><span>7</span></span> &gt; <span class="fr"><span>3</span><span>7</span></span>.</li><li><b>Mesmo numerador</b>: maior denominador → menor fração (pedaços menores). <span class="fr"><span>1</span><span>3</span></span> &gt; <span class="fr"><span>1</span><span>5</span></span>.</li><li><b>Denominadores diferentes</b>: reduza ao mesmo denominador (MMC) ou use a <b>multiplicação cruzada</b>: compare a×d com c×b.</li></ul><div class="ex"><b>Exemplo:</b> <span class="fr"><span>2</span><span>3</span></span> ou <span class="fr"><span>3</span><span>5</span></span>? 2×5 = 10 e 3×3 = 9. Como 10 &gt; 9, <span class="fr"><span>2</span><span>3</span></span> &gt; <span class="fr"><span>3</span><span>5</span></span>.</div>',
gen:function(r,i){function rf(){var b=r.i(2,12),a=r.i(1,b+3);return Q(a,b);}return mix(i,[
function(){var x=rf(),y;do{y=rf();}while(y.n*x.d===x.n*y.d);var L=x.n*y.d,Rr=y.n*x.d;var sym=L>Rr?'&gt;':'&lt;';return {q:'Compare usando &gt;, &lt; ou =: '+FQ(x)+' ___ '+FQ(y),a:FQ(x)+' '+sym+' '+FQ(y),s:'Multiplicação cruzada: '+x.n+' × '+y.d+' = '+L+' e '+y.n+' × '+x.d+' = '+Rr+'.'};},
function(){var b=r.i(5,15),a=r.i(1,b-1),c;do{c=r.i(1,b-1);}while(c===a);return {q:'Qual é maior: '+F(a,b)+' ou '+F(c,b)+'?',a:F(Math.max(a,c),b),s:'Mesmo denominador: vence o maior numerador.'};},
function(){var a=r.i(1,5),b=r.i(a+1,12),c;do{c=r.i(a+1,12);}while(c===b);return {q:'Qual é maior: '+F(a,b)+' ou '+F(a,c)+'?',a:F(a,Math.min(b,c)),s:'Mesmo numerador: a de menor denominador é maior (pedaços maiores).'};},
function(){var fs=[],vals={};while(fs.length<3){var f=rf();var v=f.n/f.d;if(vals[v])continue;vals[v]=1;fs.push(f);}var o=fs.slice().sort(function(a,b){return a.n/a.d-b.n/b.d;});var m=fs.map(function(f){return f.d;}).reduce(lcm);
 return {q:'Coloque em ordem crescente: '+fs.map(FQ).join(', '),a:o.map(FQ).join(' &lt; '),s:'Com denominador comum '+m+': '+fs.map(function(f){return F(f.n*m/f.d,m);}).join(', ')+'.'};}
]);}});

topic({id:'soma-subtracao-fracoes',nome:'Adição e subtração de frações',ano:'6º ano',area:'Números',
tags:'somar frações subtrair frações mmc denominadores diferentes',
teoria:'<ul><li><b>Mesmo denominador</b>: soma (ou subtrai) os numeradores e conserva o denominador. <span class="fr"><span>2</span><span>7</span></span> + <span class="fr"><span>3</span><span>7</span></span> = <span class="fr"><span>5</span><span>7</span></span>.</li><li><b>Denominadores diferentes</b>: tire o MMC dos denominadores, transforme cada fração em equivalente com esse denominador e depois some.</li><li>No fim, <b>simplifique</b> o resultado.</li></ul><div class="ex"><b>Exemplo:</b> <span class="fr"><span>1</span><span>4</span></span> + <span class="fr"><span>5</span><span>6</span></span>: MMC(4, 6) = 12 → <span class="fr"><span>3</span><span>12</span></span> + <span class="fr"><span>10</span><span>12</span></span> = <span class="fr"><span>13</span><span>12</span></span>.</div><p class="tip">Erro comum: somar os denominadores (1/2 + 1/3 ≠ 2/5).</p>',
gen:function(r,i){function rf(){var b=r.i(2,10),a=r.i(1,b+2);return {n:a,d:b};}
function solve(x,y,op){var m=lcm(x.d,y.d);var a=x.n*m/x.d,b=y.n*m/y.d;var res=op>0?Q(a+b,m):Q(a-b,m);return {res:res,s:'MMC('+x.d+', '+y.d+') = '+m+'. '+F(x.n,x.d)+' = '+F(a,m)+' e '+F(y.n,y.d)+' = '+F(b,m)+'. '+F(a,m)+(op>0?' + ':' − ')+F(b,m)+' = '+F(op>0?a+b:a-b,m)+(Q(op>0?a+b:a-b,m).d!==m?' = '+FQ(res):'')+'.'};}
return mix(i,[
function(){var b=r.i(3,15),a=r.i(1,b),c=r.i(1,b);var res=Q(a+c,b);return {q:'Calcule: '+F(a,b)+' + '+F(c,b),a:FQ(res),s:'Mesmo denominador: '+a+' + '+c+' = '+(a+c)+' → '+F(a+c,b)+(res.d!==b?' = '+FQ(res):'')+'.'};},
function(){var x=rf(),y;do{y=rf();}while(y.d===x.d);var o=solve(x,y,1);return {q:'Calcule: '+F(x.n,x.d)+' + '+F(y.n,y.d),a:FQ(o.res),s:o.s};},
function(){var x=rf(),y;do{y=rf();}while(y.d===x.d||y.n/y.d>=x.n/x.d);var o=solve(x,y,-1);return {q:'Calcule: '+F(x.n,x.d)+' − '+F(y.n,y.d),a:FQ(o.res),s:o.s};},
function(){var w=r.i(1,5),y=rf();while(y.n>=y.d){y=rf();}var res=Q(w*y.d-y.n,y.d);return {q:'Calcule: '+w+' − '+F(y.n,y.d),a:FQ(res),s:w+' = '+F(w*y.d,y.d)+'; '+F(w*y.d,y.d)+' − '+F(y.n,y.d)+' = '+F(w*y.d-y.n,y.d)+'.'};},
function(){var b=r.p([3,4,5,6,8]),a=r.i(1,b-1),c=r.p([2,3,4,5,6]),dd=r.i(1,c-1);if(c===b)c=b*2;var res=Q(a*c+dd*b,b*c);var left=qs(Q(1),res);if(left.n<=0)return {q:'Calcule: '+F(a,b)+' + '+F(dd,c),a:FQ(res),s:'Denominador comum '+lcm(b,c)+'.'};
 return {q:'Ana comeu '+F(a,b)+' de uma pizza e Bia comeu '+F(dd,c)+'. Que fração da pizza sobrou?',a:FQ(left),s:'Comeram '+F(a,b)+' + '+F(dd,c)+' = '+FQ(res)+'. Sobrou 1 − '+FQ(res)+' = '+FQ(left)+'.'};}
]);}});

topic({id:'multiplicacao-divisao-fracoes',nome:'Multiplicação e divisão de frações',ano:'6º ano',area:'Números',
tags:'multiplicar frações dividir frações inverso',
teoria:'<ul><li><b>Multiplicação</b>: numerador × numerador e denominador × denominador. <span class="fr"><span>2</span><span>3</span></span> × <span class="fr"><span>4</span><span>5</span></span> = <span class="fr"><span>8</span><span>15</span></span>.</li><li>Dá para <b>simplificar antes</b> (cruzado), o que deixa as contas menores.</li><li><b>Divisão</b>: conserva a primeira e multiplica pelo <b>inverso</b> da segunda. <span class="fr"><span>3</span><span>4</span></span> ÷ <span class="fr"><span>2</span><span>5</span></span> = <span class="fr"><span>3</span><span>4</span></span> × <span class="fr"><span>5</span><span>2</span></span> = <span class="fr"><span>15</span><span>8</span></span>.</li><li>Número inteiro: escreva com denominador 1 (5 = <span class="fr"><span>5</span><span>1</span></span>).</li></ul>',
gen:function(r,i){function rf(){var b=r.i(2,9),a=r.i(1,9);return {n:a,d:b};}return mix(i,[
function(){var x=rf(),y=rf();var res=Q(x.n*y.n,x.d*y.d);return {q:'Calcule: '+F(x.n,x.d)+' × '+F(y.n,y.d),a:FQ(res),s:F(x.n+' × '+y.n,x.d+' × '+y.d)+' = '+F(x.n*y.n,x.d*y.d)+(res.d!==x.d*y.d?' = '+FQ(res):'')+'.'};},
function(){var x=rf(),y=rf();var res=Q(x.n*y.d,x.d*y.n);return {q:'Calcule: '+F(x.n,x.d)+' ÷ '+F(y.n,y.d),a:FQ(res),s:'Inverte a segunda: '+F(x.n,x.d)+' × '+F(y.d,y.n)+' = '+F(x.n*y.d,x.d*y.n)+(res.d!==x.d*y.n||res.n!==x.n*y.d?' = '+FQ(res):'')+'.'};},
function(){var w=r.i(2,12),x=rf();var res=Q(w*x.n,x.d);return {q:'Calcule: '+w+' × '+F(x.n,x.d),a:FQ(res),s:F(w+' × '+x.n,x.d)+' = '+F(w*x.n,x.d)+(res.d!==x.d?' = '+FQ(res):'')+'.'};},
function(){var x=rf(),w=r.i(2,9);var res=Q(x.n,x.d*w);return {q:'Calcule: '+F(x.n,x.d)+' ÷ '+w,a:FQ(res),s:F(x.n,x.d)+' × '+F(1,w)+' = '+F(x.n,x.d*w)+(res.d!==x.d*w?' = '+FQ(res):'')+'.'};},
function(){var a=r.p([2,3,4,5]),b=r.p([1,2,3]);var L=a*r.i(2,6);var part=Q(b,a);if(b>=a)b=1;return {q:'Uma garrafa tem '+L+' litros. Quantos copos de '+F(b,a)+' de litro dá para encher?',a:FQ(qd(Q(L),Q(b,a)))+' copos',s:L+' ÷ '+F(b,a)+' = '+L+' × '+F(a,b)+' = '+FQ(qd(Q(L),Q(b,a)))+'.'};}
]);}});

topic({id:'decimais',nome:'Números decimais: operações',ano:'6º ano',area:'Números',
tags:'decimal vírgula somar subtrair multiplicar dividir casas decimais',
teoria:'<ul><li><b>Adição e subtração</b>: coloque <b>vírgula embaixo de vírgula</b> (complete com zeros) e opere normalmente.</li><li><b>Multiplicação</b>: multiplique como se não houvesse vírgula; o resultado terá tantas casas decimais quanto a <b>soma das casas</b> dos fatores. 1,2 × 0,3 = 0,36.</li><li><b>Por 10, 100, 1000</b>: a vírgula anda 1, 2 ou 3 casas para a direita (para a esquerda na divisão).</li><li><b>Divisão</b>: iguale as casas decimais do dividendo e do divisor (multiplicando os dois por 10, 100…) e divida normalmente.</li></ul><div class="ex"><b>Exemplo:</b> 7,5 ÷ 0,25 = 750 ÷ 25 = 30.</div>',
gen:function(r,i){function d2(lo,hi,dp){return r.i(lo,hi)/Math.pow(10,dp);}return mix(i,[
function(){var a=r.i(100,9999),b=r.i(10,999);return {q:'Calcule: '+n(a/100)+' + '+n(b/10),a:n((a+b*10)/100),s:'Vírgula embaixo de vírgula: '+n(a/100)+' + '+(b/10).toFixed(2).replace('.',',')+' = '+n((a+b*10)/100)+'.'};},
function(){var a=r.i(500,9999),b=r.i(10,a-1);return {q:'Calcule: '+n(a/100)+' − '+n(b/100),a:n((a-b)/100),s:'Alinhe as vírgulas e subtraia: '+n((a-b)/100)+'.'};},
function(){var a=r.i(11,99),b=r.i(2,99);return {q:'Calcule: '+n(a/10)+' × '+n(b/10),a:n(a*b/100),s:a+' × '+b+' = '+(a*b)+'; 1 + 1 = 2 casas decimais → '+n(a*b/100)+'.'};},
function(){var d=r.i(2,9),qq=r.i(11,999)/100;var D=rnd(qq*d,2);return {q:'Calcule: '+n(D)+' ÷ '+d,a:n(qq),s:'Divida normalmente, mantendo a vírgula no quociente: '+n(qq)+'. Confira: '+n(qq)+' × '+d+' = '+n(D)+'.'};},
function(){var x=r.i(1,9999)/1000,k=r.p([10,100,1000]),op=r.f()<0.5;return {q:'Calcule: '+n(x)+(op?' × ':' ÷ ')+n(k),a:n(op?x*k:x/k,6),s:'A vírgula anda '+(String(k).length-1)+' casa(s) para a '+(op?'direita':'esquerda')+'.'};},
function(){var b=r.p([5,25,2,4,5]),a=r.i(1,40)*b;var A=a/10,B=b/(b===2||b===4?10:100);var res=rnd(A/B,4);return {q:'Calcule: '+n(A)+' ÷ '+n(B),a:n(res),s:'Multiplique os dois por '+(B<0.1?'100':'10')+' para tirar a vírgula do divisor e divida: '+n(res)+'.'};}
]);}});

topic({id:'fracao-decimal',nome:'Conversão entre fração e decimal',ano:'6º ano',area:'Números',
tags:'fração decimal converter transformar fração decimal',
teoria:'<ul><li><b>Fração → decimal</b>: divida o numerador pelo denominador. <span class="fr"><span>3</span><span>4</span></span> = 3 ÷ 4 = 0,75.</li><li>Dica: se der, transforme o denominador em 10, 100 ou 1000: <span class="fr"><span>3</span><span>4</span></span> = <span class="fr"><span>75</span><span>100</span></span> = 0,75.</li><li><b>Decimal → fração</b>: escreva o número sem vírgula no numerador e, no denominador, 1 seguido de tantos zeros quantas forem as casas decimais. Depois simplifique. 0,35 = <span class="fr"><span>35</span><span>100</span></span> = <span class="fr"><span>7</span><span>20</span></span>.</li></ul>',
gen:function(r,i){return mix(i,[
function(){var d=r.p([2,4,5,8,10,20,25,50]),a;do{a=r.i(1,2*d);}while(a%d===0);return {q:'Escreva '+F(a,d)+' na forma decimal.',a:n(a/d),s:a+' ÷ '+d+' = '+n(a/d)+'.'};},
function(){var dp=r.i(1,3),x;do{x=r.i(1,Math.pow(10,dp)*3);}while(x%10===0);var den=Math.pow(10,dp);var res=Q(x,den);return {q:'Escreva '+n(x/den)+' como fração irredutível.',a:FQ(res),s:n(x/den)+' = '+F(x,den)+(res.d!==den?' = '+FQ(res):'')+'.'};}
]);}});

topic({id:'porcentagem',nome:'Porcentagem',ano:'7º ano',area:'Números',
tags:'porcentagem por cento desconto aumento percentual',
teoria:'<p><b>p%</b> significa <span class="fr"><span>p</span><span>100</span></span>. 25% = <span class="fr"><span>25</span><span>100</span></span> = 0,25.</p><ul><li><b>p% de N</b> = <span class="fr"><span>p</span><span>100</span></span> × N. Ex.: 30% de 200 = 0,30 × 200 = 60.</li><li>Atalhos: 10% = divide por 10; 50% = metade; 25% = divide por 4; 1% = divide por 100.</li><li><b>Desconto de p%</b>: paga (100 − p)% do preço. <b>Aumento de p%</b>: paga (100 + p)%.</li><li><b>Quantos por cento a é de b</b>: <span class="fr"><span>a</span><span>b</span></span> × 100.</li></ul><div class="ex"><b>Exemplo:</b> camisa de R$ 80 com 15% de desconto → 0,85 × 80 = R$ 68.</div>',
gen:function(r,i){return mix(i,[
function(){var pp=r.p([5,10,12,15,20,25,30,40,45,50,60,75,80]),N=r.i(2,40)*20;return {q:'Quanto é '+pp+'% de '+N+'?',a:n(pp*N/100),s:F(pp,100)+' × '+N+' = '+n(pp*N/100)+'.'};},
function(){var pp=r.p([10,15,20,25,30,40]),P=r.i(4,60)*10;var f=P*(100-pp)/100;return {q:'Um produto custa '+money(P)+' e está com '+pp+'% de desconto. Qual o preço final?',a:money(f),s:'Desconto: '+pp+'% de '+P+' = '+money(P*pp/100)+'. Preço final: '+money(P)+' − '+money(P*pp/100)+' = '+money(f)+'.'};},
function(){var pp=r.p([5,10,20,25,50]),P=r.i(2,50)*20;var f=P*(100+pp)/100;return {q:'Um salário de '+money(P)+' teve aumento de '+pp+'%. Qual o novo valor?',a:money(f),s:'Aumento: '+money(P*pp/100)+'. Novo valor: '+money(f)+' (ou '+n(1+pp/100)+' × '+P+').'};},
function(){var pp=r.p([10,20,25,40,50,60,75,80,5,15]),b=r.i(1,20)*20;var a=b*pp/100;return {q:'Numa turma de '+b+' alunos, '+a+' foram aprovados direto. Que porcentagem isso representa?',a:pp+'%',s:F(a,b)+' × 100 = '+pp+'%.'};},
function(){var pp=r.p([10,20,25,30,40,50]),x=r.i(2,30)*10;var a=x*pp/100;return {q:pp+'% de um número é '+n(a)+'. Qual é esse número?',a:n(x),s:'Se '+pp+'% vale '+n(a)+', então 1% vale '+n(a/pp)+' e 100% vale '+n(x)+'.'};}
]);}});

topic({id:'inteiros-reta-modulo',nome:'Números inteiros: reta numérica, módulo e comparação',ano:'7º ano',area:'Números',
tags:'inteiros negativos positivos reta numérica módulo oposto simétrico comparar',
teoria:'<p>Os <b>números inteiros</b> (ℤ) são …, −3, −2, −1, 0, 1, 2, 3, … Na reta, os negativos ficam à esquerda do zero.</p><ul><li><b>Módulo</b> (valor absoluto) é a distância até o zero: |−7| = 7, |5| = 5.</li><li><b>Oposto (simétrico)</b>: mesmo módulo e sinal contrário. O oposto de −4 é 4.</li><li><b>Comparação</b>: na reta, quem está mais à direita é maior. Todo positivo &gt; 0 &gt; todo negativo.</li><li>Entre dois negativos, o maior é o de <b>menor módulo</b>: −2 &gt; −9.</li><li>Distância entre a e b na reta: |a − b|.</li></ul>',
gen:function(r,i){return mix(i,[
function(){var x=r.nz(-50,50);return {q:'Qual é o módulo de '+n(x)+'?',a:n(Math.abs(x)),s:'Distância de '+n(x)+' até o zero.'};},
function(){var x=r.nz(-60,60);return {q:'Qual é o oposto (simétrico) de '+n(x)+'?',a:n(-x),s:'Mesmo módulo, sinal trocado.'};},
function(){var a=r.i(-20,20),b;do{b=r.i(-20,20);}while(b===a);return {q:'Compare usando &gt; ou &lt;: '+n(a)+' ___ '+n(b),a:n(a)+(a>b?' &gt; ':' &lt; ')+n(b),s:(a>b?n(a):n(b))+' está mais à direita na reta.'};},
function(){var s=[],seen={};while(s.length<4){var x=r.i(-15,15);if(seen[x])continue;seen[x]=1;s.push(x);}var o=s.slice().sort(function(a,b){return a-b;});return {q:'Coloque em ordem crescente: '+s.map(n).join(', '),a:o.map(n).join(' &lt; '),s:'Da esquerda para a direita na reta numérica.'};},
function(){var a=r.i(-15,-1),b=r.i(1,15);return {q:'Qual a distância, na reta numérica, entre '+n(a)+' e '+n(b)+'?',a:n(b-a),s:'|'+n(b)+' − ('+n(a)+')| = '+n(b-a)+'.'};}
]);}});

topic({id:'inteiros-soma-subtracao',nome:'Números inteiros: adição e subtração',ano:'7º ano',area:'Números',
tags:'inteiros somar subtrair sinais negativos jogo de sinais temperatura saldo',
teoria:'<ul><li><b>Sinais iguais</b>: soma os módulos e conserva o sinal. (−3) + (−5) = −8.</li><li><b>Sinais diferentes</b>: subtrai os módulos e fica o sinal do de <b>maior módulo</b>. (−9) + (+4) = −5.</li><li><b>Subtração</b>: somar o oposto. a − b = a + (−b). (+3) − (−7) = 3 + 7 = 10.</li><li>Eliminando parênteses: +(+) = +, +(−) = −, −(+) = −, −(−) = +.</li></ul><div class="ex"><b>Exemplo:</b> −4 − (−10) + (−3) = −4 + 10 − 3 = 3.</div><p class="tip">Pense em dinheiro: negativo é dívida, positivo é ter.</p>',
gen:function(r,i){return mix(i,[
function(){var a=r.nz(-20,20),b=r.nz(-20,20);return {q:'Calcule: '+ps(a)+' + '+ps(b),a:n(a+b),s:(a>0)===(b>0)?'Sinais iguais: soma e conserva o sinal.':'Sinais diferentes: '+Math.max(Math.abs(a),Math.abs(b))+' − '+Math.min(Math.abs(a),Math.abs(b))+' = '+Math.abs(a+b)+', sinal do maior módulo.'};},
function(){var a=r.nz(-20,20),b=r.nz(-20,20);return {q:'Calcule: '+ps(a)+' − '+ps(b),a:n(a-b),s:'Troca a subtração pela soma do oposto: '+ps(a)+' + '+ps(-b)+' = '+n(a-b)+'.'};},
function(){var a=r.nz(-15,15),b=r.nz(-15,15),c=r.nz(-15,15);return {q:'Calcule: '+n(a)+' '+(b<0?'− '+(-b):'+ '+b)+' − ('+n(c)+')',a:n(a+b-c),s:'Elimine os parênteses: −('+n(c)+') = '+(c<0?'+'+(-c):'−'+c)+'. Resultado: '+n(a+b-c)+'.'};},
function(){var t=r.i(-10,-1),s=r.i(3,18);return {q:'De madrugada a temperatura era '+n(t)+' °C. Ao meio-dia tinha subido '+s+' °C. Qual a temperatura ao meio-dia?',a:n(t+s)+' °C',s:n(t)+' + '+s+' = '+n(t+s)+'.'};},
function(){var sal=r.i(-200,300),g=r.i(50,500);return {q:'Meu saldo bancário era de '+moneyS(sal)+' e fiz uma compra de '+money(g)+' no débito. Qual o novo saldo?',a:moneyS(sal-g),s:['Compra no débito = tirar dinheiro = subtrair.',n(sal)+' − '+g+' = '+n(sal-g)+'.',(sal-g<0?'Ficou negativo: a conta está devendo '+money(g-sal)+'.':'Ainda sobra dinheiro na conta.')]};}
]);}});

topic({id:'inteiros-multiplicacao-divisao',nome:'Números inteiros: multiplicação, divisão e potência',ano:'7º ano',area:'Números',
tags:'inteiros multiplicar dividir regra de sinais potência de negativo',
teoria:'<p><b>Regra de sinais</b> (multiplicação e divisão):</p><table class="t"><tr><td>(+) · (+) = +</td><td>(−) · (−) = +</td></tr><tr><td>(+) · (−) = −</td><td>(−) · (+) = −</td></tr></table><p>Sinais <b>iguais</b> → positivo; sinais <b>diferentes</b> → negativo.</p><ul><li>Vários fatores: conte os negativos. Quantidade <b>par</b> → positivo; <b>ímpar</b> → negativo.</li><li><b>Potência de base negativa</b>: expoente par → positivo; ímpar → negativo. (−2)<sup>4</sup> = 16; (−2)<sup>3</sup> = −8.</li><li>Atenção: −2<sup>2</sup> = −4 (só o 2 está elevado), mas (−2)<sup>2</sup> = 4.</li></ul>',
gen:function(r,i){return mix(i,[
function(){var a=r.nz(-12,12),b=r.nz(-12,12);return {q:'Calcule: '+ps(a)+' × '+ps(b),a:n(a*b),s:'Sinais '+((a>0)===(b>0)?'iguais → positivo':'diferentes → negativo')+'; '+Math.abs(a)+' × '+Math.abs(b)+' = '+Math.abs(a*b)+'.'};},
function(){var b=r.nz(-12,12),q=r.nz(-12,12),a=b*q;return {q:'Calcule: '+ps(a)+' ÷ '+ps(b),a:n(q),s:'Sinais '+((a>0)===(b>0)?'iguais → positivo':'diferentes → negativo')+'; '+Math.abs(a)+' ÷ '+Math.abs(b)+' = '+Math.abs(q)+'.'};},
function(){var a=r.nz(-6,6),b=r.nz(-6,6),c=r.nz(-6,6);var neg=[a,b,c].filter(function(x){return x<0;}).length;return {q:'Calcule: '+ps(a)+' × '+ps(b)+' × '+ps(c),a:n(a*b*c),s:neg+' fator(es) negativo(s) → '+(neg%2?'negativo':'positivo')+'; módulo '+Math.abs(a*b*c)+'.'};},
function(){var b=r.i(2,5),e=r.i(2,5);if(b>3)e=r.i(2,3);var v=Math.pow(-b,e);return {q:'Calcule: ('+MINUS+b+')'+sup(e),a:n(v),s:'Expoente '+(e%2?'ímpar → negativo':'par → positivo')+'; '+b+sup(e)+' = '+Math.pow(b,e)+'.'};},
function(){var b=r.i(2,9);return {q:'Calcule: '+MINUS+b+sup(2)+' e ('+MINUS+b+')'+sup(2)+'.',a:n(-b*b)+' e '+n(b*b),s:'Em '+MINUS+b+sup(2)+' só o '+b+' é elevado; em ('+MINUS+b+')'+sup(2)+' o '+MINUS+b+' inteiro é elevado.'};},
function(){var a=r.nz(-9,9),b=r.nz(-9,9),d=r.nz(-6,6),q=r.nz(-8,8),c=d*q;return {q:'Calcule: '+ps(a)+' × '+ps(b)+' + '+ps(c)+' ÷ '+ps(d),a:n(a*b+q),s:ps(a)+' × '+ps(b)+' = '+n(a*b)+'; '+ps(c)+' ÷ '+ps(d)+' = '+n(q)+'; '+n(a*b)+' + '+p(q)+' = '+n(a*b+q)+'.'};}
]);}});

topic({id:'racionais',nome:'Números racionais: operações com sinais',ano:'7º ano',area:'Números',
tags:'racionais frações negativas decimais negativos operações',
teoria:'<p><b>Número racional</b> (ℚ) é todo número que pode ser escrito como fração <span class="fr"><span>a</span><span>b</span></span> com a e b inteiros e b ≠ 0: inteiros, frações, decimais exatos e dízimas periódicas.</p><ul><li>As regras de frações (MMC, multiplicar em linha, inverter na divisão) valem junto com a <b>regra de sinais</b> dos inteiros.</li><li><span class="fr"><span>−a</span><span>b</span></span> = <span class="fr"><span>a</span><span>−b</span></span> = −<span class="fr"><span>a</span><span>b</span></span>.</li></ul><div class="ex"><b>Exemplo:</b> −<span class="fr"><span>2</span><span>3</span></span> + <span class="fr"><span>1</span><span>4</span></span> = −<span class="fr"><span>8</span><span>12</span></span> + <span class="fr"><span>3</span><span>12</span></span> = −<span class="fr"><span>5</span><span>12</span></span>.</div>',
gen:function(r,i){function rf(){var b=r.i(2,9),a=r.nz(-9,9);return Q(a,b);}return mix(i,[
function(){var x=rf(),y=rf();var m=lcm(x.d,y.d),A=x.n*m/x.d,B=y.n*m/y.d;return {q:'Calcule: '+FQ(x)+' + '+pFQ(y),a:FQ(qa(x,y)),s:['Ache o denominador comum (MMC de '+x.d+' e '+y.d+'): '+m+'.','Reescreva as frações com denominador '+m+': '+F(A,m)+' e '+F(B,m)+'.','Some os numeradores com a regra de sinais: '+n(A)+' + '+p(B)+' = '+n(A+B)+' → '+F(A+B,m)+'.'].concat(qa(x,y).d!==m?['Simplifique: '+FQ(qa(x,y))+'.']:[])};},
function(){var x=rf(),y=rf();return {q:'Calcule: '+pFQ(x)+' × '+pFQ(y),a:FQ(qm(x,y)),s:'Multiplica em linha e aplica a regra de sinais: '+FQ(qm(x,y))+'.'};},
function(){var x=rf(),y=rf();return {q:'Calcule: '+pFQ(x)+' ÷ '+pFQ(y),a:FQ(qd(x,y)),s:'Inverte a segunda: '+pFQ(x)+' × '+pFQ(Q(y.d,y.n))+' = '+FQ(qd(x,y))+'.'};},
function(){var a=r.nz(-99,99)/10,b=r.nz(-999,999)/100;return {q:'Calcule: '+n(a)+' + '+p(b),a:n(rnd(a+b,2)),s:'Regra de sinais da adição com vírgula alinhada: '+n(rnd(a+b,2))+'.'};},
function(){var x=Q(-r.i(1,8),r.i(2,9)),y;do{y=Q(-r.i(1,8),r.i(2,9));}while(y.n*x.d===x.n*y.d);var big=(x.n/x.d>y.n/y.d)?x:y;return {q:'Qual é maior: '+FQ(x)+' ou '+FQ(y)+'?',a:FQ(big),s:'Entre negativos, é maior o de menor módulo: '+n(Math.abs(x.n/x.d),3)+' e '+n(Math.abs(y.n/y.d),3)+'.'};}
]);}});
