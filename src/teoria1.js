/* ===== TEORIA APROFUNDADA — NÚMEROS (6º ano) =====
   Atalho: {a/b} vira fração empilhada. */
var TEORIA = {};
function fx(s){return s.replace(/\{([^{}\/]+)\/([^{}]+)\}/g,'<span class="fr"><span>$1</span><span>$2</span></span>');}

TEORIA['sistema-numeracao']=`
<h3>O que é</h3>
<p>Nosso sistema usa só <b>10 algarismos</b> (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) e é <b>posicional</b>: o mesmo algarismo vale coisas diferentes dependendo do lugar onde está. No número 555, o primeiro 5 vale 500, o segundo vale 50 e o último vale 5.</p>
<p>Cada posição vale <b>10 vezes</b> a posição da direita. Juntamos as posições de 3 em 3 em <b>classes</b>:</p>
<table class="t"><tr><th colspan="3">Classe dos milhões</th><th colspan="3">Classe dos milhares</th><th colspan="3">Classe das unidades</th></tr>
<tr><td>C</td><td>D</td><td>U</td><td>C</td><td>D</td><td>U</td><td>C</td><td>D</td><td>U</td></tr>
<tr><td>100.000.000</td><td>10.000.000</td><td>1.000.000</td><td>100.000</td><td>10.000</td><td>1.000</td><td>100</td><td>10</td><td>1</td></tr></table>
<ul><li><b>Valor absoluto</b>: o próprio algarismo (o 7 vale 7).</li><li><b>Valor posicional (ou relativo)</b>: algarismo × valor da casa onde está.</li></ul>
<h3>Caso 1 — Achar o valor posicional</h3>
<div class="ex"><b>Exemplo:</b> no número 4<b class="hl">7</b>.205, quanto vale o 7?<ol><li>Conte as casas da direita para a esquerda: 5 (unidade), 0 (dezena), 2 (centena), 7 (<b>unidade de milhar</b>).</li><li>Unidade de milhar vale 1.000.</li><li>Valor posicional: 7 × 1.000 = <b>7.000</b>.</li></ol></div>
<h3>Caso 2 — Decompor um número</h3>
<div class="ex"><b>Exemplo:</b> decomponha 30.508.<ol><li>Separe cada algarismo com sua casa: 3 dezenas de milhar, 0 unidades de milhar, 5 centenas, 0 dezenas, 8 unidades.</li><li>Escreva só os que não são zero: 3 × 10.000 + 5 × 100 + 8.</li><li>Ou somando: 30.000 + 500 + 8.</li></ol></div>
<h3>Caso 3 — Compor (montar) o número</h3>
<div class="ex"><b>Exemplo:</b> que número é 6 × 100.000 + 4 × 1.000 + 9 × 10?<ol><li>Calcule cada parte: 600.000; 4.000; 90.</li><li>Some: 600.000 + 4.000 + 90 = <b>604.090</b>.</li><li>Dica: monte o quadro de ordens e coloque <b>zero nas casas vazias</b>.</li></ol></div>
<h3>Caso 4 — Arredondar</h3>
<p>Olhe o algarismo <b>logo à direita</b> da casa pedida: se for 5, 6, 7, 8 ou 9 → aumenta 1; se for 0, 1, 2, 3 ou 4 → mantém. Tudo que vem depois vira zero.</p>
<div class="ex"><b>Exemplo A:</b> 2.468 para a dezena → olhe o 8 (≥ 5) → <b>2.470</b>.<br><b>Exemplo B:</b> 2.468 para a centena → olhe o 6 (≥ 5) → <b>2.500</b>.<br><b>Exemplo C:</b> 2.468 para o milhar → olhe o 4 (&lt; 5) → <b>2.000</b>.<br><b>Exemplo D (vai-um em cascata):</b> 3.970 para a centena → olhe o 7 → o 9 vira 10 → <b>4.000</b>.</div>
<h3>Erros comuns</h3><ul><li>Esquecer os zeros das casas vazias na composição (escrever 6.490 em vez de 604.090).</li><li>Confundir valor absoluto com posicional.</li><li>No arredondamento, olhar o algarismo errado (tem que ser o <b>da direita</b> da casa pedida).</li></ul>
<p class="tip"><b>Resumo:</b> casa vale 10× a da direita · valor posicional = algarismo × casa · arredondar: olha o vizinho da direita.</p>`;

