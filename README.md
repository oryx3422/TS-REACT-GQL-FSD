## Проект
- React 18 + TypeScript
- Apollo Client для работы с GraphQL
- SpaceX public GraphQL API
- FSD-структура под доменные модули

## Быстрый старт
- Установить Node LTS (18+ рекомендуется).
- Установка: `npm install`
- Дев-сервер: `npm start` (CRA, порт 3000)
- Сборка прод: `npm run build`
- Тесты: `npm test`

## Структура (FSD)
Минимальный каркас уже создан, расширяй по доменам:
- `app/` — настройка приложения, провайдеры (`ApolloProvider`, роутер, глобальные стили).
- `pages/` — страницы. Каждая страница собирает нужные `widgets/features/entities`.
- `widgets/` — самостоятельные блоки страницы (хедер, сайдбар, лента запусков).
- `features/` — пользовательские сценарии (фильтрация запусков, добавление в избранное).
- `entities/` — бизнес-сущности и их GraphQL-слой (например, `company`, `launch`), UI-компоненты сущности и типы.
- `shared/` — переиспользуемые утилиты, UI-кит, константы, запросы без доменной логики.

Рекомендуемая детализация GraphQL в FSD:
- `entities/<entity>/api/` — gql-документы, хранилище codegen-типов, кастомные Apollo-хуки (`useLaunches`, `useCompany`).
- `entities/<entity>/model/` — типы, мапперы, адаптеры.
- `entities/<entity>/ui/` — небольшие компоненты для рендера сущности.

## Работа с GraphQL и Apollo
- Храни точку входа и провайдер в `app/providers/apollo`. Для смены API-URL используй `.env` (`REACT_APP_API_URL=https://...`).
- Делай отдельный файл с документом запроса и хук над `useQuery`/`useMutation`, не смешивай запрос и JSX в одном файле.
- Используй фрагменты для повторяемых полей (`launchBaseFields`, `rocketBaseFields`) и импортируй их в запросы.
- Планируй кеш: указывай `keyFields` в `InMemoryCache` для сущностей, где нет `id`, или мапь `__typename/id`.
- Обрабатывай состояния: `loading`, `error`, `data` — рендери скелетоны/ошибку/контент. Не скрывай ошибки полностью, логируй в Sentry/console в dev.
- Пагинация: для списков из API SpaceX используй `limit/offset` или `cursor`-подход; в кеше настрой `merge` политики полей.
- Мутации: оптимистичные апдейты (`optimisticResponse`) + `update`/`refetchQueries` для консистентности.

## Типизация и codegen
- Автогенерация типов по схеме API сильно сокращает ошибки.
- Добавь конфиг `codegen` (пример, не выполняется автоматически):
  - Установи: `npm i -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo`
  - Создай `codegen.ts` или `codegen.yml` с источником схемы `https://spacex-production.up.railway.app/graphql` и путями к документам `src/**/*.ts?(x)`.
  - Запуск: `npx graphql-codegen --watch` в dev или `npm run codegen` через скрипт.
- Храни сгенерированные типы рядом с доменом (`entities/launch/api/__generated__/`), не в `shared`.

## UI и стили
- Используй `styled-components` тематически: базовые токены (цвета, типографика) в `shared/ui` или `shared/config/theme`.
- Компоненты из `entities` должны быть маленькими и получать готовые данные, без fetch внутри.
- Страница собирает данные через контейнеры/виджеты, прокидывает вниз только необходимые пропсы.

## Тестирование
- Пиши unit/интеграционные тесты на хуки и компоненты с `@testing-library/react`.
- Моки для GraphQL: `MockedProvider` из `@apollo/client/testing`.
- Проверяй загрузку/ошибки/пустые ответы, а не только счастливый путь.

## Что улучшить дальше
- Вынести ApolloClient из `src/index.tsx` в `app/providers/apollo` с конфигом кеша и error-link.
- Добавить глобальные стили и layout в `app`.
- Настроить codegen и кейши для списков запусков.
- Добавить пример списка запусков с пагинацией/фильтрами как `feature`.
