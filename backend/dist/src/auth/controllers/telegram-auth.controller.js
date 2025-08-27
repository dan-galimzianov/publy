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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramAuthController = void 0;
const common_1 = require("@nestjs/common");
const telegram_auth_service_1 = require("../services/telegram-auth.service");
const telegram_auth_dto_1 = require("../dto/telegram-auth.dto");
let TelegramAuthController = class TelegramAuthController {
    telegramAuthService;
    constructor(telegramAuthService) {
        this.telegramAuthService = telegramAuthService;
    }
    async authenticate(telegramAuthDto, response) {
        const { accessToken, user } = await this.telegramAuthService.validateInitData(telegramAuthDto.initData);
        response.setCookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
        });
        return { user };
    }
    logout(response) {
        response.clearCookie('access_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
        });
        return { message: 'Выход выполнен успешно' };
    }
};
exports.TelegramAuthController = TelegramAuthController;
__decorate([
    (0, common_1.Post)('auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegram_auth_dto_1.TelegramAuthDto, Object]),
    __metadata("design:returntype", Promise)
], TelegramAuthController.prototype, "authenticate", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], TelegramAuthController.prototype, "logout", null);
exports.TelegramAuthController = TelegramAuthController = __decorate([
    (0, common_1.Controller)('telegram'),
    __metadata("design:paramtypes", [telegram_auth_service_1.TelegramAuthService])
], TelegramAuthController);
//# sourceMappingURL=telegram-auth.controller.js.map