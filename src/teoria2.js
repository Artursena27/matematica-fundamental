/* ===== TEORIA APROFUNDADA — NÚMEROS (7º a 9º) E PROPORCIONALIDADE ===== */
TEORIA['porcentagem']=`
<h3>O que é</h3>
<p><b>Por cento</b> quer dizer “a cada 100”. 30% = {30/100} = 0,30. É uma fração com denominador 100.</p>
<p>Para calcular, transforme a porcentagem em decimal (divida por 100) e multiplique.</p>
<h3>Atalhos de cabeça</h3>
<table class="t"><tr><td>50%</td><td>metade (÷ 2)</td></tr><tr><td>25%</td><td>÷ 4</td></tr><tr><td>10%</td><td>÷ 10 (anda a vírgula)</td></tr><tr><td>1%</td><td>÷ 100</td></tr><tr><td>5%</td><td>metade de 10%</td></tr><tr><td>20%</td><td>10% × 2</td></tr></table>
<h3>Caso 1 — Quanto é p% de um valor</h3>
<div class="ex">35% de 80 = 0,35 × 80 = <b>28</b>.<br>De cabeça: 10% de 80 = 8 → 30% = 24; 5% = 4 → 35% = 24 + 4 = 28.</div>
<h3>Caso 2 — Que porcentagem um valor representa</h3>
<div class="ex">Acertei 18 de 24 questões. Que porcentagem?<ol><li>Monte a fração: {18/24} = {3/4}.</li><li>Transforme em %: {3/4} = 0,75 = <b>75%</b>.</li></ol></div>
<h3>Caso 3 — Aumento</h3>
<div class="ex">R$ 250 com aumento de 12%.<br><b>Jeito 1:</b> aumento = 0,12 × 250 = 30 → 250 + 30 = <b>R$ 280</b>.<br><b>Jeito 2 (fator):</b> 100% + 12% = 112% → 1,12 × 250 = 280.</div>
<h3>Caso 4 — Desconto</h3>
<div class="ex">R$ 80 com 15% de desconto.<br><b>Jeito 1:</b> desconto = 0,15 × 80 = 12 → 80 − 12 = <b>R$ 68</b>.<br><b>Jeito 2 (fator):</b> 100% − 15% = 85% → 0,85 × 80 = 68.</div>
<h3>Caso 5 — Descobrir o valor original (caminho de volta)</h3>
<div class="ex"><b>A:</b> 20% de um número é 14. Qual é o número? 14 ÷ 0,20 = <b>70</b> (ou: 20% → 14, então 10% → 7, 100% → 70).<br><b>B:</b> depois de um aumento de 20%, o preço ficou R$ 360. Quanto era? 360 ÷ 1,20 = <b>R$ 300</b>.<br><b>C:</b> com 25% de desconto paguei R$ 90. Quanto custava? 90 ÷ 0,75 = <b>R$ 120</b>.</div>
<h3>Caso 6 — Percentual de aumento ou desconto</h3>
<div class="ex">Um produto foi de R$ 50 para R$ 65. Aumentou quantos %?<ol><li>Variação: 65 − 50 = 15.</li><li>Divida pelo valor <b>inicial</b>: 15 ÷ 50 = 0,30 = <b>30%</b>.</li></ol></div>
<h3>Caso 7 — Aumentos/descontos sucessivos</h3>
<div class="ex">Desconto de 10% e depois outro de 20%. Deu 30% no total?<ol><li>R$ 100 → −10% → 90 → −20% de 90 = 18 → 72.</li><li>Caiu de 100 para 72: desconto total de <b>28%</b>, não 30%!</li><li>Pelos fatores: 0,90 × 0,80 = 0,72.</li></ol></div>
<h3>Erros comuns</h3><ul><li>Achar que desconto de 25% seguido de aumento de 25% volta ao preço original (100 → 75 → 93,75).</li><li>Calcular o percentual de variação dividindo pelo valor final.</li></ul>`;

TEORIA['inteiros-reta-modulo']=`
<h3>O que é</h3>
<p>Os <b>números inteiros (ℤ)</b> incluem os negativos: …, −3, −2, −1, 0, 1, 2, 3, … Aparecem em temperatura abaixo de zero, dívidas, andares de subsolo, altitude abaixo do mar.</p>
<p>Na <b>reta numérica</b>, o zero fica no meio, os positivos à direita e os negativos à esquerda:</p>
<p class="big">… −4 &nbsp;−3 &nbsp;−2 &nbsp;−1 &nbsp;<b>0</b> &nbsp;1 &nbsp;2 &nbsp;3 &nbsp;4 …</p>
<h3>Caso 1 — Módulo (valor absoluto)</h3>
<div class="ex">É a <b>distância até o zero</b>, por isso nunca é negativo.<br>|−9| = 9 &nbsp; |9| = 9 &nbsp; |0| = 0.</div>
<h3>Caso 2 — Oposto ou simétrico</h3>
<div class="ex">Mesmo módulo, sinal contrário. Oposto de 6 é −6; oposto de −15 é 15. Um número somado ao seu oposto dá zero.</div>
<h3>Caso 3 — Comparar</h3>
<div class="ex">Na reta, quem está mais à <b>direita</b> é maior.<ul><li>Positivo × negativo: o positivo é maior (3 &gt; −10).</li><li>Zero × negativo: o zero é maior (0 &gt; −1).</li><li>Negativo × negativo: o maior é o <b>mais perto do zero</b>, ou seja, o de <b>menor módulo</b> (−2 &gt; −7). Pense: dever R$ 2 é melhor que dever R$ 7.</li></ul></div>
<h3>Caso 4 — Ordenar</h3>
<div class="ex">Ordem crescente de 4, −6, 0, −1, 3: <b>−6 &lt; −1 &lt; 0 &lt; 3 &lt; 4</b>.</div>
<h3>Caso 5 — Distância entre dois números</h3>
<div class="ex">Entre −3 e 5: conte os passos na reta (3 até o zero + 5 depois) = <b>8</b>. Fórmula: |5 − (−3)| = 8.<br>Entre −8 e −2: |−2 − (−8)| = <b>6</b>.</div>
<h3>Caso 6 — Situação do dia a dia</h3>
<div class="ex">Um prédio tem térreo (0), 2 subsolos (−1, −2) e 10 andares. Do subsolo −2 ao 7º andar sobe-se <b>9 andares</b>.</div>`;

