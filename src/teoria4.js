/* ===== TEORIA APROFUNDADA — GEOMETRIA, MEDIDAS, ESTATÍSTICA ===== */
var SVG_RET='<svg viewBox="0 0 220 140" width="220" height="140" role="img" aria-label="Triângulo retângulo com catetos b e c e hipotenusa a"><polygon points="20,120 200,120 20,20" fill="#FFF6DA" stroke="#0E1B3D" stroke-width="2"/><rect x="20" y="106" width="14" height="14" fill="none" stroke="#0E1B3D"/><text x="105" y="136" font-size="14" text-anchor="middle">cateto c</text><text x="4" y="74" font-size="14" transform="rotate(-90 12 74)">cateto b</text><text x="120" y="62" font-size="14">hipotenusa a</text><text x="168" y="114" font-size="13">α</text></svg>';
var SVG_PAR='<svg viewBox="0 0 260 150" width="260" height="150" role="img" aria-label="Duas retas paralelas cortadas por uma transversal, formando oito ângulos"><line x1="10" y1="45" x2="250" y2="45" stroke="#0E1B3D" stroke-width="2"/><line x1="10" y1="110" x2="250" y2="110" stroke="#0E1B3D" stroke-width="2"/><line x1="80" y1="5" x2="190" y2="145" stroke="#C0392B" stroke-width="2"/><text x="84" y="40" font-size="12">1</text><text x="118" y="40" font-size="12">2</text><text x="84" y="60" font-size="12">4</text><text x="116" y="60" font-size="12">3</text><text x="134" y="105" font-size="12">5</text><text x="168" y="105" font-size="12">6</text><text x="134" y="126" font-size="12">8</text><text x="166" y="126" font-size="12">7</text><text x="225" y="40" font-size="12">r</text><text x="225" y="105" font-size="12">s</text></svg>';

TEORIA['angulos']=`
<h3>O que é</h3><p>Ângulo é a “abertura” entre duas semirretas que saem do mesmo ponto (o <b>vértice</b>). Medimos em <b>graus (°)</b>; uma volta completa tem 360°.</p>
<table class="t"><tr><td><b>Agudo</b></td><td>menor que 90°</td></tr><tr><td><b>Reto</b></td><td>exatamente 90° (o “cantinho” do quadrado)</td></tr><tr><td><b>Obtuso</b></td><td>entre 90° e 180°</td></tr><tr><td><b>Raso</b></td><td>180° (uma linha reta)</td></tr></table>
<h3>Caso 1 — Complemento (soma 90°)</h3>
<div class="ex">Complemento de 35° = 90° − 35° = <b>55°</b>.</div>
<h3>Caso 2 — Suplemento (soma 180°)</h3>
<div class="ex">Suplemento de 35° = 180° − 35° = <b>145°</b>.</div>
<h3>Caso 3 — Opostos pelo vértice (são iguais)</h3>
<div class="ex">Duas retas se cruzam formando ângulos de (3x + 10)° e (5x − 30)°, opostos pelo vértice.<br>3x + 10 = 5x − 30 → 40 = 2x → x = 20 → cada ângulo: 3·20 + 10 = <b>70°</b>.<br>Os outros dois ângulos do cruzamento são suplementares: 180 − 70 = <b>110°</b>.</div>
<h3>Caso 4 — Adjacentes complementares/suplementares com equação</h3>
<div class="ex">Dois ângulos suplementares medem 2x e 3x + 30. → 2x + 3x + 30 = 180 → 5x = 150 → x = 30 → <b>60° e 120°</b>.</div>
<h3>Caso 5 — “O complemento de um ângulo é o dobro dele”</h3>
<div class="ex">Ângulo x; complemento 90 − x. → 90 − x = 2x → 90 = 3x → <b>x = 30°</b>.<br>“O suplemento é o triplo do complemento”: 180 − x = 3(90 − x) → 180 − x = 270 − 3x → 2x = 90 → <b>x = 45°</b>.</div>
<h3>Caso 6 — Ângulos em volta de um ponto</h3>
<div class="ex">Somam 360°. Três ângulos: 100°, 150° e x → x = 360 − 250 = <b>110°</b>.</div>
<h3>Caso 7 — Ângulo entre os ponteiros do relógio</h3>
<div class="ex">Cada “hora” no relógio vale 360 ÷ 12 = 30°. Às 3h em ponto: 3 × 30 = <b>90°</b>. Às 4h: 120°.</div>`;

