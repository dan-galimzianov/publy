import { Controller, Post, Body, Logger } from '@nestjs/common';
import { TelegramService } from '../services/telegram.service';

@Controller('telegram')
export class TelegramController {
  private readonly logger = new Logger(TelegramController.name);

  constructor(private readonly telegramService: TelegramService) {}

  @Post('webhook')
  async handleWebhook(@Body() update: any) {
    try {
      const bot = this.telegramService.getBotInstance();
      if (bot) {
        await bot.handleUpdate(update);
      }
      return { success: true };
    } catch (error) {
      this.logger.error('Ошибка при обработке webhook:', error);
      return { success: false, error: error.message };
    }
  }
}
