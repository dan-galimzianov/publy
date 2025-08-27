import { Module } from '@nestjs/common';
import { AiGenerationController } from './controllers/ai-generation.controller';
import { AiGenerationService } from './services/ai-generation.service';

@Module({
  controllers: [AiGenerationController],
  providers: [AiGenerationService],
})
export class AiGenerationModule {}
