<h1 align="center">Сайт нутрициолога</h1>
<p align="center">Современный веб-сайт и персональная платформа для практикующего нутрициолога. Проект сочетает высокопроизводительный клиентский интерфейс с гибкой панелью управления контентом на базе <strong>PayloadCMS</strong></p>
<h2 align="center">
<a target="_blank" href="https://galimova-larisa.ru/">Смотреть демо</a>
</h2>

![Превью проекта](./.github/assets/preview.png)

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-61DBFB?style=for-the-badge&logo=react&logoColor=white)](https://nextjs.org/)
[![PayloadCMS](https://img.shields.io/badge/Payload_CMS_3-000000?style=for-the-badge&logo=payload&logoColor=white)](https://payloadcms.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript_6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL_18-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

## 📌 О проекте

Сайт разработан для автоматизации взаимодействия нутрициолога с клиентами, публикации экспертного контента и записи на консультации. 

### Ключевые особенности
* **⚡ Скорость и SEO:** Полный Incremental Static Regeneration (ISR) и оптимизация загрузки медиа-файлов.
* **🔒 Безопасность и соблюдение ФЗ:** Валидация всех входящих данных и формы обратной связи с подтверждением согласия на обработку персональных данных.
* **📱 Адаптиновсть и отзывчивость:** Адаптивный интерфейс, оптимизированный под mobile-first пользователей.

---

## 🚀 Ключевой функционал

### Для посетителей и клиентов:
* **Каталог услуг:** Просмотр программ сопровождения и первичных консультаций.
* **Запись и обратная связь:** Интерактивные формы заявок с капчей и отправкой на Email.
* **Рецепты / Меню-гайды:** Статьи по правильному питанию и рецепты с подробным описанием.

### Для владельца (Админ-панель PayloadCMS):
* **Управление контентом:** Редактирование услуг, цен, отзывов и статей в удобном WYSIWYG-редакторе.
* **Менеджмент заявок:** Централизованный сбор входящих заявок прямо в коллекции CMS.

---

## 🛠 Технологический стек

| Категория | Технологии |
| :--- | :--- |
| **Frontend Framework** | [Next.js](https://nextjs.org/) (App Router, Server Components) |
| **CMS / Headless Engine** | [PayloadCMS](https://payloadcms.com/) |
| **Язык программирования** | [TypeScript](https://www.typescriptlang.org/) (Strict Type-Safety) |
| **Стилизация** | [Tailwind CSS](https://tailwindcss.com/), Shadcn UI |
| **База данных** | [PostgreSQL](https://www.postgresql.org/) + Drizzle ORM |
| **Валидация данных** | Zod / React Hook Form |
| **Деплой & Хостинг** | Selectel Cloud (Payload & Database) |

---

## 🏗 Архитектура и особенности разработки

```text
├── src/
│   ├── app/                  # Next.js App Router (страницы и API роуты)
│   │   ├── (app)/            # Публичная часть сайта
│   │   └── (payload)/        # Эндпоинты и панель управления PayloadCMS
│   ├── collections/          # Схемы коллекций PayloadCMS (Users, Posts, Services, Leads)
│   ├── components/           # Переиспользуемые React-компоненты
│   └── payload.config.ts     # Главный конфигурационный файл CMS
```

* **Type Generation:** Типы TypeScript автоматически генерируются напрямую из схем PayloadCMS (`npm run generate:types`), что обеспечивает полную строгость типов на клиентской стороне.
* **Оптимизация изображений:** Автоматическая конвертация загружаемых медиа-файлов в формат `.webp` и генерация responsive-размеров на стороне серверной части CMS.

---

## ⚙️ Локальный запуск

### Предварительные требования

* **Node.js**: `22.x`
* **PostgreSQL**

### Шаги по установке

1. **Клонируйте репозиторий:**

2. **Установите зависимости:**
```bash
npm install
```


3. **Создайте файл переменных окружения `.env`:**
```bash
cp .env.example .env
```


Укажите параметры подключения к базе данных и секретные ключи:
```env
DATABASE_URI=postgresql://user:password@localhost:5432/nutritionist_db
PAYLOAD_SECRET=your_super_secret_payload_key
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
```


4. **Запустите проект в режиме разработки:**
```bash
npm run dev
```


5. **Доступ:**
* **Сайт:** `http://localhost:3000`
* **Админ-панель:** `http://localhost:3000/admin` (при первом входе потребуется зарегистрировать учетную запись администратора).



---

## 👨‍💻 Автор

* **Разработчик:** [Азамат Сафин](https://github.com/jeffors)
* **Telegram:** [@safizam](https://t.me/safizam)

