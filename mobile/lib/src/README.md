# Clean Architecture Structure

## Папки и их назначение

### 📱 `presentation/`

Слой представления - всё что связано с UI

- `widgets/` - переиспользуемые виджеты
- `pages/` - экраны приложения
- `providers/` - провайдеры состояния (Riverpod)

### 🎯 `application/`

Слой бизнес-логики приложения

- `use_cases/` - сценарии использования (бизнес-логика)

### 🏛️ `domain/`

Доменный слой - основная бизнес-логика

- `entities/` - доменные сущности
- `value_objects/` - объекты-значения
- `repositories/` - абстракции репозиториев

### 💾 `data/`

Слой данных - работа с внешними источниками

- `repositories/` - реализации репозиториев
- `datasources/`
  - `remote/` - API клиенты (Dio + Retrofit)
  - `local/` - локальная БД (Drift)
- `models/` - DTO модели для сериализации

### 🛠️ `common/`

Общие утилиты и классы

- `errors/` - обработка ошибок и исключений
- `utils/` - вспомогательные утилиты
- `result.dart` - функциональный тип Result

## Используемые технологии

- **State Management**: Riverpod
- **Network**: Dio + Retrofit
- **Local DB**: Drift (SQLite)
- **Functional Programming**: Dartz (Either/Result)
- **Code Generation**: Freezed, JsonSerializable
- **Architecture**: Clean Architecture
