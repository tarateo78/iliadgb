'use strict'
 
const Telegram = require('telegram-node-bot')
const dotenv = require('dotenv');
dotenv.config();

const TelegramBaseController = Telegram.TelegramBaseController
const BaseScopeExtension = Telegram.BaseScopeExtension
const tg = new Telegram.Telegram(process.env.token);
 
class SumScopeExtension extends BaseScopeExtension {
    process(num1, num2) {
        return num1 + num2
    }
 
    get name() {
        return 'sum'
    }
}
 
class SumController extends TelegramBaseController {
    /**
     * @param {Scope} $ 
     */
    sumHandler($) {
        $.sendMessage($.sum($.query.num1, $.query.num2))
    }
 
    get routes() {
        return {
            '/sum :num1 :num2': 'sumHandler'
        }
    }
}
 
tg.router
    .when(['/sum :num1 :num2'], new SumController())
 
tg.addScopeExtension(SumScopeExtension)