import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf, Context } from 'telegraf';

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly logger = new Logger(TelegramService.name);
  private bot: Telegraf;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    const miniAppUrl = this.configService.get<string>('MINI_APP_URL');

    if (!botToken) {
      this.logger.warn('TELEGRAM_BOT_TOKEN не найден в переменных окружения');
      return;
    }

    if (!miniAppUrl) {
      this.logger.warn('MINI_APP_URL не найден в переменных окружения');
      return;
    }

    this.bot = new Telegraf(botToken);

    // Обработчик для любых команд и сообщений
    this.bot.on('message', (ctx: Context) => {
      this.sendMiniApp(ctx, miniAppUrl);
    });

    // Запускаем бота
    await this.bot.launch();
    this.logger.log('Telegram бот запущен');

    // Graceful stop
    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }

  private sendMiniApp(ctx: Context, miniAppUrl: string) {
    try {
      const keyboard = {
        inline_keyboard: [
          [
            {
              text: '🚀 Открыть приложение',
              web_app: {
                url: miniAppUrl,
              },
            },
          ],
        ],
      };

      ctx.reply(
        '👋 Добро пожаловать! Нажмите кнопку ниже, чтобы открыть наше приложение:',
        {
          reply_markup: keyboard,
        },
      );
    } catch (error) {
      this.logger.error('Ошибка при отправке mini app:', error);
      ctx.reply('Произошла ошибка. Попробуйте позже.');
    }
  }

  getBotInstance(): Telegraf | undefined {
    return this.bot;
  }
}
