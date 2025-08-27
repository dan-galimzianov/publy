import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PromptsController } from './controllers/prompts.controller';
import { GenerationController } from './controllers/generation.controller';
import { PostsService } from './services/posts.service';
import { PromptsService } from './services/prompts.service';
import { OpenAiService } from './services/openai.service';

@Module({
  controllers: [PostsController, PromptsController, GenerationController],
  providers: [PostsService, PromptsService, OpenAiService],
})
export class PublicationsModule {}
