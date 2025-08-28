"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const cors_1 = __importDefault(require("@fastify/cors"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const configService = app.get(config_1.ConfigService);
    await app.register(cookie_1.default, {
        secret: process.env.COOKIE_SECRET || 'my-secret',
    });
    await app.register(cors_1.default, {
        origin: configService.get('CORS_ORIGIN'),
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
void bootstrap();
//# sourceMappingURL=main.js.map