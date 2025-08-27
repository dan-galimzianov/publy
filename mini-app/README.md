# Mini App

Telegram Mini App построенный на Next.js с современным стеком технологий.

## Стек технологий

- **Next.js 15** - React фреймворк с App Router
- **TypeScript** - Статическая типизация
- **Tailwind CSS** - Утилитарный CSS фреймворк
- **shadcn/ui** - Переиспользуемые компоненты UI
- **React Query (TanStack Query)** - Управление состоянием сервера
- **TanStack Table** - Мощные таблицы с сортировкой и фильтрацией
- **Telegraf** - Telegram Bot API и Web App интеграция

## Быстрый старт

1. Установите зависимости:
   \`\`\`bash
   npm install
   \`\`\`

2. Создайте файл \`.env.local\` и добавьте переменные окружения:
   \`\`\`env
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

3. Запустите сервер разработки:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Откройте [http://localhost:3000](http://localhost:3000) в браузере

## Структура проекта

\`\`\`
src/
├── app/ # App Router страницы
│ ├── layout.tsx # Корневой layout
│ └── page.tsx # Главная страница
├── components/ # Переиспользуемые компоненты
│ ├── ui/ # shadcn/ui компоненты
│ └── data-table.tsx # Компонент таблицы
├── lib/ # Утилиты и конфигурация
│ ├── utils.ts # Общие утилиты
│ └── telegram.ts # Telegram Web App интеграция
└── providers/ # Провайдеры контекста
└── query-provider.tsx # React Query провайдер
\`\`\`

## Особенности

### Telegram Web App интеграция

Приложение включает полную интеграцию с Telegram Web App API:

- Получение данных пользователя
- Поддержка тем (светлая/темная)
- Haptic Feedback
- Main Button и Back Button
- Проверка запуска в Telegram

### React Query

Настроенный провайдер для управления состоянием сервера:

- Кэширование запросов
- Автоматическая перезагрузка
- Обработка ошибок
- DevTools для отладки

### TanStack Table

Мощный компонент таблицы с поддержкой:

- Сортировка колонок
- Фильтрация данных
- Пагинация
- Поиск

### shadcn/ui

Красивые и доступные компоненты:

- Кнопки
- Поля ввода
- Таблицы
- И многое другое

## Команды

\`\`\`bash

# Разработка

npm run dev

# Сборка

npm run build

# Запуск продакшн версии

npm start

# Линтинг

npm run lint

# Добавление новых shadcn компонентов

npx shadcn@latest add [component-name]
\`\`\`

## Развертывание

Приложение можно развернуть на любой платформе, поддерживающей Next.js:

- Vercel (рекомендуется)
- Netlify
- Railway
- Heroku

Не забудьте настроить переменные окружения на выбранной платформе.

## Telegram Bot настройка

1. Создайте бота через [@BotFather](https://t.me/botfather)
2. Получите токен бота
3. Настройте Web App URL через BotFather:
   \`\`\`
   /setmenubutton
   [Выберите бота]
   [Введите название кнопки]
   [Введите URL вашего приложения]
   \`\`\`

## Лицензия

MIT
