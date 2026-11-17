/* ===== TEORIA — elementos notáveis, semelhança e Tales (versão bem didática) ===== */
var SVG_CEV='<svg viewBox="0 0 280 310" width="320" height="354" role="img" aria-label="Quatro triângulos mostrando altura, mediana, bissetriz e mediatriz">'
+'<g font-size="12" fill="#0E1B3D">'
/* altura */
+'<polygon points="35,22 8,120 125,120" fill="#FFF6DA" stroke="#0E1B3D" stroke-width="2"/><line x1="35" y1="22" x2="35" y2="120" stroke="#C0392B" stroke-width="2.5"/><rect x="35" y="110" width="10" height="10" fill="none" stroke="#C0392B"/><text x="30" y="16">A</text><text x="0" y="136">B</text><text x="122" y="136">C</text><text x="38" y="136" fill="#C0392B">H</text><text x="62" y="148" text-anchor="middle" font-weight="700">ALTURA (90°)</text>'
/* mediana */
+'<g transform="translate(145,0)"><polygon points="35,22 8,120 125,120" fill="#FFF6DA" stroke="#0E1B3D" stroke-width="2"/><line x1="35" y1="22" x2="66.5" y2="120" stroke="#1F6FEB" stroke-width="2.5"/><line x1="36" y1="115" x2="36" y2="125" stroke="#1F6FEB" stroke-width="2"/><line x1="96" y1="115" x2="96" y2="125" stroke="#1F6FEB" stroke-width="2"/><text x="30" y="16">A</text><text x="0" y="136">B</text><text x="122" y="136">C</text><text x="62" y="136" fill="#1F6FEB">M</text><text x="62" y="148" text-anchor="middle" font-weight="700">MEDIANA (meio)</text></g>'
/* bissetriz */
+'<g transform="translate(0,160)"><polygon points="35,22 8,120 125,120" fill="#FFF6DA" stroke="#0E1B3D" stroke-width="2"/><line x1="35" y1="22" x2="57.4" y2="120" stroke="#1E8E3E" stroke-width="2.5"/><path d="M29.5,41 Q36,44 39.5,40.5" fill="none" stroke="#1E8E3E" stroke-width="2"/><path d="M39.5,40.5 Q44,40 46,37" fill="none" stroke="#1E8E3E" stroke-width="2"/><text x="30" y="16">A</text><text x="0" y="136">B</text><text x="122" y="136">C</text><text x="53" y="136" fill="#1E8E3E">D</text><text x="62" y="148" text-anchor="middle" font-weight="700">BISSETRIZ (½ ângulo)</text></g>'
/* mediatriz */
+'<g transform="translate(145,160)"><polygon points="35,22 8,120 125,120" fill="#FFF6DA" stroke="#0E1B3D" stroke-width="2"/><line x1="66.5" y1="8" x2="66.5" y2="130" stroke="#8E44AD" stroke-width="2.5" stroke-dasharray="6 4"/><rect x="66.5" y="110" width="10" height="10" fill="none" stroke="#8E44AD"/><line x1="36" y1="115" x2="36" y2="125" stroke="#8E44AD" stroke-width="2"/><line x1="96" y1="115" x2="96" y2="125" stroke="#8E44AD" stroke-width="2"/><text x="30" y="16">A</text><text x="0" y="136">B</text><text x="122" y="136">C</text><text x="62" y="148" text-anchor="middle" font-weight="700">MEDIATRIZ (meio+90°)</text></g>'
+'</g></svg>';