TEORIA['retas-paralelas-transversal']=`
<h3>O cenário</h3>
<p>Duas retas paralelas (r e s) cortadas por uma transversal formam 8 ângulos. Truque principal: <b>só existem duas medidas</b> — um ângulo agudo e um obtuso, que somam 180°.</p>
${SVG_PAR}
<table class="t"><tr><th>Par</th><th>Exemplo na figura</th><th>Relação</th></tr>
<tr><td>Correspondentes (mesma posição)</td><td>1 e 5, 2 e 6, 4 e 8, 3 e 7</td><td><b>iguais</b></td></tr>
<tr><td>Alternos internos (dentro, lados opostos)</td><td>3 e 5, 4 e 6</td><td><b>iguais</b></td></tr>
<tr><td>Alternos externos (fora, lados opostos)</td><td>1 e 7, 2 e 8</td><td><b>iguais</b></td></tr>
<tr><td>Colaterais internos (dentro, mesmo lado)</td><td>3 e 6, 4 e 5</td><td><b>somam 180°</b></td></tr>
<tr><td>Colaterais externos (fora, mesmo lado)</td><td>2 e 7, 1 e 8</td><td><b>somam 180°</b></td></tr></table>
<p class="tip">Regra rápida: ângulos com a “mesma cara” (os dois agudos ou os dois obtusos) são iguais; um agudo com um obtuso somam 180°.</p>
<h3>Caso 1 — Iguais (alternos, correspondentes)</h3>
<div class="ex">Alternos internos: 3x + 20 e 5x − 20 → 3x + 20 = 5x − 20 → 40 = 2x → x = 20 → <b>80°</b>.</div>
<h3>Caso 2 — Somam 180° (colaterais)</h3>
<div class="ex">Colaterais internos: 3x + 10 e 2x + 20 → 5x + 30 = 180 → x = 30 → <b>100° e 80°</b>.</div>
<h3>Caso 3 — Achar os 8 ângulos a partir de um</h3>
<div class="ex">Se o ângulo 1 mede 65°: os agudos (1, 3, 5, 7) medem 65° e os obtusos (2, 4, 6, 8) medem 180 − 65 = <b>115°</b>.</div>
<h3>Caso 4 — O “bico” entre paralelas (regra do zigue-zague)</h3>
<div class="ex">Quando há um ponto entre as paralelas formando um “bico”, o ângulo do bico é a <b>soma</b> dos ângulos que as paralelas fazem com os segmentos. Ex.: 30° e 45° → bico de <b>75°</b>.</div>`;

TEORIA['triangulos']=`
<h3>Fatos principais</h3>
<ul><li>A soma dos ângulos internos de <b>qualquer</b> triângulo é <b>180°</b>.</li><li>O <b>ângulo externo</b> é igual à <b>soma dos dois internos não vizinhos</b> a ele.</li><li>Maior lado fica em frente ao maior ângulo.</li></ul>
<h3>Classificação</h3>
<table class="t"><tr><th>Pelos lados</th><th>Pelos ângulos</th></tr><tr><td><b>Equilátero</b>: 3 lados iguais (ângulos de 60°)</td><td><b>Acutângulo</b>: 3 ângulos agudos</td></tr><tr><td><b>Isósceles</b>: 2 lados iguais (2 ângulos da base iguais)</td><td><b>Retângulo</b>: um ângulo de 90°</td></tr><tr><td><b>Escaleno</b>: 3 lados diferentes</td><td><b>Obtusângulo</b>: um ângulo obtuso</td></tr></table>
<h3>Caso 1 — Terceiro ângulo</h3><div class="ex">Ângulos 50° e 70° → 180 − 120 = <b>60°</b>.</div>
<h3>Caso 2 — Ângulos em função de x</h3>
<div class="ex">x, 2x e 3x → 6x = 180 → x = 30 → <b>30°, 60°, 90°</b> (triângulo retângulo).<br>(x + 10), (2x − 20), (x + 30) → 4x + 20 = 180 → x = 40 → <b>50°, 60°, 70°</b>.</div>
<h3>Caso 3 — Isósceles</h3>
<div class="ex">Ângulo do vértice 40° → os da base: (180 − 40) ÷ 2 = <b>70°</b> cada.<br>Ângulo da base 65° → vértice: 180 − 2·65 = <b>50°</b>.</div>
<h3>Caso 4 — Ângulo externo</h3>
<div class="ex">Internos 45° e 60° → externo do terceiro vértice: 45 + 60 = <b>105°</b> (e o interno ali é 75°; 75 + 105 = 180 ✓).</div>
<h3>Caso 5 — Condição de existência</h3>
<div class="ex">Cada lado tem que ser <b>menor que a soma dos outros dois</b>. Basta testar o maior.<br>3, 4, 8 → 8 &lt; 3 + 4 = 7? Não → <b>não existe</b>.<br>5, 7, 10 → 10 &lt; 12 → <b>existe</b>.<br>Intervalo do 3º lado com lados 4 e 9: 9 − 4 &lt; x &lt; 9 + 4 → <b>5 &lt; x &lt; 13</b>.</div>
<h3>Caso 6 — Classificar pelos ângulos</h3>
<div class="ex">Ângulos 30°, 50°, 100° → tem um obtuso → <b>obtusângulo</b>.</div>`;

TEORIA['poligonos']=`
<h3>O que é</h3><p>Polígono é uma figura plana fechada formada por segmentos (lados). <b>Regular</b>: todos os lados e todos os ângulos iguais.</p>
<table class="t"><tr><td>3 triângulo</td><td>4 quadrilátero</td><td>5 pentágono</td><td>6 hexágono</td></tr><tr><td>7 heptágono</td><td>8 octógono</td><td>9 eneágono</td><td>10 decágono</td></tr><tr><td>11 undecágono</td><td>12 dodecágono</td><td>15 pentadecágono</td><td>20 icoságono</td></tr></table>
<h3>Fórmulas</h3>
<table class="t"><tr><td>Soma dos ângulos internos</td><td><b>S = (n − 2) × 180°</b></td></tr><tr><td>Cada ângulo interno (regular)</td><td><b>{S/n}</b></td></tr><tr><td>Soma dos externos</td><td><b>360°</b> (sempre)</td></tr><tr><td>Cada ângulo externo (regular)</td><td><b>{360°/n}</b></td></tr><tr><td>Diagonais</td><td><b>d = {n(n − 3)/2}</b></td></tr></table>
<p><i>De onde vem (n − 2)?</i> De um vértice, as diagonais dividem o polígono em (n − 2) triângulos, cada um com 180°.</p>
<h3>Caso 1 — Soma dos internos</h3><div class="ex">Hexágono: (6 − 2) × 180 = <b>720°</b>.</div>
<h3>Caso 2 — Ângulo interno do regular</h3><div class="ex">Octógono regular: (8 − 2) × 180 = 1080 → 1080 ÷ 8 = <b>135°</b>.</div>
<h3>Caso 3 — Ângulo externo e o caminho de volta</h3>
<div class="ex">Pentágono regular: externo = 360 ÷ 5 = 72°, interno = 180 − 72 = <b>108°</b>.<br><b>Volta:</b> o interno de um regular mede 140°. Quantos lados? Externo = 40° → n = 360 ÷ 40 = <b>9 lados</b>.</div>
<h3>Caso 4 — Lados a partir da soma</h3><div class="ex">S = 1.440° → (n − 2) = 1440 ÷ 180 = 8 → <b>n = 10</b>.</div>
<h3>Caso 5 — Diagonais</h3>
<div class="ex">Decágono: {10 × 7/2} = <b>35 diagonais</b>.<br>Diagonais que saem de <b>um</b> vértice: n − 3 (no decágono, 7).</div>
<h3>Caso 6 — Ângulo desconhecido num polígono qualquer</h3>
<div class="ex">Quadrilátero com ângulos 80°, 95°, 110° e x → soma 360 → x = <b>75°</b>.</div>`;

