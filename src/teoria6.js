/* ===== TEORIA APROFUNDADA — MATEMÁTICA DO 4º ANO (BNCC) =====
   Linguagem para criança de 9–10 anos. Atalho: {a/b} vira fração empilhada. */

TEORIA['4-sistema-decimal']=`
<h3>O que é</h3>
<p>Para escrever qualquer número, usamos só <b>10 algarismos</b>: 0, 1, 2, 3, 4, 5, 6, 7, 8 e 9. O segredo é o <b>lugar</b> onde cada algarismo fica. Cada lugar se chama <b>casa</b> (ou ordem).</p>
<p>Funciona como trocar moedas: <b>10 unidades viram 1 dezena</b>, 10 dezenas viram 1 centena, 10 centenas viram 1 unidade de milhar, 10 unidades de milhar viram 1 dezena de milhar.</p>
<table class="t"><tr><th>Dezena de milhar</th><th>Unidade de milhar</th><th>Centena</th><th>Dezena</th><th>Unidade</th></tr>
<tr><td>DM</td><td>UM</td><td>C</td><td>D</td><td>U</td></tr>
<tr><td>10.000</td><td>1.000</td><td>100</td><td>10</td><td>1</td></tr></table>
<p class="tip">O ponto em 45.000 só ajuda a ler: ele separa a turma dos milhares da turma das unidades.</p>
<h3>Caso 1 — Quanto vale um algarismo</h3>
<div class="ex"><b>Exemplo:</b> no número 3<b class="hl">7</b>.405, quanto vale o 7?<ol><li>Conte as casas da direita para a esquerda: 5 é unidade, 0 é dezena, 4 é centena, <b>7 é unidade de milhar</b>.</li><li>Cada unidade de milhar vale 1.000.</li><li>Então o 7 vale 7 × 1.000 = <b>7.000</b>.</li></ol></div>
<div class="ex"><b>Exemplo:</b> no número 52.<b class="hl">8</b>19, quanto vale o 8?<ol><li>O 8 está na casa das <b>centenas</b>.</li><li>Cada centena vale 100.</li><li>8 × 100 = <b>800</b>.</li></ol></div>
<h3>Caso 2 — Ler e escrever números grandes</h3>
<div class="ex"><b>Exemplo:</b> como se lê 48.306?<ol><li>Leia primeiro o que está antes do ponto: <b>quarenta e oito mil</b>.</li><li>Depois leia o resto: <b>trezentos e seis</b>.</li><li>Junte: quarenta e oito mil, trezentos e seis.</li></ol></div>
<h3>Caso 3 — Antecessor e sucessor</h3>
<div class="ex"><b>Exemplo:</b> qual número vem logo antes e logo depois de 30.000?<ol><li>Logo depois (sucessor): some 1 → 30.000 + 1 = <b>30.001</b>.</li><li>Logo antes (antecessor): tire 1 → 30.000 − 1 = <b>29.999</b>.</li></ol></div>
<h3>Caso 4 — Comparar números</h3>
<div class="ex"><b>Exemplo:</b> qual é maior, 61.580 ou 61.508?<ol><li>Os dois têm 5 algarismos. Compare casa por casa, <b>da esquerda para a direita</b>.</li><li>6 = 6, 1 = 1, 5 = 5… iguais até aqui.</li><li>Na casa das dezenas: 8 é maior que 0.</li><li>Então <b>61.580 &gt; 61.508</b>.</li></ol></div>
<h3>Erros comuns</h3><ul><li>Achar que o algarismo vale sempre o mesmo. O 7 de 70 vale 70, não 7!</li><li>Comparar pela direita. Sempre comece pela <b>esquerda</b>.</li><li>Esquecer que o antecessor de 30.000 é 29.999 (não 30.999).</li></ul>
<p class="tip"><b>Resumo:</b> cada casa vale 10 vezes a da direita · valor do algarismo = algarismo × valor da casa · para comparar, comece pela esquerda.</p>`;

