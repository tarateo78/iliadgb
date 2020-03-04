'use strict';

const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
    handle($) {
        $.sendMessage('Non capisco... 🤔', { parse_mode: 'Markdown'});
    }
}

module.exports = OtherwiseController;