TEORIA['expressoes-numericas']=`
<h3>O que é</h3>
<p>Uma expressão numérica é uma “conta grande”, com várias operações juntas. Para todo mundo chegar no <b>mesmo resultado</b>, existe uma ordem obrigatória.</p>
<h3>A ordem das operações</h3>
<ol><li><b>Sinais de associação</b>, de dentro para fora: primeiro ( ), depois [ ], depois { }.</li><li>Dentro de cada um: <b>potências e raízes</b>.</li><li>Depois: <b>multiplicações e divisões</b>, na ordem em que aparecem, da esquerda para a direita.</li><li>Por último: <b>adições e subtrações</b>, também da esquerda para a direita.</li></ol>
<p class="tip">Dica para o aluno: resolva <b>uma coisa por linha</b> e copie o resto igual. Assim não se perde.</p>
<h3>Caso 1 — Sem parênteses, misturando + e ×</h3>
<div class="ex"><b>Exemplo:</b> 20 − 3 × 4 + 8 ÷ 2<ol><li>Multiplicações e divisões primeiro: 3 × 4 = 12 e 8 ÷ 2 = 4.</li><li>Fica: 20 − 12 + 4.</li><li>Da esquerda para a direita: 20 − 12 = 8; 8 + 4 = <b>12</b>.</li></ol></div>
<h3>Caso 2 — Só × e ÷ (atenção à ordem!)</h3>
<div class="ex"><b>Exemplo:</b> 24 ÷ 4 × 2<ol><li>Mesma prioridade: faz na ordem em que aparecem.</li><li>24 ÷ 4 = 6; 6 × 2 = <b>12</b>.</li><li>Errado seria fazer 4 × 2 = 8 e 24 ÷ 8 = 3.</li></ol></div>
<h3>Caso 3 — Só + e − (atenção à ordem!)</h3>
<div class="ex"><b>Exemplo:</b> 15 − 6 + 4 → 15 − 6 = 9; 9 + 4 = <b>13</b> (e não 15 − 10 = 5).</div>
<h3>Caso 4 — Com parênteses, colchetes e chaves</h3>
<div class="ex"><b>Exemplo:</b> 50 − {4 × [3 + (10 − 4) ÷ 2]}<ol><li>Parênteses: 10 − 4 = 6 → 50 − {4 × [3 + 6 ÷ 2]}</li><li>Dentro do colchete, divisão antes: 6 ÷ 2 = 3 → 50 − {4 × [3 + 3]}</li><li>Colchete: 3 + 3 = 6 → 50 − {4 × 6}</li><li>Chaves: 4 × 6 = 24 → 50 − 24 = <b>26</b>.</li></ol></div>
<h3>Caso 5 — Com potência</h3>
<div class="ex"><b>Exemplo:</b> 2 + 3² × 2<ol><li>Potência: 3² = 9 → 2 + 9 × 2.</li><li>Multiplicação: 9 × 2 = 18 → 2 + 18 = <b>20</b>.</li></ol></div>
<h3>Erros comuns</h3><ul><li>Resolver da esquerda para a direita ignorando a prioridade (20 − 3 × 4 = 17 × 4 ✗).</li><li>Fazer a multiplicação antes da divisão quando a divisão vem primeiro.</li><li>Esquecer de copiar um pedaço da expressão na linha seguinte.</li></ul>`;

TEORIA['potenciacao']=`
<h3>O que é</h3>
<p>Potência é uma forma curta de escrever uma <b>multiplicação de fatores iguais</b>.</p>
<p class="big">a<sup>n</sup> = a × a × a × … × a &nbsp;(n vezes)</p>
<p><b>a</b> é a <b>base</b> (o número que se repete) e <b>n</b> é o <b>expoente</b> (quantas vezes ele aparece). Lemos 5<sup>3</sup> como “cinco elevado ao cubo” ou “cinco à terceira”.</p>
<h3>Caso 1 — Calcular a potência</h3>
<div class="ex"><b>Exemplo:</b> 2<sup>5</sup> = 2 × 2 × 2 × 2 × 2. Vá de dois em dois: 2 × 2 = 4; 4 × 2 = 8; 8 × 2 = 16; 16 × 2 = <b>32</b>.</div>
<h3>Caso 2 — Expoente 1 e expoente 0</h3>
<div class="ex">7<sup>1</sup> = 7 (o número aparece uma vez). &nbsp; 7<sup>0</sup> = 1 (qualquer número diferente de zero elevado a zero dá 1).<br><i>Por quê?</i> 7<sup>3</sup> ÷ 7<sup>3</sup> = 1, e pela regra da divisão dá 7<sup>3−3</sup> = 7<sup>0</sup>.</div>
<h3>Caso 3 — Base 1, base 0 e base 10</h3>
<div class="ex">1<sup>n</sup> = 1 sempre. &nbsp; 0<sup>n</sup> = 0 (n ≥ 1). &nbsp; 10<sup>n</sup> = 1 seguido de n zeros: 10<sup>4</sup> = 10.000.<br>3 × 10<sup>5</sup> = 300.000.</div>
<h3>Caso 4 — Multiplicação de mesma base</h3>
<div class="ex">a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup>. <b>Conserva a base e soma os expoentes.</b><br>2<sup>3</sup> × 2<sup>4</sup> = (2×2×2) × (2×2×2×2) = 2<sup>7</sup> = 128.</div>
<h3>Caso 5 — Divisão de mesma base</h3>
<div class="ex">a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup>. <b>Conserva a base e subtrai os expoentes.</b><br>5<sup>6</sup> ÷ 5<sup>4</sup> = 5<sup>2</sup> = 25.</div>
<h3>Caso 6 — Potência de potência</h3>
<div class="ex">(a<sup>m</sup>)<sup>n</sup> = a<sup>m×n</sup>. <b>Multiplica os expoentes.</b><br>(3<sup>2</sup>)<sup>3</sup> = 3<sup>2</sup> × 3<sup>2</sup> × 3<sup>2</sup> = 3<sup>6</sup> = 729.</div>
<h3>Quadrados e cubos para decorar</h3>
<table class="t"><tr><td>1²=1</td><td>2²=4</td><td>3²=9</td><td>4²=16</td><td>5²=25</td><td>6²=36</td><td>7²=49</td></tr><tr><td>8²=64</td><td>9²=81</td><td>10²=100</td><td>11²=121</td><td>12²=144</td><td>13²=169</td><td>15²=225</td></tr><tr><td>2³=8</td><td>3³=27</td><td>4³=64</td><td>5³=125</td><td>6³=216</td><td>10³=1000</td><td></td></tr></table>
<h3>Erros comuns</h3><ul><li>Fazer base × expoente: 2<sup>3</sup> = 6 ✗ (o certo é 8).</li><li>Achar que a<sup>0</sup> = 0 ✗ (é 1).</li><li>Somar expoentes de bases diferentes: 2<sup>3</sup> × 3<sup>2</sup> não vira 6<sup>5</sup>.</li></ul>`;