TEORIA['4-composicao-decomposicao']=`
<h3>O que é</h3>
<p><b>Decompor</b> é desmontar o número em pedaços, como separar um monte de dinheiro em notas de 10.000, 1.000, 100, 10 e moedas de 1. <b>Compor</b> é o contrário: juntar os pedaços e montar o número.</p>
<h3>Caso 1 — Decompor em soma</h3>
<div class="ex"><b>Exemplo:</b> decomponha 26.407.<ol><li>Separe cada algarismo na sua casa: 2 dezenas de milhar, 6 unidades de milhar, 4 centenas, 0 dezenas e 7 unidades.</li><li>Escreva quanto cada um vale: 20.000; 6.000; 400; 0; 7.</li><li>O zero não precisa aparecer: <b>20.000 + 6.000 + 400 + 7</b>.</li></ol></div>
<h3>Caso 2 — Decompor com multiplicação</h3>
<div class="ex"><b>Exemplo:</b> escreva 26.407 usando “vezes”.<ol><li>Cada pedaço é algarismo × valor da casa.</li><li><b>2 × 10.000 + 6 × 1.000 + 4 × 100 + 7 × 1</b>.</li></ol></div>
<h3>Caso 3 — Compor (montar o número)</h3>
<div class="ex"><b>Exemplo:</b> que número tem 3 dezenas de milhar, 5 centenas e 9 unidades?<ol><li>Monte o quadro de casas: DM = 3, UM = ?, C = 5, D = ?, U = 9.</li><li>As casas que ninguém falou ficam com <b>zero</b>: UM = 0 e D = 0.</li><li>Leia o quadro: <b>30.509</b>.</li></ol></div>
<div class="ex"><b>Exemplo:</b> quanto é 40.000 + 2.000 + 80?<ol><li>40.000 → 4 na dezena de milhar.</li><li>2.000 → 2 na unidade de milhar.</li><li>80 → 8 na dezena. Centena e unidade ficam com zero.</li><li>Resultado: <b>42.080</b>.</li></ol></div>
<h3>Caso 4 — Outras formas de decompor</h3>
<div class="ex"><b>Exemplo:</b> 3.500 também pode ser 35 centenas.<ol><li>Cada centena vale 100.</li><li>35 × 100 = 3.500. ✔</li><li>Então 3.500 = 3 milhares e 5 centenas = 35 centenas. É o mesmo número, contado de outro jeito!</li></ol></div>
<h3>Erros comuns</h3><ul><li>Esquecer o zero da casa vazia: escrever 3.509 em vez de 30.509.</li><li>Trocar a ordem das casas na hora de montar.</li></ul>
<p class="tip"><b>Resumo:</b> decompor = separar por casas · compor = juntar · casa vazia leva zero.</p>`;

TEORIA['4-adicao-subtracao-reagrupamento']=`
<h3>O que é</h3>
<p><b>Adição</b> é juntar ou acrescentar. <b>Subtração</b> é tirar, comparar ou descobrir quanto falta. Na conta armada, colocamos <b>unidade embaixo de unidade, dezena embaixo de dezena</b>, e começamos pela direita.</p>
<p><b>Reagrupar</b> é fazer trocas: 10 unidades viram 1 dezena (o famoso “vai um”), e 1 dezena pode virar 10 unidades quando precisamos (o “empresta”).</p>
<h3>Caso 1 — Adição com “vai um”</h3>
<div class="ex"><b>Exemplo:</b> 2.468 + 1.375<ol><li>Unidades: 8 + 5 = 13. Fica 3 e <b>vai 1</b> para as dezenas.</li><li>Dezenas: 6 + 7 + 1 = 14. Fica 4 e vai 1 para as centenas.</li><li>Centenas: 4 + 3 + 1 = 8.</li><li>Milhares: 2 + 1 = 3.</li><li>Resultado: <b>3.843</b>.</li></ol></div>
<h3>Caso 2 — Subtração com troca</h3>
<div class="ex"><b>Exemplo:</b> 5.342 − 1.718<ol><li>Unidades: 2 − 8 não dá. Troque 1 dezena por 10 unidades: 12 − 8 = 4. As dezenas viram 3.</li><li>Dezenas: 3 − 1 = 2.</li><li>Centenas: 3 − 7 não dá. Troque 1 milhar por 10 centenas: 13 − 7 = 6. Os milhares viram 4.</li><li>Milhares: 4 − 1 = 3.</li><li>Resultado: <b>3.624</b>.</li></ol></div>
<h3>Caso 3 — Subtração com zeros</h3>
<div class="ex"><b>Exemplo:</b> 4.000 − 1.256<ol><li>Unidades: 0 − 6 não dá, e as dezenas e centenas também são zero.</li><li>Troque 1 milhar: viram 10 centenas. Troque 1 centena: viram 10 dezenas. Troque 1 dezena: viram 10 unidades.</li><li>Agora temos 3 milhares, 9 centenas, 9 dezenas e 10 unidades.</li><li>10 − 6 = 4; 9 − 5 = 4; 9 − 2 = 7; 3 − 1 = 2.</li><li>Resultado: <b>2.744</b>.</li></ol></div>
<h3>Caso 4 — Conferir a conta</h3>
<div class="ex"><b>Exemplo:</b> 5.342 − 1.718 deu 3.624. Está certo?<ol><li>Faça a conta ao contrário: 3.624 + 1.718.</li><li>Dá 5.342 = o número do começo. ✔ Está certo!</li></ol></div>
<h3>Problemas: qual conta usar?</h3><ul><li>“ganhou”, “juntou”, “a mais”, “ao todo” → <b>adição</b>.</li><li>“gastou”, “perdeu”, “quanto falta”, “quanto a mais tem” → <b>subtração</b>.</li></ul>
<h3>Erros comuns</h3><ul><li>Esquecer o “vai um”.</li><li>Na subtração, fazer o número maior menos o menor na mesma casa (8 − 2 em vez de 12 − 8).</li><li>Armar a conta desalinhada.</li></ul>
<p class="tip"><b>Resumo:</b> alinhe as casas · comece pela direita · 10 numa casa vai 1 para a próxima · faltou, troque com a vizinha · confira com a conta inversa.</p>`;

