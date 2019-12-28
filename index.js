/* constants section */

const Telegraf = require('telegraf');
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const sqlite = require('sqlite-sync');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

sqlite.connect('database/base.db');

/* command functions */

const getWheelModels = (str) => {
	const array = [];
        sqlite.run(`SELECT * FROM euc_marks`, (res) => {
		let i = res.length-1;
		do {
		    array[i] = res[i].MARK;
	            i--;
		} while (i >= 0);
	})
	if(str) {
	    return new RegExp(array.join("|"), 'gi');
	} else return array;
};


bot.command('garage', (ctx) => {
  return ctx.reply('Отлично, выбери марку колеса!', Extra.markup(
    Markup.keyboard(getWheelModels())
    .oneTime()
  ))
})

bot.hears(getWheelModels('str'), (ctx) => ctx.reply('Слышу тебя ясно и четко!'));

/* api connection */

// bot.start(toStart);

bot.launch();
