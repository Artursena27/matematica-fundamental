/* ===== TEORIA APROFUNDADA — ÁLGEBRA ===== */
TEORIA['valor-numerico']=`
<h3>O que é</h3>
<p><b>Expressão algébrica</b> é uma expressão com <b>letras</b> (variáveis) e números: 2x + 5, a² − 3b, {b × h/2}. A letra representa um número que pode mudar.</p>
<p><b>Valor numérico</b> é o resultado quando trocamos as letras por números.</p>
<ul><li>3x significa 3 · x (a multiplicação fica “escondida”).</li><li>xy significa x · y.</li><li>x² significa x · x.</li></ul>
<h3>O passo a passo</h3><ol><li>Reescreva a expressão trocando cada letra pelo número <b>entre parênteses</b>.</li><li>Resolva respeitando a ordem: potências → multiplicações/divisões → somas/subtrações.</li></ol>
<h3>Caso 1 — Valor positivo</h3>
<div class="ex">2x + 5 para x = 4 → 2·(4) + 5 = 8 + 5 = <b>13</b>.</div>
<h3>Caso 2 — Valor negativo (o parêntese salva!)</h3>
<div class="ex">x² − 3x para x = −2 → (−2)² − 3·(−2) = 4 + 6 = <b>10</b>.<br>Sem parêntese o aluno escreveria −2² − 3·−2 e erraria.</div>
<h3>Caso 3 — Duas variáveis</h3>
<div class="ex">3a − 2b para a = 5 e b = −1 → 3·(5) − 2·(−1) = 15 + 2 = <b>17</b>.</div>
<h3>Caso 4 — Com fração</h3>
<div class="ex">{x + y/2} para x = 7 e y = 3 → {7 + 3/2} = {10/2} = <b>5</b>.<br>4x² para x = {1/2} → 4 · {1/4} = <b>1</b>.</div>
<h3>Caso 5 — Fórmulas do dia a dia</h3>
<div class="ex">Área do triângulo A = {b·h/2}, com b = 10 e h = 6 → A = {60/2} = <b>30</b>.<br>Celsius → Fahrenheit: F = 1,8C + 32; C = 25 → F = 45 + 32 = <b>77 °F</b>.<br>Conta de táxi: P = 5 + 2,5k; k = 8 km → P = 5 + 20 = <b>R$ 25</b>.</div>
<h3>Caso 6 — Escrever a expressão a partir do texto</h3>
<table class="t"><tr><td>o dobro de um número</td><td>2x</td></tr><tr><td>a metade de um número mais 3</td><td>{x/2} + 3</td></tr><tr><td>o quadrado de um número</td><td>x²</td></tr><tr><td>a soma de dois números</td><td>x + y</td></tr><tr><td>o triplo da diferença entre x e 4</td><td>3(x − 4)</td></tr></table>`;

TEORIA['polinomios']=`
<h3>Vocabulário</h3>
<ul><li><b>Monômio</b>: número × letras. Em −5x²y, o <b>coeficiente</b> é −5 e a <b>parte literal</b> é x²y.</li><li><b>Grau do monômio</b>: soma dos expoentes das letras (−5x²y tem grau 3).</li><li><b>Polinômio</b>: soma de monômios (3x² − 2x + 7). O grau é o do maior termo.</li><li><b>Termos semelhantes</b>: mesma parte literal (4x² e −x² são; 4x² e 4x não são).</li></ul>
<h3>Caso 1 — Reduzir termos semelhantes</h3>
<div class="ex">5x + 3y − 2x + y − 4 → x: 5 − 2 = 3 · y: 3 + 1 = 4 → <b>3x + 4y − 4</b>.<br>Dica: sublinhe os termos de cada tipo com cores diferentes.</div>
<h3>Caso 2 — Somar polinômios</h3>
<div class="ex">(2x² + 3x − 1) + (x² − 5x + 4) = (2 + 1)x² + (3 − 5)x + (−1 + 4) = <b>3x² − 2x + 3</b>.</div>
<h3>Caso 3 — Subtrair (troque todos os sinais do segundo!)</h3>
<div class="ex">(4x² − x + 2) − (x² + 3x − 5) = 4x² − x + 2 <b>− x² − 3x + 5</b> = <b>3x² − 4x + 7</b>.</div>
<h3>Caso 4 — Multiplicar monômios</h3>
<div class="ex">(3x²) · (−4x³) = (3 · −4) · x<sup>2+3</sup> = <b>−12x⁵</b>. Multiplica os números e soma os expoentes da mesma letra.</div>
<h3>Caso 5 — Monômio × polinômio (distributiva)</h3>
<div class="ex">2x(3x − 5) = 2x · 3x − 2x · 5 = <b>6x² − 10x</b>.<br>−3(x² − 2x + 1) = <b>−3x² + 6x − 3</b> (o sinal de fora entra em todos).</div>
<h3>Caso 6 — Polinômio × polinômio</h3>
<div class="ex">(x + 3)(2x − 5): cada termo do 1º vezes cada do 2º.<br>x·2x = 2x²; x·(−5) = −5x; 3·2x = 6x; 3·(−5) = −15.<br>Junte: 2x² + x − 15.</div>
<h3>Caso 7 — Dividir por monômio</h3>
<div class="ex">(12x⁴ − 8x²) ÷ 4x² = 12x⁴ ÷ 4x² − 8x² ÷ 4x² = <b>3x² − 2</b>. Divide os números e subtrai os expoentes.</div>
<h3>Erros comuns</h3><ul><li>Somar termos não semelhantes: 3x + 2x² ≠ 5x³.</li><li>Na subtração, trocar o sinal só do primeiro termo do segundo polinômio.</li></ul>`;

