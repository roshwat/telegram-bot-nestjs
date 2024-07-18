import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { botMessageReponses } from './messageResponses.data';

@Injectable()
export class TelegramBotServiceService implements OnModuleInit {
    private readonly logger = new Logger(TelegramBotServiceService.name);

    onModuleInit() {
        this.startTelegramBotService();
    }

    startTelegramBotService() {
        process.env.NTBA_FIX_319 = "1";
        const TelegramBot = require('node-telegram-bot-api');

        const token = '7478730442:AAE_EuTwu7eh5WGhITjEcpW7UgWypk5zoe0';

        const bot = new TelegramBot(token, { polling: true });

        bot.on('message', (msg) => {
            this.logger.log(`Incoming message: ${msg.text}`);
            let Hi = "hi";
            const index = Math.floor(Math.random() * 3);
            if (msg.text.toString().toLowerCase() === Hi.toLowerCase()) {
                const response = botMessageReponses[index];
                this.logger.log(`Bot response: ${response}`);
                bot.sendMessage(msg.from.id, response);
            } else {
                const errorMessage = 'Sorry, I did not understand that command.';
                this.logger.error(`Unrecognized command: ${msg.text}`);
                bot.sendMessage(msg.from.id, errorMessage);
            }
        });

        bot.on('polling_error', (error) => {
            this.logger.error(`Polling error: ${error.message}`);
        });

        bot.on('webhook_error', (error) => {
            this.logger.error(`Webhook error: ${error.message}`);
        });
    }
}
