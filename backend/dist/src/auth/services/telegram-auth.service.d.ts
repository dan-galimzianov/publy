import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TelegramUser } from '../interfaces/telegram-user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class TelegramAuthService {
    private readonly configService;
    private readonly jwtService;
    private readonly prisma;
    constructor(configService: ConfigService, jwtService: JwtService, prisma: PrismaService);
    validateInitData(initData: string): Promise<{
        accessToken: string;
        user: TelegramUser;
    }>;
}
