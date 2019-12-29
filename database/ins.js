const sqlite = require('sqlite-sync');
sqlite.connect('base.db');

/*
sqlite.run(`INSERT INTO users (TG_ID, NICK, MODEL)
	      VALUES (467173752, "@somerift", "Ninebot One S2")
	  ;`, function(res){
    if(res.error)
        throw res.error;
})
*/




sqlite.run(`CREATE TABLE IF NOT EXISTS users(
   ID INTEGER PRIMARY KEY AUTOINCREMENT,
   TG_ID INTEGER,
   NICK TEXT,
   MODEL TEXT NOT NULL
);`, 
function(res) {
    if (res.error) {
        throw res.error;
        console.log(res);
    }
});


/* sqlite.run(`DROP TABLE users;`, function(res) {
	console.log(res);
})
*/
