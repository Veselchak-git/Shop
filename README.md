# Магазин (Shop)

SPA-каталог товаров на React + TypeScript с фильтрацией, сортировкой и пагинацией через [mokky.dev](https://mokky.dev).

## Функционал

- Фильтрация по названию, категории, диапазону цены
- Сортировка по цене / названию / рейтингу (серверная, через `sortBy`)
- Пагинация (серверная, 10 товаров на страницу)
- 100 тестовых товаров в 6 категориях

## Стек

- React + TypeScript 
- Vite 
- SCSS modules
- Mokky.dev (JSON-бэкенд)
- GitHub Pages

## Структура проекта

```
src/
  services/product.ts     — HTTP-запросы к mokky.dev
  consts/                 — опции сортировки
  interfaces/             — TypeScript-интерфейсы 
  styles/global.scss      — глобальные стили и CSS-переменные
  components/
    ProductList/          — контейнер (состояние, загрузка данных)
    FilterBar/            — форма фильтрации
    ProductTable/         — таблица товаров
    Pagination/           — пагинация
  App.tsx                 — корневой компонент
  main.tsx                — точка входа
```

## Ссылки

- GitHub Pages: https://veselchak-git.github.io/Shop/
- Бэкенд: https://3a2cbc2a2b454671.mokky.dev/products