var SVG_BAR='<svg viewBox="0 0 230 165" width="230" height="165" role="img" aria-label="Triângulo com as três medianas encontrando-se no baricentro G, que divide cada mediana em 2 partes e 1 parte"><g font-size="12" fill="#0E1B3D">'
+'<polygon points="80,12 10,130 170,130" fill="#FFF6DA" stroke="#0E1B3D" stroke-width="2"/>'
+'<line x1="80" y1="12" x2="90" y2="130" stroke="#1F6FEB" stroke-width="2"/><line x1="10" y1="130" x2="125" y2="71" stroke="#1F6FEB" stroke-width="2"/><line x1="170" y1="130" x2="45" y2="71" stroke="#1F6FEB" stroke-width="2"/>'
+'<circle cx="86.7" cy="90.7" r="4" fill="#C0392B"/><text x="92" y="98" fill="#C0392B" font-weight="700">G</text>'
+'<text x="74" y="10">A</text><text x="0" y="144">B</text><text x="168" y="144">C</text><text x="86" y="144">M</text>'
+'<text x="122" y="30" fill="#1F6FEB">AG = 2 partes</text><text x="62" y="160" fill="#1F6FEB">GM = 1 parte</text>'
+'</g></svg>';

var SVG_SEM='<svg viewBox="0 0 230 120" width="230" height="120" role="img" aria-label="Dois triângulos semelhantes: o pequeno com lados 4 e 6 e o grande com lados x e 9"><g font-size="13" fill="#0E1B3D">'
+'<polygon points="10,100 70,100 30,60" fill="#FFF6DA" stroke="#0E1B3D" stroke-width="2"/>'
+'<polygon points="110,100 200,100 140,40" fill="#E8F0FE" stroke="#0E1B3D" stroke-width="2"/>'
+'<text x="40" y="116" text-anchor="middle">6</text><text x="12" y="80">4</text>'
+'<text x="155" y="116" text-anchor="middle">9</text><text x="112" y="70">x</text>'
+'<text x="14" y="96" font-size="10" fill="#C0392B">α</text><text x="58" y="96" font-size="10" fill="#1E8E3E">β</text>'
+'<text x="116" y="96" font-size="10" fill="#C0392B">α</text><text x="186" y="96" font-size="10" fill="#1E8E3E">β</text>'
+'</g></svg>';

var SVG_ENC='<svg viewBox="0 0 190 140" width="190" height="140" role="img" aria-label="Triângulo ABC com o segmento DE paralelo à base BC formando um triângulo menor ADE no topo"><g font-size="12" fill="#0E1B3D">'
+'<polygon points="95,10 15,128 175,128" fill="#FFF6DA" stroke="#0E1B3D" stroke-width="2"/>'
+'<polygon points="95,10 63,57 127,57" fill="#E8F0FE" stroke="#0E1B3D" stroke-width="1"/>'
+'<line x1="63" y1="57" x2="127" y2="57" stroke="#C0392B" stroke-width="2.5"/>'
+'<text x="90" y="8">A</text><text x="4" y="138">B</text><text x="174" y="138">C</text><text x="50" y="58">D</text><text x="131" y="58">E</text><text x="140" y="94" fill="#C0392B">DE ∥ BC</text>'
+'</g></svg>';

var SVG_AMP='<svg viewBox="0 0 180 140" width="180" height="140" role="img" aria-label="Ampulheta: segmentos AB e CD paralelos, com as diagonais AD e BC cruzando no ponto E"><g font-size="12" fill="#0E1B3D">'
+'<line x1="20" y1="20" x2="80" y2="20" stroke="#C0392B" stroke-width="2.5"/><line x1="40" y1="125" x2="160" y2="125" stroke="#C0392B" stroke-width="2.5"/>'
+'<line x1="20" y1="20" x2="160" y2="125" stroke="#0E1B3D" stroke-width="2"/><line x1="80" y1="20" x2="40" y2="125" stroke="#0E1B3D" stroke-width="2"/>'
+'<text x="10" y="16">A</text><text x="80" y="16">B</text><text x="30" y="138">D</text><text x="158" y="138">C</text><text x="72" y="64">E</text>'
+'</g></svg>';