TEORIA['inteiros-soma-subtracao']=`
<h3>Ideia (pense em dinheiro)</h3>
<p>Positivo = <b>tenho</b>, negativo = <b>devo</b>.</p>
<h3>Caso 1 — Sinais iguais: soma e repete o sinal</h3>
<div class="ex">(+5) + (+3) = +8 (tinha 5, ganhei 3).<br>(−5) + (−3) = −8 (devia 5, fiquei devendo mais 3).</div>
<h3>Caso 2 — Sinais diferentes: subtrai e fica o sinal do maior módulo</h3>
<div class="ex">(+9) + (−4) = +5 (tinha 9, paguei 4 de dívida).<br>(−9) + (+4) = −5 (devia 9, paguei 4: ainda devo 5).<br>(−6) + (+6) = 0.</div>
<h3>Caso 3 — Subtração: some o oposto</h3>
<div class="ex">a − b = a + (oposto de b).<br>(+7) − (+10) = 7 + (−10) = <b>−3</b>.<br>(−4) − (−9) = −4 + 9 = <b>+5</b> (“tirar uma dívida” é bom!).<br>(−2) − (+5) = −2 − 5 = <b>−7</b>.</div>
<h3>Caso 4 — Eliminar parênteses (jogo de sinais)</h3>
<table class="t"><tr><td>+(+) → +</td><td>+(−) → −</td><td>−(+) → −</td><td>−(−) → +</td></tr></table>
<div class="ex">−3 − (−8) + (−4) − (+2)<ol><li>Tire os parênteses: −3 + 8 − 4 − 2.</li><li>Junte os positivos: +8. Junte os negativos: −3 − 4 − 2 = −9.</li><li>+8 − 9 = <b>−1</b>.</li></ol></div>
<h3>Caso 5 — Expressão com vários termos (truque de agrupar)</h3>
<div class="ex">12 − 15 + 7 − 20 + 3 → positivos: 12 + 7 + 3 = 22; negativos: 15 + 20 = 35 → 22 − 35 = <b>−13</b>.</div>
<h3>Caso 6 — Problemas</h3>
<div class="ex"><b>Temperatura:</b> estava −4 °C e subiu 9 °C → −4 + 9 = <b>5 °C</b>.<br><b>Variação:</b> foi de 3 °C para −5 °C → −5 − 3 = <b>−8 °C</b> (caiu 8 graus).<br><b>Saldo:</b> tinha R$ 120, gastei R$ 200 → 120 − 200 = <b>−80</b> (estou devendo R$ 80).</div>
<h3>Erros comuns</h3><ul><li>Achar que “menos com menos dá mais” vale na soma: −3 − 5 é −8, não +8! A regra do “menos com menos” é da <b>multiplicação</b> e dos <b>parênteses</b>.</li></ul>`;

TEORIA['inteiros-multiplicacao-divisao']=`
<h3>Regra de sinais (multiplicação e divisão)</h3>
<table class="t"><tr><th>Sinais</th><th>Resultado</th><th>Exemplo</th></tr><tr><td>iguais (+·+ ou −·−)</td><td><b>positivo</b></td><td>(−4) × (−5) = +20</td></tr><tr><td>diferentes (+·− ou −·+)</td><td><b>negativo</b></td><td>(+4) × (−5) = −20</td></tr></table>
<p>Primeiro faça a conta com os números “sem sinal” (módulos), depois decida o sinal.</p>
<h3>Caso 1 — Multiplicação</h3><div class="ex">(−7) × (+3) = −21 &nbsp; (−6) × (−8) = +48</div>
<h3>Caso 2 — Divisão</h3><div class="ex">(−36) ÷ (+4) = −9 &nbsp; (−50) ÷ (−5) = +10 &nbsp; 0 ÷ (−3) = 0</div>
<h3>Caso 3 — Vários fatores: conte os negativos</h3>
<div class="ex">(−2) × (+3) × (−1) × (−5): 3 negativos (ímpar) → negativo. 2 × 3 × 1 × 5 = 30 → <b>−30</b>.<br>Quantidade <b>par</b> de negativos → positivo; <b>ímpar</b> → negativo.</div>
<h3>Caso 4 — Potência de base negativa</h3>
<div class="ex">(−3)² = (−3)(−3) = <b>+9</b> (expoente par → positivo)<br>(−3)³ = (−3)(−3)(−3) = <b>−27</b> (expoente ímpar → negativo)<br>(−1)<sup>100</sup> = 1 &nbsp; (−1)<sup>101</sup> = −1</div>
<h3>Caso 5 — A pegadinha do parêntese</h3>
<div class="ex">−3² = −(3 × 3) = <b>−9</b> (só o 3 está elevado).<br>(−3)² = <b>+9</b> (o −3 inteiro está elevado).</div>
<h3>Caso 6 — Expressões</h3>
<div class="ex">(−2) × 5 − (−12) ÷ 4<ol><li>Multiplicação: (−2) × 5 = −10.</li><li>Divisão: (−12) ÷ 4 = −3.</li><li>−10 − (−3) = −10 + 3 = <b>−7</b>.</li></ol></div>
<h3>Por que − × − dá +? (para explicar)</h3><p>Se você <b>deixa de ter</b> (−) uma <b>dívida</b> (−), você ganha (+). Ex.: tirar 3 dívidas de R$ 5 = melhorar R$ 15.</p>`;

