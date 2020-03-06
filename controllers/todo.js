'use strict';

const Telegram = require('telegram-node-bot');
const connection = require('../lib/connection');
const Utente = require('../lib/utente');
const Password = require('../lib/password');
const Menu = require('../lib/menu');
let request = require('request' );

class TodoController extends Telegram.TelegramBaseController {
	
	testHandler($) {
		let options = {
			uri:'https://www.iliad.it/account/?logout=user',
			jar:false,
			headers: {
				'set-cookie':['ACCOUNT_SESSID=0; path=/account/; HttpOnly',
				'auth_mobile=1; expires='+ Date.now()+'; Max-Age=3600; path=/account/']
			}
		}
		request.get(options, (e,r,u) => {
			console.log(r.headers );
		});

		let areariservata2 = {
			uri: 'https://www.iliad.it/account/',
			method: "POST",
			followAllRedirects: true,
			jar: true,
			form: {
				"login-ident": 's79587721',
				"login-pwd": 'sBocTB-iH=S'
			}
		};

		request.post(areariservata2, (error, response, body) => {
			console.log(response.headers );
			let html = body.substring(5600,5700);
			console.log(html);
			
		})


	}
	

	/* START */
	startHandler($) {
		//$.sendMessage("Benvenuto su *iliadGb*\n\nI comandi disponibili sono:\n/user - 👦🏼 Imposta e visualizza\n/pass - 🔐 Imposta e visualizza\n/consumo - 📶 Visualizza il consumo dati", {parse_mode: `Markdown`});
		let menu = new Menu();
		menu.showStart($, (data) => {
			console.log(data);
			
		});
		

	}


	/* USER */
	userHandler($) {
		
		let utente = new Utente();

		let user = false;
		if ($.message.text.substring(0,1) == "/") {
			let user = $.message.text.split(' ').slice(1)[0];
		}
		if (!user) {

			$.getUserSession('myUser').then(data => {
				if (typeof data !== 'string' || data instanceof String) {

					utente.impostaUtente($);

				} else {

					utente.getUtente(data, $);

				}
			})

		} else {

			$.setUserSession('myUser', user).then(() => {

				utente.setUtente(user, $);

			})
			
		}

	}


	/* PASS */
	passHandler($) {

		let password = new Password();

		let pass = false;
		if ($.message.text.substring(0,1) == "/") {
			let pass = $.message.text.split(' ').slice(1)[0];
		}

		if (!pass) {

			$.getUserSession('myPass').then(data => {
				if (typeof data !== 'string' || data instanceof String) {

					password.impostaPassword($);

				} else {

					password.getPassword(data, $);

				}
			})

		} else {

			$.setUserSession('myPass', pass).then(() => {

				password.setPassword(pass, $);

			})
			
		}
	}

	/* CAMBIAUSER */
	cambiauserHandler($) {

		let utente = new Utente();
		utente.cambiaUtente($);

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

						connection.getIliad(usr,pwd, (html) => {

							if (html == "NOLOG") {
								$.sendMessage("🚫 Non è possibile effettuare il login\nVerifica User e Password", {parse_mode: 'Markdown'});
								return;
							}
							
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
						$.sendMessage("⚠️ Nessuna Pass impostata");
						return;
					}

				} else {
					$.sendMessage("⚠️ Nessun User impostato");
					return;
				}
			});
		});
	}

	

	get routes() {

		return {
			'testCommand': 'testHandler',
			'cessCommand': 'cessHandler',
			'startCommand': 'startHandler',
			'userCommand': 'userHandler',
			'xuserCommand': 'xuserHandler',
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