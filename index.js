const TelegramBot = require("node-telegram-bot-api");
const http = require('http');

const token = process.env.token;


const bot = new TelegramBot(token, { polling: true });

bot.on("polling_error", (msg) => console.log(msg));


bot.onText(/\/start/, (msg) => {

	bot.sendMessage(msg.chat.id, "Benvenuto in questo inutile bot.\n/dati per vedere i dati", {
		"reply_markup":{
			"keyboard":[["Consumo Dati"],["User", "Password"]]
		}
	});
});

bot.onText(/\/Consumo Dati/, (msg, match) => {
	const chatId = msg.chat.id;

	bot.sendMessage(chatId, "Ecco i dati: ...", {
		"reply_markup": {
			"keyboard":[["Consumo Dati"],["User", "Password"]]
		}
	});
});

bot.onText(/\/dati/, (msg, match) => {
	const chatId = msg.chat.id;

	bot.sendMessage(chatId, "Eccolo... il mio " + chatId, {
		"reply_markup": {
			"keyboard": [["Genitore 1", "Genitore 2"],   ["io sono Giorgia"]]
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
