const Telegraf = require('telegraf');
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const sqlite = require('sqlite-sync');
const commandParts = require('telegraf-command-parts');

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(commandParts());
sqlite.connect('database/base.db');

/* command functions */

const getWheelModels = (str) => {
    const array = [];
    sqlite.run(`SELECT * FROM euc_marks`, (res) => {
        let i = res.length - 1;
        do {
            array[i] = res[i].MARK;
            i--;
        } while (i >= 0);
    })
    if (str) {
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
        let i = res.length - 1;
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
    return console.log(res);
})

bot.command('my', (ctx) => {
    const user = ctx.from.username;
    const id = ctx.from.id;
    let userModels = '';
    sqlite.run(`SELECT MODEL FROM users WHERE TG_ID = ${id}`, (res) => {
        if (res[0]) {
            let i = res.length - 1;
            do {
                userModels += res[i].MODEL + '⚡️' + '\n';
                i--;
            } while (i >= 0);
            return ctx.reply(`Мои модели:\n${userModels}`);
        } else return ctx.reply('Ничего нет!');
    });
});

bot.command('show', (ctx) => {
    const user = ctx.state.command.args;
    const id = ctx.from.id;
    let userModels = '';
    sqlite.run(`SELECT MODEL FROM users WHERE NICK = "${user}"`, (res) => {
        console.log(res[0]);
        if (res[0]) {
            let i = res.length - 1;
            do {
                userModels += res[i].MODEL + '⚡️' + '\n'
                i--;
            } while (i >= 0);
            return ctx.reply(`Модели ${user}:\n${userModels}`);
        } else return ctx.reply('Ничего нет!');
    })
})


/* api connection */

// Задачи:
// 1. Вывод всех логинов в базе и привязанных к ним колес.
// 2. Вывод конкретного логина по нику.

/*
Схема вывода всех логинов и колес:
- Делается запрос - например, /all.
- Отрабатывает SQL-запрос, выводящий таблицу всех юзеров с колесами.
- Некая функция приводит полученный объект к удобному виду: логин повторяется только один раз.
- Результат выводится по аналогии с командой /show.
*/

bot.command('bitza', (ctx) => {
    let nickArray;

    sqlite.run(`SELECT DISTINCT nick FROM users`, (res) => {
        nickArray = res.filter(i => {
            return i.NICK != 'undefined';
        })
    })

    nickArray = nickArray.map(i => {
        return i.NICK
    })


    let mString = 'Битцевский гараж 🚀:\n\n';

    for (let i = 0; i <= nickArray.length - 1; i++) {
        console.log(nickArray[i]);
        mString += nickArray[i] + ':' + '\n';

        sqlite.run(`SELECT model FROM users WHERE NICK = "${nickArray[i]}"`, (res) => {
            let i = res.length - 1;
            do {
                console.log(res[i]);
                mString += res[i].MODEL + '⚡️' + '\n'
                i--;
            } while (i >= 0);
        })
        mString += '\n';
    }
    return ctx.reply(mString);
})

bot.command('all', (ctx) => {
    console.log(ctx.state.command);
});


bot.launch();