TEORIA['radiciacao']=`
<h3>O que é</h3>
<p>A radiciação é a operação <b>inversa da potenciação</b>. Pergunta: “que número, elevado a tal expoente, dá este resultado?”</p>
<ul><li><b>Raiz quadrada</b>: √49 = 7 porque 7² = 49.</li><li><b>Raiz cúbica</b>: ∛8 = 2 porque 2³ = 8.</li></ul>
<p>Em √49, o 49 é o <b>radicando</b> e o símbolo √ é o <b>radical</b>. Quando não aparece número pequeno no radical, o índice é 2 (raiz quadrada).</p>
<h3>Caso 1 — Raiz de quadrado perfeito</h3>
<div class="ex"><b>Exemplo:</b> √144. Pense: que número vezes ele mesmo dá 144? 12 × 12 = 144 → <b>√144 = 12</b>.<br>Dica: quadrados perfeitos terminam em 0, 1, 4, 5, 6 ou 9. Se termina em 2, 3, 7 ou 8, <b>não</b> é quadrado perfeito.</div>
<h3>Caso 2 — Raiz pela fatoração (números grandes)</h3>
<div class="ex"><b>Exemplo:</b> √576.<ol><li>Fatore: 576 = 2 × 2 × 2 × 2 × 2 × 2 × 3 × 3 = 2⁶ × 3².</li><li>Na raiz quadrada, divida os expoentes por 2: 2³ × 3¹.</li><li>2³ × 3 = 8 × 3 = <b>24</b>.</li></ol></div>
<h3>Caso 3 — Raiz cúbica</h3>
<div class="ex"><b>Exemplo:</b> ∛125 → que número × ele × ele dá 125? 5 × 5 × 5 = 125 → <b>5</b>.</div>
<h3>Caso 4 — Raiz que não é exata (estimar)</h3>
<div class="ex"><b>Exemplo:</b> entre quais inteiros está √50?<ol><li>Procure os quadrados perfeitos vizinhos: 49 (7²) e 64 (8²).</li><li>49 &lt; 50 &lt; 64, então 7 &lt; √50 &lt; 8.</li><li>Como 50 está muito perto de 49, √50 ≈ 7,07.</li></ol></div>
<h3>Caso 5 — Raiz de fração</h3>
<div class="ex">√{9/25}: tire a raiz de cima e de baixo: √9 = 3 e √25 = 5 → <b>{3/5}</b>.</div>
<h3>Caso 6 — Raiz numa expressão</h3>
<div class="ex">√81 + √16 × 2 = 9 + 4 × 2 = 9 + 8 = <b>17</b> (raízes contam como potências na ordem das operações).</div>
<h3>Erros comuns</h3><ul><li>Dividir por 2: √16 = 8 ✗ (o certo é 4).</li><li>√(9 + 16) ≠ √9 + √16. O certo: √25 = 5, e não 3 + 4 = 7.</li></ul>`;

