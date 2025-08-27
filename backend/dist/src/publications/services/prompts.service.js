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
exports.PromptsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PromptsService = class PromptsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPromptDto, userId) {
        return this.prisma.prompt.create({
            data: {
                name: createPromptDto.name,
                text: createPromptDto.text,
                userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                    },
                },
            },
        });
    }
    async findAll(userId) {
        return this.prisma.prompt.findMany({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                    },
                },
            },
        });
    }
    async findOne(id, userId) {
        const prompt = await this.prisma.prompt.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                    },
                },
            },
        });
        if (!prompt) {
            throw new common_1.NotFoundException('Промпт не найден');
        }
        if (prompt.userId !== userId) {
            throw new common_1.ForbiddenException('Нет доступа к этому промпту');
        }
        return prompt;
    }
    async update(id, updatePromptDto, userId) {
        await this.findOne(id, userId);
        return this.prisma.prompt.update({
            where: { id },
            data: updatePromptDto,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                    },
                },
            },
        });
    }
    async remove(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.prompt.delete({
            where: { id },
        });
    }
};
exports.PromptsService = PromptsService;
exports.PromptsService = PromptsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PromptsService);
//# sourceMappingURL=prompts.service.js.map