"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicationsModule = void 0;
const common_1 = require("@nestjs/common");
const posts_controller_1 = require("./controllers/posts.controller");
const prompts_controller_1 = require("./controllers/prompts.controller");
const generation_controller_1 = require("./controllers/generation.controller");
const posts_service_1 = require("./services/posts.service");
const prompts_service_1 = require("./services/prompts.service");
const openai_service_1 = require("./services/openai.service");
let PublicationsModule = class PublicationsModule {
};
exports.PublicationsModule = PublicationsModule;
exports.PublicationsModule = PublicationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [posts_controller_1.PostsController, prompts_controller_1.PromptsController, generation_controller_1.GenerationController],
        providers: [posts_service_1.PostsService, prompts_service_1.PromptsService, openai_service_1.OpenAiService],
    })
], PublicationsModule);
//# sourceMappingURL=publications.module.js.map