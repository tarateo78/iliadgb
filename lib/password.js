const Telegram = require('telegram-node-bot');

class Password extends Telegram.TelegramBaseController
{

	impostaPassword($) {

		$.sendMessage('Inserisci la Pass che usi per\naccedere al portale *iliad*...', { parse_mode: 'Markdown' });
		$.waitForRequest
			.then( $ => {
				this.setPassword($.message.text, $);
			});

	} 
	
	getPassword(data, $){

		$.runInlineMenu({
			layout: [1], //some layouting here
			method: 'sendMessage', //here you must pass the method name
			params: ["🔐 Pass attuale: *" + data + "*", { parse_mode: 'Markdown' }], //here you must pass the parameters for that method
			menu: [
				{
					text: 'Cambia Pass', //text of the button
					callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method
						console.log("X");
						let credenziali = new Password();
						credenziali.cambiaPassword($);
					}
				}
			]
		})
	
	}


	setPassword(password, $) {
		$.setUserSession('myPass', password).then(() => {
			$.sendMessage(`✅ Pass impostata: *${password}*`, { parse_mode: 'Markdown' });
		})
	}

	cambiaPassword($) {
		$.sendMessage('Inserisci una nuova Pass...', { parse_mode: 'Markdown' });
		$.waitForRequest
			.then( $ => {
				$.setUserSession('myPass', $.message.text).then(() => {
					this.setPassword($.message.text, $);
					// return $.getPassSession('myPass')
					//$.sendMessage(`✅ Pass impostato: *${$.message.text}*`, { parse_mode: 'Markdown' });
				})


			});

	}


}

module.exports = Password;