TEORIA['racionais']=`
<h3>O que é</h3>
<p><b>Racionais (ℚ)</b> são os números que podem ser escritos como fração de inteiros: {3/4}, −{2/5}, 0,8, −1,25, 7, 0,333… Todas as regras de frações valem, mas agora com <b>sinais</b>.</p>
<p>O sinal pode ficar na frente, em cima ou embaixo: −{3/4} = {−3/4} = {3/−4}.</p>
<h3>Caso 1 — Soma e subtração (MMC + regra de sinais da soma)</h3>
<div class="ex">−{2/3} + {1/4}<ol><li>MMC(3, 4) = 12 → −{8/12} + {3/12}.</li><li>Sinais diferentes: 8 − 3 = 5, fica o sinal do maior (−) → <b>−{5/12}</b>.</li></ol>
−{1/2} − {1/3} = −{3/6} − {2/6} = <b>−{5/6}</b> (dois negativos: soma e repete o sinal).</div>
<h3>Caso 2 — Multiplicação</h3>
<div class="ex">(−{3/5}) × (−{10/9}) → sinais iguais: positivo. {3/5} × {10/9} = {30/45} = <b>{2/3}</b>.</div>
<h3>Caso 3 — Divisão</h3>
<div class="ex">(−{4/7}) ÷ {2/21} = −{4/7} × {21/2} = −{84/14} = <b>−6</b>.</div>
<h3>Caso 4 — Decimais com sinal</h3>
<div class="ex">−2,5 + 1,75 = −0,75 (sinais diferentes: 2,50 − 1,75 = 0,75, sinal do maior).<br>(−0,4) × (−0,5) = <b>0,2</b>.</div>
<h3>Caso 5 — Comparar negativos</h3>
<div class="ex">−{1/2} ou −{2/3}? Sem o sinal: {1/2} = 0,5 e {2/3} ≈ 0,67. Entre negativos, maior é o de <b>menor módulo</b> → <b>−{1/2} &gt; −{2/3}</b>.</div>
<h3>Caso 6 — Expressão</h3>
<div class="ex">{1/2} − {3/4} × (−2) = {1/2} − (−{3/2}) = {1/2} + {3/2} = {4/2} = <b>2</b> (multiplicação antes!).</div>`;

TEORIA['potencias-propriedades']=`
<h3>Resumo das propriedades</h3>
<table class="t"><tr><td>a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup></td><td>mesma base multiplicando → soma expoentes</td></tr><tr><td>a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup></td><td>mesma base dividindo → subtrai expoentes</td></tr><tr><td>(a<sup>m</sup>)<sup>n</sup> = a<sup>m·n</sup></td><td>potência de potência → multiplica</td></tr><tr><td>(a·b)<sup>n</sup> = a<sup>n</sup>·b<sup>n</sup></td><td>distribui o expoente no produto</td></tr><tr><td>({a/b})<sup>n</sup> = <span class="fr"><span>a<sup>n</sup></span><span>b<sup>n</sup></span></span></td><td>eleva em cima e embaixo</td></tr><tr><td>a<sup>0</sup> = 1</td><td>(a ≠ 0)</td></tr><tr><td>a<sup>−n</sup> = {1/a<sup>n</sup>}</td><td>expoente negativo → inverte a base</td></tr></table>
<h3>Caso 1 — Expoente negativo com base inteira</h3>
<div class="ex">2<sup>−3</sup> = {1/2³} = <b>{1/8}</b>. &nbsp;10<sup>−2</sup> = {1/100} = 0,01.<br><i>De onde vem:</i> 2<sup>3</sup> = 8, 2<sup>2</sup> = 4, 2<sup>1</sup> = 2, 2<sup>0</sup> = 1, 2<sup>−1</sup> = {1/2}, 2<sup>−2</sup> = {1/4}… cada passo divide por 2.</div>
<h3>Caso 2 — Expoente negativo com fração</h3>
<div class="ex">({2/3})<sup>−2</sup> = ({3/2})<sup>2</sup> = <b>{9/4}</b>. Inverte a fração e o expoente fica positivo.</div>
<h3>Caso 3 — Fração elevada</h3>
<div class="ex">({3/5})<sup>2</sup> = {9/25}. &nbsp;(−{1/2})<sup>3</sup> = −{1/8}.</div>
<h3>Caso 4 — Propriedades com expoentes negativos</h3>
<div class="ex">3<sup>5</sup> × 3<sup>−2</sup> = 3<sup>5+(−2)</sup> = 3<sup>3</sup> = 27.<br>7<sup>2</sup> ÷ 7<sup>−3</sup> = 7<sup>2−(−3)</sup> = 7<sup>5</sup>.<br>(5<sup>−2</sup>)<sup>3</sup> = 5<sup>−6</sup>.</div>
<h3>Caso 5 — Simplificar expressão</h3>
<div class="ex"><span class="fr"><span>2<sup>5</sup> × 2<sup>3</sup></span><span>2<sup>6</sup></span></span> = <span class="fr"><span>2<sup>8</sup></span><span>2<sup>6</sup></span></span> = 2<sup>2</sup> = <b>4</b>.</div>
<h3>Caso 6 — Bases diferentes que viram iguais</h3>
<div class="ex">4<sup>3</sup> × 8 = (2<sup>2</sup>)<sup>3</sup> × 2<sup>3</sup> = 2<sup>6</sup> × 2<sup>3</sup> = 2<sup>9</sup> = 512.</div>
<h3>Erros comuns</h3><ul><li>Achar que 2<sup>−3</sup> é negativo (−8) ✗. O expoente negativo <b>não</b> deixa o número negativo, ele inverte.</li><li>Somar expoentes numa soma: 2<sup>3</sup> + 2<sup>2</sup> ≠ 2<sup>5</sup> (dá 12, não 32).</li></ul>`;

