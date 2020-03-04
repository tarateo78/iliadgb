'use strict';

const Telegram = require('telegram-node-bot');
// let cheerio = require('cheerio');
// let request = require( 'request' );

const getIliad = require('../connect');
const connection = require('../connection');

class TodoController extends Telegram.TelegramBaseController {
	testHandler($) {

		// let url = 'https://www.google.it';
		// let areariservata = {
		// 	uri: url,
		// 	method: "POST",
		// 	followAllRedirects: true,
		// 	jar: true,
		// 	form: {
		// 		"login-ident": 'usr',
		// 		"login-pwd": 'pwd'
		// 	}
		// };

		// //connection.getIliad(usr,pwd, (html) => {
		// connection.getIliad(areariservata, (html) => {
		// 	html = JSON.parse(html);
		// });


	}



	/* START */
	startHandler($) {
		$.sendMessage("Benvenuto su *iliadGb*\n\nI comandi disponibili sono:\n/user - 👦🏼 Imposta e visualizza\n/pass - 🔐 Imposta e visualizza\n/consumo - 📶 Visualizza il consumo dati", {parse_mode: `Markdown`});
	}


	/* USER */
	userHandler($) {

		let user = $.message.text.split(' ').slice(1)[0];
		if (!user) {

			$.getUserSession('myUser').then(data => {
				if (typeof data !== 'string' || data instanceof String) {
					$.sendMessage('⚠️ Nessun *User* impostato ⚠️\n\nMandami lo User che usi per accedere al portale iliad', { parse_mode: 'Markdown' });
					$.waitForRequest
						.then( $ => {
							$.setUserSession('myUser', $.message.text).then(() => {
								// return $.getUserSession('myUser')
								$.sendMessage(`✅ User impostato: *${$.message.text}*`, { parse_mode: 'Markdown' });
							})
						});
				} else {
					$.sendMessage("👦🏼 User attuale: *" + data + "*", { parse_mode: 'Markdown' });
				}
			})

		} else {

			$.setUserSession('myUser', user).then(() => {
				$.sendMessage(`✅ User impostato: *${user}*`, { parse_mode: 'Markdown' });
			})
			
		}



	}

	/* PASS */
	passHandler($) {

		let pass = $.message.text.split(' ').slice(1)[0];
		if (!pass) {

			$.getUserSession('myPass').then(data => {
				if (typeof data !== 'string' || data instanceof String) {
					$.sendMessage('⚠️ Nessuna *Pass* impostata ⚠️\n\nMandami la Pass che usi per accedere al portale iliad', { parse_mode: 'Markdown' });
					$.waitForRequest
						.then( $ => {
							$.setUserSession('myPass', $.message.text).then(() => {
								// return $.getUserSession('myPass')
								$.sendMessage(`✅ Pass impostata: *${$.message.text}*`, { parse_mode: 'Markdown' });
							})
						});
				} else {
					$.sendMessage("🔐 Pass attuale: *" + data + "*", { parse_mode: 'Markdown' });
				}
			})

		} else {

			$.setUserSession('myPass', pass).then(() => {
				$.sendMessage(`✅ Pass impostata: *${pass}*`, { parse_mode: 'Markdown' });
			})
			
		}
	}

	/* CAMBIAUSER */
	cambiauserHandler($) {
		$.sendMessage('Inserisci un nuovo User...', { parse_mode: 'Markdown' });
		$.waitForRequest
			.then( $ => {
				$.setUserSession('myUser', $.message.text).then(() => {
					// return $.getUserSession('myUser')
					$.sendMessage(`✅ User impostato: *${$.message.text}*`, { parse_mode: 'Markdown' });
				})
			});
	}

	/* CAMBIAPASS */
	cambiapassHandler($) {
		$.sendMessage('Inserisci una nuova Pass...', { parse_mode: 'Markdown' });
		$.waitForRequest
			.then( $ => {
				$.setUserSession('myPass', $.message.text).then(() => {
					$.sendMessage(`✅ Pass impostata: *${$.message.text}*`, { parse_mode: 'Markdown' });
				})
			});
	}


	/* CONSUMO */
	consumoHandler($) {

		$.getUserSession('myPass').then(pwd => {
			$.getUserSession('myUser').then(usr => {
				if (typeof usr === 'string') {
					if (typeof pwd === 'string') {

						let url = 'https://www.iliad.it/account/?' + Date.now();
						let areariservata = {
							uri: url,
							method: "POST",
							followAllRedirects: true,
							jar: true,
							form: {
								"login-ident": usr,
								"login-pwd": pwd
							}
						};

						//connection.getIliad(usr,pwd, (html) => {
						connection.getIliad(areariservata, (html) => {
							html = JSON.parse(html);

							//🔲◽️ 🔳▪️
							
							let rapportoConsumo = Math.round( parseFloat(html.consumo) * 10 / 50 );
							let graficoConsumo = "🔳".repeat(rapportoConsumo) + "▪️".repeat(10-rapportoConsumo);

							let rapportoGironi = Math.round( html.giorniPassati * 10 / html.giorniOfferta );
							let graficoGiorni = "🔳".repeat(rapportoGironi) + "▪️".repeat(10-rapportoGironi);
let rapporto = 
`Dati: *${html.consumo}* / 50 Gb
${graficoConsumo}

Utilizzo: *${html.giorniPassati}* / ${html.giorniOfferta} giorni
${graficoGiorni}

💶 Credito residuo: *${html.credito} €*
📆 Prossimo rinnovo: ${html.endOfferta}`;

							$.sendMessage(rapporto, { parse_mode: 'Markdown' });
						});

					} else {
						$.sendMessage("⚠️ Nessuna Pass impostata\nImpostare la Pass /pass");
						return;
					}

				} else {
					$.sendMessage("⚠️ Nessun User impostato\nImpostare lo User /user");
					return;
				}
			});
		});
	}

	checkHandler($) {
		let index = parseInt($.message.text.split(' ').slice(1)[0]);
		if (isNaN(index)) return $.sendMessage('Sorry, you didn\'t pass a valid index.');

		$.getUserSession('todos')
			.then(todos => {
				if (index >= todos.length) return $.sendMessage('Sorry, you didn\'t pass a valid index.');
				todos.splice(index, 1);
				$.setUserSession('todos', todos);
				$.sendMessage('Checked todo!');
			});
	}

	get routes() {

		return {
			'testCommand': 'testHandler',
			'startCommand': 'startHandler',
			'userCommand': 'userHandler',
			'passCommand': 'passHandler',
			'cambiauserCommand': 'cambiauserHandler',
			'cambiapassCommand': 'cambiapassHandler',
			'consumoCommand': 'consumoHandler',
		};
	}

	_serializeList(todoList) {
		let serialized = '*Your Todos:*\n\n';
		todoList.forEach((t, i) => {
			serialized += `*${i}* - ${t}\n`;
		});
		return serialized;
	}
}

module.exports = TodoController;