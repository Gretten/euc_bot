/* constants section */

const Telegraf = require('telegraf');
const sqlite = require('sqlite-sync');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

sqlite.connect('database/base.db');



/* command functions */

const toStart = (ctx) => ctx.reply(`Катаю, ${ctx.from.username}, позже приходи! ;)`));

const toDebug = (ctx) => ctx.reply(`Создатель, привет :) Вот твой ник: ${ctx.chat.first_name}`);

const toHelp = (ctx) => {

};

/* api connection */

bot.start(toStart);

bot.hears('дебаг', toDebug);

bot.launch();
