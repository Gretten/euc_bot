const sqlite = require('sqlite-sync');
sqlite.connect('base.db');



  sqlite.run(`INSERT INTO users (TG_ID, NICK, MODEL)
	      VALUES (467173752, "@somerift", "Ninebot One S2")
	  ;`, function(res){
    if(res.error)
        throw res.error;
  })

sqlite.run("SELECT * FROM users;", function(res){
    console.log(res);
 })

