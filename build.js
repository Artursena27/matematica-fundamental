const fs=require('fs');
const js=['core','t1','t1b','t2','t3'].map(f=>fs.readFileSync('src/'+f+'.js','utf8')).join('\n');
const html=fs.readFileSync('src/app.html','utf8').replace('/*TOPICS*/',()=>js);
fs.writeFileSync('index.html',html);
console.log('ok',html.length);
