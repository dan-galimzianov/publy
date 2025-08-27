import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.postFormatPrompt.create({
    data: {
      name: 'Короткий пост (до 300 символов)',
      text: 'Сгенерируй короткий пост до 300 символов. Используй разговорный стиль, добавь эмоцию или эмодзи. Подходит для быстрого скролла.!',
    },
  });
}

void seed();