TEORIA['4-multiplicacao']=`
<h3>O que é</h3>
<p>Multiplicar é somar <b>grupos iguais</b> de um jeito rápido. 4 pacotes com 6 balas são 6 + 6 + 6 + 6 = 24, ou seja, <b>4 × 6 = 24</b>.</p>
<ul><li><b>Dobro</b> = vezes 2. <b>Triplo</b> = vezes 3. Quádruplo = vezes 4.</li><li>A ordem não muda o resultado: 3 × 7 = 7 × 3 = 21.</li></ul>
<h3>Caso 1 — Tabuada com truques</h3>
<div class="ex"><b>Truques:</b><ol><li>× 2: é o dobro. 8 × 2 = 8 + 8 = 16.</li><li>× 4: é o dobro do dobro. 7 × 4 → 14 → <b>28</b>.</li><li>× 5: é a metade de × 10. 8 × 5 → 80 ÷ 2 = <b>40</b>.</li><li>× 9: é × 10 menos uma vez. 9 × 7 → 70 − 7 = <b>63</b>.</li><li>× 10: coloque um zero no fim. 23 × 10 = <b>230</b>.</li></ol></div>
<h3>Caso 2 — Dobro e triplo</h3>
<div class="ex"><b>Exemplo:</b> qual é o triplo de 45?<ol><li>Triplo é vezes 3: 45 × 3.</li><li>Separe: 40 × 3 = 120 e 5 × 3 = 15.</li><li>Junte: 120 + 15 = <b>135</b>.</li></ol></div>
<h3>Caso 3 — Conta armada (algoritmo)</h3>
<div class="ex"><b>Exemplo:</b> 36 × 4<ol><li>Unidades: 6 × 4 = 24. Escreva 4 e <b>vai 2</b>.</li><li>Dezenas: 3 × 4 = 12, mais 2 que foi = 14.</li><li>Resultado: <b>144</b>.</li></ol></div>
<div class="ex"><b>Exemplo:</b> 213 × 3<ol><li>3 × 3 = 9 (unidades).</li><li>1 × 3 = 3 (dezenas).</li><li>2 × 3 = 6 (centenas).</li><li>Resultado: <b>639</b>.</li></ol></div>
<h3>Caso 4 — Problemas</h3>
<div class="ex"><b>Exemplo:</b> uma caixa tem 6 pacotes com 25 figurinhas cada. Quantas figurinhas há?<ol><li>São 6 grupos iguais de 25 → multiplicação.</li><li>25 × 6 = 20 × 6 + 5 × 6 = 120 + 30 = <b>150 figurinhas</b>.</li></ol></div>
<h3>Erros comuns</h3><ul><li>Esquecer de somar o “vai” na casa seguinte.</li><li>Confundir dobro (× 2) com “mais 2”.</li></ul>
<p class="tip"><b>Resumo:</b> grupos iguais → multiplique · dobro × 2, triplo × 3 · separe dezenas e unidades para facilitar · conta armada começa pela direita.</p>`;