TEORIA['perimetro']=`
<h3>O que é</h3><p><b>Perímetro</b> é o comprimento do <b>contorno</b>: some todos os lados. É medido em unidades de comprimento (cm, m, km).</p>
<table class="t"><tr><td>Quadrado de lado L</td><td>P = 4L</td></tr><tr><td>Retângulo de lados a e b</td><td>P = 2a + 2b</td></tr><tr><td>Triângulo</td><td>P = a + b + c</td></tr><tr><td>Polígono regular de n lados</td><td>P = n × L</td></tr><tr><td>Circunferência</td><td>C = 2πr</td></tr></table>
<h3>Caso 1 — Retângulo</h3><div class="ex">8 m por 5 m → P = 2·8 + 2·5 = <b>26 m</b>.</div>
<h3>Caso 2 — Lado a partir do perímetro</h3>
<div class="ex">Quadrado de perímetro 36 cm → lado 36 ÷ 4 = <b>9 cm</b>.<br>Retângulo de perímetro 30 cm com um lado de 9 cm → 2·9 + 2b = 30 → b = <b>6 cm</b>.</div>
<h3>Caso 3 — Figura em “L” ou recortada</h3>
<div class="ex">Some <b>todos</b> os lados do contorno, descobrindo os que faltam pelas diferenças. Dica: num “L” feito de retângulos, o perímetro é igual ao do retângulo que o envolve.</div>
<h3>Caso 4 — Unidades misturadas</h3><div class="ex">Lados de 1,5 m e 80 cm → passe tudo para cm: 150 e 80 → P = 2·150 + 2·80 = <b>460 cm = 4,6 m</b>.</div>
<h3>Caso 5 — Problemas</h3>
<div class="ex">Cercar um terreno 20 m × 15 m com 4 voltas de arame: P = 70 m → 4 × 70 = <b>280 m</b>.<br>Rodapé de uma sala 5 m × 4 m com porta de 1 m: 18 − 1 = <b>17 m</b>.</div>`;

TEORIA['areas']=`
<h3>O que é</h3><p><b>Área</b> é a medida da <b>superfície</b> (o “tamanho por dentro”). Unidade: quadrados (cm², m²). 1 m² é um quadrado de 1 m de lado.</p>
<table class="t"><tr><td><b>Retângulo</b></td><td>A = b × h</td></tr><tr><td><b>Quadrado</b></td><td>A = L²</td></tr><tr><td><b>Paralelogramo</b></td><td>A = b × h (h é a altura, não o lado inclinado)</td></tr><tr><td><b>Triângulo</b></td><td>A = {b × h/2}</td></tr><tr><td><b>Trapézio</b></td><td>A = {(B + b) × h/2}</td></tr><tr><td><b>Losango</b></td><td>A = {D × d/2}</td></tr><tr><td><b>Círculo</b></td><td>A = πr²</td></tr></table>
<p><i>Por que o triângulo divide por 2?</i> Dois triângulos iguais formam um paralelogramo.</p>
<h3>Caso 1 — Retângulo e quadrado</h3><div class="ex">Sala 6 m × 4 m → <b>24 m²</b>. Quadrado de lado 7 cm → <b>49 cm²</b>.</div>
<h3>Caso 2 — Triângulo</h3><div class="ex">Base 10 cm, altura 7 cm → {70/2} = <b>35 cm²</b>.<br>Triângulo retângulo: a base e a altura são os <b>catetos</b>: 6 e 8 → {48/2} = <b>24</b>.</div>
<h3>Caso 3 — Trapézio</h3><div class="ex">B = 10, b = 6, h = 4 → {(10 + 6) × 4/2} = {64/2} = <b>32</b>.</div>
<h3>Caso 4 — Losango</h3><div class="ex">Diagonais 12 e 8 → {96/2} = <b>48</b>.</div>
<h3>Caso 5 — Figura composta (dividir ou subtrair)</h3>
<div class="ex">Um terreno em “L”: retângulo 10 × 8 do qual foi tirado um canto 4 × 3.<br><b>Subtraindo:</b> 80 − 12 = <b>68 m²</b>.<br>(Ou divida em dois retângulos e some.)</div>
<h3>Caso 6 — Achar uma medida a partir da área</h3><div class="ex">Retângulo de área 54 m² e base 9 m → altura 54 ÷ 9 = <b>6 m</b>. Quadrado de área 64 → lado √64 = <b>8</b>.</div>
<h3>Caso 7 — Custo por m²</h3><div class="ex">Piso a R$ 45/m² numa sala 5 × 4 → 20 m² × 45 = <b>R$ 900</b>.</div>
<h3>Caso 8 — O que acontece ao dobrar os lados</h3><div class="ex">Dobrou os lados → a área fica <b>4 vezes</b> maior (2 × 2). Triplicou → 9 vezes.</div>`;

