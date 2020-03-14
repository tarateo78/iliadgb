const mongoose = require('mongoose')

const credenzialiSchema = mongoose.Schema({
	chatid: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: false
	},
	pass: {
		type: String,
		required: false
	},
	random: {
		type: String,
		required: false
	}
})

module.exports = mongoose.model('credenziali', credenzialiSchema)