
const Telegram = require('telegram-node-bot');
const dotenv = require('dotenv');
dotenv.config();


const tg = new Telegram.Telegram(process.env.token, {
	workers: 1
});( () => {
	console.log("OK");
});

const TodoController = require('./controllers/todo')
	, OtherwiseController = require('./controllers/otherwise');

const todoCtrl = new TodoController();


tg.router.when(new Telegram.TextCommand('/test', 'testCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/cess', 'cessCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/start', 'startCommand'), todoCtrl)
	.when(new Telegram.TextCommand('👦🏼 User', 'userCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/user', 'userCommand'), todoCtrl)
	.when(new Telegram.TextCommand('🔐 Pass', 'passCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/pass', 'passCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/cambiauser', 'cambiauserCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/cambiapass', 'cambiapassCommand'), todoCtrl)
	.when(new Telegram.TextCommand('📶 Consumo', 'consumoCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/consumo', 'consumoCommand'), todoCtrl)
	.when(new Telegram.TextCommand('❔ Info', 'infoCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/info', 'infoCommand'), todoCtrl)
	.when(new Telegram.TextCommand('/credits', 'creditsCommand'), todoCtrl)
	.otherwise(new OtherwiseController());

function exitHandler(exitCode) {
	storage.flush();
	process.exit(exitCode);
}