TEORIA['4-divisao']=`
<h3>O que é</h3>
<p>Dividir é <b>repartir em partes iguais</b> ou descobrir <b>quantos grupos</b> cabem. Se 12 balas são repartidas entre 3 amigos, cada um ganha 4: <b>12 ÷ 3 = 4</b>.</p>
<ul><li><b>Dividendo</b>: o total (12). <b>Divisor</b>: em quantas partes (3). <b>Quociente</b>: quanto cada um recebe (4). <b>Resto</b>: o que sobra.</li><li>A divisão é o contrário da multiplicação: 12 ÷ 3 = 4 porque 3 × 4 = 12.</li></ul>
<h3>Caso 1 — Divisão exata (resto zero)</h3>
<div class="ex"><b>Exemplo:</b> 35 lápis em 5 estojos iguais. Quantos em cada?<ol><li>Pergunte: “5 vezes quanto dá 35?”</li><li>Pela tabuada: 5 × 7 = 35.</li><li>Cada estojo fica com <b>7 lápis</b> e não sobra nada (resto 0).</li></ol></div>
<h3>Caso 2 — Divisão com resto</h3>
<div class="ex"><b>Exemplo:</b> 17 figurinhas para 5 crianças.<ol><li>Procure o maior número da tabuada do 5 que cabe em 17: 5 × 3 = 15 (5 × 4 = 20 já passa).</li><li>Cada criança recebe <b>3</b>.</li><li>Sobram 17 − 15 = <b>2</b>. O resto é 2.</li><li>Confira: 5 × 3 + 2 = 17 ✔</li></ol></div>
<p class="tip">O resto é sempre <b>menor que o divisor</b>. Se sobrar 5 ou mais dividindo por 5, ainda dava para dar mais um para cada!</p>
<h3>Caso 3 — Conta armada (chave)</h3>
<div class="ex"><b>Exemplo:</b> 84 ÷ 4<ol><li>Comece pelas dezenas: 8 dezenas ÷ 4 = 2 dezenas. Escreva 2.</li><li>Depois as unidades: 4 ÷ 4 = 1. Escreva 1.</li><li>Resultado: <b>21</b>. Confira: 4 × 21 = 84 ✔</li></ol></div>
<div class="ex"><b>Exemplo:</b> 75 ÷ 3<ol><li>7 dezenas ÷ 3 = 2, sobra 1 dezena (3 × 2 = 6).</li><li>A dezena que sobrou vira 10 unidades: 10 + 5 = 15.</li><li>15 ÷ 3 = 5.</li><li>Resultado: <b>25</b>.</li></ol></div>
<h3>Caso 4 — Quantos grupos cabem?</h3>
<div class="ex"><b>Exemplo:</b> 30 alunos, 6 por mesa. Quantas mesas?<ol><li>Quantos grupos de 6 cabem em 30?</li><li>6 × 5 = 30.</li><li><b>5 mesas</b>.</li></ol></div>
<h3>Erros comuns</h3><ul><li>Deixar um resto maior que o divisor.</li><li>Esquecer de conferir com divisor × quociente + resto.</li></ul>
<p class="tip"><b>Resumo:</b> repartir igual → divisão · use a tabuada ao contrário · resto &lt; divisor · confira: divisor × quociente + resto = total.</p>`;

TEORIA['4-fracoes-unitarias']=`
<h3>O que é</h3>
<p>Uma <b>fração</b> mostra um pedaço de um inteiro que foi dividido em <b>partes iguais</b>. As frações unitárias têm o número <b>1 em cima</b>: elas mostram <b>um pedaço só</b>.</p>
<ul><li>O número de baixo (<b>denominador</b>) diz em quantas partes iguais o inteiro foi dividido.</li><li>O número de cima (<b>numerador</b>) diz quantas partes estamos pegando. Aqui, sempre 1.</li></ul>
<table class="t"><tr><th>Fração</th><th>Como se lê</th><th>O inteiro foi dividido em</th></tr>
<tr><td>{1/2}</td><td>um meio (metade)</td><td>2 partes</td></tr><tr><td>{1/3}</td><td>um terço</td><td>3 partes</td></tr><tr><td>{1/4}</td><td>um quarto</td><td>4 partes</td></tr><tr><td>{1/5}</td><td>um quinto</td><td>5 partes</td></tr><tr><td>{1/10}</td><td>um décimo</td><td>10 partes</td></tr><tr><td>{1/100}</td><td>um centésimo</td><td>100 partes</td></tr></table>
<h3>Caso 1 — Que fração é um pedaço?</h3>
<div class="ex"><b>Exemplo:</b> uma pizza foi cortada em 8 pedaços iguais. Que fração é um pedaço?<ol><li>Em quantas partes iguais? <b>8</b> → vai embaixo.</li><li>Quantos pedaços pegamos? <b>1</b> → vai em cima.</li><li>Fração: <b>{1/8}</b> (um oitavo).</li></ol></div>
<h3>Caso 2 — Qual pedaço é maior?</h3>
<div class="ex"><b>Exemplo:</b> o que é maior, {1/3} ou {1/5} de uma barra de chocolate?<ol><li>{1/3}: a barra foi dividida entre 3 pessoas.</li><li>{1/5}: a mesma barra foi dividida entre 5 pessoas.</li><li>Quanto mais gente dividindo, <b>menor</b> o pedaço de cada um.</li><li>Então <b>{1/3} é maior</b> que {1/5}.</li></ol></div>
<p class="tip">Com o 1 em cima: <b>número de baixo maior = pedaço menor</b>.</p>
<h3>Caso 3 — Fração de uma quantidade</h3>
<div class="ex"><b>Exemplo:</b> quanto é {1/4} de 20 bolinhas?<ol><li>{1/4} quer dizer: divida em 4 grupos iguais e pegue 1.</li><li>20 ÷ 4 = 5.</li><li>{1/4} de 20 = <b>5 bolinhas</b>.</li></ol></div>
<h3>Caso 4 — Décimos e centésimos</h3>
<div class="ex"><b>Exemplo:</b> um real dividido em 100 partes iguais.<ol><li>Cada parte é {1/100} do real.</li><li>{1/100} de real é <b>1 centavo</b>.</li><li>E {1/10} de real = 10 centavos.</li></ol></div>
<h3>Erros comuns</h3><ul><li>Esquecer que as partes precisam ser <b>iguais</b>.</li><li>Achar que {1/10} é maior que {1/2} porque 10 é maior que 2.</li></ul>
<p class="tip"><b>Resumo:</b> embaixo = em quantas partes iguais · em cima = quantas pego · com 1 em cima, quanto maior embaixo, menor o pedaço · fração de quantidade: divida pelo de baixo.</p>`;

