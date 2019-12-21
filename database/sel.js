const sqlite = require('sqlite-sync');


sqlite.run("SELECT * FROM euc_marks;", function(res){
    console.log(res);
 })