TEORIA['notacao-cientifica']=`
<h3>O que é</h3>
<p>Jeito curto de escrever números muito grandes ou muito pequenos: <b>a × 10<sup>n</sup></b>, com <b>1 ≤ a &lt; 10</b> (só um algarismo, diferente de zero, antes da vírgula).</p>
<p>Ex.: distância Terra–Sol ≈ 150.000.000 km = 1,5 × 10<sup>8</sup> km. Tamanho de uma bactéria ≈ 0,000002 m = 2 × 10<sup>−6</sup> m.</p>
<h3>Caso 1 — Número grande → notação científica</h3>
<div class="ex">45.000.000<ol><li>Coloque a vírgula depois do primeiro algarismo: 4,5.</li><li>Conte quantas casas ela “andou” para a esquerda: 7.</li><li>Resposta: <b>4,5 × 10<sup>7</sup></b>.</li></ol></div>
<h3>Caso 2 — Número pequeno → notação científica</h3>
<div class="ex">0,00032<ol><li>Ande com a vírgula para a direita até o primeiro algarismo não-nulo: 3,2.</li><li>Andou 4 casas.</li><li>Número pequeno → expoente negativo: <b>3,2 × 10<sup>−4</sup></b>.</li></ol></div>
<h3>Caso 3 — Notação científica → número comum</h3>
<div class="ex">6,02 × 10<sup>5</sup>: vírgula 5 casas para a direita → 602.000.<br>7 × 10<sup>−3</sup>: vírgula 3 casas para a esquerda → 0,007.</div>
<h3>Caso 4 — Multiplicação</h3>
<div class="ex">(3 × 10<sup>4</sup>) × (5 × 10<sup>6</sup>) = (3 × 5) × 10<sup>4+6</sup> = 15 × 10<sup>10</sup> → ajuste: 15 = 1,5 × 10 → <b>1,5 × 10<sup>11</sup></b>.</div>
<h3>Caso 5 — Divisão</h3>
<div class="ex">(8 × 10<sup>9</sup>) ÷ (2 × 10<sup>3</sup>) = 4 × 10<sup>6</sup>.<br>(2 × 10<sup>5</sup>) ÷ (4 × 10<sup>2</sup>) = 0,5 × 10<sup>3</sup> → ajuste: 0,5 = 5 × 10<sup>−1</sup> → <b>5 × 10<sup>2</sup></b>.</div>
<h3>Caso 6 — Ajustar número “fora do padrão”</h3>
<div class="ex">34 × 10<sup>5</sup> = 3,4 × 10<sup>6</sup> (a parte da frente ficou 10× menor, o expoente sobe 1).<br>0,27 × 10<sup>−2</sup> = 2,7 × 10<sup>−3</sup> (a frente ficou 10× maior, o expoente desce 1).</div>`;

TEORIA['dizimas']=`
<h3>O que é</h3>
<p>Algumas frações viram decimais <b>infinitos que se repetem</b>: {1/3} = 0,333…; {5/11} = 0,4545…; {1/6} = 0,1666… A parte que se repete é o <b>período</b>. A fração que dá origem à dízima é a <b>fração geratriz</b>.</p>
<ul><li><b>Simples</b>: o período começa logo depois da vírgula (0,777…).</li><li><b>Composta</b>: tem uma parte que não repete antes do período, o <b>anteperíodo</b> (0,1<u>6</u>66…: anteperíodo 1, período 6).</li></ul>
<h3>Caso 1 — Simples com período de 1 algarismo</h3>
<div class="ex">0,444… = <b>{4/9}</b> (período sobre um 9). &nbsp;0,333… = {3/9} = {1/3}.</div>
<h3>Caso 2 — Simples com período de 2 ou 3 algarismos</h3>
<div class="ex">0,2727… = {27/99} = <b>{3/11}</b>. &nbsp;0,123123… = {123/999} = {41/333}.<br>Regra: um <b>9</b> para cada algarismo do período.</div>
<h3>Caso 3 — Com parte inteira</h3>
<div class="ex">2,555… = 2 + {5/9} = {18/9} + {5/9} = <b>{23/9}</b>.</div>
<h3>Caso 4 — Composta</h3>
<div class="ex">0,1666…<ol><li>Numerador: (anteperíodo + período) − anteperíodo = 16 − 1 = 15.</li><li>Denominador: um <b>9</b> por algarismo do período e um <b>0</b> por algarismo do anteperíodo = 90.</li><li>{15/90} = <b>{1/6}</b>.</li></ol>
0,2353535… → (235 − 2)/990 = {233/990}.</div>
<h3>Caso 5 — Método algébrico (explica o “porquê”)</h3>
<div class="ex">x = 0,777…<br>10x = 7,777…<br>Subtraindo: 10x − x = 7,777… − 0,777… → 9x = 7 → <b>x = {7/9}</b>.</div>
<h3>Curiosidade</h3><p>0,999… = {9/9} = 1. Sim, é exatamente 1!</p>`;

