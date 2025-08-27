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
exports.OpenAiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = __importDefault(require("openai"));
let OpenAiService = class OpenAiService {
    configService;
    openaiClient;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('OPENAI_API_KEY');
        this.openaiClient = new openai_1.default({ apiKey });
    }
    async generateText(generateTextDto) {
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
                        content: 'Отвечай всегда только JSON, без пояснений и без обёртки ```json```.',
                    },
                    { role: 'user', content: finalPrompt },
                ],
            });
            const generatedText = JSON.parse(response.choices[0]?.message?.content || '{}');
            if (!generatedText.text) {
                throw new common_1.BadRequestException('Не удалось сгенерировать текст');
            }
            return {
                generatedText: generatedText.text,
            };
        }
        catch {
            throw new common_1.BadRequestException('Ошибка при генерации текста');
        }
    }
};
exports.OpenAiService = OpenAiService;
exports.OpenAiService = OpenAiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], OpenAiService);
//# sourceMappingURL=openai.service.js.map