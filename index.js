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
	    return new RegExp(array.join("$|"), 'gi');
	} else return array;
};

bot.command('add', (ctx) => {
  return ctx.reply('Отлично, выбери марку колеса!', Extra.markup(
    Markup.keyboard(getWheelModels())
    .oneTime()
  ))
})

bot.hears(/(Gotway$|Inmotion$|Kingsong$|Ninebot$|Airwheel$|Rockwheel$)/gi, (ctx) => {
    let markId = 0;
    let modelArray = []; 
    
    // sqlite.run(`SELECT * FROM euc_marks WHERE MARK = "${ctx.message.text}"`, (res) => console.log(res[0].ID));
     
    sqlite.run(`SELECT ID FROM euc_marks WHERE MARK = "${ctx.message.text}"`, (res) => markId = res[0].ID);	
    
    sqlite.run(`SELECT * FROM euc_models WHERE MK_ID = ${markId}`, (res) => {
         let i = res.length-1;
         do {
             modelArray[i] = res[i].MODEL_NAME;
             i--;
         } while (i >= 0);
    })
    return ctx.reply('Теперь выбери марку!', Extra.markup(
    Markup.keyboard(modelArray)
    .oneTime()
  ))
   
     

});

bot.hears(/(Gotway|Inmotion|Kingsong|Ninebot|Airwheel|Rockwheel)/gi, (ctx) => {
   sqlite.run(`INSERT INTO users(TG_ID, NICK, MODEL) VALUES (${ctx.from.id}, "${ctx.from.username}", "${ctx.message.text}")`)
   return ctx.reply(`Отлично, @${ctx.from.username}, ${ctx.message.text} добавлен в твой гараж!`);
});

bot.command('user', (ctx) => {
    return console.log(ctx.from);
})

bot.command('show', (ctx) => {
    const user = ctx.from.username;
    const id = ctx.from.id;
    let userModels = '';
    sqlite.run(`SELECT MODEL FROM users WHERE TG_ID = ${id}`, (res) => {
    	let i = res.length-1;
         do {
             userModels += res[i].MODEL + '⚡️' + '\n';
             i--;
         } while (i >= 0);

    })
    return ctx.reply(`Мои модели:\n${userModels}`);
})
/* api connection */

bot.launch();
