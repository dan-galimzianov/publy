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
exports.PromptsController = void 0;
const common_1 = require("@nestjs/common");
const prompts_service_1 = require("../services/prompts.service");
const create_prompt_dto_1 = require("../dto/create-prompt.dto");
const update_prompt_dto_1 = require("../dto/update-prompt.dto");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
let PromptsController = class PromptsController {
    promptsService;
    constructor(promptsService) {
        this.promptsService = promptsService;
    }
    create(createPromptDto, user) {
        return this.promptsService.create(createPromptDto, user.userId);
    }
    findAll(user) {
        return this.promptsService.findAll(user.userId.toString());
    }
    findOne(id, user) {
        return this.promptsService.findOne(id, user.userId.toString());
    }
    update(id, updatePromptDto, user) {
        return this.promptsService.update(id, updatePromptDto, user.userId.toString());
    }
    remove(id, user) {
        return this.promptsService.remove(id, user.userId.toString());
    }
};
exports.PromptsController = PromptsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.GetCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_prompt_dto_1.CreatePromptDto, Object]),
    __metadata("design:returntype", void 0)
], PromptsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.GetCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PromptsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.GetCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PromptsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.GetCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_prompt_dto_1.UpdatePromptDto, Object]),
    __metadata("design:returntype", void 0)
], PromptsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.GetCurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PromptsController.prototype, "remove", null);
exports.PromptsController = PromptsController = __decorate([
    (0, common_1.Controller)('prompts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [prompts_service_1.PromptsService])
], PromptsController);
//# sourceMappingURL=prompts.controller.js.map