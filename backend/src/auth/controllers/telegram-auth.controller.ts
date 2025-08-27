import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import { TelegramAuthService } from '../services/telegram-auth.service';
import { TelegramAuthDto } from '../dto/telegram-auth.dto';
import type { AuthResponse } from '../interfaces/telegram-user.interface';

@Controller('telegram')
export class TelegramAuthController {
  constructor(private readonly telegramAuthService: TelegramAuthService) {}

  @Post('auth')
  @HttpCode(HttpStatus.OK)
  async authenticate(
    @Body() telegramAuthDto: TelegramAuthDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ): Promise<AuthResponse> {
    const { accessToken, user } =
      await this.telegramAuthService.validateInitData(telegramAuthDto.initData);

    response.setCookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 день в миллисекундах
      path: '/',
    });
    return { user };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: FastifyReply): {
    message: string;
  } {
    // Удаляем cookie с токеном
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return { message: 'Выход выполнен успешно' };
  }
}
