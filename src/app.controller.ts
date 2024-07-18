import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegramBotServiceService } from './telegram-bot-service/telegram-bot-service.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private telegramBotService: TelegramBotServiceService) {}

  @Get()
  getTelegramBot(@Res() res){
    this.telegramBotService.startTelegramBotService();
    res.status(HttpStatus.OK).send("Telegram Bot Service Started.")
  }
}