TEORIA['circunferencia-circulo']=`
<h3>Vocabulário</h3>
<ul><li><b>Circunferência</b>: só a linha da borda. <b>Círculo</b>: a região toda (borda + interior).</li><li><b>Raio (r)</b>: centro até a borda. <b>Diâmetro (d)</b>: atravessa pelo centro, d = 2r.</li><li><b>π (pi)</b>: razão entre o comprimento e o diâmetro de qualquer circunferência ≈ 3,14.</li></ul>
<table class="t"><tr><td>Comprimento (contorno)</td><td><b>C = 2πr</b> = πd</td></tr><tr><td>Área</td><td><b>A = πr²</b></td></tr></table>
<h3>Caso 1 — Comprimento</h3><div class="ex">r = 5 cm → C = 2 × 3,14 × 5 = <b>31,4 cm</b>.</div>
<h3>Caso 2 — Área</h3><div class="ex">r = 5 cm → A = 3,14 × 5² = 3,14 × 25 = <b>78,5 cm²</b>.</div>
<h3>Caso 3 — Dado o diâmetro (cuidado!)</h3><div class="ex">d = 10 m → r = 5 m. Área = 3,14 × 25 = 78,5 m². (Erro comum: usar 10² = 100.)</div>
<h3>Caso 4 — Caminho de volta</h3><div class="ex">Uma praça circular tem 62,8 m de contorno. Raio? 62,8 = 2 × 3,14 × r → 6,28r = 62,8 → <b>r = 10 m</b>.</div>
<h3>Caso 5 — Voltas de uma roda</h3><div class="ex">Roda de raio 30 cm: uma volta = 2 × 3,14 × 30 = 188,4 cm. Em 500 voltas: 94.200 cm = <b>942 m</b>.</div>
<h3>Caso 6 — Coroa circular (anel)</h3><div class="ex">Raio externo 5, interno 3 → A = π(5² − 3²) = 3,14 × 16 = <b>50,24</b>.</div>
<h3>Caso 7 — Setor circular (fatia)</h3><div class="ex">Fatia de 90° de uma pizza de raio 4: é {90/360} = {1/4} do círculo → {1/4} × 3,14 × 16 = <b>12,56</b>.</div>
<h3>Caso 8 — Resposta “em função de π”</h3><div class="ex">r = 3 → A = 9π (sem substituir o π). Muitas provas pedem assim.</div>`;

TEORIA['pitagoras']=`
<h3>O teorema</h3>
<p>Vale só em <b>triângulo retângulo</b> (que tem um ângulo de 90°):</p>
${SVG_RET}
<p class="big"><b>a² = b² + c²</b></p>
<p>“O quadrado da hipotenusa é igual à soma dos quadrados dos catetos.” A <b>hipotenusa</b> é o maior lado, de frente para o ângulo reto.</p>
<h3>Caso 1 — Achar a hipotenusa (soma)</h3>
<div class="ex">Catetos 6 e 8 → a² = 36 + 64 = 100 → a = <b>10</b>.</div>
<h3>Caso 2 — Achar um cateto (subtração)</h3>
<div class="ex">Hipotenusa 13, cateto 5 → 13² = 5² + c² → 169 = 25 + c² → c² = 144 → c = <b>12</b>.</div>
<h3>Caso 3 — Resultado com raiz</h3>
<div class="ex">Catetos 2 e 4 → a² = 4 + 16 = 20 → a = √20 = <b>2√5</b> ≈ 4,47.</div>
<h3>Caso 4 — Diagonal do quadrado e do retângulo</h3>
<div class="ex">Quadrado de lado L: d² = L² + L² → <b>d = L√2</b>. Lado 5 → 5√2 ≈ 7,07.<br>Retângulo 9 × 12 → d² = 81 + 144 = 225 → <b>d = 15</b>.</div>
<h3>Caso 5 — Altura do triângulo equilátero</h3>
<div class="ex">Lado 6: a altura divide a base ao meio (3) → h² + 3² = 6² → h² = 27 → <b>h = 3√3</b>. Fórmula: h = {L√3/2}.</div>
<h3>Caso 6 — Problemas (escada, rampa, TV)</h3>
<div class="ex"><b>Escada:</b> 5 m de escada, pé a 3 m da parede → altura: 25 − 9 = 16 → <b>4 m</b>.<br><b>TV:</b> a “polegada” é a diagonal. Tela 48 × 36 → d² = 2304 + 1296 = 3600 → <b>60</b>.</div>
<h3>Caso 7 — Verificar se é retângulo</h3>
<div class="ex">Lados 7, 24, 25: 7² + 24² = 49 + 576 = 625 = 25² → <b>é retângulo</b>.</div>
<h3>Ternos pitagóricos para decorar</h3><p>3-4-5 · 5-12-13 · 8-15-17 · 7-24-25 e seus múltiplos (6-8-10, 9-12-15, 10-24-26…).</p>`;

