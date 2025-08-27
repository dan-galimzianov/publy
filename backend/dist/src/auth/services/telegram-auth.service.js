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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramAuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const init_data_node_1 = require("@telegram-apps/init-data-node");
const prisma_service_1 = require("../../prisma/prisma.service");
const default_prompts_1 = require("../constants/default-prompts");
let TelegramAuthService = class TelegramAuthService {
    configService;
    jwtService;
    prisma;
    constructor(configService, jwtService, prisma) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async validateInitData(initData) {
        const botToken = this.configService.get('TELEGRAM_BOT_TOKEN');
        try {
            (0, init_data_node_1.validate)(initData, botToken);
            const parsedData = (0, init_data_node_1.parse)(initData);
            if (!parsedData.user) {
                throw new common_1.UnauthorizedException('Пользовательские данные не найдены');
            }
            const telegramUser = {
                id: parsedData.user.id,
                first_name: parsedData.user.first_name,
                last_name: parsedData.user.last_name,
                username: parsedData.user.username,
                language_code: parsedData.user.language_code,
                is_premium: parsedData.user.is_premium,
                photo_url: parsedData.user.photo_url,
            };
            const user = await this.prisma.user.upsert({
                where: {
                    tgUserId: telegramUser.id,
                },
                update: {
                    username: telegramUser.username,
                    name: telegramUser.first_name,
                },
                create: {
                    tgUserId: telegramUser.id,
                    username: telegramUser.username ?? '',
                    name: telegramUser.first_name,
                    Prompt: {
                        createMany: {
                            data: default_prompts_1.DEFAULT_PROMPTS,
                        },
                    },
                },
            });
            const accessToken = this.jwtService.sign({
                userId: user.id,
                sub: user.id,
                username: user.username,
                first_name: user.name,
            });
            return {
                accessToken,
                user: telegramUser,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.UnauthorizedException('Невалидные данные Telegram Mini App');
        }
    }
};
exports.TelegramAuthService = TelegramAuthService;
exports.TelegramAuthService = TelegramAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], TelegramAuthService);
//# sourceMappingURL=telegram-auth.service.js.map