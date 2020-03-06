const Telegram = require('telegram-node-bot');
const Utente = require('../lib/utente');

class Menu extends Telegram.TelegramBaseController
{

	showTest($) {

		$.runInlineMenu({
			layout: [1], //some layouting here
			method: 'sendMessage', //here you must pass the method name
			params: ["👦🏼 👦🏼 👦🏼", { parse_mode: 'Markdown' }], //here you must pass the parameters for that method
			menu: [
				{
					text: 'Cambia User', //text of the button
					callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method
						console.log("X");
						let utente = new Utente();
						utente.cambiaUtente($);
					}
				}
			]
		});

	}


	showStart($, callback) {

		$.runMenu({
			message: 'Select:',
			layout: [1,2],
			'📶 Consumo': () => {}, //will be on second line
			'👦🏼 User': () => {}, //will be on first line
			'🔐 Pass': () => {}, //will be on first line
		})

		// $.runInlineMenu({
		// 	layout: [2,1], //some layouting here
		// 	method: 'sendMessage', //here you must pass the method name
		// 	params: ["Benvenuto su *iliadGb*", { parse_mode: 'Markdown' }], //here you must pass the parameters for that method
		// 	menu: [
		// 		{
		// 			text: 'Imposta User', //text of the button
		// 			callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method
		// 				console.log("imp u");

		// 			}
		// 		},
		// 		{
		// 			text: 'Imposta Pass', //text of the button
		// 			callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method
		// 				console.log("imp pass");
		// 				callback("ecco");
		// 			}
		// 		},
		// 		{
		// 			text: 'Vedi Consumo Dati', //text of the button
		// 			callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method
		// 				console.log("Consumo");
		// 				return $.message.text == 'some text'
		// 			}
		// 		}
		// 	]
		// });

	}


}

module.exports = Menu;