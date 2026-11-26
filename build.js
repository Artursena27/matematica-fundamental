const fs=require('fs');
const conteudo=['core','t1','t1b','t2','t3','t3b','t4','teoria1','teoria2','teoria3','teoria4','teoria5','teoria6','didatica'].map(f=>fs.readFileSync('src/'+f+'.js','utf8')).join('\n');
const app=fs.readFileSync('src/app.js','utf8').replace('/*JOGOS*/',()=>fs.readFileSync('src/jogos.js','utf8'));
const html=fs.readFileSync('src/shell.html','utf8').replace('/*CONTEUDO*/',()=>conteudo).replace('/*APP*/',()=>app);
fs.writeFileSync('index.html',html);
console.log('ok',html.length);
