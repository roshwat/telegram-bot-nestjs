import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramBotServiceService } from './telegram-bot-service/telegram-bot-service.service';
import { LoggingMiddlewareMiddleware } from './logging-middleware/logging-middleware.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TelegramBotServiceService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddlewareMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
