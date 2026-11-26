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
topic4('4-sistema-decimal','Sistema de numeração decimal até a dezena de milhar','Números','4º ano números naturais unidade dezena centena milhar dezena de milhar','<p>Nosso sistema usa dez algarismos: 0, 1, 2, 3, 4, 5, 6, 7, 8 e 9. O lugar de cada algarismo muda seu valor.</p><p>Da direita para a esquerda: unidade, dezena, centena, unidade de milhar e dezena de milhar.</p><div class="ex"><b>Exemplo:</b> em 23.418, o 2 vale 20.000, o 3 vale 3.000, o 4 vale 400, o 1 vale 10 e o 8 vale 8.</div>','num');
topic4('4-composicao-decomposicao','Composição e decomposição de números','Números','compor decompor valor posicional milhares centenas dezenas unidades','<p>Compor é juntar partes para formar um número. Decompor é fazer o caminho contrário: separar o número em milhares, centenas, dezenas e unidades.</p><div class="ex"><b>Exemplo:</b> 4.582 = 4.000 + 500 + 80 + 2.</div><p>O zero pode ocupar uma casa sem acrescentar valor: 3.047 = 3.000 + 40 + 7.</p>','decomp');
topic4('4-adicao-subtracao-reagrupamento','Adição e subtração com reagrupamento','Números','somar subtrair vai um emprestar reagrupamento','<p>Na adição, juntamos quantidades. Quando uma coluna chega a 10, trocamos 10 unidades por 1 dezena (ou 10 dezenas por 1 centena).</p><p>Na subtração, comparamos ou retiramos. Se não houver unidades suficientes, podemos trocar 1 dezena por 10 unidades.</p><div class="ex"><b>Exemplo:</b> 268 + 157: unidades 8 + 7 = 15 (escreve 5 e reagrupa 1 dezena); dezenas 6 + 5 + 1 = 12; centenas 2 + 1 + 1 = 4. Resultado: 425.</div>','add');
topic4('4-multiplicacao','Multiplicação: tabuada, dobro, triplo e algoritmo','Números','multiplicação tabuada dobro triplo algoritmo grupos iguais','<p>Multiplicar é somar grupos iguais. O dobro é 2 vezes uma quantidade; o triplo é 3 vezes.</p><div class="ex"><b>Exemplo:</b> 23 × 4 = (20 × 4) + (3 × 4) = 80 + 12 = 92.</div><p>Treinar as tabuadas ajuda a fazer contas maiores com segurança.</p>','mult');
topic4('4-divisao','Divisão exata e com resto','Números','divisão repartir partes iguais quociente resto','<p>Dividir é repartir em partes iguais ou descobrir quantos grupos cabem. O resultado é o quociente. Quando sobra algo, chamamos de resto.</p><div class="ex"><b>Exemplo:</b> 17 balas para 5 crianças: cada uma recebe 3 e sobram 2. Pois 17 = 5 × 3 + 2.</div><p>Na divisão exata, o resto é zero.</p>','div');
topic4('4-fracoes-unitarias','Frações unitárias','Números','frações metade terço quarto quinto décimo centésimo 1/2 1/3 1/4 1/5 1/10 1/100','<p>Uma fração representa partes iguais de um inteiro. Nas frações unitárias, o número de cima é 1: 1/2, 1/3, 1/4, 1/5, 1/10 e 1/100.</p><p>O número de baixo mostra em quantas partes iguais dividimos o inteiro. Quanto maior o número de baixo, menor fica cada parte.</p><div class="ex"><b>Exemplo:</b> se uma pizza é dividida em 4 pedaços iguais, cada pedaço é 1/4 da pizza.</div>','frac');
topic4('4-decimais-dinheiro','Números decimais no sistema monetário','Números','dinheiro reais centavos décimos centésimos vírgula','<p>O dinheiro ajuda a entender os números decimais. Um real tem 100 centavos. A vírgula separa reais e centavos.</p><div class="ex"><b>Exemplo:</b> R$ 3,25 significa 3 reais e 25 centavos. O algarismo 2 representa 2 décimos de real e o 5 representa 5 centésimos.</div><p>Ao somar valores, alinhe as vírgulas.</p>','money');
topic4('4-sequencias-igualdade','Sequências, padrões e noção de igualdade','Álgebra','sequências padrões regularidade igualdade sentença matemática','<p>Uma sequência segue uma regra. Pode aumentar, diminuir ou repetir figuras e números.</p><p>Uma igualdade mostra que os dois lados têm o mesmo valor. O símbolo □ pode representar um número que falta.</p><div class="ex"><b>Exemplo:</b> 5, 10, 15, 20… aumenta de 5 em 5. E 8 + □ = 13: o número que falta é 5.</div>','pattern');
topic4('4-geometria','Figuras planas e espaciais, ângulo reto, retas e simetria','Geometria','figuras planas espaciais prismas pirâmides ângulo reto paralelas perpendiculares simetria','<p>Figuras planas têm comprimento e largura, como quadrado, retângulo e triângulo. Sólidos têm volume: prismas e pirâmides são exemplos.</p><p>O ângulo reto mede 90°. Retas paralelas não se cruzam; perpendiculares se cruzam formando ângulo reto. Uma figura tem simetria quando suas metades combinam ao dobrar sobre um eixo.</p><div class="ex"><b>Exemplo:</b> um cubo é um sólido com 6 faces quadradas. O canto de uma folha forma um ângulo reto.</div>','geo');
topic4('4-medidas-area','Medidas de comprimento, massa, capacidade e área','Grandezas e medidas','metro centímetro quilômetro grama quilograma litro mililitro área malha quadriculada','<p>Comprimento mede distâncias (metro e centímetro). Massa mede quanto algo pesa (grama e quilograma). Capacidade mede quanto cabe em um recipiente (litro e mililitro).</p><p>Na malha quadriculada, a área pode ser encontrada contando os quadradinhos que cobrem a figura.</p><div class="ex"><b>Exemplo:</b> 2 metros = 200 centímetros. Um retângulo com 4 colunas e 3 linhas ocupa 12 quadradinhos.</div>','measure');
topic4('4-horas-duracao','Horas, minutos e duração de intervalos','Grandezas e medidas','relógio horas minutos duração intervalo tempo','<p>Uma hora tem 60 minutos. Para descobrir quanto tempo passou, conte do horário inicial até o horário final.</p><div class="ex"><b>Exemplo:</b> de 14h20 até 15h05 passaram 40 minutos até 15h e mais 5 minutos: 45 minutos.</div><p>Observe se a atividade começa e termina em horas diferentes.</p>','time');
topic4('4-tabelas-graficos-probabilidade','Tabelas, gráficos de barras e eventos prováveis','Estatística e probabilidade','tabelas gráficos barras pesquisa mais menos provável chance','<p>Tabelas organizam informações. Gráficos de barras ajudam a comparar quantidades: a barra maior representa o maior valor.</p><p>Um evento pode ser certo, possível ou impossível. Entre eventos possíveis, alguns são mais prováveis que outros.</p><div class="ex"><b>Exemplo:</b> numa caixa com 7 bolas azuis e 2 vermelhas, retirar uma azul é mais provável porque há mais bolas azuis.</div>','stats');