TEORIA['tales-semelhanca']=`
<h3>Teorema de Tales</h3>
<p>Se um <b>feixe de retas paralelas</b> é cortado por duas transversais, os segmentos formados são <b>proporcionais</b>.</p>
<div class="ex">Numa transversal os segmentos medem 4 e 6; na outra, 10 e x.<br>{4/6} = {10/x} → 4x = 60 → <b>x = 15</b>.<br><b>Com x nos dois:</b> {x/3} = {x + 4/5} → 5x = 3x + 12 → <b>x = 6</b>.</div>
<h3>Semelhança de triângulos</h3>
<p>Dois triângulos são <b>semelhantes</b> quando têm os <b>mesmos ângulos</b>. Aí os lados correspondentes são <b>proporcionais</b> (um é uma “ampliação” do outro). A razão entre lados correspondentes é a <b>razão de semelhança k</b>.</p>
<p>Basta ter <b>dois ângulos iguais</b> para garantir a semelhança (critério AA).</p>
<h3>Caso 1 — Lados de triângulos semelhantes</h3>
<div class="ex">Triângulo de lados 3, 4, 5 e um semelhante com lado menor 9 → k = 3 → <b>9, 12, 15</b>.</div>
<h3>Caso 2 — Sombra (o clássico)</h3>
<div class="ex">Um poste de 2 m faz sombra de 3 m; no mesmo instante um prédio faz sombra de 18 m.<br>Os raios de sol são paralelos → triângulos semelhantes: {h/18} = {2/3} → 3h = 36 → <b>h = 12 m</b>.</div>
<h3>Caso 3 — Triângulo “dentro” de outro (reta paralela a um lado)</h3>
<div class="ex">Num triângulo, uma reta paralela à base corta os lados formando um triângulo menor de base 6 e altura 4. Se a base do grande é 15, a altura do grande: {4/H} = {6/15} → 6H = 60 → <b>H = 10</b>.</div>
<h3>Caso 4 — Perímetro e área</h3>
<div class="ex">Razão de semelhança k → perímetros na razão <b>k</b>, áreas na razão <b>k²</b>.<br>k = 3 e área menor 10 cm² → área maior 10 × 9 = <b>90 cm²</b>.</div>
<h3>Caso 5 — Mapas e maquetes</h3><div class="ex">Maquete na escala 1 : 50; altura real 15 m = 1.500 cm → maquete 1500 ÷ 50 = <b>30 cm</b>.</div>`;

TEORIA['relacoes-metricas']=`
<h3>Os elementos</h3>
<p>No triângulo retângulo, traçando a <b>altura h</b> relativa à hipotenusa, ela divide a hipotenusa <b>a</b> em duas partes: <b>m</b> (projeção do cateto c) e <b>n</b> (projeção do cateto b).</p>
<table class="t"><tr><td><b>a = m + n</b></td><td>a hipotenusa é a soma das projeções</td></tr><tr><td><b>h² = m · n</b></td><td>altura ao quadrado = produto das projeções</td></tr><tr><td><b>b² = a · n</b></td><td>cateto² = hipotenusa × sua projeção</td></tr><tr><td><b>c² = a · m</b></td><td>(mesma ideia, outro cateto)</td></tr><tr><td><b>a · h = b · c</b></td><td>vem da área calculada de dois jeitos</td></tr><tr><td><b>a² = b² + c²</b></td><td>Pitágoras</td></tr></table>
<h3>Caso 1 — Altura a partir das projeções</h3><div class="ex">m = 9, n = 16 → h² = 144 → <b>h = 12</b>.</div>
<h3>Caso 2 — Cateto a partir da hipotenusa e projeção</h3><div class="ex">a = 25, m = 9 → c² = 25 · 9 = 225 → <b>c = 15</b>.</div>
<h3>Caso 3 — Projeção a partir do cateto</h3><div class="ex">a = 10, b = 8 → 64 = 10 · n → <b>n = 6,4</b>; m = 10 − 6,4 = 3,6.</div>
<h3>Caso 4 — Altura a partir dos catetos</h3><div class="ex">b = 6, c = 8 → a = 10 (Pitágoras) → 10h = 48 → <b>h = 4,8</b>.</div>
<h3>Caso 5 — Resolver tudo a partir de duas medidas</h3>
<div class="ex">Dados m = 4 e n = 9: a = 13; h² = 36 → h = 6; b² = 13 · 9 = 117 → b = 3√13; c² = 13 · 4 = 52 → c = 2√13.</div>
<p class="tip">Dica para escolher a fórmula: veja quais 2 medidas você tem e qual quer; procure a fórmula que tem exatamente essas três letras.</p>`;