TEORIA['conjuntos-numericos']=`
<h3>Os conjuntos, do menor para o maior</h3>
<table class="t"><tr><th>Conjunto</th><th>O que tem</th><th>Exemplos</th></tr>
<tr><td><b>ℕ</b> naturais</td><td>0 e os inteiros positivos</td><td>0, 1, 2, 15, 1000</td></tr>
<tr><td><b>ℤ</b> inteiros</td><td>naturais + negativos</td><td>−7, −1, 0, 4</td></tr>
<tr><td><b>ℚ</b> racionais</td><td>tudo que vira fração de inteiros: frações, decimais exatos, dízimas periódicas</td><td>{3/4}, −0,5, 0,333…, 8</td></tr>
<tr><td><b>𝕀</b> irracionais</td><td>decimais infinitos <b>não periódicos</b></td><td>√2, √3, π, 1,010010001…</td></tr>
<tr><td><b>ℝ</b> reais</td><td>racionais + irracionais</td><td>todos acima</td></tr></table>
<p>ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ e 𝕀 ⊂ ℝ. Um número racional nunca é irracional e vice-versa.</p>
<h3>Caso 1 — Classificar números “disfarçados”</h3>
<div class="ex">√25 = 5 → <b>natural</b>. &nbsp;−√16 = −4 → <b>inteiro</b>. &nbsp;{12/3} = 4 → <b>natural</b>. &nbsp;{7/2} = 3,5 → <b>racional</b>.<br>Sempre <b>calcule primeiro</b> e depois classifique.</div>
<h3>Caso 2 — Raiz é racional ou irracional?</h3>
<div class="ex">√ de quadrado perfeito → racional (√49 = 7).<br>√ de número que não é quadrado perfeito → irracional (√10, √20).<br>√ de fração de quadrados perfeitos → racional (√{4/9} = {2/3}).</div>
<h3>Caso 3 — Decimal infinito: periódico ou não?</h3>
<div class="ex">0,121212… (repete “12”) → racional. &nbsp;0,1234567891011… (nunca repete um bloco) → irracional.</div>
<h3>Caso 4 — Operações com irracionais</h3>
<div class="ex">2 × √3 → irracional. &nbsp;√2 × √2 = 2 → racional! &nbsp;π − π = 0 → racional.<br>Irracional nem sempre “continua” irracional depois de uma conta.</div>
<h3>Caso 5 — Verdadeiro ou falso típico</h3>
<div class="ex">“Todo inteiro é racional.” <b>V</b> (5 = {5/1}).<br>“Todo racional é inteiro.” <b>F</b> ({1/2} não é).<br>“Existe número que é racional e irracional.” <b>F</b>.</div>`;

TEORIA['radicais']=`
<h3>Propriedades que usamos</h3>
<ul><li>√(a × b) = √a × √b</li><li>√{a/b} = {√a/√b}</li><li>√(a²) = a (para a ≥ 0)</li></ul>
<h3>Caso 1 — Simplificar (tirar fatores da raiz)</h3>
<div class="ex">√72<ol><li>Procure o <b>maior quadrado perfeito</b> que divide 72: 36.</li><li>√72 = √(36 × 2) = √36 × √2 = <b>6√2</b>.</li></ol>
Pela fatoração: 72 = 2³ × 3² = 2² × 3² × 2 → sai um 2 e um 3 → 6√2. (“Cada par sai da raiz como um só.”)</div>
<h3>Caso 2 — Somar e subtrair (só radicais semelhantes)</h3>
<div class="ex">5√3 + 2√3 − √3 = (5 + 2 − 1)√3 = <b>6√3</b> (como somar 5 maçãs + 2 maçãs − 1 maçã).<br>√2 + √3 <b>não</b> dá para juntar.</div>
<h3>Caso 3 — Somar depois de simplificar</h3>
<div class="ex">√50 + √18 = 5√2 + 3√2 = <b>8√2</b>.</div>
<h3>Caso 4 — Multiplicar</h3>
<div class="ex">√3 × √12 = √36 = <b>6</b>.<br>2√5 × 3√2 = (2 × 3)√(5 × 2) = <b>6√10</b> (números de fora com números de fora, de dentro com de dentro).</div>
<h3>Caso 5 — Dividir</h3>
<div class="ex">√50 ÷ √2 = √25 = <b>5</b>. &nbsp;6√15 ÷ 3√5 = 2√3.</div>
<h3>Caso 6 — Racionalizar (tirar a raiz do denominador)</h3>
<div class="ex">{4/√2}: multiplique em cima e embaixo por √2 → {4√2/2} = <b>2√2</b>.<br>{3/√5} = {3√5/5}.</div>
<h3>Caso 7 — Com produtos notáveis</h3>
<div class="ex">(√5 + 1)(√5 − 1) = (√5)² − 1² = 5 − 1 = <b>4</b>.<br>(1 + √3)² = 1 + 2√3 + 3 = <b>4 + 2√3</b>.</div>
<h3>Erros comuns</h3><ul><li>√(9 + 16) = √9 + √16 ✗ (a raiz não “abre” na soma).</li><li>Somar radicais diferentes: √2 + √3 = √5 ✗.</li></ul>`;