TEORIA['multiplos-divisores']=`
<h3>O que é</h3>
<ul><li><b>Múltiplos</b> de um número: o que se obtém multiplicando-o por 0, 1, 2, 3, … São <b>infinitos</b>. M(6) = {0, 6, 12, 18, 24, …}.</li><li><b>Divisores</b> de um número: os que o dividem <b>sem deixar resto</b>. São <b>finitos</b>. D(18) = {1, 2, 3, 6, 9, 18}.</li><li>Se 18 é múltiplo de 6, então 6 é divisor de 18 (é a mesma relação vista dos dois lados).</li></ul>
<h3>Caso 1 — Listar múltiplos</h3>
<div class="ex">Os 5 primeiros múltiplos de 7: 7×0, 7×1, 7×2, 7×3, 7×4 → <b>0, 7, 14, 21, 28</b>.</div>
<h3>Caso 2 — Listar todos os divisores (método dos pares)</h3>
<div class="ex"><b>Exemplo:</b> divisores de 36.<ol><li>Teste 1, 2, 3, … anotando os pares que multiplicam 36: 1×36, 2×18, 3×12, 4×9, 6×6.</li><li>Parou quando os números se encontraram (6 e 6).</li><li>D(36) = <b>{1, 2, 3, 4, 6, 9, 12, 18, 36}</b>.</li></ol></div>
<h3>Caso 3 — Critérios de divisibilidade (sem fazer a conta)</h3>
<table class="t"><tr><th>Por</th><th>Regra</th><th>Exemplo</th></tr>
<tr><td>2</td><td>termina em 0, 2, 4, 6, 8</td><td>1.358 ✓</td></tr>
<tr><td>3</td><td>soma dos algarismos divisível por 3</td><td>471 → 4+7+1 = 12 ✓</td></tr>
<tr><td>4</td><td>dois últimos algarismos formam múltiplo de 4 (ou 00)</td><td>3.128 → 28 ✓</td></tr>
<tr><td>5</td><td>termina em 0 ou 5</td><td>2.345 ✓</td></tr>
<tr><td>6</td><td>divisível por 2 <b>e</b> por 3</td><td>354 → par e 3+5+4=12 ✓</td></tr>
<tr><td>8</td><td>três últimos formam múltiplo de 8</td><td>5.120 → 120 ✓</td></tr>
<tr><td>9</td><td>soma dos algarismos divisível por 9</td><td>738 → 18 ✓</td></tr>
<tr><td>10</td><td>termina em 0</td><td>4.560 ✓</td></tr></table>
<div class="ex"><b>Exemplo completo:</b> 2.430 é divisível por 2, 3, 5, 6, 9 e 10?<ul><li>2: termina em 0 → sim. 5 e 10: termina em 0 → sim.</li><li>3 e 9: 2+4+3+0 = 9 → divisível por 3 e por 9 → sim.</li><li>6: é por 2 e por 3 → sim.</li></ul></div>
<h3>Caso 4 — “É múltiplo de?” / “É divisor de?”</h3>
<div class="ex">91 é múltiplo de 7? 91 ÷ 7 = 13, resto 0 → <b>sim</b> (91 = 7 × 13).<br>8 é divisor de 60? 60 ÷ 8 = 7, resto 4 → <b>não</b>.</div>
<h3>Erros comuns</h3><ul><li>Esquecer o 0 nos múltiplos e o 1 e o próprio número nos divisores.</li><li>Usar o critério do 3 para o 4 (o do 4 olha os dois últimos algarismos).</li></ul>`;

TEORIA['primos-fatoracao']=`
<h3>O que é</h3>
<ul><li><b>Número primo</b>: tem <b>exatamente dois divisores</b>, o 1 e ele mesmo. Ex.: 2, 3, 5, 7, 11, 13.</li><li><b>Número composto</b>: tem mais de dois divisores. Ex.: 12 (1, 2, 3, 4, 6, 12).</li><li>O <b>1 não é primo nem composto</b> (só tem 1 divisor). O <b>2 é o único primo par</b>.</li></ul>
<p>Primos até 100: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97.</p>
<h3>Caso 1 — Descobrir se um número é primo</h3>
<div class="ex"><b>Exemplo:</b> 91 é primo?<ol><li>Teste a divisão pelos primos em ordem: 2, 3, 5, 7…</li><li>Só precisa testar até a raiz do número (√91 ≈ 9,5 → até o 7).</li><li>91 ÷ 7 = 13 → divide! Então 91 <b>não</b> é primo.</li></ol>
<b>Exemplo:</b> 97 é primo? Teste 2, 3, 5, 7 (√97 ≈ 9,8). Nenhum divide → <b>é primo</b>.</div>
<h3>Caso 2 — Fatorar (decompor em fatores primos)</h3>
<p>Divida pelo <b>menor primo possível</b>, repita até chegar a 1. O resultado é o produto dos primos usados.</p>
<div class="ex"><b>Exemplo:</b> 360<br>360 | 2<br>180 | 2<br>&nbsp;90 | 2<br>&nbsp;45 | 3<br>&nbsp;15 | 3<br>&nbsp;&nbsp;5 | 5<br>&nbsp;&nbsp;1<br>360 = 2 × 2 × 2 × 3 × 3 × 5 = <b>2³ × 3² × 5</b>.</div>
<h3>Caso 3 — Listar primos de um intervalo (Crivo)</h3>
<div class="ex">Primos entre 20 e 40: risque os pares, os múltiplos de 3 (21, 27, 33, 39), de 5 (25, 35) e de 7 (35). Sobram <b>23, 29, 31, 37</b>.</div>
<h3>Para que serve</h3><p>A fatoração é a base do <b>MMC</b>, do <b>MDC</b>, da <b>simplificação de frações</b> e da <b>simplificação de raízes</b>.</p>
<h3>Erros comuns</h3><ul><li>Dizer que 1 é primo.</li><li>Achar que todo ímpar é primo (9, 15, 21, 27… não são).</li><li>Parar a fatoração num número composto (ex.: deixar um 9 no fim em vez de 3 × 3).</li></ul>`;

