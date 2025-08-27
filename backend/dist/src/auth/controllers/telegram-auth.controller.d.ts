import type { FastifyReply } from 'fastify';
import { TelegramAuthService } from '../services/telegram-auth.service';
import { TelegramAuthDto } from '../dto/telegram-auth.dto';
import type { AuthResponse } from '../interfaces/telegram-user.interface';
export declare class TelegramAuthController {
    private readonly telegramAuthService;
    constructor(telegramAuthService: TelegramAuthService);
    authenticate(telegramAuthDto: TelegramAuthDto, response: FastifyReply): Promise<AuthResponse>;
    logout(response: FastifyReply): {
        message: string;
    };
}