TEORIA['razao-proporcao']=`
<h3>Razão</h3>
<p>Razão entre a e b é a divisão <b>{a/b}</b> (lê-se “a está para b”). Serve para <b>comparar</b> duas grandezas.</p>
<div class="ex"><b>Caso 1:</b> numa turma há 12 meninas e 18 meninos. Razão meninas/meninos = {12/18} = <b>{2/3}</b>: para cada 2 meninas há 3 meninos.<br><b>Caso 2 — razões especiais:</b> velocidade = {distância/tempo}; densidade demográfica = {habitantes/área}; escala = {desenho/real}.</div>
<h3>Proporção</h3>
<p>É a igualdade de duas razões: {a/b} = {c/d}. <b>Propriedade fundamental:</b> o produto cruzado é igual → <b>a × d = b × c</b>.</p>
<div class="ex"><b>Caso 3 — achar o termo desconhecido:</b> {3/5} = {x/40}<ol><li>Multiplique cruzado: 5x = 3 × 40 = 120.</li><li>x = 120 ÷ 5 = <b>24</b>.</li></ol>
<b>Caso 4 — x embaixo:</b> {4/x} = {6/9} → 6x = 36 → x = 6.</div>
<h3>Escala</h3>
<div class="ex"><b>Caso 5:</b> mapa na escala 1 : 50.000; distância no mapa 8 cm.<ol><li>1 cm no mapa = 50.000 cm reais.</li><li>8 × 50.000 = 400.000 cm.</li><li>400.000 cm = 4.000 m = <b>4 km</b>.</li></ol>
<b>Caso 6 — achar a escala:</b> 2 km reais viraram 4 cm no desenho. 2 km = 200.000 cm → {4/200.000} = {1/50.000} → escala <b>1 : 50.000</b>.</div>
<h3>Divisão em partes proporcionais</h3>
<div class="ex"><b>Caso 7 — diretamente:</b> dividir R$ 900 entre Ana e Bia, proporcionalmente a 2 e 3.<ol><li>Total de partes: 2 + 3 = 5.</li><li>Cada parte: 900 ÷ 5 = 180.</li><li>Ana: 2 × 180 = <b>R$ 360</b>; Bia: 3 × 180 = <b>R$ 540</b>.</li></ol>
<b>Caso 8 — inversamente:</b> dividir 60 em partes inversamente proporcionais a 2 e 3 → proporcional a {1/2} e {1/3} → multiplique por 6: 3 e 2 → 60 ÷ 5 = 12 → <b>36 e 24</b> (quem tem o número menor recebe mais).</div>`;

TEORIA['regra-de-tres-simples']=`
<h3>Quando usar</h3><p>Quando há <b>duas grandezas</b> relacionadas e conhecemos 3 valores, querendo o quarto.</p>
<h3>Passo a passo</h3>
<ol><li>Monte uma tabela: cada grandeza numa coluna, a mesma situação na mesma linha.</li><li>Coloque uma <b>seta</b> na coluna do x.</li><li>Pergunte: “se eu <b>aumentar</b> a outra grandeza, o x aumenta ou diminui?”<ul><li>Aumenta também → <b>diretamente proporcional</b> (setas no mesmo sentido).</li><li>Diminui → <b>inversamente proporcional</b> (setas opostas).</li></ul></li><li><b>Direta:</b> multiplique cruzado. <b>Inversa:</b> inverta uma das colunas e depois multiplique cruzado (ou multiplique “reto”, na mesma linha).</li></ol>
<h3>Caso 1 — Diretamente proporcional</h3>
<div class="ex">5 cadernos custam R$ 40. Quanto custam 8?<table class="t"><tr><th>Cadernos</th><th>R$</th></tr><tr><td>5</td><td>40</td></tr><tr><td>8</td><td>x</td></tr></table>Mais cadernos → mais caro: direta. 5x = 8 × 40 → 5x = 320 → x = <b>R$ 64</b>.</div>
<h3>Caso 2 — Inversamente proporcional</h3>
<div class="ex">4 torneiras enchem um tanque em 6 h. Em quanto tempo 3 torneiras enchem?<table class="t"><tr><th>Torneiras</th><th>Horas</th></tr><tr><td>4</td><td>6</td></tr><tr><td>3</td><td>x</td></tr></table>Menos torneiras → mais tempo: inversa. Multiplique na mesma linha: 4 × 6 = 3 × x → 24 = 3x → x = <b>8 h</b>.<br>(Ou inverta uma coluna: {4/3} = {x/6} → 3x = 24.)</div>
<h3>Caso 3 — Velocidade e tempo (inversa)</h3>
<div class="ex">A 60 km/h levo 2 h. A 80 km/h? 60 × 2 = 80 × x → x = 1,5 h = <b>1 h 30 min</b>.</div>
<h3>Caso 4 — Regra de três com porcentagem (direta)</h3>
<div class="ex">Uma escola tem 800 alunos e 240 usam óculos. Que %?<br>800 — 100% / 240 — x → 800x = 24.000 → x = <b>30%</b>.</div>
<h3>Caso 5 — Receita (direta)</h3>
<div class="ex">Para 6 pessoas uso 4 ovos. Para 15 pessoas? 6x = 15 × 4 = 60 → x = <b>10 ovos</b>.</div>
<h3>Caso 6 — Cuidado: nem tudo é proporcional!</h3>
<div class="ex">“Uma pessoa leva 10 min para tomar banho. Quanto levam 3 pessoas tomando banho ao mesmo tempo, em chuveiros diferentes?” Continua <b>10 min</b> — as grandezas não são proporcionais. Sempre pense se faz sentido.</div>
<h3>Como decidir direta × inversa (perguntas-chave)</h3>
<ul><li>Mais produtos → mais dinheiro (direta).</li><li>Mais trabalhadores → menos dias (inversa).</li><li>Mais velocidade → menos tempo (inversa).</li><li>Mais tempo trabalhando → mais produção (direta).</li></ul>`;