TEORIA['produtos-notaveis']=`
<h3>Por que existem</h3><p>São multiplicações que aparecem tanto que vale a pena decorar o resultado (e evitar fazer a distributiva toda vez).</p>
<table class="t"><tr><th>Nome</th><th>Fórmula</th><th>Frase para decorar</th></tr>
<tr><td>Quadrado da soma</td><td>(a + b)² = a² + 2ab + b²</td><td>quadrado do 1º, mais 2 vezes o 1º pelo 2º, mais quadrado do 2º</td></tr>
<tr><td>Quadrado da diferença</td><td>(a − b)² = a² − 2ab + b²</td><td>igual, mas o termo do meio é menos</td></tr>
<tr><td>Produto da soma pela diferença</td><td>(a + b)(a − b) = a² − b²</td><td>quadrado do 1º menos quadrado do 2º</td></tr>
<tr><td>Cubo da soma (9º)</td><td>(a + b)³ = a³ + 3a²b + 3ab² + b³</td><td></td></tr></table>
<h3>Caso 1 — Quadrado da soma</h3>
<div class="ex">(x + 5)² = x² + 2·x·5 + 5² = <b>x² + 10x + 25</b>.<br><i>Por quê?</i> (x + 5)(x + 5) = x² + 5x + 5x + 25.</div>
<h3>Caso 2 — Quadrado da diferença</h3>
<div class="ex">(y − 4)² = y² − 8y + 16. O último termo é <b>sempre positivo</b>.</div>
<h3>Caso 3 — Com coeficiente</h3>
<div class="ex">(3x − 2)² = (3x)² − 2·3x·2 + 2² = <b>9x² − 12x + 4</b>. Cuidado: (3x)² = 9x², não 3x².</div>
<h3>Caso 4 — Duas letras</h3>
<div class="ex">(2a + 3b)² = 4a² + 12ab + 9b².</div>
<h3>Caso 5 — Soma pela diferença</h3>
<div class="ex">(x + 7)(x − 7) = <b>x² − 49</b>. &nbsp;(5m − 1)(5m + 1) = 25m² − 1.</div>
<h3>Caso 6 — Cálculo mental</h3>
<div class="ex">31² = (30 + 1)² = 900 + 60 + 1 = <b>961</b>.<br>49 × 51 = (50 − 1)(50 + 1) = 2500 − 1 = <b>2499</b>.</div>
<h3>Caso 7 — Com frações</h3>
<div class="ex">(x + {1/2})² = x² + x + {1/4} (2 · x · {1/2} = x).</div>
<h3>Erro nº 1</h3><p>(a + b)² ≠ a² + b². Mostre com números: (3 + 4)² = 49, mas 3² + 4² = 25. O que falta é o 2ab = 24.</p>`;