var SVG_TALES='<svg viewBox="0 0 240 140" width="240" height="140" role="img" aria-label="Três retas paralelas cortadas por duas transversais, formando os segmentos a, b na primeira e c, d na segunda"><g font-size="13" fill="#0E1B3D">'
+'<line x1="5" y1="25" x2="235" y2="25" stroke="#C0392B" stroke-width="2"/><line x1="5" y1="65" x2="235" y2="65" stroke="#C0392B" stroke-width="2"/><line x1="5" y1="120" x2="235" y2="120" stroke="#C0392B" stroke-width="2"/>'
+'<line x1="40" y1="8" x2="80" y2="135" stroke="#0E1B3D" stroke-width="2"/><line x1="150" y1="8" x2="215" y2="135" stroke="#0E1B3D" stroke-width="2"/>'
+'<text x="60" y="50">a</text><text x="74" y="98">b</text><text x="186" y="50">c</text><text x="206" y="98">d</text><text x="226" y="20" fill="#C0392B" font-size="11">r</text><text x="226" y="60" fill="#C0392B" font-size="11">s</text><text x="226" y="115" fill="#C0392B" font-size="11">t</text>'
+'</g></svg>';

TEORIA['elementos-notaveis']=`
<h3>Primeiro: o que é um “elemento notável”?</h3>
<p>São <b>linhas especiais</b> que a gente traça dentro de um triângulo. Cada uma tem uma “missão” diferente. Quando traçamos as três linhas do mesmo tipo (uma de cada vértice ou de cada lado), elas se encontram num <b>ponto especial</b>: são os <b>pontos notáveis</b>.</p>
<p>São <b>4 linhas</b> e <b>4 pontos</b>. Olhe a figura com calma, uma de cada vez:</p>
${SVG_CEV}
<h3>As 4 linhas, uma de cada vez</h3>
<table class="t"><tr><th>Linha</th><th>De onde sai → até onde vai</th><th>Missão (o que ela garante)</th></tr>
<tr><td><b>Altura</b></td><td>de um vértice → até o lado oposto</td><td>chega fazendo <b>90°</b> (é a “distância em pé” do vértice ao lado)</td></tr>
<tr><td><b>Mediana</b></td><td>de um vértice → até o <b>ponto médio</b> do lado oposto</td><td>divide o lado oposto em <b>duas metades iguais</b></td></tr>
<tr><td><b>Bissetriz</b></td><td>de um vértice → até o lado oposto</td><td>divide o <b>ângulo</b> do vértice em <b>dois ângulos iguais</b></td></tr>
<tr><td><b>Mediatriz</b></td><td>não sai de vértice! É uma reta que passa no meio de um lado</td><td>corta o lado no <b>meio</b> e fazendo <b>90°</b></td></tr></table>
<p class="tip"><b>Truque das palavras:</b> me<b>DIA</b>na → <b>meio</b> do lado · <b>BI</b>ssetriz → <b>bi</b> = dois, corta o ângulo em 2 · <b>ALTURA</b> → é como medir a altura de uma pessoa: régua em pé, 90° com o chão · <b>MEDIATRIZ</b> → <b>meio</b> + 90° (junta a mediana com a altura, mas não precisa passar por vértice).</p>
<h3>Os 4 pontos notáveis</h3>
<table class="t"><tr><th>Encontro das…</th><th>Ponto</th><th>Para que serve</th></tr>
<tr><td>3 <b>M</b>edianas</td><td><b>B</b>aricentro (G)</td><td>centro de <b>equilíbrio</b>: um triângulo de papelão fica equilibrado na ponta do lápis nesse ponto</td></tr>
<tr><td>3 <b>B</b>issetrizes</td><td><b>I</b>ncentro (I)</td><td>centro da circunferência <b>inscrita</b> (desenhada <b>dentro</b>, encostando nos 3 lados)</td></tr>
<tr><td>3 <b>M</b>ediatrizes</td><td><b>C</b>ircuncentro (O)</td><td>centro da circunferência <b>circunscrita</b> (passa pelos 3 <b>vértices</b>); fica à mesma distância dos 3 vértices</td></tr>
<tr><td>3 <b>A</b>lturas</td><td><b>O</b>rtocentro (H)</td><td>“orto” quer dizer reto (90°)</td></tr></table>
<p class="tip"><b>Macete para decorar:</b> <span class="big" style="font-size:18px">MB · BI · MC · AO</span><br>Medianas–Baricentro, Bissetrizes–Incentro, Mediatrizes–Circuncentro, Alturas–Ortocentro.</p>
<h3>Caso 1 — O baricentro divide a mediana em 2 + 1</h3>
${SVG_BAR}
<p>Esta é a propriedade que mais cai. O baricentro corta cada mediana em <b>3 partes iguais</b>: <b>2 partes</b> ficam do lado do <b>vértice</b> e <b>1 parte</b> do lado do <b>ponto médio</b>.</p>
<div class="ex"><b>Exemplo A (tenho a mediana inteira):</b> AM = 18 cm. Quanto mede AG e GM?<ol><li>Mediana inteira = 3 partes → 1 parte = 18 ÷ 3 = 6 cm.</li><li>AG (lado do vértice) = 2 partes = <b>12 cm</b>.</li><li>GM (lado do ponto médio) = 1 parte = <b>6 cm</b>. Confere: 12 + 6 = 18 ✓</li></ol>
<b>Exemplo B (tenho o pedaço pequeno):</b> GM = 5 cm → AG = 2 × 5 = <b>10 cm</b> e AM = 3 × 5 = <b>15 cm</b>.<br>
<b>Exemplo C (tenho o pedaço grande):</b> AG = 14 cm → 1 parte = 14 ÷ 2 = 7 → AM = 3 × 7 = <b>21 cm</b>.</div>
<p class="tip">Pense sempre em <b>“partes”</b>: descubra quanto vale 1 parte e o resto sai fácil.</p>
<h3>Caso 2 — Mediana e ponto médio</h3>
<div class="ex">AM é mediana relativa a BC e BM = 7 cm. Como M é o <b>meio</b>, MC também é 7 cm → BC = 7 + 7 = <b>14 cm</b>.</div>
<h3>Caso 3 — Bissetriz: metade do ângulo</h3>
<div class="ex"><b>Exemplo A:</b> Â = 70° e AD é bissetriz → BAD = DAC = 70 ÷ 2 = <b>35°</b>.<br>
<b>Exemplo B (mais completo):</b> Â = 80°, B = 60°. AD é bissetriz. Quanto mede o ângulo ADB?<ol><li>Bissetriz: BAD = 80 ÷ 2 = 40°.</li><li>No triângulo ABD: ADB + 40° + 60° = 180°.</li><li>ADB = <b>80°</b>.</li></ol></div>
<h3>Caso 4 — Altura: aparece um ângulo de 90°</h3>
<div class="ex">B = 50° e AH é altura relativa a BC. Quanto mede BAH?<ol><li>A altura faz 90° com BC: AHB = 90°.</li><li>No triângulo ABH: BAH + 50° + 90° = 180°.</li><li>BAH = <b>40°</b>.</li></ol>
<i>Repare:</i> sempre que aparecer altura, procure o <b>triângulo retângulo pequeno</b> que ela formou.</div>
<h3>Caso 5 — Mediatriz e circuncentro: mesma distância</h3>
<p>Qualquer ponto da mediatriz de AB está à <b>mesma distância de A e de B</b>. Por isso o circuncentro (encontro das 3 mediatrizes) está à mesma distância dos <b>3 vértices</b>.</p>
<div class="ex">P está na mediatriz de AB e PA = 9 cm → <b>PB = 9 cm</b>.<br>O é o circuncentro e OA = 6 cm → <b>OB = OC = 6 cm</b> (é o raio do círculo que passa pelos vértices).</div>
<h3>Caso 6 — Incentro: o atalho do ângulo BIC</h3>
<div class="ex">I é o incentro e Â = 60°. Quanto mede BIC?<ol><li>B + C = 180° − 60° = 120°.</li><li>As bissetrizes pegam a metade: (B + C) ÷ 2 = 60°.</li><li>No triângulo BIC: BIC = 180° − 60° = <b>120°</b>.</li></ol>
<b>Atalho:</b> BIC = 90° + Â ÷ 2 = 90° + 30° = 120° ✓</div>
<h3>Caso 7 — Onde fica cada ponto? (depende do tipo de triângulo)</h3>
<table class="t"><tr><th></th><th>Acutângulo</th><th>Retângulo</th><th>Obtusângulo</th></tr>
<tr><td>Baricentro</td><td>dentro</td><td>dentro</td><td>dentro</td></tr>
<tr><td>Incentro</td><td>dentro</td><td>dentro</td><td>dentro</td></tr>
<tr><td>Circuncentro</td><td>dentro</td><td><b>no meio da hipotenusa</b></td><td>fora</td></tr>
<tr><td>Ortocentro</td><td>dentro</td><td><b>no vértice do ângulo reto</b></td><td>fora</td></tr></table>
<p class="tip">Baricentro e incentro estão <b>sempre dentro</b>. Os “rebeldes” que podem sair são o circuncentro e o ortocentro.</p>
<h3>Caso 8 — Triângulo retângulo: mediana da hipotenusa = metade dela</h3>
<div class="ex">A hipotenusa mede 10 cm. Como o circuncentro é o meio da hipotenusa e fica à mesma distância dos 3 vértices, a mediana que sai do ângulo reto mede <b>10 ÷ 2 = 5 cm</b>.</div>
<h3>Caso 9 — Isósceles e equilátero: as linhas se juntam</h3>
<ul><li><b>Isósceles:</b> a linha que sai do vértice de cima até a base é, <b>ao mesmo tempo</b>, altura, mediana e bissetriz. Então ela cai no meio da base e faz 90°.</li><li><b>Equilátero:</b> isso vale para os 3 lados. As 4 linhas coincidem e os <b>4 pontos são o mesmo ponto</b> (o centro do triângulo).</li></ul>
<div class="ex"><b>Exemplo:</b> isósceles com base 12 cm e lados iguais de 10 cm. Quanto mede a altura da base?<ol><li>A altura cai no meio da base: 12 ÷ 2 = 6 cm de cada lado.</li><li>Formou um triângulo retângulo: hipotenusa 10 e cateto 6.</li><li>h² = 10² − 6² = 100 − 36 = 64 → h = <b>8 cm</b>.</li></ol>
<b>Equilátero com altura 12 cm:</b> o baricentro está nessa altura (que também é mediana) → distância até o vértice = 2 partes de 12 ÷ 3 = <b>8 cm</b>; até a base = <b>4 cm</b>.</div>
<h3>Erros comuns</h3><ul><li>Achar que a mediana faz 90° (quem faz 90° é a altura; a mediana só vai no meio).</li><li>Achar que a bissetriz cai no meio do lado (ela divide o <b>ângulo</b>, não o lado).</li><li>No baricentro, colocar o pedaço grande do lado do ponto médio. O grande (2 partes) fica <b>sempre do lado do vértice</b>.</li><li>Trocar incentro (bissetrizes, círculo de dentro) com circuncentro (mediatrizes, círculo que passa pelos vértices).</li></ul>
<p class="tip"><b>Resumo:</b> altura → 90° · mediana → meio do lado · bissetriz → metade do ângulo · mediatriz → meio + 90° · <b>MB · BI · MC · AO</b> · baricentro: 2 partes para o vértice, 1 para o lado.</p>`;

