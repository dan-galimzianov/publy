import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { AI_GENERATION_PROMPTS, HARDCODED_OPTIONS } from '../constants/prompts';
import { GenerateSystemRolesDto } from '../dto/generate-system-roles.dto';
import { GenerateTargetAudiencesDto } from '../dto/generate-target-audiences.dto';
import { GeneratePostStructuresDto } from '../dto/generate-post-structures.dto';
import { GenerateFinalPostDto } from '../dto/generate-final-post.dto';
import { withRetry } from 'src/utils/with-retry';

@Injectable()
export class AiGenerationService {
  private readonly openaiAIClient: OpenAI;
  private readonly deepseekAIClient: OpenAI;
  private readonly anthropicAIClient: OpenAI;
  private readonly googleAIClient: OpenAI;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY')!;
    const deepseekApiKey = this.configService.get<string>('DEEPSEEK_API_KEY')!;
    const anthropicApiKey =
      this.configService.get<string>('ANTHROPIC_API_KEY')!;
    const googleApiKey = this.configService.get<string>('GEMINI_API_KEY')!;

    this.openaiAIClient = new OpenAI({ apiKey });
    this.deepseekAIClient = new OpenAI({
      apiKey: deepseekApiKey,
      baseURL: 'https://api.deepseek.com',
    });
    this.anthropicAIClient = new OpenAI({
      apiKey: anthropicApiKey,
      baseURL: 'https://api.anthropic.com/v1/',
    });
    this.googleAIClient = new OpenAI({
      apiKey: googleApiKey,
      baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
    });
  }

  async generateSystemRoles(dto: GenerateSystemRolesDto) {
    const prompt = AI_GENERATION_PROMPTS.SYSTEM_ROLES.replace(
      '{topic}',
      dto.topic,
    );

    try {
      const response = await this.openaiAIClient.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'Отвечай всегда только JSON, без пояснений и без обёртки ```json```.',
          },
          { role: 'user', content: prompt },
        ],
      });

      const result = JSON.parse(
        response.choices[0]?.message?.content || '{}',
      ) as { roles: { id: string; name: string; description: string }[] };

      if (!result.roles || !Array.isArray(result.roles)) {
        throw new BadRequestException(
          'Не удалось сгенерировать системные роли',
        );
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Ошибка при генерации системных ролей');
    }
  }

  async generateTargetAudiences(dto: GenerateTargetAudiencesDto) {
    const prompt = AI_GENERATION_PROMPTS.TARGET_AUDIENCES.replace(
      '{topic}',
      dto.topic,
    ).replace('{role}', dto.role);

    try {
      const response = await this.openaiAIClient.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'Отвечай всегда только JSON, без пояснений и без обёртки ```json```.',
          },
          { role: 'user', content: prompt },
        ],
      });

      const result = JSON.parse(
        response.choices[0]?.message?.content || '{}',
      ) as {
        audiences: {
          id: string;
          name: string;
          description: string;
          characteristics: string[];
        }[];
      };

      if (!result.audiences || !Array.isArray(result.audiences)) {
        throw new BadRequestException(
          'Не удалось сгенерировать целевые аудитории',
        );
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Ошибка при генерации целевых аудиторий');
    }
  }

  async generatePostStructures(dto: GeneratePostStructuresDto) {
    const prompt = AI_GENERATION_PROMPTS.POST_STRUCTURES.replace(
      '{topic}',
      dto.topic,
    )
      .replace('{role}', dto.role)
      .replace('{audience}', dto.audience);

    try {
      const response = await withRetry(async () =>
        this.openaiAIClient.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content:
                'Отвечай всегда только JSON, без пояснений и без обёртки ```json```.',
            },
            { role: 'user', content: prompt },
          ],
        }),
      );

      const result = JSON.parse(
        response.choices[0]?.message?.content || '{}',
      ) as {
        structures: { id: string; name: string; description: string }[];
      };

      if (!result.structures || !Array.isArray(result.structures)) {
        throw new BadRequestException(
          'Не удалось сгенерировать структуры постов',
        );
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Ошибка при генерации структур постов');
    }
  }

  getPlatforms() {
    return { platforms: HARDCODED_OPTIONS.PLATFORMS };
  }

  getFormats() {
    return { formats: HARDCODED_OPTIONS.FORMATS };
  }

  getTones() {
    return { tones: HARDCODED_OPTIONS.TONES };
  }

  getModels() {
    return { models: HARDCODED_OPTIONS.MODELS };
  }

  private getModelProvider(modelId: string) {
    const provider = HARDCODED_OPTIONS.MODELS.find(
      (model) => model.id === modelId,
    )?.provider;

    if (!provider) {
      throw new BadRequestException('Неверный ID модели');
    }

    return {
      openai: this.openaiAIClient,
      deepseek: this.deepseekAIClient,
      anthropic: this.anthropicAIClient,
      google: this.googleAIClient,
    }[provider];
  }

  async generateFinalPost(dto: GenerateFinalPostDto) {
    const prompt = AI_GENERATION_PROMPTS.FINAL_POST.replace(
      '{topic}',
      dto.topic,
    )
      .replace('{platform}', dto.platform)
      .replace('{format}', dto.format)
      .replace('{role}', dto.role)
      .replace('{audience}', dto.audience)
      .replace('{structure}', dto.structure)
      .replace('{tone}', dto.tone);

    try {
      const client = this.getModelProvider(dto.model);

      if (!client) {
        throw new BadRequestException('Неверный ID модели');
      }

      const response = await withRetry(async () =>
        client.chat.completions.create({
          model: dto.model,
          messages: [
            {
              role: 'system',
              content:
                'Отвечай всегда только JSON, без пояснений и без обёртки ```json```.',
            },
            { role: 'user', content: prompt },
          ],
        }),
      );

      const result = JSON.parse(
        response.choices[0]?.message?.content || '{}',
      ) as {
        post: {
          title: string;
          content: string;
          hashtags: string[];
          call_to_action: string;
        };
      };

      if (!result.post || !result.post.content) {
        throw new BadRequestException(
          'Не удалось сгенерировать финальный пост',
        );
      }

      return result;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Ошибка при генерации финального поста');
    }
  }
}