TEORIA['mmc']=`
<h3>O que é</h3>
<p><b>MMC</b> (mínimo múltiplo comum) é o <b>menor número, diferente de zero, que é múltiplo de todos</b> os números dados.</p>
<p>Múltiplos de 4: 4, 8, <b>12</b>, 16, 20, <b>24</b>… · Múltiplos de 6: 6, <b>12</b>, 18, <b>24</b>… → comuns: 12, 24, … → MMC(4, 6) = <b>12</b>.</p>
<h3>Método 1 — Listar múltiplos (números pequenos)</h3>
<div class="ex">MMC(3, 5): múltiplos de 5 → 5, 10, <b>15</b>. O primeiro que também é múltiplo de 3 é 15.</div>
<h3>Método 2 — Fatoração simultânea (o mais usado)</h3>
<div class="ex"><b>Exemplo:</b> MMC(12, 18, 20)<br>12, 18, 20 | 2<br>&nbsp;6, &nbsp;9, 10 | 2<br>&nbsp;3, &nbsp;9, &nbsp;5 | 3<br>&nbsp;1, &nbsp;3, &nbsp;5 | 3<br>&nbsp;1, &nbsp;1, &nbsp;5 | 5<br>&nbsp;1, &nbsp;1, &nbsp;1<br>MMC = 2 × 2 × 3 × 3 × 5 = <b>180</b>.<br><i>Regra:</i> divide <b>quem der</b>; quem não divide, desce igual.</div>
<h3>Método 3 — Pela fatoração separada</h3>
<div class="ex">12 = 2² × 3; 18 = 2 × 3² → pegue <b>todos</b> os primos, com o <b>maior</b> expoente: 2² × 3² = <b>36</b>.</div>
<h3>Casos especiais (atalhos)</h3>
<ul><li>Um número é múltiplo do outro: o MMC é o maior. MMC(6, 18) = 18.</li><li>Os números são primos entre si (não têm divisor comum): o MMC é o produto. MMC(8, 9) = 72.</li></ul>
<h3>Problemas típicos: “quando acontece junto de novo?”</h3>
<div class="ex"><b>Exemplo:</b> um remédio é tomado a cada 6 h e outro a cada 8 h. Tomei os dois às 7h. Quando tomo juntos de novo?<ol><li>Procuro o primeiro momento comum aos dois ciclos → MMC(6, 8) = 24.</li><li>24 h depois → amanhã às <b>7h</b>.</li></ol>
<b>Exemplo:</b> uma luz pisca a cada 12 s e outra a cada 15 s. MMC(12, 15) = 60 → piscam juntas a cada <b>1 minuto</b>.</div>
<p class="tip">Como saber se é MMC ou MDC? Se a resposta tem que ser <b>maior</b> que os números (tempo de reencontro) → MMC. Se tem que ser <b>menor</b> (dividir em pedaços) → MDC.</p>`;

TEORIA['mdc']=`
<h3>O que é</h3>
<p><b>MDC</b> (máximo divisor comum) é o <b>maior número que divide todos</b> os números dados, sem resto.</p>
<p>D(12) = &#123;1, 2, 3, 4, <b>6</b>, 12&#125; · D(18) = &#123;1, 2, 3, <b>6</b>, 9, 18&#125; → comuns: 1, 2, 3, 6 → MDC(12, 18) = <b>6</b>.</p>
<h3>Método 1 — Listar divisores (números pequenos)</h3><div class="ex">Exemplo acima.</div>
<h3>Método 2 — Fatoração</h3>
<div class="ex">48 = 2⁴ × 3; 72 = 2³ × 3² → pegue <b>só os primos comuns</b>, com o <b>menor</b> expoente: 2³ × 3 = <b>24</b>.</div>
<h3>Método 3 — Fatoração simultânea (só quando divide todos)</h3>
<div class="ex">MDC(36, 60)<br>36, 60 | 2 ✓ (divide os dois)<br>18, 30 | 2 ✓<br>&nbsp;9, 15 | 3 ✓<br>&nbsp;3, &nbsp;5 → nenhum primo divide os dois → para.<br>MDC = 2 × 2 × 3 = <b>12</b>.</div>
<h3>Método 4 — Divisões sucessivas (Euclides)</h3>
<div class="ex">MDC(84, 36): 84 ÷ 36 = 2 resto 12 → 36 ÷ 12 = 3 resto 0. O último divisor é <b>12</b>.</div>
<h3>Problemas típicos: “dividir em partes iguais do maior tamanho”</h3>
<div class="ex"><b>Exemplo (cortar):</b> tábuas de 120 cm e 180 cm em pedaços iguais, os maiores possíveis.<ol><li>O pedaço tem que caber exatamente nas duas → divisor comum. O maior → MDC.</li><li>MDC(120, 180) = 60 → pedaços de <b>60 cm</b>.</li><li>Quantos pedaços? 120 ÷ 60 + 180 ÷ 60 = 2 + 3 = <b>5</b>.</li></ol>
<b>Exemplo (kits):</b> 24 balas e 36 pirulitos em saquinhos iguais, o maior número de saquinhos. MDC(24, 36) = 12 saquinhos, cada um com 2 balas e 3 pirulitos.</div>
<h3>Atalhos</h3><ul><li>Se um divide o outro, o MDC é o menor: MDC(8, 24) = 8.</li><li>Se MDC = 1, os números são <b>primos entre si</b>.</li><li>MMC × MDC = produto dos dois números (para dois números).</li></ul>`;

