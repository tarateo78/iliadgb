const Telegram = require('telegram-node-bot');

class Utente extends Telegram.TelegramBaseController
{

	impostaUtente($) {

		$.sendMessage('Inserisci lo User che usi per\naccedere al portale *iliad*...', { parse_mode: 'Markdown' });
		$.waitForRequest
			.then( $ => {
				this.setUtente($.message.text, $);
			});

	} 
	
	getUtente(data, $){

		$.runInlineMenu({
			layout: [1], //some layouting here
			method: 'sendMessage', //here you must pass the method name
			params: ["👦🏼 User attuale: *" + data + "*", { parse_mode: 'Markdown' }], //here you must pass the parameters for that method
			menu: [
				{
					text: 'Cambia User', //text of the button
					callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method
						console.log("X");
						let credenziali = new Utente();
						credenziali.cambiaUtente($);
					}
				}
			]
		})
	
	}


	setUtente(utente, $) {
		$.setUserSession('myUser', utente).then(() => {
			$.sendMessage(`✅ User impostato: *${utente}*`, { parse_mode: 'Markdown' });
		})
	}

	cambiaUtente($) {
		$.sendMessage('Inserisci un nuovo User...', { parse_mode: 'Markdown' });
		$.waitForRequest
			.then( $ => {
				$.setUserSession('myUser', $.message.text).then(() => {
					this.setUtente($.message.text, $);
					// return $.getUserSession('myUser')
					//$.sendMessage(`✅ User impostato: *${$.message.text}*`, { parse_mode: 'Markdown' });
				})


			});

	}


}

module.exports = Utente;