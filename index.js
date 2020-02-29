const TelegramBot = require("node-telegram-bot-api");
const http = require('http');

const token = '1028002748:AAG_sgdIF9GhwJ6m0BuyxnuKMCxG7FRFzkc';


const bot = new TelegramBot( token, { polling : true } );

bot.on("polling_error", (msg) => console.log(msg));

bot.onText( /\/dati/, (msg, match) => {
	const chatId = msg.chat.id;
	
	bot.sendMessage( chatId, "Eccolo" );
	
	// const city = match[1] ? match[1] : "";
	// //http.get( 'api.openweathermap.org/data/2.5/weather?q=firenze&units=metric&lang=it&APPID=be3f936c7f2a6749b03fd01730f4262c, res => {
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