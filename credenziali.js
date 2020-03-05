const Telegram = require('telegram-node-bot');

class Credenziali extends Telegram.TelegramBaseController
{

	utente(data, $) {

		if (typeof data !== 'string' || data instanceof String) {

			$.sendMessage('⚠️ Nessuno *User* impostato ⚠️\n\nInserisci lo User che usi per\naccedere al portale *iliad*...', { parse_mode: 'Markdown' });
			$.waitForRequest
				.then( $ => {
					$.setUserSession('myUser', $.message.text).then(() => {
						$.sendMessage(`✅ User impostato: *${$.message.text}*`, { parse_mode: 'Markdown' });
					})
				});

		} else {

			$.sendMessage("👦🏼 User attuale: *" + data + "*", { parse_mode: 'Markdown' });

		}

	}

}

module.exports = Credenziali;