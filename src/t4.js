/* ===== MATEMÁTICA — 4º ANO ===== */
function gen4(kind,r,i){
  var a,b,c,nm;
  if(kind==='num'){
    a=r.i(10000,99999); b=r.i(10000,99999);
    return mix(i,[
      function(){var str=String(a),pos=r.i(0,4),d=str[pos],v=+d*Math.pow(10,4-pos);return {q:'No número '+n(a)+', qual é o valor do algarismo '+d+' que está na posição '+(pos+1)+' da esquerda?',a:n(v),s:'Cada algarismo vale conforme sua posição: dezenas de milhar, milhares, centenas, dezenas e unidades. O '+d+' nessa posição vale '+n(v)+'.'};},
      function(){return {q:'Qual número vem imediatamente depois de '+n(a)+'?',a:n(a+1),s:'Para encontrar o sucessor, somamos 1: '+n(a)+' + 1 = '+n(a+1)+'.'};},
      function(){return {q:'Qual número vem imediatamente antes de '+n(a)+'?',a:n(a-1),s:'Para encontrar o antecessor, tiramos 1: '+n(a)+' − 1 = '+n(a-1)+'.'};},
      function(){return {q:'Qual é o maior número: '+n(a)+' ou '+n(b)+'?',a:n(Math.max(a,b)),s:'Compare primeiro a quantidade de algarismos. Se for igual, compare da esquerda para a direita.'};}
    ]);
  }
  if(kind==='decomp'){
    a=r.i(1,9); b=r.i(0,9); c=r.i(0,9); var d=r.i(0,9), e=r.i(0,9), val=a*10000+b*1000+c*100+d*10+e;
    return mix(i,[
      function(){return {q:'Decomponha o número '+n(val)+' em dezenas de milhar, milhares, centenas, dezenas e unidades.',a:a*10000+' + '+b*1000+' + '+c*100+' + '+d*10+' + '+e,s:'Separe cada algarismo pelo valor da casa: '+a+' dezenas de milhar, '+b+' milhares, '+c+' centenas, '+d+' dezenas e '+e+' unidades.'};},
      function(){return {q:'Que número é formado por '+a+' dezenas de milhar, '+b+' milhares, '+c+' centenas, '+d+' dezenas e '+e+' unidades?',a:n(val),s:a*10000+' + '+b*1000+' + '+c*100+' + '+d*10+' + '+e+' = '+n(val)+'.'};},
      function(){return {q:'No número '+n(val)+', quanto vale o algarismo '+a+'?',a:n(a*10000),s:'O '+a+' está na casa das dezenas de milhar: '+a+' × 10.000 = '+n(a*10000)+'.'};}
    ]);
  }
  if(kind==='add'){
    a=r.i(125,4989); b=r.i(125,4989);
    return mix(i,[
      function(){return {q:'Calcule '+n(a)+' + '+n(b)+'.',a:n(a+b),s:'Some primeiro as unidades, depois dezenas, centenas e milhares. Quando uma casa completa 10, reagrupamos 1 para a próxima.'};},
      function(){return {q:'Uma biblioteca tinha '+n(a)+' livros e recebeu mais '+n(b)+'. Quantos livros tem agora?',a:n(a+b),s:'É uma situação de juntar: '+n(a)+' + '+n(b)+' = '+n(a+b)+'.'};},
      function(){return {q:'Calcule '+n(a+b)+' − '+n(b)+'.',a:n(a),s:'Subtraímos '+n(b)+' de '+n(a+b)+'. A operação inversa da adição confirma: '+n(a)+' + '+n(b)+' = '+n(a+b)+'.'};}
    ]);
  }
  if(kind==='mult'){
    a=r.i(2,9); b=r.i(12,99);
    return mix(i,[
      function(){return {q:'Calcule '+a+' × '+b+'.',a:n(a*b),s:'Separe '+b+' em dezenas e unidades: '+a+' × '+b+' = '+a+' × '+Math.floor(b/10)*10+' + '+a+' × '+(b%10)+' = '+n(a*b)+'.'};},
      function(){return {q:'Qual é o triplo de '+b+'?',a:n(3*b),s:'Triplo significa 3 vezes: 3 × '+b+' = '+n(3*b)+'.'};},
      function(){return {q:'Qual é o dobro de '+b+'?',a:n(2*b),s:'Dobro significa 2 vezes: 2 × '+b+' = '+n(2*b)+'.'};},
      function(){return {q:'Uma caixa tem '+a+' pacotes com '+b+' figurinhas cada. Quantas figurinhas há?',a:n(a*b),s:'São '+a+' grupos iguais de '+b+'. Multiplicamos: '+a+' × '+b+' = '+n(a*b)+'.'};}
    ]);
  }
  if(kind==='div'){
    a=r.i(2,9); b=r.i(2,12); var total=a*b+r.i(0,a-1);
    return mix(i,[
      function(){return {q:'Reparta '+n(a*b)+' objetos igualmente entre '+a+' crianças. Quantos cada uma recebe?',a:n(b),s:'Dividir é repartir em grupos iguais: '+n(a*b)+' ÷ '+a+' = '+b+'.'};},
      function(){return {q:'Calcule '+n(total)+' ÷ '+a+'. Dê quociente e resto.',a:Math.floor(total/a)+' resto '+(total%a),s:total+' = '+a+' × '+Math.floor(total/a)+' + '+(total%a)+'. O resto é menor que o divisor.'};},
      function(){return {q:'Uma professora distribui '+n(a*b)+' lápis em '+b+' grupos iguais. Quantos lápis em cada grupo?',a:n(a),s:n(a*b)+' ÷ '+b+' = '+a+'. Confira: '+a+' × '+b+' = '+n(a*b)+'.'};}
    ]);
  }
  if(kind==='frac'){
    var den=r.p([2,3,4,5,10,100]);
    return mix(i,[
      function(){return {q:'Uma barra foi dividida em '+den+' partes iguais. Uma parte corresponde a qual fração?',a:'1/'+den,s:'O número de baixo mostra o total de partes iguais. Uma parte é 1/'+den+'.'};},
      function(){return {q:'Qual é maior: 1/'+den+' ou 1/'+(den===2?3:2)+'?',a:'1/'+(den===2?2:2),s:'Quando o numerador é 1, quanto maior o denominador, menor é cada pedaço. Por isso 1/2 é maior.'};},
      function(){return {q:'Uma folha foi cortada em '+den+' pedaços iguais. Qual fração representa um pedaço?',a:'1/'+den,s:'Um pedaço de um total de '+den+' partes iguais é 1/'+den+'.'};},
      function(){return {q:'Complete: a fração que representa uma parte de '+den+' partes iguais é ___.',a:'1/'+den,s:'O numerador é 1 porque estamos escolhendo uma parte; o denominador é '+den+' porque existem '+den+' partes iguais.'};},
      function(){return {q:'Uma fita foi separada em '+den+' partes iguais. Que fração representa uma dessas partes?',a:'1/'+den,s:'Uma parte de '+den+' partes iguais corresponde a 1/'+den+'.'};}
    ]);
  }
  if(kind==='money'){
    a=r.i(1,50); b=r.i(1,99); c=r.i(1,50);
    return mix(i,[
      function(){var v=a+b/100;return {q:'Escreva '+a+' reais e '+b+' centavos usando vírgula.',a:'R$ '+v.toFixed(2).replace('.',','),s:'Os centavos ocupam duas casas depois da vírgula: R$ '+a+','+String(b).padStart(2,'0')+'.'};},
      function(){var v=a+b/100+c;return {q:'Você tem R$ '+a+','+String(b).padStart(2,'0')+' e recebe mais R$ '+c+',00. Quanto tem ao todo?',a:'R$ '+v.toFixed(2).replace('.',','),s:'Some reais com reais e centavos com centavos, mantendo a vírgula alinhada.'};}
    ]);
  }
  if(kind==='pattern'){
    a=r.i(2,12); b=r.i(2,8); c=a+4*b;
    return mix(i,[
      function(){return {q:'Complete a sequência: '+a+', '+(a+b)+', '+(a+2*b)+', '+(a+3*b)+', ___.',a:n(c),s:'A sequência aumenta sempre '+b+'. Então '+(a+3*b)+' + '+b+' = '+c+'.'};},
      function(){return {q:'Descubra o número que deixa a igualdade verdadeira: '+a+' × □ = '+n(a*b)+'.',a:n(b),s:'Pense na operação inversa: '+n(a*b)+' ÷ '+a+' = '+b+'.'};},
      function(){return {q:'Complete: '+(a+b)+' + □ = '+n(a+2*b)+'.',a:n(b),s:'A igualdade fica verdadeira quando adicionamos '+b+': '+(a+b)+' + '+b+' = '+(a+2*b)+'.'};}
    ]);
  }
  if(kind==='geo'){
    var formas=[['triângulo',3],['quadrado',4],['pentágono',5],['hexágono',6]], forma=r.p(formas);
    var base=r.i(3,6), ctx=r.p(['uma janela','um livro','uma folha de papel','um azulejo']);
    var paralela=r.p(['trilhos retos vistos de cima','linhas de um caderno','lados opostos de um retângulo']);
    return mix(i,[
      function(){return {q:'Quantos lados tem um '+forma[0]+'?',a:forma[1]+' lados',s:'Conte os lados da figura: um '+forma[0]+' tem '+forma[1]+' lados.'};},
      function(){return {q:'Um prisma com base de '+base+' lados tem quantas faces?',a:(base+2)+' faces',s:'Um prisma tem duas bases e uma face lateral para cada lado da base: '+base+' + 2 = '+(base+2)+' faces.'};},
      function(){return {q:'O canto de '+ctx+' forma um ângulo de quantos graus?',a:'90°',s:'Esse canto é um ângulo reto. Todo ângulo reto mede 90°.'};},
      function(){return {q:'Duas retas como '+paralela+' não se encontram. Como são chamadas?',a:'Retas paralelas',s:'Retas paralelas seguem lado a lado e não se cruzam.'};},
      function(){var p=r.p(['duas ruas que se cruzam formando um canto reto','o encontro entre a parede e o chão','os lados vizinhos de um quadrado']);return {q:'A situação '+p+' representa retas de que tipo?',a:'Retas perpendiculares',s:'Elas se encontram formando um ângulo reto de 90°.'};},
      function(){var obj=r.p(['borboleta','coração desenhado','folha com duas metades iguais']);return {q:'Quando dobramos uma figura como uma '+obj+' e as duas metades combinam, ela apresenta qual característica?',a:'Simetria',s:'A dobra indica o eixo de simetria: as duas metades se correspondem.'};},
      function(){return {q:'Uma pirâmide com base de '+base+' lados tem quantas faces?',a:(base+1)+' faces',s:'A pirâmide tem uma base e uma face triangular para cada lado da base: '+base+' + 1 = '+(base+1)+' faces.'};}
    ]);
  }
  if(kind==='measure'){
    a=r.i(2,9); b=r.i(2,9);
    return mix(i,[
      function(){return {q:'Quantos centímetros há em '+a+' metros?',a:n(a*100)+' cm',s:'1 metro tem 100 centímetros. Então '+a+' × 100 = '+(a*100)+' cm.'};},
      function(){return {q:'Quantos gramas há em '+a+' quilogramas?',a:n(a*1000)+' g',s:'1 quilograma tem 1.000 gramas. Então '+a+' × 1.000 = '+(a*1000)+' g.'};},
      function(){return {q:'Quantos mililitros há em '+a+' litros?',a:n(a*1000)+' mL',s:'1 litro tem 1.000 mililitros. Então '+a+' × 1.000 = '+(a*1000)+' mL.'};},
      function(){return {q:'Uma malha tem '+a+' colunas e '+b+' linhas. Quantos quadradinhos formam a área?',a:n(a*b)+' quadradinhos',s:'Conte linhas e colunas multiplicando: '+a+' × '+b+' = '+(a*b)+' quadradinhos.'};}
    ]);
  }
  if(kind==='time'){
    a=r.i(1,10); b=r.i(1,50);
    return mix(i,[
      function(){return {q:'Quantos minutos há em '+a+' horas?',a:n(a*60)+' minutos',s:'Cada hora tem 60 minutos: '+a+' × 60 = '+a*60+'.'};},
      function(){return {q:'Uma aula começou às 14h e durou '+(a*10)+' minutos. A que horas terminou?',a:(14+Math.floor(a/6))+':'+String((a*10)%60).padStart(2,'0'),s:'Some a duração ao horário inicial, lembrando que 60 minutos formam 1 hora.'};},
      function(){return {q:'Quantos minutos se passaram das 8h até as 9h'+String(b).padStart(2,'0')+'?',a:n(60+b)+' minutos',s:'Das 8h às 9h são 60 minutos. Acrescente mais '+b+': '+(60+b)+' minutos.'};}
    ]);
  }
  if(kind==='stats'){
    a=r.i(5,20); b=r.i(1,5);
    return mix(i,[
      function(){return {q:'Em uma pesquisa, '+a+' crianças escolheram futebol e '+(a-b)+' escolheram vôlei. Qual opção foi mais escolhida?',a:'Futebol',s:a+' é maior que '+(a-b)+'. Portanto, futebol foi a opção mais escolhida.'};},
      function(){return {q:'Uma caixa tem '+a+' bolas: '+b+' azuis e as demais vermelhas. Qual cor é mais provável retirar?',a:(a-b>b?'Vermelha':a-b===b?'As duas têm a mesma chance':'Azul'),s:'Há '+b+' bolas azuis e '+(a-b)+' vermelhas. A cor com mais bolas tem maior chance.'};},
      function(){return {q:'Se hoje há sol e não há nuvens, tirar o número 7 em um dado comum é um evento…',a:'Impossível',s:'Um evento impossível é aquele que não pode acontecer.'};}
    ]);
  }
  return {q:'Resolva a atividade.',a:'Vamos resolver juntos.',s:'Leia com atenção e procure as informações importantes.'};
}
function topic4(id,nome,area,tags,teoria,kind){
  topic({id:id,nome:nome,ano:'4º ano',area:area,tags:tags,teoria:teoria,gen:function(r,i){return gen4(kind,r,i);}});
}
topic4('4-sistema-decimal','Sistema de numeração decimal até a dezena de milhar','Números','4º ano números naturais unidade dezena centena milhar dezena de milhar','<p>Nosso sistema usa dez algarismos: 0 a 9. Cada posição vale dez vezes a posição que fica à sua direita.</p><p>Da direita para a esquerda: unidades, dezenas, centenas, unidades de milhar e dezenas de milhar.</p><p><b>Exemplo resolvido: qual é o valor do algarismo 3 em 23.418?</b></p><ol><li>Observe a posição do 3: ele está na casa dos milhares.</li><li>Na casa dos milhares, cada unidade vale 1.000.</li><li>Faça 3 × 1.000 = 3.000.</li></ol><p>Portanto, o algarismo 3 vale <b>3.000</b>.','num');
topic4('4-composicao-decomposicao','Composição e decomposição de números','Números','compor decompor valor posicional milhares centenas dezenas unidades','<p>Compor é juntar partes para formar um número. Decompor é separar o número de acordo com o valor de cada algarismo.</p><p><b>Exemplo resolvido: decomponha 4.582.</b></p><ol><li>O 4 está na casa dos milhares: vale 4.000.</li><li>O 5 está na casa das centenas: vale 500.</li><li>O 8 está na casa das dezenas: vale 80.</li><li>O 2 está na casa das unidades: vale 2.</li><li>Junte as partes: 4.000 + 500 + 80 + 2 = 4.582.</li></ol><p>O zero também ocupa uma posição: 3.047 = 3.000 + 40 + 7.</p>','decomp');
topic4('4-adicao-subtracao-reagrupamento','Adição e subtração com reagrupamento','Números','somar subtrair vai um emprestar reagrupamento','<p>Na adição, juntamos quantidades. Na subtração, retiramos ou comparamos. Quando uma coluna não tem unidades suficientes, fazemos uma troca: 10 unidades valem 1 dezena; 1 dezena vale 10 unidades.</p><p><b>Exemplo resolvido: 268 + 157.</b></p><ol><li>Unidades: 8 + 7 = 15. Escreva 5 e reagrupa 1 dezena.</li><li>Dezenas: 6 + 5 + 1 = 12 dezenas. Escreva 2 e reagrupa 1 centena.</li><li>Centenas: 2 + 1 + 1 = 4.</li><li>Resultado: <b>425</b>.</li></ol><p><b>Agora a subtração: 352 − 178.</b> Nas unidades, troque 1 dezena por 10 unidades: 12 − 8 = 4. Nas dezenas, troque 1 centena por 10 dezenas: 14 − 7 = 7. Nas centenas, 2 − 1 = 1. Resultado: <b>174</b>.</p>','add');
topic4('4-multiplicacao','Multiplicação: tabuada, dobro, triplo e algoritmo','Números','multiplicação tabuada dobro triplo algoritmo grupos iguais','<p>Multiplicar é somar grupos iguais. Dobro significa 2 vezes; triplo significa 3 vezes. Para multiplicar números maiores, podemos separar dezenas e unidades.</p><p><b>Exemplo resolvido: 23 × 4.</b></p><ol><li>Separe 23 em 20 + 3.</li><li>Multiplique as dezenas: 20 × 4 = 80.</li><li>Multiplique as unidades: 3 × 4 = 12.</li><li>Some os resultados: 80 + 12 = <b>92</b>.</li></ol><p>Assim, 23 × 4 = 92. O dobro de 23 é 46 e o triplo é 69.</p>','mult');
topic4('4-divisao','Divisão exata e com resto','Números','divisão repartir partes iguais quociente resto','<p>Dividir é repartir em partes iguais ou descobrir quantos grupos cabem. O resultado é o quociente. Se sobrar alguma coisa, ela é o resto.</p><p><b>Exemplo resolvido: repartir 17 balas entre 5 crianças.</b></p><ol><li>Entregue 1 bala para cada criança: foram 5 balas.</li><li>Continue até cada criança receber 3 balas: foram 5 × 3 = 15 balas.</li><li>Das 17 balas, sobraram 17 − 15 = 2.</li></ol><p>Cada criança recebe <b>3 balas</b> e sobram <b>2</b>. Podemos conferir: 17 = 5 × 3 + 2. Na divisão exata, o resto é zero.</p>','div');
topic4('4-fracoes-unitarias','Frações unitárias','Números','frações metade terço quarto quinto décimo centésimo 1/2 1/3 1/4 1/5 1/10 1/100','<p>Uma fração representa partes iguais de um inteiro. Nas frações unitárias, o número de cima é 1: 1/2, 1/3, 1/4, 1/5, 1/10 e 1/100. O número de baixo mostra em quantas partes iguais o inteiro foi dividido.</p><p><b>Exemplo resolvido: uma barra foi dividida em 4 partes iguais. Qual fração representa uma parte?</b></p><ol><li>Conte o total de partes iguais: são 4. Esse número fica embaixo.</li><li>Escolhemos apenas uma parte. O número 1 fica em cima.</li><li>Escreva a fração: <b>1/4</b>.</li></ol><p>Quando o inteiro é dividido em mais partes iguais, cada pedaço fica menor. Por isso, 1/2 é maior que 1/4.</p>','frac');
topic4('4-decimais-dinheiro','Números decimais no sistema monetário','Números','dinheiro reais centavos décimos centésimos vírgula','<p>Um real tem 100 centavos. A vírgula separa os reais dos centavos. A primeira casa depois da vírgula representa décimos; a segunda representa centésimos.</p><p><b>Exemplo resolvido: quanto é R$ 3,25?</b></p><ol><li>Antes da vírgula está a quantidade de reais: 3 reais.</li><li>Depois da vírgula estão os centavos: 25 centavos.</li><li>Separe os centavos: 2 décimos de real e 5 centésimos de real.</li></ol><p>Portanto, R$ 3,25 são <b>3 reais e 25 centavos</b>. Para somar dinheiro, alinhe as vírgulas.</p>','money');
topic4('4-sequencias-igualdade','Sequências, padrões e noção de igualdade','Álgebra','sequências padrões regularidade igualdade sentença matemática','<p>Uma sequência segue uma regra: pode aumentar, diminuir ou repetir. Uma igualdade mostra que os dois lados têm o mesmo valor. O quadradinho pode representar um número que falta.</p><p><b>Exemplo resolvido: complete 5, 10, 15, 20, __.</b></p><ol><li>Compare o segundo número com o primeiro: 10 − 5 = 5.</li><li>Confira: 15 − 10 = 5 e 20 − 15 = 5.</li><li>A regra é somar 5. Então 20 + 5 = <b>25</b>.</li></ol><p><b>Igualdade:</b> em 8 + □ = 13, pense: 13 − 8 = 5. O número que falta é 5.</p>','pattern');
topic4('4-geometria','Figuras planas e espaciais, ângulo reto, retas e simetria','Geometria','figuras planas espaciais prismas pirâmides ângulo reto paralelas perpendiculares simetria','<p>Figuras planas têm comprimento e largura, como quadrado e triângulo. Sólidos têm volume. Prismas têm duas bases iguais; pirâmides têm uma base e faces laterais que se encontram em uma ponta. Ângulo reto mede 90°. Retas paralelas não se cruzam; perpendiculares se encontram formando 90°. Simetria acontece quando as duas metades combinam ao dobrar.</p><p><b>Exemplo resolvido: quantas faces tem um prisma de base triangular?</b></p><ol><li>O prisma tem 2 bases triangulares.</li><li>O triângulo tem 3 lados, então o prisma tem 3 faces laterais.</li><li>Some: 2 + 3 = <b>5 faces</b>.</li></ol><p>O canto de uma folha é um exemplo de ângulo reto. Os lados vizinhos de um quadrado são perpendiculares.</p>','geo');
topic4('4-medidas-area','Medidas de comprimento, massa, capacidade e área','Grandezas e medidas','metro centímetro quilômetro grama quilograma litro mililitro área malha quadriculada','<p>Comprimento mede distâncias (metro e centímetro). Massa mede a quantidade de matéria (grama e quilograma). Capacidade mede quanto cabe em um recipiente (litro e mililitro). Na malha quadriculada, a área pode ser medida contando quadradinhos.</p><p><b>Exemplo resolvido: um retângulo ocupa 4 colunas e 3 linhas de quadradinhos. Qual é a área?</b></p><ol><li>Conte 4 quadradinhos em cada linha.</li><li>Há 3 linhas iguais.</li><li>Multiplique: 4 × 3 = <b>12 quadradinhos</b>.</li></ol><p>Também lembre: 1 metro = 100 centímetros; 1 quilograma = 1.000 gramas; 1 litro = 1.000 mililitros.</p>','measure');
topic4('4-horas-duracao','Horas, minutos e duração de intervalos','Grandezas e medidas','relógio horas minutos duração intervalo tempo','<p>Uma hora tem 60 minutos. Para descobrir quanto tempo passou, avance do horário inicial até o final, separando em partes fáceis.</p><p><b>Exemplo resolvido: quanto tempo passou das 14h20 às 15h05?</b></p><ol><li>De 14h20 até 15h00 faltam 40 minutos.</li><li>De 15h00 até 15h05 passam mais 5 minutos.</li><li>Some: 40 + 5 = <b>45 minutos</b>.</li></ol><p>Se passar de 60 minutos, troque 60 minutos por 1 hora.</p>','time');
topic4('4-tabelas-graficos-probabilidade','Tabelas, gráficos de barras e eventos prováveis','Estatística e probabilidade','tabelas gráficos barras pesquisa mais menos provável chance','<p>Tabelas organizam informações. Gráficos de barras ajudam a comparar quantidades: a barra mais alta representa o maior valor. Um evento pode ser certo, possível ou impossível. Entre eventos possíveis, alguns têm mais chance do que outros.</p><p><b>Exemplo resolvido: uma caixa tem 7 bolas azuis e 2 vermelhas. Qual cor tem mais chance de sair?</b></p><ol><li>Conte as bolas azuis: 7.</li><li>Conte as vermelhas: 2.</li><li>Compare: 7 é maior que 2. Há mais bolas azuis.</li></ol><p>Então retirar uma bola azul é <b>mais provável</b>. Isso não significa que seja garantido.</p>','stats');
