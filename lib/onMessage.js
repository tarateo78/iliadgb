const axios = require('axios')
const Credenziali = require('../models/Credenziali')
const Sicurezza = require('./Sicurezza')

const {
	Markup
} = require('telegraf');

const onMessage = (app, state) => {
	app.on('text', ctx => {
		const messaggio = ctx.message.text;
		const userId = ctx.message.from.id;
		if (!state[userId]) return

		switch (state[userId].command) {

			case 'insertUser':

				state[userId].username = messaggio
				ctx.replyWithMarkdown(`✅ Il nuovo User impostato è: <code>${messaggio}</code>`, {
					parse_mode: 'Html'
				})
				Credenziali.findOneAndUpdate({
						chatid: userId
					}, {
						user: messaggio
					}, {
						new: true,
						useFindAndModify: false
					},
					(err, res) => {
						// console.log(res);
					})
				state[userId].command = '';
				break

			case 'insertPass':

				state[userId].password = messaggio
				ctx.replyWithMarkdown(`✅ La nuova Pass impostata è: <code>${messaggio}</code>`, {
					parse_mode: 'Html'
				})

				let sicurezza = new Sicurezza();
				const cifrata = sicurezza.cifra(messaggio)

				Credenziali.findOneAndUpdate({
					chatid: userId
				}, {
					pass: cifrata
				}, {
					new: true,
					useFindAndModify: false
				}, (err, res) => {
					// console.log(res);
				})
				state[userId].command = '';
				break

			default:
				return ctx.replyWithMarkdown(`🤔 Non comprendo!!`)
		}
	});
}

module.exports = {
	onMessage
}