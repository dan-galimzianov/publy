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
exports.GenerationController = void 0;
const common_1 = require("@nestjs/common");
const openai_service_1 = require("../services/openai.service");
const generate_text_dto_1 = require("../dto/generate-text.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const prisma_service_1 = require("../../prisma/prisma.service");
let GenerationController = class GenerationController {
    openAiService;
    prisma;
    constructor(openAiService, prisma) {
        this.openAiService = openAiService;
        this.prisma = prisma;
    }
    generateText(generateTextDto) {
        return this.openAiService.generateText(generateTextDto);
    }
    async getPostFormatPrompts() {
        return this.prisma.postFormatPrompt.findMany({
            orderBy: {
                name: 'asc',
            },
        });
    }
};
exports.GenerationController = GenerationController;
__decorate([
    (0, common_1.Post)('generate-text'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_text_dto_1.GenerateTextDto]),
    __metadata("design:returntype", void 0)
], GenerationController.prototype, "generateText", null);
__decorate([
    (0, common_1.Get)('post-format-prompts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GenerationController.prototype, "getPostFormatPrompts", null);
exports.GenerationController = GenerationController = __decorate([
    (0, common_1.Controller)('generation'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [openai_service_1.OpenAiService,
        prisma_service_1.PrismaService])
], GenerationController);
//# sourceMappingURL=generation.controller.js.map