TEORIA['trigonometria']=`
<h3>As três razões</h3>
${SVG_RET}
<p>Para um ângulo agudo α de um triângulo retângulo:</p>
<table class="t"><tr><td><b>sen α</b></td><td>{cateto oposto/hipotenusa}</td></tr><tr><td><b>cos α</b></td><td>{cateto adjacente/hipotenusa}</td></tr><tr><td><b>tg α</b></td><td>{cateto oposto/cateto adjacente}</td></tr></table>
<p><b>Oposto</b> = o cateto de frente para o ângulo. <b>Adjacente</b> = o cateto “encostado” no ângulo (que não é a hipotenusa). Macete: <b>SOH-CAH-TOA</b>.</p>
<h3>Ângulos notáveis</h3>
<table class="t"><tr><th></th><th>30°</th><th>45°</th><th>60°</th></tr><tr><td>sen</td><td>{1/2}</td><td>{√2/2}</td><td>{√3/2}</td></tr><tr><td>cos</td><td>{√3/2}</td><td>{√2/2}</td><td>{1/2}</td></tr><tr><td>tg</td><td>{√3/3}</td><td>1</td><td>√3</td></tr></table>
<h3>Caso 1 — Calcular as razões com os lados</h3>
<div class="ex">Triângulo 3-4-5, ângulo α oposto ao lado 3: sen α = {3/5}; cos α = {4/5}; tg α = {3/4}.</div>
<h3>Caso 2 — Achar o cateto oposto (seno)</h3>
<div class="ex">Hipotenusa 20, ângulo 30° → sen 30° = {x/20} → {1/2} = {x/20} → <b>x = 10</b>.</div>
<h3>Caso 3 — Achar o cateto adjacente (cosseno)</h3>
<div class="ex">Hipotenusa 10, ângulo 60° → cos 60° = {x/10} → x = <b>5</b>.</div>
<h3>Caso 4 — Achar a hipotenusa</h3>
<div class="ex">Cateto oposto ao ângulo de 30° mede 7 → sen 30° = {7/H} → {1/2} = {7/H} → <b>H = 14</b>.</div>
<h3>Caso 5 — Tangente (altura de prédio/árvore)</h3>
<div class="ex">A 30 m de um prédio, vejo o topo a 60°. Altura: tg 60° = {h/30} → h = 30√3 ≈ <b>51,96 m</b>.</div>
<h3>Caso 6 — Descobrir o ângulo</h3>
<div class="ex">Catetos iguais (5 e 5) → tg α = 1 → <b>α = 45°</b>.<br>Cateto oposto 4 e hipotenusa 8 → sen α = {1/2} → <b>α = 30°</b>.</div>
<h3>Caso 7 — Ângulo não notável (usar tabela)</h3>
<div class="ex">Rampa de 10 m com 20° de inclinação; sen 20° ≈ 0,34 → altura ≈ 10 × 0,34 = <b>3,4 m</b>.</div>`;

TEORIA['volume']=`
<h3>O que é</h3><p><b>Volume</b> é o espaço que um sólido ocupa. Unidade: <b>cúbicas</b> (cm³, m³). <b>Capacidade</b> é quanto cabe dentro (litros).</p>
<table class="t"><tr><td><b>Cubo</b> (aresta a)</td><td>V = a³</td></tr><tr><td><b>Paralelepípedo</b> (caixa)</td><td>V = c × l × h</td></tr><tr><td><b>Prisma</b> qualquer</td><td>V = área da base × altura</td></tr><tr><td><b>Cilindro</b></td><td>V = πr² × h</td></tr><tr><td><b>Pirâmide e cone</b></td><td>V = {área da base × altura/3}</td></tr></table>
<table class="t"><tr><td>1 dm³ = <b>1 L</b></td><td>1 m³ = <b>1.000 L</b></td><td>1 cm³ = <b>1 mL</b></td></tr></table>
<h3>Caso 1 — Cubo</h3><div class="ex">a = 4 cm → 4 × 4 × 4 = <b>64 cm³</b>.</div>
<h3>Caso 2 — Caixa e litros</h3><div class="ex">Aquário 50 cm × 30 cm × 40 cm → 60.000 cm³ = 60.000 mL = <b>60 L</b>.</div>
<h3>Caso 3 — Caixa-d’água em metros</h3><div class="ex">2 m × 1,5 m × 1 m = 3 m³ = <b>3.000 L</b>.</div>
<h3>Caso 4 — Prisma triangular</h3><div class="ex">Base triângulo (b = 6, h = 4) → área 12; altura do prisma 10 → V = <b>120</b>.</div>
<h3>Caso 5 — Cilindro</h3><div class="ex">Lata com r = 5 cm e h = 12 cm → 3,14 × 25 × 12 = <b>942 cm³</b> ≈ 0,94 L.</div>
<h3>Caso 6 — Cone e pirâmide (um terço!)</h3><div class="ex">Cone com r = 3 e h = 10 → {3,14 × 9 × 10/3} = <b>94,2</b>.</div>
<h3>Caso 7 — Achar uma medida a partir do volume</h3><div class="ex">Caixa de 240 cm³ com base 8 × 6 → altura 240 ÷ 48 = <b>5 cm</b>.</div>
<h3>Caso 8 — Nível de água</h3><div class="ex">Piscina 10 m × 5 m; quantos litros para subir 10 cm? 10 × 5 × 0,1 = 5 m³ = <b>5.000 L</b>.</div>`;

