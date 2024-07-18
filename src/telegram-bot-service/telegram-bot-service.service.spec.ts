import { Test, TestingModule } from '@nestjs/testing';
import { TelegramBotServiceService } from './telegram-bot-service.service';
import { botMessageReponses } from './messageResponses.data';

describe('TelegramBotServiceService', () => {
  let service: TelegramBotServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelegramBotServiceService],
    }).compile();

    service = module.get<TelegramBotServiceService>(TelegramBotServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call startTelegramBotService on module initialization', () => {
    const startTelegramBotServiceSpy = jest.spyOn(service, 'startTelegramBotService');
    service.onModuleInit();
    expect(startTelegramBotServiceSpy).toHaveBeenCalled();
  });

  describe('startTelegramBotService', () => {
    beforeEach(() => {
      jest.resetModules(); // to reset the require cache
      process.env.NTBA_FIX_319 = '1';
    });

    it('should respond with a random bot message when "Hi" is received', () => {
      const mockSendMessage = jest.fn();
      const mockTelegramBot = jest.fn().mockImplementation(() => {
        return {
          on: jest.fn((event, callback) => {
            if (event === 'message') {
              callback({ text: 'Hi', from: { id: 12345 } });
            }
          }),
          sendMessage: mockSendMessage,
        };
      });

      jest.mock('node-telegram-bot-api', () => mockTelegramBot);

      service.startTelegramBotService();

      const index = Math.floor(Math.random() * 2);
      expect(mockSendMessage).toHaveBeenCalledWith(12345, botMessageReponses[index]);
    });
  });
});