TEORIA['semelhanca-triangulos']=`
<h3>A ideia: “mesma forma, tamanho diferente”</h3>
<p>Pense numa foto no celular. Quando você dá zoom, a imagem fica <b>maior</b>, mas não fica <b>torta</b>: tudo cresce na mesma proporção. Dois triângulos assim, um sendo o “zoom” do outro, são <b>semelhantes</b> (símbolo <b>~</b>).</p>
${SVG_SEM}
<p>Na figura, o grande é o pequeno ampliado. O que acontece:</p>
<ul><li>Os <b>ângulos são iguais</b> (α continua α, β continua β). O zoom não muda ângulo.</li><li>Os <b>lados são proporcionais</b>: todos ficam multiplicados pelo mesmo número. Aqui: 9 ÷ 6 = 1,5. Então x = 4 × 1,5 = <b>6</b>.</li></ul>
<p>Esse número que multiplica todos os lados é a <b>razão de semelhança</b>, chamada <b>k</b>.</p>
<h3>Passo 0 — Saber quem corresponde a quem</h3>
<p>O erro número 1 é comparar lados errados. <b>Lados correspondentes</b> são os que ficam <b>de frente para ângulos iguais</b>.</p>
<div class="ex"><b>Como fazer:</b><ol><li>Marque os ângulos iguais com a mesma cor ou símbolo.</li><li>O lado em frente ao ângulo α no pequeno corresponde ao lado em frente ao ângulo α no grande.</li><li>Se o enunciado escreve ABC ~ DEF, a <b>ordem das letras</b> já diz: A↔D, B↔E, C↔F, e então AB↔DE, BC↔EF, AC↔DF.</li></ol></div>
<p class="tip">Atalho quando não tem figura: o <b>menor</b> lado corresponde ao <b>menor</b>, o médio ao médio e o maior ao maior.</p>
<h3>Os 3 casos (como provar que são semelhantes)</h3>
<table class="t"><tr><th>Caso</th><th>O que basta saber</th><th>Exemplo</th></tr>
<tr><td><b>AA</b> (ângulo-ângulo)</td><td><b>2 ângulos iguais</b> (o 3º fica igual automaticamente, pois a soma é 180°)</td><td>um tem 40° e 60°; o outro também → semelhantes</td></tr>
<tr><td><b>LAL</b></td><td>2 lados proporcionais e o <b>ângulo entre eles</b> igual</td><td>lados 3 e 5 com 50° entre eles; outro com 6 e 10 e 50° entre eles (razão 2)</td></tr>
<tr><td><b>LLL</b></td><td>os <b>3 lados</b> proporcionais (mesma razão)</td><td>3, 4, 5 e 6, 8, 10 → todas as razões dão 2</td></tr></table>
<p class="tip">Na prática, <b>AA é o que mais aparece</b>: retas paralelas, ângulo reto em comum, ângulos opostos pelo vértice… tudo isso dá ângulos iguais de graça.</p>
<h3>A receita para achar um lado</h3>
<ol><li>Descubra que os triângulos são semelhantes (normalmente por AA).</li><li>Combine quem corresponde a quem.</li><li>Monte a proporção: {lado do grande/lado do pequeno} = {outro lado do grande/outro lado do pequeno}.</li><li>Multiplique cruzado e resolva.</li></ol>
<h3>Caso 1 — Triângulos já separados</h3>
<div class="ex">ABC ~ DEF com AB = 4, BC = 6, DE = 10. Quanto mede EF?<ol><li>Corresponde: AB↔DE e BC↔EF.</li><li>{DE/AB} = {EF/BC} → {10/4} = {x/6}.</li><li>4x = 60 → x = <b>15</b>.</li></ol>
<b>Outro jeito (pela razão k):</b> k = 10 ÷ 4 = 2,5 → EF = 6 × 2,5 = 15 ✓</div>
<h3>Caso 2 — Sombra (o clássico das provas)</h3>
<div class="ex">Uma pessoa de 1,8 m faz sombra de 2 m. No mesmo instante, um prédio faz sombra de 30 m. Qual a altura do prédio?<ol><li>Por que são semelhantes? O sol bate com a <b>mesma inclinação</b> nos dois (raios paralelos) e os dois estão em pé (90°): AA.</li><li>Altura com altura, sombra com sombra: {h/30} = {1,8/2}.</li><li>2h = 54 → h = <b>27 m</b>.</li></ol></div>
<h3>Caso 3 — Triângulo dentro de triângulo (reta paralela a um lado)</h3>
${SVG_ENC}
<p>Se DE é paralelo a BC, o triângulo pequeno ADE é semelhante ao grande ABC (o ângulo A é comum e as paralelas dão ângulos iguais).</p>
<div class="ex">AD = 3, DB = 6, DE = 4. Quanto mede BC?<ol><li><b>Atenção:</b> o lado do grande é o lado <b>inteiro</b> AB = 3 + 6 = 9 (e não só DB!).</li><li>{BC/DE} = {AB/AD} → {x/4} = {9/3}.</li><li>3x = 36 → x = <b>12</b>.</li></ol></div>
<h3>Caso 4 — Ampulheta (triângulos “de cabeça para baixo”)</h3>
${SVG_AMP}
<p>AB ∥ DC e as linhas se cruzam em E. Os ângulos em E são <b>opostos pelo vértice</b> (iguais) e as paralelas dão outro par igual: AA.</p>
<div class="ex">AB = 4, DC = 10 e AE = 6. Quanto mede EC?<ol><li>Corresponde: AB↔CD, AE↔CE (cada lado do pequeno com o lado “espelhado” do grande).</li><li>k = 10 ÷ 4 = 2,5.</li><li>EC = 6 × 2,5 = <b>15</b>.</li></ol></div>
<h3>Caso 5 — Ângulos de triângulos semelhantes</h3>
<div class="ex">ABC ~ DEF, Â = 50° e B = 70°. Quanto mede F?<ol><li>C = 180° − 50° − 70° = 60°.</li><li>C corresponde a F → F = <b>60°</b>. (Zoom não muda ângulo!)</li></ol></div>
<h3>Caso 6 — São semelhantes ou não? (LLL)</h3>
<div class="ex"><b>Triângulos 4, 6, 8 e 6, 9, 12:</b> 6÷4 = 1,5; 9÷6 = 1,5; 12÷8 = 1,5 → <b>sim</b>, k = 1,5.<br><b>Triângulos 3, 4, 5 e 6, 8, 11:</b> 6÷3 = 2; 8÷4 = 2; 11÷5 = 2,2 → <b>não</b> (uma razão é diferente).</div>
<h3>Caso 7 — Perímetro e área</h3>
<p>Se os lados ficam multiplicados por <b>k</b>:</p>
<ul><li>o <b>perímetro</b> (soma de lados) também fica multiplicado por <b>k</b>;</li><li>a <b>área</b> fica multiplicada por <b>k²</b>, porque área é “comprimento × comprimento” (base × altura, e as duas cresceram k vezes).</li></ul>
<div class="ex">k = 3, perímetro do menor 12 cm, área do menor 5 cm².<br>Perímetro do maior = 12 × 3 = <b>36 cm</b>.<br>Área do maior = 5 × 3² = 5 × 9 = <b>45 cm²</b> (e não 15!).<br><b>Ao contrário:</b> áreas 8 e 72 → razão 72 ÷ 8 = 9 = k² → <b>k = 3</b>.</div>
<h3>Caso 8 — Escala, mapas e maquetes</h3>
<div class="ex">Maquete na escala 1 : 100 e uma parede de 7 cm na maquete → real: 7 × 100 = 700 cm = <b>7 m</b>.<br>É semelhança com k = 100.</div>
<h3>Erros comuns</h3><ul><li>Comparar lados que <b>não</b> correspondem (sempre ache os ângulos iguais primeiro).</li><li>No triângulo dentro do outro, usar DB em vez do lado inteiro AB.</li><li>Achar que a área cresce k vezes (cresce <b>k²</b>).</li><li>Achar que iguais ângulos implicam lados iguais. Não: lados <b>proporcionais</b>.</li></ul>
<p class="tip"><b>Resumo:</b> semelhança = zoom · ângulos iguais, lados × k · casos AA, LAL, LLL · perímetro × k, área × k² · sempre ache “quem corresponde a quem” antes de montar a proporção.</p>`;

