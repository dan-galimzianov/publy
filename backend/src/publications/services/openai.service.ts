import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GenerateTextDto } from '../dto/generate-text.dto';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private readonly openaiClient: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY')!;
    this.openaiClient = new OpenAI({ apiKey });
  }

  async generateText(generateTextDto: GenerateTextDto) {
    const finalPrompt = `${generateTextDto.finalPrompt}

Ответ должен быть в формате JSON.
{text: string}
`;

    try {
      const response = await this.openaiClient.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'Отвечай всегда только JSON, без пояснений и без обёртки ```json```.',
          },
          { role: 'user', content: finalPrompt },
        ],
      });

      const generatedText = JSON.parse(
        response.choices[0]?.message?.content || '{}',
      ) as { text?: string };

      if (!generatedText.text) {
        throw new BadRequestException('Не удалось сгенерировать текст');
      }

      return {
        generatedText: generatedText.text,
      };
    } catch {
      throw new BadRequestException('Ошибка при генерации текста');
    }
  }
}