TEORIA['fatoracao']=`
<h3>O que é</h3><p>Fatorar é escrever uma soma como <b>multiplicação</b>. É o caminho de volta dos produtos notáveis e é essencial para simplificar frações algébricas e resolver equações.</p>
<p class="tip">Ordem de tentativa: <b>1º fator comum</b> → depois veja quantos termos sobraram: 2 termos (diferença de quadrados?), 3 termos (trinômio quadrado perfeito? soma e produto?), 4 termos (agrupamento?).</p>
<h3>Caso 1 — Fator comum em evidência</h3>
<div class="ex">6x³ + 9x² <ol><li>Maior número que divide 6 e 9: 3. Menor potência de x presente: x².</li><li>Fator comum: 3x².</li><li>Divida cada termo: 6x³ ÷ 3x² = 2x; 9x² ÷ 3x² = 3.</li><li><b>3x²(2x + 3)</b>. Confira fazendo a distributiva.</li></ol></div>
<h3>Caso 2 — Agrupamento (4 termos)</h3>
<div class="ex">ax + ay + 3x + 3y = a(x + y) + 3(x + y) = <b>(x + y)(a + 3)</b>.</div>
<h3>Caso 3 — Diferença de quadrados</h3>
<div class="ex">x² − 36 = (x + 6)(x − 6). &nbsp;49a² − 4 = (7a + 2)(7a − 2).<br>Atenção: x² + 36 (soma) <b>não</b> fatora assim.</div>
<h3>Caso 4 — Trinômio quadrado perfeito</h3>
<div class="ex">x² + 14x + 49<ol><li>Primeiro e último são quadrados? x² = (x)², 49 = 7². ✓</li><li>O do meio é 2 · x · 7 = 14x? ✓</li><li><b>(x + 7)²</b>.</li></ol>
4x² − 12x + 9 = (2x − 3)² (2 · 2x · 3 = 12x ✓, sinal do meio negativo).</div>
<h3>Caso 5 — Trinômio soma e produto (x² + Sx + P)</h3>
<div class="ex">x² + 5x + 6 → dois números que <b>somam 5</b> e <b>multiplicam 6</b>: 2 e 3 → <b>(x + 2)(x + 3)</b>.<br>x² − x − 12 → somam −1 e multiplicam −12: −4 e 3 → <b>(x − 4)(x + 3)</b>.<br>Dica: se o produto é negativo, os números têm sinais diferentes.</div>
<h3>Caso 6 — Combinando (fator comum e depois outro)</h3>
<div class="ex">2x² − 18 = 2(x² − 9) = <b>2(x + 3)(x − 3)</b>.<br>3x² + 12x + 12 = 3(x² + 4x + 4) = <b>3(x + 2)²</b>.</div>
<h3>Caso 7 — Para que serve: simplificar</h3>
<div class="ex">{x² − 25/x + 5} = {(x + 5)(x − 5)/x + 5} = <b>x − 5</b> (x ≠ −5).</div>`;

TEORIA['equacao-1-grau']=`
<h3>O que é</h3>
<p>Uma equação é como uma <b>balança equilibrada</b>: o que está à esquerda do = pesa o mesmo que o da direita. Resolver é descobrir o valor da incógnita (x) que mantém o equilíbrio.</p>
<p>Regra de ouro: <b>o que fizer de um lado, faça do outro</b>. Na prática isso vira o “passa para o outro lado com a operação contrária”:</p>
<table class="t"><tr><td>está somando</td><td>→ passa subtraindo</td></tr><tr><td>está subtraindo</td><td>→ passa somando</td></tr><tr><td>está multiplicando o x</td><td>→ passa dividindo</td></tr><tr><td>está dividindo o x</td><td>→ passa multiplicando</td></tr></table>
<h3>Caso 1 — Básica</h3>
<div class="ex">3x + 7 = 22 → 3x = 22 − 7 → 3x = 15 → x = 15 ÷ 3 → <b>x = 5</b>.<br>Confira: 3·5 + 7 = 22 ✓</div>
<h3>Caso 2 — x dos dois lados</h3>
<div class="ex">5x − 4 = 2x + 11 → 5x − 2x = 11 + 4 → 3x = 15 → <b>x = 5</b>.<br>Letras para um lado, números para o outro.</div>
<h3>Caso 3 — Coeficiente negativo</h3>
<div class="ex">−2x + 5 = 11 → −2x = 6 → x = 6 ÷ (−2) → <b>x = −3</b>.<br>(Ou multiplique tudo por −1: 2x = −6.)</div>
<h3>Caso 4 — Com parênteses</h3>
<div class="ex">3(x − 2) = 2(x + 1) → 3x − 6 = 2x + 2 → 3x − 2x = 2 + 6 → <b>x = 8</b>.</div>
<h3>Caso 5 — Com frações (tire o MMC)</h3>
<div class="ex">{x/2} + {x/3} = 10<ol><li>MMC(2, 3) = 6. Multiplique <b>todos</b> os termos por 6: 3x + 2x = 60.</li><li>5x = 60 → <b>x = 12</b>.</li></ol>
{x − 1/4} = {x + 2/6}: MMC 12 → 3(x − 1) = 2(x + 2) → 3x − 3 = 2x + 4 → <b>x = 7</b>.</div>
<h3>Caso 6 — Com decimais</h3>
<div class="ex">0,5x + 1,2 = 3,7 → 0,5x = 2,5 → x = 2,5 ÷ 0,5 = <b>5</b>.</div>
<h3>Caso 7 — Sem solução e infinitas soluções</h3>
<div class="ex">2x + 3 = 2x + 5 → 0x = 2 → <b>impossível</b> (nenhum x serve).<br>2(x + 1) = 2x + 2 → 0x = 0 → <b>infinitas soluções</b> (qualquer x serve).</div>
<h3>Erros comuns</h3><ul><li>Passar o número que multiplica o x subtraindo (3x = 15 → x = 12 ✗).</li><li>Esquecer de trocar o sinal ao mudar de lado.</li><li>Na fração, multiplicar só alguns termos pelo MMC.</li></ul>`;