TEORIA['4-decimais-dinheiro']=`
<h3>O que é</h3>
<p>No dinheiro, a <b>vírgula</b> separa os <b>reais</b> dos <b>centavos</b>. 1 real = 100 centavos. Por isso, depois da vírgula sempre escrevemos <b>dois algarismos</b>.</p>
<ul><li>R$ 0,10 = 10 centavos = <b>um décimo</b> do real ({1/10}).</li><li>R$ 0,01 = 1 centavo = <b>um centésimo</b> do real ({1/100}).</li><li>R$ 0,50 = 50 centavos = metade do real.</li></ul>
<h3>Caso 1 — Escrever valores</h3>
<div class="ex"><b>Exemplo:</b> escreva 12 reais e 5 centavos.<ol><li>Reais antes da vírgula: 12.</li><li>Centavos depois, sempre com 2 algarismos: 5 vira <b>05</b>.</li><li>Fica <b>R$ 12,05</b>. Cuidado: R$ 12,5 seria 12 reais e 50 centavos!</li></ol></div>
<h3>Caso 2 — Somar preços</h3>
<div class="ex"><b>Exemplo:</b> um lanche custa R$ 7,80 e um suco R$ 4,50. Quanto ao todo?<ol><li>Coloque <b>vírgula embaixo de vírgula</b>.</li><li>Centavos: 80 + 50 = 130 centavos = 1 real e 30 centavos. Fica 30 e vai 1 real.</li><li>Reais: 7 + 4 + 1 = 12.</li><li>Total: <b>R$ 12,30</b>.</li></ol></div>
<h3>Caso 3 — Troco (subtração)</h3>
<div class="ex"><b>Exemplo:</b> paguei R$ 20,00 por um caderno de R$ 13,75. Qual o troco?<ol><li>Conte para cima, como o caixa: de 13,75 até 14,00 faltam R$ 0,25.</li><li>De 14,00 até 20,00 faltam R$ 6,00.</li><li>Troco: 0,25 + 6,00 = <b>R$ 6,25</b>.</li></ol></div>
<h3>Caso 4 — Comparar preços</h3>
<div class="ex"><b>Exemplo:</b> o que é mais caro, R$ 3,09 ou R$ 3,90?<ol><li>Os reais são iguais (3).</li><li>Compare os centavos: 09 centavos e 90 centavos.</li><li>90 &gt; 9, então <b>R$ 3,90 é mais caro</b>.</li></ol></div>
<h3>Erros comuns</h3><ul><li>Escrever R$ 12,5 quando queria dizer 5 centavos (o certo é R$ 12,05).</li><li>Armar a conta sem alinhar as vírgulas.</li><li>Esquecer que 100 centavos viram 1 real.</li></ul>
<p class="tip"><b>Resumo:</b> antes da vírgula = reais · depois = centavos (sempre 2 algarismos) · 100 centavos = 1 real · vírgula embaixo de vírgula.</p>`;

