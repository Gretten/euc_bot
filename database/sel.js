const sqlite = require('sqlite-sync');
sqlite.connect('base.db');

const getWheels = () => {
	sqlite.run(`SELECT * FROM euc_marks`, (res) => {
		for(let i = 0; i < res.length; i++) {
			console.log(res[i].MARK);
		}

	});
}
// getWheels();

sqlite.run(`SELECT * FROM euc_models WHERE MK_ID = 5`, (res) => console.log(res))

sqlite.run(`SELECT * FROM euc_models WHERE MK_ID = (SELECT ID FROM euc_marks WHERE MARK = ${ctx.message})`, (res) => console.log(res))