TEORIA['fracoes']=`
<h3>O que é</h3>
<p>Fração representa <b>partes de um inteiro</b> dividido em partes <b>iguais</b>. Em {3/4}: o <b>denominador</b> (4) diz em quantas partes o inteiro foi dividido; o <b>numerador</b> (3) diz quantas partes pegamos.</p>
<p>Fração também é <b>divisão</b>: {3/4} = 3 ÷ 4 = 0,75.</p>
<h3>Tipos</h3><ul><li><b>Própria</b>: numerador menor que denominador ({2/5}), vale menos que 1.</li><li><b>Imprópria</b>: numerador maior ou igual ({7/4}), vale 1 ou mais.</li><li><b>Aparente</b>: numerador múltiplo do denominador ({8/4} = 2), é um inteiro disfarçado.</li><li><b>Número misto</b>: inteiro + fração própria (1 {3/4}).</li></ul>
<h3>Caso 1 — Frações equivalentes</h3>
<div class="ex">Multiplicando (ou dividindo) <b>em cima e embaixo pelo mesmo número</b>, a fração não muda de valor:<br>{2/3} = {4/6} = {6/9} = {8/12} (×2, ×3, ×4).<br><b>Achar o termo que falta:</b> {3/5} = {?/20} → o 5 virou 20 (×4), então o 3 vira 3 × 4 = <b>12</b>.</div>
<h3>Caso 2 — Simplificar</h3>
<div class="ex"><b>Exemplo:</b> {36/48}<ol><li>Divida em cima e embaixo por um número que divide os dois: ÷2 → {18/24}; ÷2 → {9/12}; ÷3 → {3/4}.</li><li>Atalho: divida direto pelo MDC(36, 48) = 12 → {3/4}.</li><li>{3/4} é <b>irredutível</b> (não dá mais para simplificar).</li></ol></div>
<h3>Caso 3 — Fração de uma quantidade</h3>
<div class="ex"><b>Exemplo:</b> {2/5} de 40 alunos.<ol><li>Divida pelo denominador: 40 ÷ 5 = 8 (cada “quinto” tem 8 alunos).</li><li>Multiplique pelo numerador: 8 × 2 = <b>16 alunos</b>.</li></ol>
<b>Caminho inverso:</b> {3/4} de um número é 15. Qual o número? 15 ÷ 3 = 5 (cada quarto) → 5 × 4 = <b>20</b>.</div>
<h3>Caso 4 — Misto ↔ imprópria</h3>
<div class="ex"><b>Misto → imprópria:</b> 2 {3/5} → (2 × 5 + 3) / 5 = {13/5}.<br><b>Imprópria → misto:</b> {17/4} → 17 ÷ 4 = 4, resto 1 → 4 {1/4}.</div>
<h3>Erros comuns</h3><ul><li>Simplificar dividindo só o numerador.</li><li>Achar que {1/5} &gt; {1/3} porque 5 &gt; 3 (é o contrário: pedaços menores).</li><li>Somar em vez de multiplicar no misto → imprópria.</li></ul>`;

TEORIA['comparacao-fracoes']=`
<h3>Ideia</h3><p>Comparar frações é descobrir <b>qual pedaço é maior</b>. Há três situações:</p>
<h3>Caso 1 — Mesmo denominador</h3>
<div class="ex">Pedaços do mesmo tamanho: ganha quem tem <b>mais pedaços</b> (maior numerador).<br>{5/8} &gt; {3/8}.</div>
<h3>Caso 2 — Mesmo numerador</h3>
<div class="ex">Mesma quantidade de pedaços: ganha quem tem <b>pedaços maiores</b> (menor denominador).<br>{3/4} &gt; {3/7}, porque dividir em 4 dá pedaços maiores que dividir em 7.</div>
<h3>Caso 3 — Tudo diferente: igualar denominadores (MMC)</h3>
<div class="ex"><b>Exemplo:</b> {3/4} ou {5/6}?<ol><li>MMC(4, 6) = 12.</li><li>{3/4} = {9/12} e {5/6} = {10/12}.</li><li>Agora o denominador é igual: 10 &gt; 9 → <b>{5/6} &gt; {3/4}</b>.</li></ol></div>
<h3>Caso 4 — Atalho: multiplicação cruzada</h3>
<div class="ex">{a/b} ? {c/d} → compare <b>a × d</b> com <b>c × b</b>.<br>{2/3} ? {5/8}: 2 × 8 = 16 e 5 × 3 = 15 → 16 &gt; 15 → <b>{2/3} &gt; {5/8}</b>.</div>
<h3>Caso 5 — Ordenar várias frações</h3>
<div class="ex">Ordem crescente de {1/2}, {2/3}, {3/8}:<ol><li>MMC(2, 3, 8) = 24.</li><li>{12/24}, {16/24}, {9/24}.</li><li>Crescente: {9/24} &lt; {12/24} &lt; {16/24} → <b>{3/8} &lt; {1/2} &lt; {2/3}</b>.</li></ol></div>
<h3>Caso 6 — Comparar com 1 e com {1/2}</h3>
<div class="ex">Fração própria &lt; 1 &lt; imprópria. Para comparar com {1/2}: o numerador é maior que a metade do denominador? {4/7}: metade de 7 é 3,5 e 4 &gt; 3,5 → {4/7} &gt; {1/2}.</div>`;