TEORIA['4-sequencias-igualdade']=`
<h3>O que é</h3>
<p>Uma <b>sequência</b> é uma fila de números (ou figuras) que segue uma <b>regra escondida</b>. Descobrir a regra é como ser detetive!</p>
<p>Uma <b>igualdade</b> é como uma <b>balança equilibrada</b>: o que está de um lado do sinal = vale o mesmo que o outro lado.</p>
<h3>Caso 1 — Sequência que aumenta sempre igual</h3>
<div class="ex"><b>Exemplo:</b> 5, 12, 19, 26, ___<ol><li>Veja quanto pula de um para o outro: 12 − 5 = 7; 19 − 12 = 7; 26 − 19 = 7.</li><li>A regra é <b>somar 7</b>.</li><li>Próximo: 26 + 7 = <b>33</b>.</li></ol></div>
<h3>Caso 2 — Sequência que diminui</h3>
<div class="ex"><b>Exemplo:</b> 100, 92, 84, 76, ___<ol><li>Cada número tem 8 a menos que o anterior.</li><li>A regra é <b>tirar 8</b>.</li><li>Próximo: 76 − 8 = <b>68</b>.</li></ol></div>
<h3>Caso 3 — Sequência de figuras</h3>
<div class="ex"><b>Exemplo:</b> ● ▲ ■ ● ▲ ■ ● … qual é a 10ª figura?<ol><li>O grupo que se repete tem 3 figuras: ● ▲ ■.</li><li>As posições 3, 6 e 9 terminam um grupo (são ■).</li><li>A 10ª começa um grupo novo: <b>●</b>.</li></ol></div>
<h3>Caso 4 — Igualdade: o número que falta</h3>
<div class="ex"><b>Exemplo:</b> 9 + □ = 15<ol><li>Pense na balança: de um lado 15, do outro 9 e mais alguma coisa.</li><li>Quanto falta de 9 para chegar a 15? 15 − 9 = 6.</li><li>□ = <b>6</b>. Confira: 9 + 6 = 15 ✔</li></ol></div>
<div class="ex"><b>Exemplo:</b> 4 × □ = 28<ol><li>4 vezes quanto dá 28?</li><li>Use a divisão: 28 ÷ 4 = 7.</li><li>□ = <b>7</b>.</li></ol></div>
<div class="ex"><b>Exemplo:</b> 10 + 5 = 12 + □<ol><li>O lado esquerdo vale 15.</li><li>O direito também precisa valer 15: 12 + □ = 15.</li><li>□ = <b>3</b>. (A resposta <b>não</b> é 15!)</li></ol></div>
<h3>Erros comuns</h3><ul><li>Olhar só os dois primeiros números para achar a regra. Confira em todos!</li><li>Achar que o sinal de = quer dizer “o resultado vem agora”. Ele quer dizer “os dois lados valem o mesmo”.</li></ul>
<p class="tip"><b>Resumo:</b> sequência → veja quanto muda de um para o outro · igualdade → balança: os dois lados valem o mesmo · use a conta contrária para achar o □.</p>`;

TEORIA['4-geometria']=`
<h3>O que é</h3>
<p><b>Figuras planas</b> são “achatadas”, como um desenho no papel: quadrado, retângulo, triângulo, círculo. <b>Figuras espaciais</b> (sólidos) têm volume, dá para pegar na mão: caixa, dado, bola, chapéu de festa.</p>
<table class="t"><tr><th>Polígono</th><th>Lados</th></tr><tr><td>Triângulo</td><td>3</td></tr><tr><td>Quadrado / retângulo</td><td>4</td></tr><tr><td>Pentágono</td><td>5</td></tr><tr><td>Hexágono</td><td>6</td></tr></table>
<h3>Caso 1 — Prismas e pirâmides</h3>
<p><b>Prisma</b>: tem <b>duas bases iguais</b>, uma em cima e outra embaixo, e as laterais são retângulos (uma caixa de sapato). <b>Pirâmide</b>: tem <b>uma base</b>, e as laterais são triângulos que se encontram numa ponta (o vértice).</p>
<div class="ex"><b>Exemplo:</b> quantas faces tem um prisma de base triangular?<ol><li>Bases: 2 triângulos.</li><li>Laterais: uma para cada lado da base → 3.</li><li>Total: 2 + 3 = <b>5 faces</b>.</li></ol></div>
<div class="ex"><b>Exemplo:</b> quantas faces tem uma pirâmide de base quadrada?<ol><li>Base: 1 quadrado.</li><li>Laterais: um triângulo para cada lado da base → 4.</li><li>Total: 1 + 4 = <b>5 faces</b>.</li></ol></div>
<p class="tip">Prisma: faces = lados da base + 2. Pirâmide: faces = lados da base + 1.</p>
<h3>Caso 2 — Ângulo reto</h3>
<div class="ex"><b>Como reconhecer:</b><ol><li>O ângulo reto mede <b>90°</b>. É o “cantinho” de uma folha de caderno, de uma porta, de um azulejo.</li><li>Teste: encaixe o canto de uma folha. Se encaixar certinho, é reto.</li></ol></div>
<h3>Caso 3 — Retas paralelas e perpendiculares</h3>
<div class="ex"><b>Exemplos do dia a dia:</b><ol><li><b>Paralelas</b>: nunca se encontram, mesmo se esticarmos. Ex.: os trilhos do trem, as linhas do caderno.</li><li><b>Perpendiculares</b>: se cruzam formando ângulo reto. Ex.: o cruzamento de duas ruas em “+”, o canto do quadro.</li></ol></div>
<h3>Caso 4 — Simetria</h3>
<div class="ex"><b>Exemplo:</b> a letra A tem simetria?<ol><li>Imagine dobrar a letra no meio, de cima para baixo.</li><li>Se as duas metades ficam <b>uma em cima da outra, certinhas</b>, a figura tem simetria.</li><li>O A tem! A linha da dobra se chama <b>eixo de simetria</b>. Borboletas e corações também têm.</li></ol></div>
<h3>Erros comuns</h3><ul><li>Confundir quadrado (figura plana) com cubo (sólido).</li><li>Achar que prisma e pirâmide são iguais. Lembre: pirâmide tem ponta!</li></ul>
<p class="tip"><b>Resumo:</b> plana = desenho · espacial = objeto · prisma: 2 bases · pirâmide: 1 base e uma ponta · ângulo reto = 90° · paralelas não se encontram · perpendiculares se cruzam em 90°.</p>`;

