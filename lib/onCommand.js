const {
	Markup
} = require('telegraf');
const testo = require('./testo.js')
const Sicurezza = require('./Sicurezza')
const Credenziali = require('../models/Credenziali')
const connection = require('./connection')

const onCommand = (app, state) => {


	app.command('user', async ctx => {
		const userId = ctx.message.from.id;
		if (!state[userId])
			state[userId] = {};

		await Credenziali.findOne({
			chatid: userId
		}, (err, res) => {

			if (res.user) state[userId].username = res.user


			if (!state[userId].username) {
				state[userId].command = 'insertUser'
				ctx.replyWithMarkdown(`⚠️ Nessun User impostato\n\nInserisci User...`)
			} else {
				return ctx.reply(`👤 User impostato: <code>${state[userId].username}</code>`, {
					reply_markup: Markup.inlineKeyboard([
						Markup.callbackButton('Cambia User', 'userChange'),
					]),
					parse_mode: "Html"
				});
			}
		})
	});


	app.command('pass', async ctx => {
		const userId = ctx.message.from.id;
		if (!state[userId])
			state[userId] = {};

		await Credenziali.findOne({
			chatid: userId
		}, (err, res) => {
			if (err) console.log(err);
			let sicurezza = new Sicurezza();

			if (res.pass) state[userId].password = sicurezza.decifra(res.pass)

			if (!state[userId].password) {
				state[userId].command = 'insertPass'
				ctx.replyWithMarkdown(`⚠️ Nessuna Pass impostata\n\nInserisci Pass...`)
			} else {
				return ctx.reply(`🔑 Pass impostata: <code>${state[userId].password}</code>`,
					Markup.inlineKeyboard([
						Markup.callbackButton('Cambia Pass', 'passChange'),
					]).extra({
						parse_mode: "Html"
					})
				);
			}
		})
	});


	app.command('consumo', async ctx => {
		const userId = ctx.message.from.id;
		if (!state[userId]) {
			state[userId] = {};
			// state[userId].username = null
			// state[userId].password = null
			await Credenziali.findOne({chatid:userId}, (err, res) => {
				if (res) {
					let sicurezza = new Sicurezza()
					state[userId].username = res.user
					state[userId].password = sicurezza.decifra(res.pass)
				}
			})
		}

		if (!state[userId].username) {
			ctx.replyWithMarkdown(`Devi prima inserire uno Username 👉🏼 /user`)
			return
		}
		if (!state[userId].password) {
			ctx.replyWithMarkdown(`Devi prima inserire una Password 👉🏼 /pass`)
			return
		}

		connection.getIliad(state[userId].username, state[userId].password, (html) => {
			if (html == "NOLOG") {
				ctx.replyWithMarkdown(`🚫 Non è possibile effettuare il login\nVerifica User e Password`)
				return
			}

			//html = JSON.parse(html);🔳▪️
			
			// IT
			let rapportoConsumoIt = Math.round( html.consumoIt * 10 / html.totaleIt );
			let graficoConsumoIt = "🔘".repeat(rapportoConsumoIt) + "⚫️".repeat(10-rapportoConsumoIt);
			
			// EU
			let rapportoConsumoEu = Math.round( html.consumoEu/1024 * 4 / html.totaleEu );
			let graficoConsumoEu = "🔘".repeat(rapportoConsumoEu) + "⚫️".repeat(4-rapportoConsumoEu);

			let rapportoGironi = Math.round( html.giorniPassati * 10 / html.giorniOfferta );
			let graficoGiorni = "🔘".repeat(rapportoGironi) + "⚫️".repeat(10-rapportoGironi);
let rapporto = 
`<code>Dati:</code> <b>${html.consumoIt}</b> / ${html.totaleIt} Gb
${graficoConsumoIt}

<code>Utilizzo:</code> <b>${html.giorniPassati}</b> / ${html.giorniOfferta} giorni
${graficoGiorni}

💶 Credito residuo: <b>${html.credito} €</b>
📆 Prossimo rinnovo: ${html.endOfferta}

<code>Roaming:</code> <b>${html.consumoEu}</b> / ${html.totaleEu} Gb
${graficoConsumoEu}`;

			ctx.replyWithMarkdown(rapporto, {parse_mode: "Html"});

		})

	})


	app.command('reset', ctx => {
		ctx.replyWithMarkdown(`Conferma per resettare User e Password`, {
			reply_markup: Markup.inlineKeyboard([
				Markup.callbackButton('Resettare', 'resetAll'),
			]),
			parse_mode: "Html"
		})
	});


	app.command('start', ctx => {
		ctx.replyWithMarkdown(testo.startText, {
			parse_mode: "Html"
		})
		const userId = ctx.message.from.id;

		// Inserisce lo userId nel DB se non esiste
		Credenziali.findOneAndUpdate({
				chatid: userId
			}, {
				random: "x"
			}, {
				upsert: true,
				new: true,
				setDefaultsOnInsert: true,
				useFindAndModify: false
			},
			(err, res) => {
				if (err) console.log(err);
			}
		)

	})


	// app.command('id', ctx => {
	// 	ctx.replyWithMarkdown(`La tua chat id è: ${ctx.message.chat.id}`)
	// })


	app.command('credits', ctx => {
		ctx.replyWithMarkdown(testo.creditsText)
	})


	app.command('help', ctx => {
		ctx.replyWithMarkdown(testo.helpText, {
			parse_mode: 'Html'
		})
	})


}

module.exports = {
	onCommand
}