TEORIA['problemas-equacao-1-grau']=`
<h3>Método em 5 passos</h3>
<ol><li><b>Ler</b> duas vezes e grifar o que se pede.</li><li><b>Escolher o x</b> (geralmente o valor menor ou o que aparece como referência).</li><li><b>Traduzir</b> as outras quantidades usando x.</li><li><b>Montar e resolver</b> a equação.</li><li><b>Responder</b> o que foi perguntado, com unidade, e conferir no texto.</li></ol>
<h3>Dicionário português → matemática</h3>
<table class="t"><tr><td>um número</td><td>x</td></tr><tr><td>o dobro, o triplo</td><td>2x, 3x</td></tr><tr><td>a metade, a terça parte</td><td>{x/2}, {x/3}</td></tr><tr><td>o sucessor, o antecessor</td><td>x + 1, x − 1</td></tr><tr><td>números consecutivos</td><td>x, x + 1, x + 2</td></tr><tr><td>pares (ou ímpares) consecutivos</td><td>x, x + 2, x + 4</td></tr><tr><td>“a mais que”</td><td>+</td></tr><tr><td>“a menos que”</td><td>−</td></tr><tr><td>“é”, “dá”, “resulta”</td><td>=</td></tr></table>
<h3>Caso 1 — Número desconhecido</h3>
<div class="ex">O triplo de um número, menos 8, é 25. → 3x − 8 = 25 → 3x = 33 → <b>x = 11</b>.</div>
<h3>Caso 2 — Consecutivos</h3>
<div class="ex">A soma de dois números consecutivos é 47. → x + (x + 1) = 47 → 2x = 46 → x = 23 → <b>23 e 24</b>.</div>
<h3>Caso 3 — Idades</h3>
<div class="ex">Maria tem o triplo da idade do filho. Juntos têm 48 anos.<br>Filho: x; Maria: 3x → x + 3x = 48 → 4x = 48 → x = 12 → <b>filho 12, Maria 36</b>.<br><i>Daqui a alguns anos:</i> “Daqui a 5 anos” → some 5 em <b>todas</b> as idades.</div>
<h3>Caso 4 — Dinheiro / compras</h3>
<div class="ex">Comprei 3 cadernos e uma caneta de R$ 4 e paguei R$ 34. Preço do caderno? → 3x + 4 = 34 → <b>x = R$ 10</b>.</div>
<h3>Caso 5 — Geometria</h3>
<div class="ex">Retângulo com comprimento 5 cm maior que a largura e perímetro 50 cm.<br>Largura x, comprimento x + 5 → 2x + 2(x + 5) = 50 → 4x + 10 = 50 → x = 10 → <b>10 cm por 15 cm</b>.</div>
<h3>Caso 6 — Partes de um todo (frações)</h3>
<div class="ex">Gastei {1/3} do salário com aluguel e {1/4} com comida; sobraram R$ 1.000. Qual o salário?<br>x − {x/3} − {x/4} = 1000 → MMC 12: 12x − 4x − 3x = 12000 → 5x = 12000 → <b>x = R$ 2.400</b>.</div>
<h3>Caso 7 — Comparar planos (quando vale a pena)</h3>
<div class="ex">Plano A: R$ 50 fixos + R$ 2 por hora. Plano B: R$ 5 por hora. Com quantas horas os dois custam o mesmo?<br>50 + 2x = 5x → 50 = 3x → x ≈ 16,7 h. Menos que isso, B é mais barato; mais que isso, A.</div>`;