TEORIA['regra-de-tres-composta']=`
<h3>Quando usar</h3><p>Quando há <b>três ou mais grandezas</b>. O segredo é comparar <b>cada grandeza com a do x, uma de cada vez</b>, fingindo que as outras ficam paradas.</p>
<h3>Passo a passo (vale para todos os casos)</h3>
<ol><li>Monte a tabela com todas as grandezas.</li><li>Isole a coluna do x.</li><li>Para cada outra coluna pergunte: “se só esta aumentasse, o x aumentaria (<b>direta</b>) ou diminuiria (<b>inversa</b>)?”</li><li>Escreva: {valor antigo do x/x} = produto das outras razões, <b>invertendo</b> as que forem inversas.</li><li>Resolva multiplicando cruzado.</li></ol>
<h3>Caso 1 — Todas diretas</h3>
<div class="ex">2 máquinas, em 5 dias, fazem 400 peças. Quantas peças 3 máquinas fazem em 4 dias?
<table class="t"><tr><th>Máquinas</th><th>Dias</th><th>Peças</th></tr><tr><td>2</td><td>5</td><td>400</td></tr><tr><td>3</td><td>4</td><td>x</td></tr></table>
<ul><li>Mais máquinas → mais peças: <b>direta</b>.</li><li>Mais dias → mais peças: <b>direta</b>.</li></ul>
{400/x} = {2/3} × {5/4} = {10/12} → 10x = 4.800 → <b>x = 480 peças</b>.</div>
<h3>Caso 2 — Uma inversa e uma direta</h3>
<div class="ex">5 operários constroem 2 casas em 30 dias. Em quantos dias 10 operários constroem 4 casas?
<table class="t"><tr><th>Operários</th><th>Casas</th><th>Dias</th></tr><tr><td>5</td><td>2</td><td>30</td></tr><tr><td>10</td><td>4</td><td>x</td></tr></table>
<ul><li>Mais operários → menos dias: <b>inversa</b> → inverte para {10/5}.</li><li>Mais casas → mais dias: <b>direta</b> → fica {2/4}.</li></ul>
{30/x} = {10/5} × {2/4} = {20/20} = 1 → <b>x = 30 dias</b>.<br><i>Faz sentido:</i> dobrou a equipe e dobrou o trabalho, então o prazo fica igual.</div>
<h3>Caso 3 — Duas inversas</h3>
<div class="ex">6 pedreiros, trabalhando 8 h por dia, terminam uma obra em 20 dias. Em quantos dias 8 pedreiros, trabalhando 10 h por dia, terminam a mesma obra?
<table class="t"><tr><th>Pedreiros</th><th>Horas/dia</th><th>Dias</th></tr><tr><td>6</td><td>8</td><td>20</td></tr><tr><td>8</td><td>10</td><td>x</td></tr></table>
<ul><li>Mais pedreiros → menos dias: <b>inversa</b> → {8/6}.</li><li>Mais horas por dia → menos dias: <b>inversa</b> → {10/8}.</li></ul>
{20/x} = {8/6} × {10/8} = {80/48} → 80x = 960 → <b>x = 12 dias</b>.</div>
<h3>Caso 4 — Quatro grandezas, misturado</h3>
<div class="ex">3 impressoras, funcionando 5 h por dia, imprimem 9.000 folhas em 2 dias. Quantas horas por dia 4 impressoras precisam funcionar para imprimir 24.000 folhas em 4 dias?
<table class="t"><tr><th>Impressoras</th><th>Folhas</th><th>Dias</th><th>Horas/dia</th></tr><tr><td>3</td><td>9.000</td><td>2</td><td>5</td></tr><tr><td>4</td><td>24.000</td><td>4</td><td>x</td></tr></table>
<ul><li>Mais impressoras → menos horas: <b>inversa</b> → {4/3}.</li><li>Mais folhas → mais horas: <b>direta</b> → {9.000/24.000} = {3/8}.</li><li>Mais dias → menos horas por dia: <b>inversa</b> → {4/2}.</li></ul>
{5/x} = {4/3} × {3/8} × {4/2} = {48/48} = 1 → <b>x = 5 h por dia</b>.</div>
<h3>Caso 5 — Quando o x está no meio da tabela</h3>
<div class="ex">8 costureiras fazem 120 camisas em 5 dias. Quantas costureiras fazem 300 camisas em 10 dias?<br>Coluna do x: costureiras. Mais camisas → mais costureiras (<b>direta</b>: {120/300}); mais dias → menos costureiras (<b>inversa</b>: {10/5}).<br>{8/x} = {120/300} × {10/5} = {1200/1500} = {4/5} → 4x = 40 → <b>x = 10 costureiras</b>.</div>
<h3>Conferência rápida (bom senso)</h3><p>Sempre olhe o resultado: se aumentou o trabalho e a equipe é a mesma, o tempo tem que <b>aumentar</b>. Se der o contrário, alguma seta foi invertida errado.</p>`;