TEORIA['soma-subtracao-fracoes']=`
<h3>Ideia</h3><p>Só dá para somar pedaços <b>do mesmo tamanho</b>. Por isso, os denominadores precisam ser iguais.</p>
<h3>Caso 1 — Denominadores iguais</h3>
<div class="ex">{2/7} + {3/7} = {5/7}. &nbsp;{6/9} − {2/9} = {4/9}.<br>Soma (ou subtrai) os numeradores e <b>conserva</b> o denominador.</div>
<h3>Caso 2 — Denominadores diferentes (MMC)</h3>
<div class="ex"><b>Exemplo:</b> {1/4} + {5/6}<ol><li>MMC(4, 6) = 12 → novo denominador.</li><li>Divide pelo de baixo e multiplica pelo de cima: 12 ÷ 4 × 1 = 3 → {3/12}; 12 ÷ 6 × 5 = 10 → {10/12}.</li><li>Soma: {3/12} + {10/12} = {13/12}.</li><li>Pode virar misto: 1 {1/12}.</li></ol></div>
<h3>Caso 3 — Subtração com denominadores diferentes</h3>
<div class="ex">{5/6} − {3/8}: MMC(6, 8) = 24 → {20/24} − {9/24} = <b>{11/24}</b>.</div>
<h3>Caso 4 — Inteiro com fração</h3>
<div class="ex">3 − {2/5}: escreva 3 como {15/5} → {15/5} − {2/5} = <b>{13/5}</b>.</div>
<h3>Caso 5 — Números mistos</h3>
<div class="ex">2 {1/3} + 1 {1/2}: transforme em impróprias → {7/3} + {3/2} → MMC 6 → {14/6} + {9/6} = {23/6} = <b>3 {5/6}</b>.</div>
<h3>Caso 6 — Três ou mais frações</h3>
<div class="ex">{1/2} + {1/3} − {1/4}: MMC(2, 3, 4) = 12 → {6/12} + {4/12} − {3/12} = <b>{7/12}</b>.</div>
<h3>Caso 7 — Problema “quanto sobrou”</h3>
<div class="ex">Gastei {1/3} do salário com aluguel e {1/4} com mercado. Que fração sobrou?<ol><li>Gastei {1/3} + {1/4} = {4/12} + {3/12} = {7/12}.</li><li>O salário inteiro é {12/12}. Sobrou {12/12} − {7/12} = <b>{5/12}</b>.</li></ol></div>
<h3>Erros comuns</h3><ul><li>Somar os denominadores: {1/2} + {1/3} = {2/5} ✗.</li><li>Esquecer de simplificar o resultado no final.</li></ul>`;

TEORIA['multiplicacao-divisao-fracoes']=`
<h3>Multiplicação</h3>
<p><b>Numerador × numerador</b> e <b>denominador × denominador</b>. Não precisa de MMC!</p>
<div class="ex"><b>Caso 1:</b> {2/3} × {4/5} = {8/15}.<br><b>Caso 2 — simplificar antes (cruzado):</b> {4/9} × {3/8}: o 4 e o 8 simplificam por 4 (viram 1 e 2); o 3 e o 9 por 3 (viram 1 e 3) → {1/3} × {1/2} = <b>{1/6}</b>.<br><b>Caso 3 — inteiro × fração:</b> 6 × {2/3} = {6/1} × {2/3} = {12/3} = <b>4</b>.<br><b>Caso 4 — “de” é vezes:</b> {1/2} de {3/4} = {1/2} × {3/4} = <b>{3/8}</b>.</div>
<h3>Divisão</h3>
<p><b>Conserva a primeira, inverte a segunda e multiplica</b> (“mantém, inverte, multiplica”).</p>
<div class="ex"><b>Caso 5:</b> {3/4} ÷ {2/5} = {3/4} × {5/2} = <b>{15/8}</b>.<br><b>Caso 6 — fração ÷ inteiro:</b> {6/7} ÷ 3 = {6/7} × {1/3} = {6/21} = <b>{2/7}</b>.<br><b>Caso 7 — inteiro ÷ fração:</b> 5 ÷ {1/4} = 5 × 4 = <b>20</b> (quantos quartos cabem em 5 inteiros? 20).<br><b>Caso 8 — mistos:</b> 1 {1/2} ÷ {3/4} = {3/2} × {4/3} = {12/6} = <b>2</b>.</div>
<h3>Por que inverter? (para explicar)</h3>
<p>Dividir por {1/2} é perguntar “quantas metades cabem?”. Em 3 inteiros cabem 6 metades → 3 ÷ {1/2} = 3 × 2 = 6.</p>
<h3>Problemas típicos</h3>
<div class="ex">Quantos copos de {1/4} L enchem uma garrafa de 2 L? 2 ÷ {1/4} = 2 × 4 = <b>8 copos</b>.<br>Uma receita usa {3/4} de xícara de açúcar. Para meia receita: {1/2} × {3/4} = <b>{3/8}</b> de xícara.</div>
<h3>Erros comuns</h3><ul><li>Usar MMC na multiplicação (não precisa).</li><li>Inverter a primeira fração na divisão em vez da segunda.</li></ul>`;