TEORIA['inequacao-1-grau']=`
<h3>O que é</h3>
<p>É como uma equação, mas com sinal de desigualdade: <b>&gt;</b> (maior), <b>&lt;</b> (menor), <b>≥</b> (maior ou igual), <b>≤</b> (menor ou igual). A resposta não é um número só, é um <b>intervalo</b> de valores.</p>
<p>Resolve-se igual à equação, com <b>uma regra extra</b>:</p>
<p class="tip">Se <b>multiplicar ou dividir</b> os dois lados por um número <b>negativo</b>, <b>inverta o sinal</b> da desigualdade. (Ex.: 2 &lt; 5, mas multiplicando por −1: −2 &gt; −5.)</p>
<h3>Caso 1 — Coeficiente positivo</h3>
<div class="ex">3x − 5 &gt; 7 → 3x &gt; 12 → <b>x &gt; 4</b>. (Serve 4,1; 5; 100… não serve 4.)</div>
<h3>Caso 2 — Coeficiente negativo (inverte!)</h3>
<div class="ex">−2x + 1 ≤ 9 → −2x ≤ 8 → divide por −2 e inverte → <b>x ≥ −4</b>.</div>
<h3>Caso 3 — x dos dois lados</h3>
<div class="ex">5x + 2 &lt; 3x + 10 → 2x &lt; 8 → <b>x &lt; 4</b>.</div>
<h3>Caso 4 — Maior/menor inteiro que satisfaz</h3>
<div class="ex">x &gt; 4 → menor inteiro: <b>5</b> (4 não serve!). &nbsp;x ≥ 4 → menor inteiro: <b>4</b>.<br>x &lt; −2,5 → maior inteiro: <b>−3</b>.</div>
<h3>Caso 5 — Dupla desigualdade</h3>
<div class="ex">−3 &lt; 2x + 1 &lt; 7 → subtrai 1 em tudo: −4 &lt; 2x &lt; 6 → divide por 2: <b>−2 &lt; x &lt; 3</b>.</div>
<h3>Caso 6 — Problema</h3>
<div class="ex">Para passar, a média de 3 provas tem que ser pelo menos 6. Tirei 5 e 7. Quanto preciso na 3ª?<br>{5 + 7 + x/3} ≥ 6 → 12 + x ≥ 18 → <b>x ≥ 6</b>.</div>
<h3>Como escrever a resposta</h3><p>Em palavras: “x maior que 4”; na reta: bolinha <b>aberta</b> (○) para &lt; e &gt;, <b>fechada</b> (●) para ≤ e ≥.</p>`;

TEORIA['sistemas']=`
<h3>O que é</h3>
<p>Duas equações com <b>duas incógnitas</b> (x e y) que precisam valer <b>ao mesmo tempo</b>. A solução é um par (x, y).</p>
<h3>Método 1 — Adição (quando um termo já cancela)</h3>
<div class="ex">x + y = 10<br>x − y = 4<ol><li>Some as equações em pé: (x + x) + (y − y) = 10 + 4 → 2x = 14 → x = 7.</li><li>Volte numa delas: 7 + y = 10 → y = 3.</li><li>Solução: <b>(7, 3)</b>. Confira na outra: 7 − 3 = 4 ✓</li></ol></div>
<h3>Método 1b — Adição multiplicando antes</h3>
<div class="ex">2x + 3y = 12<br>3x − y = 7<ol><li>Multiplique a 2ª por 3 para o y cancelar: 9x − 3y = 21.</li><li>Some com a 1ª: 11x = 33 → x = 3.</li><li>3·3 − y = 7 → y = 2. Solução <b>(3, 2)</b>.</li></ol></div>
<h3>Método 2 — Substituição (quando uma letra está fácil de isolar)</h3>
<div class="ex">y = 2x<br>x + y = 15<ol><li>Troque y por 2x na 2ª: x + 2x = 15 → 3x = 15 → x = 5.</li><li>y = 2 · 5 = 10. Solução <b>(5, 10)</b>.</li></ol></div>
<h3>Método 3 — Comparação</h3>
<div class="ex">y = x + 4 e y = 3x − 2 → iguale: x + 4 = 3x − 2 → 6 = 2x → x = 3; y = 7.</div>
<h3>Caso — Problemas</h3>
<div class="ex"><b>Lanchonete:</b> 2 lanches + 1 suco = R$ 19; 1 lanche + 2 sucos = R$ 14.<br>2L + S = 19 e L + 2S = 14 → da 1ª: S = 19 − 2L → L + 2(19 − 2L) = 14 → L + 38 − 4L = 14 → −3L = −24 → <b>L = 8, S = 3</b>.<br><br><b>Galinhas e coelhos:</b> 20 cabeças e 56 pés. G + C = 20; 2G + 4C = 56 → multiplicando a 1ª por 2 e subtraindo: 2C = 16 → <b>C = 8, G = 12</b>.</div>
<h3>Sistemas especiais</h3>
<div class="ex">x + y = 5 e x + y = 7 → impossível (nenhum par). &nbsp;x + y = 5 e 2x + 2y = 10 → infinitas soluções (é a mesma equação).</div>`;

