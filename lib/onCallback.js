const axios = require('axios')
const {
	Markup
} = require('telegraf');
const Credenziali = require('../models/Credenziali')

const onCallback = (app, state) => {
	app.on('callback_query', ctx => {
		const chiamata = ctx.update.callback_query.data

		if (chiamata == 'userChange') {
			const userId = ctx.update.callback_query.from.id;

			state[userId].command = 'insertUser';
			return ctx.replyWithMarkdown(`👤 Inserisci un nuovo User...`, {
				reply_markup: {
					force_reply: true
				}
			})

		} else if (chiamata == 'passChange') {
			const userId = ctx.update.callback_query.from.id;

			state[userId].command = 'insertPass';
			return ctx.replyWithMarkdown(`🔑 Inserisci una nuova Pass...`, {
				reply_markup: {
					force_reply: true
				}
			})

		} else if (chiamata == 'resetAll') {
			const userId = ctx.update.callback_query.from.id;

			state[userId] = {}

			Credenziali.findOneAndUpdate({
				chatid: userId
			}, {
				user: null,
				pass: null
			},
			{
				useFindAndModify: false
			},
			(err, res) => {
				ctx.replyWithMarkdown(`Resettato!`)
			})

		}else {
			return ctx.replyWithMarkdown(`🤔 Non comprendo!!`)
		}
	});
}

module.exports = {
	onCallback
}