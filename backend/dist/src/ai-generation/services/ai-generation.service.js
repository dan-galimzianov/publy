"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiGenerationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = __importDefault(require("openai"));
const prompts_1 = require("../constants/prompts");
const with_retry_1 = require("../../utils/with-retry");
let AiGenerationService = class AiGenerationService {
    configService;
    openaiAIClient;
    deepseekAIClient;
    anthropicAIClient;
    googleAIClient;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('OPENAI_API_KEY');
        const deepseekApiKey = this.configService.get('DEEPSEEK_API_KEY');
        const anthropicApiKey = this.configService.get('ANTHROPIC_API_KEY');
        const googleApiKey = this.configService.get('GEMINI_API_KEY');
        this.openaiAIClient = new openai_1.default({ apiKey });
        this.deepseekAIClient = new openai_1.default({
            apiKey: deepseekApiKey,
            baseURL: 'https://api.deepseek.com',
        });
        this.anthropicAIClient = new openai_1.default({
            apiKey: anthropicApiKey,
            baseURL: 'https://api.anthropic.com/v1/',
        });
        this.googleAIClient = new openai_1.default({
            apiKey: googleApiKey,
            baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
        });
    }
    async generateSystemRoles(dto) {
        const prompt = prompts_1.AI_GENERATION_PROMPTS.SYSTEM_ROLES.replace('{topic}', dto.topic);
        try {
            const response = await this.openaiAIClient.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'Отвечай всегда только JSON, без пояснений и без обёртки ```json```.',
                    },
                    { role: 'user', content: prompt },
                ],
            });
            const result = JSON.parse(response.choices[0]?.message?.content || '{}');
            if (!result.roles || !Array.isArray(result.roles)) {
                throw new common_1.BadRequestException('Не удалось сгенерировать системные роли');
            }
            return result;
        }
        catch (error) {
            console.error(error);
            throw new common_1.BadRequestException('Ошибка при генерации системных ролей');
        }
    }
    async generateTargetAudiences(dto) {
        const prompt = prompts_1.AI_GENERATION_PROMPTS.TARGET_AUDIENCES.replace('{topic}', dto.topic).replace('{role}', dto.role);
        try {
            const response = await this.openaiAIClient.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'Отвечай всегда только JSON, без пояснений и без обёртки ```json```.',
                    },
                    { role: 'user', content: prompt },
                ],
            });
            const result = JSON.parse(response.choices[0]?.message?.content || '{}');
            if (!result.audiences || !Array.isArray(result.audiences)) {
                throw new common_1.BadRequestException('Не удалось сгенерировать целевые аудитории');
            }
            return result;
        }
        catch (error) {
            console.error(error);
            throw new common_1.BadRequestException('Ошибка при генерации целевых аудиторий');
        }
    }
    async generatePostStructures(dto) {
        const prompt = prompts_1.AI_GENERATION_PROMPTS.POST_STRUCTURES.replace('{topic}', dto.topic)
            .replace('{role}', dto.role)
            .replace('{audience}', dto.audience);
        try {
            const response = await (0, with_retry_1.withRetry)(async () => this.openaiAIClient.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: 'Отвечай всегда только JSON, без пояснений и без обёртки ```json```.',
                    },
                    { role: 'user', content: prompt },
                ],
            }));
            const result = JSON.parse(response.choices[0]?.message?.content || '{}');
            if (!result.structures || !Array.isArray(result.structures)) {
                throw new common_1.BadRequestException('Не удалось сгенерировать структуры постов');
            }
            return result;
        }
        catch (error) {
            console.error(error);
            throw new common_1.BadRequestException('Ошибка при генерации структур постов');
        }
    }
    getPlatforms() {
        return { platforms: prompts_1.HARDCODED_OPTIONS.PLATFORMS };
    }
    getFormats() {
        return { formats: prompts_1.HARDCODED_OPTIONS.FORMATS };
    }
    getTones() {
        return { tones: prompts_1.HARDCODED_OPTIONS.TONES };
    }
    getModels() {
        return { models: prompts_1.HARDCODED_OPTIONS.MODELS };
    }
    getModelProvider(modelId) {
        const provider = prompts_1.HARDCODED_OPTIONS.MODELS.find((model) => model.id === modelId)?.provider;
        if (!provider) {
            throw new common_1.BadRequestException('Неверный ID модели');
        }
        return {
            openai: this.openaiAIClient,
            deepseek: this.deepseekAIClient,
            anthropic: this.anthropicAIClient,
            google: this.googleAIClient,
        }[provider];
    }
    async generateFinalPost(dto) {
        const prompt = prompts_1.AI_GENERATION_PROMPTS.FINAL_POST.replace('{topic}', dto.topic)
            .replace('{platform}', dto.platform)
            .replace('{format}', dto.format)
            .replace('{role}', dto.role)
            .replace('{audience}', dto.audience)
            .replace('{structure}', dto.structure)
            .replace('{tone}', dto.tone);
        try {
            const client = this.getModelProvider(dto.model);
            if (!client) {
                throw new common_1.BadRequestException('Неверный ID модели');
            }
            const response = await (0, with_retry_1.withRetry)(async () => client.chat.completions.create({
                model: dto.model,
                messages: [
                    {
                        role: 'system',
                        content: 'Отвечай всегда только JSON, без пояснений и без обёртки ```json```.',
                    },
                    { role: 'user', content: prompt },
                ],
            }));
            const result = JSON.parse(response.choices[0]?.message?.content || '{}');
            if (!result.post || !result.post.content) {
                throw new common_1.BadRequestException('Не удалось сгенерировать финальный пост');
            }
            return result;
        }
        catch (error) {
            console.error(error);
            throw new common_1.BadRequestException('Ошибка при генерации финального поста');
        }
    }
};
exports.AiGenerationService = AiGenerationService;
exports.AiGenerationService = AiGenerationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AiGenerationService);
//# sourceMappingURL=ai-generation.service.js.map