TEORIA['unidades-medida']=`
<h3>A escadinha (comprimento, massa, capacidade)</h3>
<table class="t"><tr><th>km</th><th>hm</th><th>dam</th><th><b>m</b></th><th>dm</th><th>cm</th><th>mm</th></tr><tr><td>kg</td><td>hg</td><td>dag</td><td><b>g</b></td><td>dg</td><td>cg</td><td>mg</td></tr><tr><td>kL</td><td>hL</td><td>daL</td><td><b>L</b></td><td>dL</td><td>cL</td><td>mL</td></tr></table>
<p>Cada degrau para a <b>direita</b>: × 10 (a unidade ficou menor, o número fica maior). Para a <b>esquerda</b>: ÷ 10.</p>
<h3>Caso 1 — Comprimento</h3><div class="ex">2,5 km → m: 3 degraus à direita → × 1.000 → <b>2.500 m</b>.<br>350 cm → m: 2 degraus à esquerda → ÷ 100 → <b>3,5 m</b>.</div>
<h3>Caso 2 — Massa</h3><div class="ex">1,2 kg → g = <b>1.200 g</b>. &nbsp;750 g → kg = 0,75 kg. &nbsp;1 tonelada = 1.000 kg.</div>
<h3>Caso 3 — Capacidade</h3><div class="ex">2 L = <b>2.000 mL</b>. &nbsp;350 mL = 0,35 L.</div>
<h3>Caso 4 — Área (cada degrau × 100!)</h3><div class="ex">1 m² = 100 dm² = 10.000 cm². &nbsp;3 m² → <b>30.000 cm²</b>.<br>1 km² = 1.000.000 m². &nbsp;1 hectare = 10.000 m².</div>
<h3>Caso 5 — Volume (cada degrau × 1.000!)</h3><div class="ex">1 m³ = 1.000 dm³ = 1.000.000 cm³. &nbsp;2 m³ = <b>2.000 L</b>.</div>
<h3>Caso 6 — Tempo (base 60, não 10!)</h3><div class="ex">1 h = 60 min; 1 min = 60 s; 1 dia = 24 h.<br>2 h 15 min = <b>135 min</b>. &nbsp;200 min = 3 h 20 min. &nbsp;1,5 h = <b>1 h 30 min</b> (e não 1 h 50!).</div>
<h3>Caso 7 — Somar medidas diferentes</h3><div class="ex">1,2 m + 35 cm + 400 mm → tudo em cm: 120 + 35 + 40 = <b>195 cm</b>.</div>`;

TEORIA['plano-cartesiano']=`
<h3>O que é</h3>
<p>Dois eixos perpendiculares: o <b>eixo x</b> (horizontal, das abscissas) e o <b>eixo y</b> (vertical, das ordenadas). Eles se cruzam na <b>origem (0, 0)</b>. Cada ponto é um <b>par ordenado (x, y)</b>: primeiro anda na horizontal, depois na vertical.</p>
<table class="t"><tr><td>1º quadrante: (+, +)</td><td>2º quadrante: (−, +)</td></tr><tr><td>3º quadrante: (−, −)</td><td>4º quadrante: (+, −)</td></tr></table>
<p>Pontos em cima dos eixos (como (3, 0) ou (0, −2)) <b>não</b> pertencem a quadrante.</p>
<h3>Caso 1 — Localizar e dar o quadrante</h3><div class="ex">(−3, 5): anda 3 para a esquerda e 5 para cima → <b>2º quadrante</b>.</div>
<h3>Caso 2 — Simétricos</h3><div class="ex">P(4, −2). Em relação ao eixo x: (4, 2). Ao eixo y: (−4, −2). À origem: (−4, 2).</div>
<h3>Caso 3 — Ponto médio</h3><div class="ex">A(2, 8) e B(6, −4) → M = ({2 + 6/2}, {8 + (−4)/2}) = <b>(4, 2)</b>. É a média das coordenadas.</div>
<h3>Caso 4 — Distância entre dois pontos</h3>
<div class="ex">A(1, 2) e B(7, 10)<ol><li>Δx = 7 − 1 = 6; Δy = 10 − 2 = 8.</li><li>Pitágoras: d² = 6² + 8² = 100 → <b>d = 10</b>.</li></ol>
Fórmula: d = √[(x₂ − x₁)² + (y₂ − y₁)²].</div>
<h3>Caso 5 — Distância em reta horizontal/vertical</h3><div class="ex">(2, 3) e (2, −5): mesmo x → d = |3 − (−5)| = <b>8</b>.</div>
<h3>Caso 6 — Área de figura no plano</h3><div class="ex">Retângulo de vértices (1, 1), (5, 1), (5, 4), (1, 4): base 4, altura 3 → <b>12</b>.</div>`;

TEORIA['media-moda-mediana']=`
<h3>Medidas de tendência central</h3>
<p>São números que <b>resumem</b> um conjunto de dados.</p>
<h3>Média aritmética</h3>
<div class="ex">Some tudo e divida pela quantidade. Notas 6, 8, 7, 9 → {30/4} = <b>7,5</b>.</div>
<h3>Média ponderada</h3>
<div class="ex">Cada valor tem um <b>peso</b>. Prova (peso 3) nota 6, trabalho (peso 1) nota 10 → {6·3 + 10·1/3 + 1} = {28/4} = <b>7</b>.</div>
<h3>Média com tabela de frequência</h3>
<div class="ex"><table class="t"><tr><th>Nota</th><th>Alunos</th></tr><tr><td>5</td><td>2</td></tr><tr><td>7</td><td>3</td></tr><tr><td>8</td><td>5</td></tr></table>Média = {5·2 + 7·3 + 8·5/10} = {71/10} = <b>7,1</b>. (A frequência funciona como peso.)</div>
<h3>Moda</h3>
<div class="ex">O valor que <b>mais aparece</b>.<br>2, 3, 3, 5, 7 → moda <b>3</b>. &nbsp;1, 1, 4, 4, 6 → <b>bimodal</b> (1 e 4). &nbsp;1, 2, 3, 4 → <b>amodal</b> (sem moda).<br>Serve também para dados não numéricos: cor preferida, tamanho de camiseta.</div>
<h3>Mediana</h3>
<div class="ex">Coloque em <b>ordem</b> e pegue o do <b>meio</b>.<br><b>Quantidade ímpar:</b> 9, 2, 7, 4, 5 → ordenado 2, 4, <b>5</b>, 7, 9 → mediana 5.<br><b>Quantidade par:</b> 3, 8, 1, 6 → 1, <b>3, 6</b>, 8 → média dos dois do meio: {3 + 6/2} = <b>4,5</b>.</div>
<h3>Amplitude</h3><div class="ex">Maior − menor: 2, 4, 5, 7, 9 → 9 − 2 = <b>7</b>. Mostra o quanto os dados são espalhados.</div>
<h3>Caso — Descobrir um valor que falta</h3>
<div class="ex">A média de 4 notas é 7; três delas são 6, 8 e 5. A quarta? Total precisa ser 4 × 7 = 28 → 28 − 19 = <b>9</b>.</div>
<h3>Qual usar?</h3><p>A média é puxada por valores extremos (ex.: salários com um milionário). Nesses casos a <b>mediana</b> representa melhor o “típico”.</p>`;

