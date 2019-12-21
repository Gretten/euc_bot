const sqlite = require('sqlite-sync');

sqlite.connect('base.db');

sqlite.run(`CREATE TABLE IF NOT EXISTS users(
   TG_ID INTEGER PRIMARY KEY AUTOINCREMENT,
   NICK TEXT,
   MODEL TEXT NOT NULL
);`, 
function(res) {
    if (res.error) {
        throw res.error;
        console.log(res);
    }
});

sqlite.run(`CREATE TABLE IF NOT EXISTS euc_marks(
   ID INTEGER PRIMARY KEY AUTOINCREMENT,
   MARK TEXT NOT NULL
);`, 
function(res) {
    if (res.error) {
        throw res.error;
        console.log(res);
    }
});

sqlite.run(`CREATE TABLE IF NOT EXISTS euc_models(
   ID INTEGER PRIMARY KEY AUTOINCREMENT,
   MK_ID INTEGER,
   MODEL_NAME TEXT NOT NULL,
   FOREIGN KEY (MK_ID) REFERENCES euc_marks(ID)
);`, 
function(res) {
    if (res.error) {
        throw res.error;
        console.log(res);
    }
});
