import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { OpenAiService } from '../services/openai.service';
import { GenerateTextDto } from '../dto/generate-text.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('generation')
@UseGuards(JwtAuthGuard)
export class GenerationController {
  constructor(
    private readonly openAiService: OpenAiService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('generate-text')
  generateText(@Body() generateTextDto: GenerateTextDto) {
    return this.openAiService.generateText(generateTextDto);
  }

  @Get('post-format-prompts')
  async getPostFormatPrompts() {
    return this.prisma.postFormatPrompt.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
