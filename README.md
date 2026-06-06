# Tree Park Management

Курсовая работа по дисциплине "Клиент-серверные приложения".

Тема проекта: информационная система учета деревьев в городском парке.

## Стек

- NestJS
- React + Vite
- Axios
- LocalStorage
- JSON seed + in-memory storage

## Возможности

- `GET /users`
- `GET /users/:id`
- `POST /users`
- дополнительные CRUD-операции для пользователей и деревьев
- роли `ADMIN`, `MANAGER`, `VIEWER`
- валидация DTO через `class-validator`
- обработка ошибок и Swagger-документация

## Запуск

### Backend

```bash
cd Source/backend
npm install
npm run start
```

Сервер запускается на `http://localhost:3000`, Swagger доступен на `http://localhost:3000/api`.

### Frontend

```bash
cd Source/frontend
npm install
npm run dev
```

Клиентская часть обращается к API на `http://localhost:3000`.

## Данные

Исходный набор данных лежит в [DB/tree-park-seed.json](/C:/Users/nelli/OneDrive/Документы/tree-park-management/DB/tree-park-seed.json).
При запуске backend загружает его в память, а изменения не сохраняются между перезапусками приложения.

