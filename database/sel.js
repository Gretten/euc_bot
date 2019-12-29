const sqlite = require('sqlite-sync');
sqlite.connect('base.db');

const getWheels = () => {
	sqlite.run(`SELECT * FROM euc_marks`, (res) => {
		for(let i = 0; i < res.length; i++) {
			console.log(res[i].MARK);
		}

	});
}

// sqlite.run(`SELECT * FROM euc_models`, (res) => console.log(res))
sqlite.run(`SELECT * FROM users`, (res) => console.log(res))

