const Telegraf = require('telegraf');
const mongoose = require('mongoose')
const {
	Markup
} = require('telegraf');
const axios = require('axios'); // add axios

const dotenv = require('dotenv')
dotenv.config()

const app = new Telegraf(process.env.BOT_TOKEN) // Hellobot

const {
	onCallback
} = require('./lib/onCallback')
const {
	onCommand
} = require('./lib/onCommand')
const {
	onMessage
} = require('./lib/onMessage')

let state = {};

app.hears('hi', ctx => {
	return ctx.reply('Hey!');
});

// Connect to db
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to db'))

onCommand(app, state)

onMessage(app, state)

onCallback(app, state)

app.startPolling();