TEORIA['decimais']=`
<h3>O que é</h3>
<p>Número decimal é outra forma de escrever frações de denominador 10, 100, 1000…: 0,7 = {7/10}; 0,25 = {25/100}; 3,125 = 3 + {125/1000}.</p>
<p>Depois da vírgula: <b>décimos</b>, <b>centésimos</b>, <b>milésimos</b>. Zeros no fim não mudam o valor: 2,5 = 2,50 = 2,500.</p>
<h3>Caso 1 — Adição e subtração</h3>
<div class="ex"><b>Vírgula embaixo de vírgula</b> e complete com zeros.<br>&nbsp;12,50<br>+ 3,75<br>= 16,25<br>Subtração: 10 − 3,47 → 10,00 − 3,47 = <b>6,53</b>.</div>
<h3>Caso 2 — Multiplicação</h3>
<div class="ex"><b>Exemplo:</b> 2,4 × 1,35<ol><li>Multiplique sem vírgula: 24 × 135 = 3240.</li><li>Conte as casas decimais dos fatores: 1 + 2 = 3.</li><li>Coloque 3 casas no resultado: <b>3,240</b> = 3,24.</li></ol></div>
<h3>Caso 3 — Multiplicar e dividir por 10, 100, 1000</h3>
<div class="ex">× 10, 100, 1000 → vírgula anda 1, 2, 3 casas para a <b>direita</b>: 3,57 × 100 = 357.<br>÷ 10, 100, 1000 → vírgula anda para a <b>esquerda</b>: 3,57 ÷ 100 = 0,0357.</div>
<h3>Caso 4 — Divisão por número inteiro</h3>
<div class="ex">9,6 ÷ 4: divida normalmente e coloque a vírgula no quociente quando “passar” pela vírgula → <b>2,4</b>.</div>
<h3>Caso 5 — Divisão por decimal</h3>
<div class="ex"><b>Exemplo:</b> 7,5 ÷ 0,25<ol><li>Iguale as casas: 7,50 e 0,25 (as duas com 2 casas).</li><li>Tire as vírgulas (×100 nos dois): 750 ÷ 25.</li><li>750 ÷ 25 = <b>30</b>.</li></ol></div>
<h3>Caso 6 — Divisão que “não fecha”</h3>
<div class="ex">7 ÷ 4: 7 ÷ 4 = 1 resto 3 → coloque vírgula e um zero: 30 ÷ 4 = 7 resto 2 → 20 ÷ 4 = 5 → <b>1,75</b>.</div>
<h3>Caso 7 — Comparar decimais</h3>
<div class="ex">0,5 ou 0,45? Iguale as casas: 0,50 e 0,45 → <b>0,5 &gt; 0,45</b>. (Não é o “maior número de algarismos” que ganha!)</div>`;

TEORIA['fracao-decimal']=`
<h3>Fração → decimal</h3>
<div class="ex"><b>Caso 1 — dividindo:</b> {3/8} = 3 ÷ 8 = <b>0,375</b>.<br><b>Caso 2 — truque do denominador 10, 100, 1000:</b> {7/20} → multiplique em cima e embaixo por 5 → {35/100} = <b>0,35</b>. &nbsp;{3/25} = {12/100} = 0,12.<br><b>Caso 3 — fração imprópria:</b> {9/4} = 9 ÷ 4 = <b>2,25</b>.<br><b>Caso 4 — dá dízima:</b> {2/3} = 0,666… (decimal infinito periódico).</div>
<p class="tip">Uma fração irredutível dá decimal <b>exato</b> só se o denominador tiver apenas os fatores 2 e/ou 5.</p>
<h3>Decimal → fração</h3>
<ol><li>Escreva o número <b>sem vírgula</b> no numerador.</li><li>No denominador, <b>1 seguido de tantos zeros quantas forem as casas decimais</b>.</li><li>Simplifique.</li></ol>
<div class="ex"><b>Caso 5:</b> 0,6 = {6/10} = <b>{3/5}</b>.<br><b>Caso 6:</b> 0,75 = {75/100} = <b>{3/4}</b> (÷25).<br><b>Caso 7:</b> 0,125 = {125/1000} = <b>{1/8}</b> (÷125).<br><b>Caso 8 — com parte inteira:</b> 2,4 = {24/10} = <b>{12/5}</b> (ou 2 {2/5}).</div>
<h3>Tabela útil</h3>
<table class="t"><tr><td>{1/2} = 0,5</td><td>{1/4} = 0,25</td><td>{3/4} = 0,75</td><td>{1/5} = 0,2</td></tr><tr><td>{1/8} = 0,125</td><td>{1/10} = 0,1</td><td>{1/20} = 0,05</td><td>{1/3} = 0,333…</td></tr></table>`;