TEORIA['equacao-2-grau-incompleta']=`
<h3>O que é</h3>
<p>Equação do 2º grau: <b>ax² + bx + c = 0</b> (a ≠ 0). É <b>incompleta</b> quando falta o b ou o c. Essas dá para resolver <b>sem Bhaskara</b>.</p>
<h3>Tipo 1 — Falta o b (ax² + c = 0)</h3>
<div class="ex"><b>Caso A:</b> x² − 49 = 0 → x² = 49 → x = ±√49 → <b>x = 7 ou x = −7</b>.<br>Por que dois? Porque 7² = 49 e (−7)² = 49.<br><b>Caso B:</b> 2x² − 18 = 0 → 2x² = 18 → x² = 9 → <b>x = ±3</b>.<br><b>Caso C:</b> x² = 5 → <b>x = ±√5</b> (raiz não exata fica indicada).<br><b>Caso D:</b> x² + 4 = 0 → x² = −4 → <b>sem solução real</b> (nenhum número ao quadrado dá negativo).</div>
<h3>Tipo 2 — Falta o c (ax² + bx = 0)</h3>
<div class="ex"><b>Caso E:</b> x² − 7x = 0<ol><li>Coloque x em evidência: x(x − 7) = 0.</li><li>Se um produto dá zero, um dos fatores é zero: x = 0 <b>ou</b> x − 7 = 0.</li><li><b>x = 0 ou x = 7</b>.</li></ol>
<b>Caso F:</b> 3x² + 12x = 0 → 3x(x + 4) = 0 → <b>x = 0 ou x = −4</b>.<br><b>Atenção:</b> nunca divida os dois lados por x — você perde a raiz x = 0!</div>
<h3>Tipo 3 — Só ax² = 0</h3><div class="ex">5x² = 0 → x² = 0 → <b>x = 0</b>.</div>
<h3>Problema</h3>
<div class="ex">A área de um quadrado é 81 m². Lado? x² = 81 → x = ±9. Como lado não é negativo, <b>9 m</b>.</div>`;

TEORIA['equacao-2-grau']=`
<h3>Fórmula de Bhaskara</h3>
<p>Para resolver <b>ax² + bx + c = 0</b>:</p>
<ol><li>Arrume a equação: tudo de um lado, zero do outro.</li><li>Identifique <b>a</b> (número do x²), <b>b</b> (do x) e <b>c</b> (o número sozinho), <b>com os sinais</b>.</li><li>Calcule <b>Δ = b² − 4ac</b>.</li><li>Use <b>x = {−b ± √Δ/2a}</b>.</li></ol>
<table class="t"><tr><td>Δ &gt; 0</td><td>duas raízes reais diferentes</td></tr><tr><td>Δ = 0</td><td>uma raiz (duas iguais)</td></tr><tr><td>Δ &lt; 0</td><td>nenhuma raiz real</td></tr></table>
<h3>Caso 1 — Δ &gt; 0, a = 1</h3>
<div class="ex">x² − 5x + 6 = 0 → a = 1, b = −5, c = 6.<br>Δ = (−5)² − 4·1·6 = 25 − 24 = 1.<br>x = {5 ± 1/2} → x₁ = {6/2} = <b>3</b>; x₂ = {4/2} = <b>2</b>.</div>
<h3>Caso 2 — a ≠ 1 e raiz fracionária</h3>
<div class="ex">2x² − 3x − 2 = 0 → a = 2, b = −3, c = −2.<br>Δ = 9 − 4·2·(−2) = 9 + 16 = 25.<br>x = {3 ± 5/4} → x₁ = {8/4} = <b>2</b>; x₂ = {−2/4} = <b>−{1/2}</b>.</div>
<h3>Caso 3 — Δ = 0</h3>
<div class="ex">x² − 6x + 9 = 0 → Δ = 36 − 36 = 0 → x = {6/2} = <b>3</b> (raiz dupla).</div>
<h3>Caso 4 — Δ &lt; 0</h3>
<div class="ex">x² + 2x + 5 = 0 → Δ = 4 − 20 = −16 → <b>não há raiz real</b>.</div>
<h3>Caso 5 — a negativo</h3>
<div class="ex">−x² + 4x + 5 = 0 → dica: multiplique tudo por −1: x² − 4x − 5 = 0 → Δ = 16 + 20 = 36 → x = {4 ± 6/2} → <b>5 ou −1</b>.</div>
<h3>Caso 6 — Precisa arrumar antes</h3>
<div class="ex">x(x + 3) = 40 → x² + 3x − 40 = 0 → Δ = 9 + 160 = 169 → x = {−3 ± 13/2} → <b>5 ou −8</b>.<br>Num problema de medida (lado de retângulo), só o 5 serve.</div>
<h3>Atalho — Soma e produto (quando a = 1)</h3>
<div class="ex">x² − Sx + P = 0: as raízes somam <b>S</b> e multiplicam <b>P</b>.<br>x² − 7x + 10 = 0 → somam 7, multiplicam 10 → <b>2 e 5</b>.</div>
<h3>Erros comuns</h3><ul><li>Esquecer o sinal de b: com b = −5, −b = 5 e b² = 25.</li><li>Fazer −5² = −25 no delta (o certo é (−5)² = 25).</li><li>Dividir só o √Δ por 2a, e não o numerador inteiro.</li></ul>`;

