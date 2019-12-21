const sqlite = require('sqlite-sync');
sqlite.connect('base.db');

const str = `Inmotion V10
Inmotion V10F
Inmotion V3 Pro
Inmotion V5
Inmotion V5F
Inmotion V8`


const marksArray = str.split('\n')

console.log(marksArray);

/*
marksArray.map((index) => {
	console.log(index);

  sqlite.run(`INSERT INTO euc_models (MK_ID, MODEL_NAME)
	      VALUES (1, '${index}');`, function(res){
    if(res.error)
        throw res.error;
  })
})*/

sqlite.run("SELECT * FROM euc_models ORDER BY MK_ID;", function(res){
    console.log(res);
 })

