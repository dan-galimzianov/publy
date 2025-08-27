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
exports.AiGenerationController = void 0;
const common_1 = require("@nestjs/common");
const ai_generation_service_1 = require("../services/ai-generation.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const generate_system_roles_dto_1 = require("../dto/generate-system-roles.dto");
const generate_target_audiences_dto_1 = require("../dto/generate-target-audiences.dto");
const generate_post_structures_dto_1 = require("../dto/generate-post-structures.dto");
const generate_final_post_dto_1 = require("../dto/generate-final-post.dto");
let AiGenerationController = class AiGenerationController {
    aiGenerationService;
    constructor(aiGenerationService) {
        this.aiGenerationService = aiGenerationService;
    }
    generateSystemRoles(dto) {
        return this.aiGenerationService.generateSystemRoles(dto);
    }
    generateTargetAudiences(dto) {
        return this.aiGenerationService.generateTargetAudiences(dto);
    }
    generatePostStructures(dto) {
        return this.aiGenerationService.generatePostStructures(dto);
    }
    getPlatforms() {
        return this.aiGenerationService.getPlatforms();
    }
    getFormats() {
        return this.aiGenerationService.getFormats();
    }
    getTones() {
        return this.aiGenerationService.getTones();
    }
    getModels() {
        return this.aiGenerationService.getModels();
    }
    generateFinalPost(dto) {
        return this.aiGenerationService.generateFinalPost(dto);
    }
};
exports.AiGenerationController = AiGenerationController;
__decorate([
    (0, common_1.Post)('system-roles'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_system_roles_dto_1.GenerateSystemRolesDto]),
    __metadata("design:returntype", void 0)
], AiGenerationController.prototype, "generateSystemRoles", null);
__decorate([
    (0, common_1.Post)('target-audiences'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_target_audiences_dto_1.GenerateTargetAudiencesDto]),
    __metadata("design:returntype", void 0)
], AiGenerationController.prototype, "generateTargetAudiences", null);
__decorate([
    (0, common_1.Post)('post-structures'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_post_structures_dto_1.GeneratePostStructuresDto]),
    __metadata("design:returntype", void 0)
], AiGenerationController.prototype, "generatePostStructures", null);
__decorate([
    (0, common_1.Get)('platforms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AiGenerationController.prototype, "getPlatforms", null);
__decorate([
    (0, common_1.Get)('formats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AiGenerationController.prototype, "getFormats", null);
__decorate([
    (0, common_1.Get)('tones'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AiGenerationController.prototype, "getTones", null);
__decorate([
    (0, common_1.Get)('models'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AiGenerationController.prototype, "getModels", null);
__decorate([
    (0, common_1.Post)('generate-final-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_final_post_dto_1.GenerateFinalPostDto]),
    __metadata("design:returntype", void 0)
], AiGenerationController.prototype, "generateFinalPost", null);
exports.AiGenerationController = AiGenerationController = __decorate([
    (0, common_1.Controller)('ai-generation'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ai_generation_service_1.AiGenerationService])
], AiGenerationController);
//# sourceMappingURL=ai-generation.controller.js.map