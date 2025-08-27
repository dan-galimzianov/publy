"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seed() {
    await prisma.postFormatPrompt.create({
        data: {
            name: 'Короткий пост (до 300 символов)',
            text: 'Сгенерируй короткий пост до 300 символов. Используй разговорный стиль, добавь эмоцию или эмодзи. Подходит для быстрого скролла.!',
        },
    });
}
void seed();
//# sourceMappingURL=seed.js.map