TEORIA['juros-simples']=`
<h3>Vocabulário</h3>
<ul><li><b>Capital (C)</b>: dinheiro aplicado ou emprestado no início.</li><li><b>Taxa (i)</b>: porcentagem cobrada por período (ao mês, ao ano). Use em decimal: 3% = 0,03.</li><li><b>Tempo (t)</b>: quantos períodos.</li><li><b>Juros (J)</b>: o que rendeu. <b>Montante (M)</b>: quanto ficou no final.</li></ul>
<p class="big"><b>J = C × i × t</b> &nbsp;&nbsp; <b>M = C + J</b></p>
<p>No juro <b>simples</b>, o juro de cada mês é sempre o mesmo, calculado só sobre o capital inicial.</p>
<h3>Caso 1 — Calcular os juros</h3>
<div class="ex">R$ 1.500 a 2% ao mês por 5 meses.<br>J = 1.500 × 0,02 × 5 = <b>R$ 150</b>. (Cada mês rende 30; 5 meses = 150.)</div>
<h3>Caso 2 — Calcular o montante</h3>
<div class="ex">Do caso 1: M = 1.500 + 150 = <b>R$ 1.650</b>.</div>
<h3>Caso 3 — Taxa e tempo em unidades diferentes</h3>
<div class="ex">R$ 2.000 a 12% <b>ao ano</b> por 6 <b>meses</b>.<ol><li>Iguale as unidades: 12% ao ano = 1% ao mês (÷ 12).</li><li>J = 2.000 × 0,01 × 6 = <b>R$ 120</b>.</li></ol>(Ou: 6 meses = 0,5 ano → 2.000 × 0,12 × 0,5 = 120.)</div>
<h3>Caso 4 — Descobrir o tempo</h3>
<div class="ex">R$ 800 a 5% ao mês renderam R$ 200. Por quanto tempo?<br>200 = 800 × 0,05 × t → 200 = 40t → <b>t = 5 meses</b>.</div>
<h3>Caso 5 — Descobrir a taxa</h3>
<div class="ex">R$ 1.000 viraram R$ 1.240 em 8 meses. Qual a taxa mensal?<ol><li>J = 1.240 − 1.000 = 240.</li><li>240 = 1.000 × i × 8 → 240 = 8.000i → i = 0,03 = <b>3% ao mês</b>.</li></ol></div>
<h3>Caso 6 — Descobrir o capital</h3>
<div class="ex">Quanto aplicar a 4% ao mês para ter R$ 96 de juros em 6 meses?<br>96 = C × 0,04 × 6 → 96 = 0,24C → <b>C = R$ 400</b>.</div>
<h3>Caso 7 — Descobrir o capital pelo montante</h3>
<div class="ex">Montante de R$ 1.300 após 10 meses a 3% ao mês. Capital?<br>M = C(1 + i·t) → 1.300 = C(1 + 0,3) → C = 1.300 ÷ 1,3 = <b>R$ 1.000</b>.</div>`;

TEORIA['juros-compostos']=`
<h3>Ideia</h3>
<p>No juro <b>composto</b> (“juros sobre juros”), o juro de cada mês entra no saldo e passa a render também. É como funcionam poupança, cartão de crédito e financiamentos.</p>
<p class="big"><b>M = C × (1 + i)<sup>t</sup></b> &nbsp;&nbsp; <b>J = M − C</b></p>
<h3>Caso 1 — Mês a mês (para entender)</h3>
<div class="ex">R$ 1.000 a 10% ao mês, por 3 meses:<table class="t"><tr><th>Mês</th><th>Saldo no início</th><th>Juros (10%)</th><th>Saldo no fim</th></tr><tr><td>1</td><td>1.000</td><td>100</td><td>1.100</td></tr><tr><td>2</td><td>1.100</td><td>110</td><td>1.210</td></tr><tr><td>3</td><td>1.210</td><td>121</td><td>1.331</td></tr></table>
Montante: <b>R$ 1.331</b>. Juros: R$ 331.</div>
<h3>Caso 2 — Pela fórmula</h3>
<div class="ex">Mesmo exemplo: M = 1.000 × 1,1<sup>3</sup> = 1.000 × 1,331 = <b>R$ 1.331</b>.<br>Como achar o fator: 1 + 0,10 = 1,10; 1,1 × 1,1 = 1,21; 1,21 × 1,1 = 1,331.</div>
<h3>Caso 3 — Comparar com juro simples</h3>
<div class="ex">Simples: J = 1.000 × 0,10 × 3 = 300 → M = 1.300.<br>Composto: M = 1.331. Diferença: R$ 31 a mais, e ela cresce muito com o tempo.</div>
<h3>Caso 4 — Taxa pequena</h3>
<div class="ex">R$ 5.000 a 2% ao mês por 2 meses: M = 5.000 × 1,02² = 5.000 × 1,0404 = <b>R$ 5.202</b>.</div>
<h3>Caso 5 — Desconto/perda composta (taxa negativa)</h3>
<div class="ex">Um carro de R$ 40.000 desvaloriza 10% ao ano. Em 2 anos: 40.000 × 0,9² = 40.000 × 0,81 = <b>R$ 32.400</b>.</div>
<h3>Caso 6 — Dívida de cartão (para conscientizar)</h3>
<div class="ex">Dívida de R$ 500 a 15% ao mês, 4 meses sem pagar: 500 × 1,15⁴ ≈ 500 × 1,749 ≈ <b>R$ 874,50</b>. Quase dobrou!</div>`;
