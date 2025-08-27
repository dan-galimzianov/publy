import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { validate, parse } from '@telegram-apps/init-data-node';
import { TelegramUser } from '../interfaces/telegram-user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PROMPTS } from '../constants/default-prompts';

@Injectable()
export class TelegramAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateInitData(initData: string) {
    const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN')!;
    try {
      validate(initData, botToken);

      const parsedData = parse(initData);

      if (!parsedData.user) {
        throw new UnauthorizedException('Пользовательские данные не найдены');
      }

      const telegramUser: TelegramUser = {
        id: parsedData.user.id,
        first_name: parsedData.user.first_name,
        last_name: parsedData.user.last_name,
        username: parsedData.user.username,
        language_code: parsedData.user.language_code,
        is_premium: parsedData.user.is_premium,
        photo_url: parsedData.user.photo_url,
      };

      const user = await this.prisma.user.upsert({
        where: {
          tgUserId: telegramUser.id,
        },
        update: {
          username: telegramUser.username,
          name: telegramUser.first_name,
        },
        create: {
          tgUserId: telegramUser.id,
          username: telegramUser.username ?? '',
          name: telegramUser.first_name,
          Prompt: {
            createMany: {
              data: DEFAULT_PROMPTS,
            },
          },
        },
      });

      const accessToken = this.jwtService.sign({
        userId: user.id,
        sub: user.id,
        username: user.username,
        first_name: user.name,
      });

      return {
        accessToken,
        user: telegramUser,
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Невалидные данные Telegram Mini App');
    }
  }
}
