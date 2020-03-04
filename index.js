

'use strict';

const Telegram = require('telegram-node-bot');

//

const tg = new Telegram.Telegram('process.env.token', {
	workers: 1
});

<<<<<<< HEAD
const TodoController = require('./controllers/todo')
	, OtherwiseController = require('./controllers/otherwise');

const todoCtrl = new TodoController();

tg.router.when(new Telegram.TextCommand('/test', 'testCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/start', 'startCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/user', 'userCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/pass', 'passCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/cambiauser', 'cambiauserCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/cambiapass', 'cambiapassCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/consumo', 'consumoCommand'), todoCtrl)
	.otherwise(new OtherwiseController());

function exitHandler(exitCode) {
	storage.flush();
	process.exit(exitCode);
}
=======
bot.onText(/\/start/, (msg) => {

	bot.sendMessage(msg.chat.id, "Benvenuto in questo inutile bot.\n/dati per vedere i dati", {
		"reply_markup":{
			"keyboard":[["Consumo"],["User", "Password"]]
		}
	});
});

bot.onText(/Consumo/, (msg, match) => {
	const chatId = msg.chat.id;

	bot.sendMessage(chatId, "Ecco i dati: ...", {
		"reply_markup": {
			"keyboard":[["Consumo"],["User", "Password"]]
		}
	});
});

bot.onText(/\/dati/, (msg, match) => {
	const chatId = msg.chat.id;

	bot.sendMessage(chatId, "Eccolo... il mio " + chatId, {
		"reply_markup": {
			"keyboard":[["Consumo"],["User", "Password"]]
		}
	});

	// const city = match[1] ? match[1] : "";
	// //http.get( 'api.openweathermap.org/data/2.5/weather?q=firenze&units=metric&lang=it&APPID=<TOKEN>, res => {
	// http.get( 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&lang=it&APPID=' + meteoAppId, res => {
	// 	let rawDat = '';
	// 	res.on( 'data', (chunk) => { rawDat += chunk; });
	// 	res.on( 'end', () => {
	// 		try {
	// 			const parseData = JSON.parse( rawDat );
	// 			var messages = [];
	// 			parseData.weather.forEach( function(value) {
	// 				messages.push( "Meteo: " + value.description );
	// 			});
	// 			messages.push( "Temperatura: " + parseData.main.temp + "°C");
	// 			messages.push( "Vento: " + parseData.wind.speed + "m/s" );
	// 			bot.sendMessage( chatId, messages.join("\n") );
	// 		} catch (e) {
	// 			bot.sendMessage( chatId, "errore" + e.message );
	// 		}
	// 	});
	// }).on('error', (e) => {
	// 	bot.sendMessage( chatId, "errore" + e.message );
	// });


	// 
});
>>>>>>> 0b0f530ef71dddec4bc6d819991bb14f4234ea91