TEORIA['funcao-afim']=`
<h3>O que é</h3>
<p>Uma <b>função</b> é uma regra que, para cada x, dá um único y. A <b>função afim</b> tem a forma <b>f(x) = ax + b</b> e seu gráfico é sempre uma <b>reta</b>.</p>
<ul><li><b>a</b> = taxa de variação (quanto y muda quando x aumenta 1). a &gt; 0 → <b>crescente</b>; a &lt; 0 → <b>decrescente</b>.</li><li><b>b</b> = valor inicial, onde a reta corta o eixo y (quando x = 0).</li></ul>
<h3>Caso 1 — Calcular f(x)</h3>
<div class="ex">f(x) = 3x − 2 → f(4) = 3·4 − 2 = <b>10</b>; f(−1) = −3 − 2 = <b>−5</b>.</div>
<h3>Caso 2 — Achar x sabendo f(x)</h3>
<div class="ex">f(x) = 3x − 2. Para qual x temos f(x) = 13? → 3x − 2 = 13 → <b>x = 5</b>.</div>
<h3>Caso 3 — Zero (raiz) da função</h3>
<div class="ex">Onde a reta corta o eixo x (y = 0): 2x − 8 = 0 → <b>x = 4</b>.</div>
<h3>Caso 4 — Lei a partir de dois pontos</h3>
<div class="ex">Pontos (1, 5) e (3, 9).<ol><li>a = {variação de y/variação de x} = {9 − 5/3 − 1} = {4/2} = 2.</li><li>Use um ponto: 5 = 2·1 + b → b = 3.</li><li><b>f(x) = 2x + 3</b>.</li></ol></div>
<h3>Caso 5 — Desenhar o gráfico</h3>
<div class="ex">f(x) = −x + 4: escolha dois valores de x → x = 0 dá y = 4; x = 4 dá y = 0. Marque (0, 4) e (4, 0) e ligue com uma reta. Desce da esquerda para a direita (a = −1, decrescente).</div>
<h3>Caso 6 — Problemas do dia a dia</h3>
<div class="ex"><b>Plano de celular:</b> R$ 30 fixos + R$ 0,50 por minuto → f(x) = 0,5x + 30. 100 minutos: f(100) = <b>R$ 80</b>.<br><b>Salário com comissão:</b> R$ 1.500 + 5% das vendas → S(v) = 0,05v + 1500.<br><b>Função linear (b = 0):</b> pão a R$ 0,80 → P(n) = 0,8n (passa pela origem).</div>`;