TEORIA['probabilidade']=`
<h3>O que é</h3>
<p class="big">P(evento) = {casos favoráveis/casos possíveis}</p>
<ul><li>Vai de <b>0</b> (impossível) a <b>1</b> (certo). Em % de 0% a 100%.</li><li><b>Espaço amostral</b>: todos os resultados possíveis. Moeda: {cara, coroa}. Dado: {1, 2, 3, 4, 5, 6}.</li><li>Vale quando todos os resultados são <b>igualmente prováveis</b>.</li></ul>
<h3>Caso 1 — Um dado</h3><div class="ex">P(sair múltiplo de 3) = {2/6} = <b>{1/3}</b> (3 e 6).</div>
<h3>Caso 2 — Urna</h3><div class="ex">4 bolas azuis e 6 vermelhas. P(azul) = {4/10} = <b>{2/5}</b> = 40%.</div>
<h3>Caso 3 — Evento complementar (“não”)</h3><div class="ex">P(não sair 6 num dado) = 1 − {1/6} = <b>{5/6}</b>.<br>Útil para “pelo menos um”: P(pelo menos uma cara em 3 moedas) = 1 − P(nenhuma) = 1 − {1/8} = <b>{7/8}</b>.</div>
<h3>Caso 4 — Dois eventos independentes (“e” → multiplica)</h3><div class="ex">Moeda dar cara <b>e</b> dado dar 6: {1/2} × {1/6} = <b>{1/12}</b>.</div>
<h3>Caso 5 — Dois dados (tabela 6 × 6)</h3><div class="ex">36 resultados. Soma 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) → {6/36} = <b>{1/6}</b>.</div>
<h3>Caso 6 — “Ou” (some, sem contar duas vezes)</h3><div class="ex">Dado: par <b>ou</b> maior que 4 → {2, 4, 6} ∪ {5, 6} = {2, 4, 5, 6} → <b>{4/6} = {2/3}</b>.</div>
<h3>Caso 7 — Sem reposição</h3><div class="ex">3 azuis e 2 vermelhas; tiro duas, sem devolver. P(duas azuis) = {3/5} × {2/4} = {6/20} = <b>{3/10}</b>. Na 2ª retirada há uma bola a menos!</div>
<h3>Caso 8 — Baralho/objetos</h3><div class="ex">Num baralho de 52 cartas, P(ás) = {4/52} = {1/13}.</div>`;

TEORIA['contagem']=`
<h3>Princípio multiplicativo (PFC)</h3>
<p>Se uma decisão tem <b>m</b> opções e outra, independente, tem <b>n</b>, as duas juntas têm <b>m × n</b> possibilidades. Desenhe um <b>tracinho por etapa</b>, escreva as opções em cada um e multiplique.</p>
<h3>Caso 1 — Combinações de roupa/cardápio</h3><div class="ex">3 camisas, 2 calças, 2 tênis → 3 × 2 × 2 = <b>12</b> maneiras. (Faça a árvore de possibilidades com o aluno para ver os 12.)</div>
<h3>Caso 2 — Com repetição permitida</h3><div class="ex">Senhas de 4 dígitos (0–9): 10 × 10 × 10 × 10 = <b>10.000</b>.</div>
<h3>Caso 3 — Sem repetição</h3><div class="ex">Números de 3 algarismos <b>distintos</b> usando 1, 2, 3, 4, 5: 5 × 4 × 3 = <b>60</b>.</div>
<h3>Caso 4 — Com restrição (comece pela posição exigente!)</h3><div class="ex">Números <b>pares</b> de 3 algarismos distintos com 1, 2, 3, 4, 5.<ol><li>Última casa (par): 2 opções (2 ou 4).</li><li>Primeira: 4 opções (sobrou). Do meio: 3.</li><li>2 × 4 × 3 = <b>24</b>.</li></ol>Restrição do zero: números de 3 algarismos distintos com 0–9: 1ª casa não pode ser 0 → 9 × 9 × 8 = <b>648</b>.</div>
<h3>Caso 5 — Permutação (arrumar todos em fila)</h3><div class="ex">5 pessoas numa fila: 5 × 4 × 3 × 2 × 1 = 5! = <b>120</b>.<br>Anagramas de AMOR: 4! = <b>24</b>.</div>
<h3>Caso 6 — Anagramas com letras repetidas</h3><div class="ex">ARARA: 5 letras, A aparece 3 vezes, R 2 vezes → {5!/3! · 2!} = {120/12} = <b>10</b>.</div>
<h3>Caso 7 — Quando a ordem não importa (grupos)</h3><div class="ex">Escolher 2 alunos de 5 para uma comissão: 5 × 4 = 20 pares ordenados, mas “Ana e Bia” = “Bia e Ana” → ÷ 2 = <b>10</b>.<br>Apertos de mão entre 6 pessoas: {6 × 5/2} = <b>15</b>.</div>
<p class="tip">Pergunta-chave: <b>trocar a ordem muda o resultado?</b> Senha, fila, pódio → muda (não divide). Grupo, comissão, aperto de mão → não muda (divide).</p>`;
