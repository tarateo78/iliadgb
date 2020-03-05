const Telegram = require('telegram-node-bot');

class Testa extends Telegram.TelegramBaseController
{

	testa(data, $) {
		console.log("OK\n");
		if (typeof data !== 'string' || data instanceof String) {
			$.sendMessage('Nessuna stringa test impostata. Mandamela...', { parse_mode: 'Markdown' });
			$.waitForRequest
				.then( $ => {
					$.setUserSession('myTest', $.message.text).then(() => {
						// return $.getTestSession('myTest')
						$.sendMessage(`✅ Test impostato: *${$.message.text}*`, { parse_mode: 'Markdown' });
					})
				});
		} else {
			$.sendMessage("👦🏼 Test attuale: *" + data + "*", { parse_mode: 'Markdown' });
		}
	}

}

module.exports = Testa;