TEORIA['funcao-quadratica']=`
<h3>O que é</h3>
<p><b>f(x) = ax² + bx + c</b> (a ≠ 0). O gráfico é uma <b>parábola</b> (curva em forma de U).</p>
<table class="t"><tr><td><b>a &gt; 0</b></td><td>boca para cima (“sorriso”) → tem ponto de <b>mínimo</b></td></tr><tr><td><b>a &lt; 0</b></td><td>boca para baixo → tem ponto de <b>máximo</b></td></tr><tr><td><b>c</b></td><td>onde corta o eixo y: ponto (0, c)</td></tr><tr><td><b>raízes</b></td><td>onde corta o eixo x (resolver ax² + bx + c = 0)</td></tr><tr><td><b>vértice</b></td><td>x<sub>v</sub> = {−b/2a}, y<sub>v</sub> = f(x<sub>v</sub>) ou {−Δ/4a}</td></tr></table>
<h3>Caso 1 — Estudo completo (a &gt; 0)</h3>
<div class="ex">f(x) = x² − 4x + 3<ul><li>a = 1 &gt; 0 → boca para cima, ponto de mínimo.</li><li>Corta o eixo y em (0, 3).</li><li>Raízes: x² − 4x + 3 = 0 → Δ = 16 − 12 = 4 → x = {4 ± 2/2} → <b>1 e 3</b>.</li><li>Vértice: x<sub>v</sub> = {4/2} = 2; y<sub>v</sub> = 4 − 8 + 3 = −1 → <b>V(2, −1)</b>, valor mínimo −1.</li></ul></div>
<h3>Caso 2 — Estudo completo (a &lt; 0)</h3>
<div class="ex">f(x) = −x² + 6x − 5<ul><li>a = −1 &lt; 0 → boca para baixo, ponto de máximo.</li><li>Raízes: x² − 6x + 5 = 0 → <b>1 e 5</b>.</li><li>x<sub>v</sub> = {−6/−2} = 3; y<sub>v</sub> = −9 + 18 − 5 = <b>4</b> → V(3, 4), valor máximo 4.</li></ul></div>
<h3>Caso 3 — Sem raízes reais</h3>
<div class="ex">f(x) = x² + 2x + 3 → Δ = 4 − 12 = −8 &lt; 0 → a parábola <b>não toca</b> o eixo x (fica toda acima dele, pois a &gt; 0).</div>
<h3>Caso 4 — Máximo e mínimo em problemas</h3>
<div class="ex"><b>Lançamento:</b> uma bola segue h(t) = −5t² + 20t (metros, segundos).<br>Altura máxima: t<sub>v</sub> = {−20/−10} = 2 s → h(2) = −20 + 40 = <b>20 m</b>.<br>Volta ao chão: −5t² + 20t = 0 → t(−5t + 20) = 0 → <b>t = 4 s</b>.<br><br><b>Área máxima:</b> com 20 m de cerca, retângulo de lados x e 10 − x: A = x(10 − x) = −x² + 10x → x<sub>v</sub> = 5 → quadrado 5 × 5, área máxima <b>25 m²</b>.</div>
<h3>Simetria</h3><p>A parábola é simétrica em relação à reta vertical que passa pelo vértice: o x<sub>v</sub> fica exatamente no meio das raízes ({1 + 3/2} = 2 no caso 1).</p>`;

TEORIA['sequencias']=`
<h3>O que é</h3><p>Sequência é uma lista ordenada de números (ou figuras) que segue uma <b>regra</b>. Cada elemento é um <b>termo</b>: a₁ (1º), a₂ (2º), …, aₙ (n-ésimo).</p>
<h3>Caso 1 — Descobrir a regra (diferenças)</h3>
<div class="ex">2, 5, 8, 11, … → de um para o outro soma 3 → próximo: <b>14</b>.<br>1, 4, 9, 16, … → são os quadrados (1², 2², 3², 4²) → próximo: <b>25</b>.<br>1, 1, 2, 3, 5, 8, … → cada termo é a soma dos dois anteriores (Fibonacci) → <b>13</b>.</div>
<h3>Caso 2 — Progressão Aritmética (PA)</h3>
<p>Soma sempre a mesma <b>razão r</b>. <b>Termo geral: aₙ = a₁ + (n − 1)·r</b>.</p>
<div class="ex">PA 7, 11, 15, … Qual o 30º termo?<ol><li>a₁ = 7; r = 11 − 7 = 4.</li><li>a₃₀ = 7 + 29 · 4 = 7 + 116 = <b>123</b>.</li></ol>
<i>Por que (n − 1)?</i> Do 1º ao 30º termo há 29 “saltos”.</div>
<h3>Caso 3 — PA decrescente</h3>
<div class="ex">50, 46, 42, … → r = −4. a₁₀ = 50 + 9·(−4) = <b>14</b>.</div>
<h3>Caso 4 — Descobrir a posição de um termo</h3>
<div class="ex">Na PA 3, 7, 11, …, que posição ocupa o 99? → 99 = 3 + (n − 1)·4 → 96 = 4(n − 1) → n − 1 = 24 → <b>n = 25</b>.</div>
<h3>Caso 5 — Progressão Geométrica (PG)</h3>
<p>Multiplica sempre pela mesma <b>razão q</b>. Termo geral: aₙ = a₁ · q<sup>n−1</sup>.</p>
<div class="ex">3, 6, 12, 24, … → q = 2 → a₆ = 3 · 2⁵ = <b>96</b>.<br>81, 27, 9, … → q = {1/3} → próximo: <b>3</b>.</div>
<h3>Caso 6 — Padrões de figuras</h3>
<div class="ex">Quadradinhos feitos de palitos lado a lado: 1 quadrado usa 4 palitos, 2 usam 7, 3 usam 10.<ol><li>A cada quadrado novo, +3 palitos (PA de razão 3).</li><li>Regra: P = 3n + 1 (confira: n = 1 → 4 ✓).</li><li>Para 20 quadrados: 3·20 + 1 = <b>61 palitos</b>.</li></ol></div>`;
