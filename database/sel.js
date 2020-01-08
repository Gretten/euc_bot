const sqlite = require('sqlite-sync');
sqlite.connect('base.db');

sqlite.run(`SELECT * FROM users WHERE NICK = 'somerift'`, (res) => { 
   console.log(res[0]);
   console.log(res[1]);
   if (!res[0]) {
      console.log('Empty array!');
   }
})