TEORIA['4-medidas-area']=`
<h3>O que é</h3>
<p>Medir é comparar com uma unidade. Cada tipo de coisa tem sua unidade:</p>
<table class="t"><tr><th>O que medimos</th><th>Unidades</th><th>Troca</th></tr>
<tr><td>Comprimento (tamanho)</td><td>metro (m), centímetro (cm), quilômetro (km)</td><td>1 m = 100 cm · 1 km = 1.000 m</td></tr>
<tr><td>Massa (“peso”)</td><td>grama (g), quilograma (kg)</td><td>1 kg = 1.000 g</td></tr>
<tr><td>Capacidade (quanto cabe)</td><td>litro (L), mililitro (mL)</td><td>1 L = 1.000 mL</td></tr></table>
<h3>Caso 1 — Trocar de unidade maior para menor</h3>
<div class="ex"><b>Exemplo:</b> quantos centímetros há em 3 metros?<ol><li>1 metro tem 100 cm.</li><li>3 metros: 3 × 100 = <b>300 cm</b>.</li></ol></div>
<div class="ex"><b>Exemplo:</b> quantos gramas há em 2 kg?<ol><li>1 kg = 1.000 g.</li><li>2 × 1.000 = <b>2.000 g</b>.</li></ol></div>
<h3>Caso 2 — Escolher a unidade certa</h3>
<div class="ex"><b>Pense no tamanho:</b><ol><li>Comprimento de um lápis → <b>cm</b>. Distância entre cidades → <b>km</b>.</li><li>Pacote de arroz → <b>kg</b>. Uma bala → <b>g</b>.</li><li>Garrafa de refrigerante → <b>L</b>. Colher de remédio → <b>mL</b>.</li></ol></div>
<h3>Caso 3 — Área na malha quadriculada</h3>
<p><b>Área</b> é o espaço que a figura ocupa. Na malha, contamos quantos <b>quadradinhos</b> ficam dentro da figura.</p>
<div class="ex"><b>Exemplo:</b> um retângulo tem 5 quadradinhos em cada linha e 3 linhas.<ol><li>Contar um por um dá trabalho. Use a multiplicação!</li><li>5 quadradinhos × 3 linhas = <b>15 quadradinhos</b>.</li></ol></div>
<div class="ex"><b>Exemplo:</b> uma figura em “L”.<ol><li>Divida em dois retângulos.</li><li>Parte de cima: 2 × 3 = 6. Parte de baixo: 4 × 2 = 8.</li><li>Some: 6 + 8 = <b>14 quadradinhos</b>.</li></ol></div>
<p class="tip">Duas figuras diferentes podem ter a <b>mesma área</b>: 2 × 6 e 3 × 4 ocupam 12 quadradinhos cada.</p>
<h3>Erros comuns</h3><ul><li>Achar que 1 m = 10 cm (são 100!).</li><li>Na malha, contar os tracinhos da borda em vez dos quadradinhos de dentro.</li><li>Usar kg para medir líquido em vez de L.</li></ul>
<p class="tip"><b>Resumo:</b> comprimento: m e cm (×100) · massa: kg e g (×1.000) · capacidade: L e mL (×1.000) · área = quadradinhos de dentro (linhas × colunas).</p>`;

