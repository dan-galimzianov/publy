import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegramAuthController } from './controllers/telegram-auth.controller';
import { ProtectedController } from './controllers/protected.controller';
import { TelegramAuthService } from './services/telegram-auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '7d'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TelegramAuthController, ProtectedController],
  providers: [TelegramAuthService, JwtStrategy],
  exports: [TelegramAuthService, JwtStrategy, JwtModule],
})
export class AuthModule {}