TEORIA['tales-semelhanca']=`
<h3>A ideia</h3>
<p>Imagine as <b>linhas de um caderno</b> (retas paralelas) e duas réguas atravessando essas linhas, uma mais deitada que a outra. As réguas cortam as linhas em pedaços. O Teorema de Tales diz: <b>os pedaços de uma régua são proporcionais aos da outra</b>. Se numa régua o 2º pedaço é o dobro do 1º, na outra também será.</p>
${SVG_TALES}
<p class="big">{a/b} = {c/d}</p>
<p>As retas paralelas (r, s, t) formam um <b>feixe</b>. As duas retas que cortam são as <b>transversais</b>.</p>
<h3>A receita</h3>
<ol><li>Identifique as paralelas e as duas transversais.</li><li>Monte a proporção <b>na mesma ordem</b> nas duas transversais: {de cima/de baixo} = {de cima/de baixo}.</li><li>Multiplique cruzado e resolva a equação.</li></ol>
<h3>Caso 1 — Achar um segmento</h3>
<div class="ex">a = 4, b = 6, c = 10 e d = x.<ol><li>{4/6} = {10/x}.</li><li>4x = 60 → x = <b>15</b>.</li></ol>
<b>Confere pelo “quantas vezes”:</b> de 4 para 10 multiplicou por 2,5; de 6 para 15 também ✓</div>
<h3>Caso 2 — Com x nos dois segmentos</h3>
<div class="ex">Numa transversal 3 e 5; na outra x e x + 4.<ol><li>{3/5} = {x/x + 4}.</li><li>Multiplique cruzado: 3(x + 4) = 5x → 3x + 12 = 5x.</li><li>12 = 2x → x = <b>6</b> (os segmentos são 6 e 10).</li></ol></div>
<h3>Caso 3 — Dividir um total na mesma proporção</h3>
<div class="ex">Numa transversal os pedaços são 2 e 3. Na outra, o total é 20. Quanto mede cada pedaço?<ol><li>Total da 1ª: 2 + 3 = 5.</li><li>Quantas vezes maior: 20 ÷ 5 = 4.</li><li>Pedaços: 2 × 4 = <b>8</b> e 3 × 4 = <b>12</b>.</li></ol></div>
<h3>Caso 4 — Tales dentro do triângulo</h3>
${SVG_ENC}
<p>Uma reta paralela a um lado divide os outros dois lados na <b>mesma proporção</b>: {AD/DB} = {AE/EC}.</p>
<div class="ex">AD = 4, DB = 6, AE = 6. Quanto mede EC?<ol><li>{4/6} = {6/x}.</li><li>4x = 36 → x = <b>9</b>.</li></ol></div>
<h3>Caso 5 — Problema com terrenos</h3>
<div class="ex">Dois lotes têm frentes de 20 m e 30 m para a Rua A; as divisas laterais são paralelas. Para a Rua B, a frente total é 75 m.<ol><li>Total na Rua A: 50 m. Razão: 75 ÷ 50 = 1,5.</li><li>Frentes na Rua B: 20 × 1,5 = <b>30 m</b> e 30 × 1,5 = <b>45 m</b>.</li></ol></div>
<h3>Erros comuns</h3><ul><li>Inverter a ordem na proporção ({cima/baixo} numa e {baixo/cima} na outra).</li><li>Usar Tales quando as retas <b>não</b> são paralelas (aí não vale).</li><li>Esquecer os parênteses ao multiplicar cruzado com x + algo.</li></ul>
<p class="tip"><b>Ligação:</b> Tales é a base da <b>semelhança de triângulos</b> (veja o assunto “Semelhança de triângulos”, logo depois deste).</p>`;
