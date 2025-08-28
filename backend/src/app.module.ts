import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PublicationsModule } from './publications/publications.module';
import { AiGenerationModule } from './ai-generation/ai-generation.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    PublicationsModule,
    AiGenerationModule,
    TelegramModule,
  ],
})
export class AppModule {}