TEORIA['4-horas-duracao']=`
<h3>O que é</h3>
<p>O relógio mede o tempo. <b>1 hora = 60 minutos</b> e <b>1 minuto = 60 segundos</b>. Um dia tem 24 horas.</p>
<ul><li>No relógio de ponteiros: o <b>ponteiro pequeno</b> mostra a hora; o <b>grande</b> mostra os minutos (cada número vale 5 minutos).</li><li>Meia hora = 30 minutos. Um quarto de hora = 15 minutos.</li><li>Depois do meio-dia, contamos 13h, 14h, 15h… (14h = 2 da tarde).</li></ul>
<h3>Caso 1 — Horas em minutos</h3>
<div class="ex"><b>Exemplo:</b> quantos minutos há em 3 horas?<ol><li>Cada hora tem 60 minutos.</li><li>3 × 60 = <b>180 minutos</b>.</li></ol></div>
<h3>Caso 2 — Minutos em horas e minutos</h3>
<div class="ex"><b>Exemplo:</b> 95 minutos são quantas horas?<ol><li>Tire 60 minutos (que viram 1 hora): 95 − 60 = 35.</li><li>Então 95 minutos = <b>1 hora e 35 minutos</b>.</li></ol></div>
<h3>Caso 3 — A que horas termina?</h3>
<div class="ex"><b>Exemplo:</b> um filme começou às 15h40 e durou 50 minutos. A que horas acabou?<ol><li>Das 15h40 até as 16h faltam <b>20 minutos</b>.</li><li>Dos 50 minutos, já usamos 20. Sobram 50 − 20 = 30.</li><li>16h + 30 minutos = <b>16h30</b>.</li></ol></div>
<h3>Caso 4 — Quanto tempo durou?</h3>
<div class="ex"><b>Exemplo:</b> uma aula de natação vai das 19h30 às 21h. Quanto tempo dura?<ol><li>Das 19h30 até as 20h: 30 minutos.</li><li>Das 20h até as 21h: 60 minutos.</li><li>30 + 60 = <b>90 minutos</b> = 1 hora e meia.</li></ol></div>
<h3>Erros comuns</h3><ul><li>Somar minutos como se a hora tivesse 100 minutos (15h40 + 50 min não é 15h90!).</li><li>Trocar os ponteiros do relógio.</li></ul>
<p class="tip"><b>Resumo:</b> 1 h = 60 min · passou de 60 minutos, vira mais 1 hora · para achar a duração, “pule” até a hora cheia e depois conte o resto.</p>`;

TEORIA['4-tabelas-graficos-probabilidade']=`
<h3>O que é</h3>
<p><b>Tabelas</b> organizam informações em linhas e colunas. <b>Gráficos de barras</b> mostram os mesmos números com barras: quanto <b>mais alta</b> a barra, <b>maior</b> o número. Já a <b>probabilidade</b> é a chance de algo acontecer.</p>
<h3>Caso 1 — Ler uma tabela</h3>
<div class="ex"><b>Exemplo:</b> fruta preferida da turma.<table class="t"><tr><th>Fruta</th><th>Votos</th></tr><tr><td>Banana</td><td>8</td></tr><tr><td>Maçã</td><td>5</td></tr><tr><td>Uva</td><td>11</td></tr></table><ol><li>Mais votada: procure o maior número → <b>uva</b> (11).</li><li>Menos votada: o menor → <b>maçã</b> (5).</li><li>Total de alunos: 8 + 5 + 11 = <b>24</b>.</li><li>Uva teve quantos votos a mais que banana? 11 − 8 = <b>3</b>.</li></ol></div>
<h3>Caso 2 — Ler um gráfico de barras</h3>
<div class="ex"><b>Como fazer:</b><ol><li>Leia o <b>título</b>: ele diz o assunto do gráfico.</li><li>Embaixo ficam as categorias (as frutas). Do lado, os números.</li><li>Siga o topo de cada barra até o número do lado.</li><li>A barra mais alta é a que tem mais; a mais baixa, a que tem menos.</li></ol></div>
<h3>Caso 3 — Certo, possível ou impossível</h3>
<div class="ex"><b>Exemplo com um dado comum (1 a 6):</b><ol><li>Tirar um número menor que 7 → <b>certo</b> (sempre acontece).</li><li>Tirar o número 4 → <b>possível</b> (pode acontecer, ou não).</li><li>Tirar o número 8 → <b>impossível</b> (não existe 8 no dado).</li></ol></div>
<h3>Caso 4 — Mais provável ou menos provável</h3>
<div class="ex"><b>Exemplo:</b> um saquinho tem 7 bolas vermelhas e 2 azuis. Tirando uma sem olhar, qual cor é mais provável?<ol><li>Conte cada cor: vermelhas 7, azuis 2.</li><li>Tem mais vermelhas, então a chance de sair vermelha é maior.</li><li><b>Vermelha é mais provável</b>. Azul é menos provável, mas ainda pode sair!</li></ol></div>
<h3>Erros comuns</h3><ul><li>Achar que “mais provável” quer dizer “vai acontecer com certeza”.</li><li>Ler o gráfico sem olhar os números do lado.</li></ul>
<p class="tip"><b>Resumo:</b> tabela e gráfico guardam os mesmos números · barra mais alta = maior quantidade · certo / possível / impossível · tem mais → mais provável.</p>`;
