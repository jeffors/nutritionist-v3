import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_services_icon" AS ENUM('Stethoscope', 'Leaf', 'Salad', 'Pill', 'Activity', 'Dna', 'Heart', 'Brain', 'Scale', 'Microscope');
  CREATE TYPE "public"."enum_services_color" AS ENUM('green', 'blue', 'rose', 'violet', 'amber', 'sky', 'orange');
  CREATE TYPE "public"."enum_guides_category" AS ENUM('guides', 'lectures', 'checklists', 'mini-courses');
  CREATE TYPE "public"."enum_consultations_messenger" AS ENUM('whatsapp', 'telegram');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_about_page_values_items_icon" AS ENUM('Heart', 'BookOpen', 'Award', 'CheckCircle', 'GraduationCap');
  CREATE TYPE "public"."enum_about_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_page_v_version_values_items_icon" AS ENUM('Heart', 'BookOpen', 'Award', 'CheckCircle', 'GraduationCap');
  CREATE TYPE "public"."enum__about_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contacts_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contacts_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_shop_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__shop_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_review_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__review_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_consent_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__consent_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_offer_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__offer_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_privacy_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__privacy_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "services_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_services_icon" NOT NULL,
  	"color" "enum_services_color" DEFAULT 'green' NOT NULL,
  	"price" numeric DEFAULT 0 NOT NULL,
  	"duration" varchar NOT NULL,
  	"tag" varchar,
  	"order" numeric DEFAULT 0,
  	"is_active" boolean DEFAULT 'true',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "guides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"full_description" varchar NOT NULL,
  	"category" "enum_guides_category" NOT NULL,
  	"pages" numeric,
  	"price" numeric NOT NULL,
  	"file_id" integer,
  	"rating" numeric,
  	"review" numeric DEFAULT 0,
  	"tag" varchar,
  	"is_active" boolean DEFAULT 'true',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"age" numeric,
  	"location" varchar,
  	"text" varchar NOT NULL,
  	"stars" numeric DEFAULT 5 NOT NULL,
  	"service" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"is_active" boolean DEFAULT 'true',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "consultations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"messenger" "enum_consultations_messenger" NOT NULL,
  	"request" varchar NOT NULL,
  	"is_active" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"services_id" integer,
  	"guides_id" integer,
  	"reviews_id" integer,
  	"consultations_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contacts_global" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"whatsapp" numeric DEFAULT '79001234567' NOT NULL,
  	"telegram" varchar DEFAULT 'samplename' NOT NULL,
  	"email" varchar DEFAULT 'larisa.galimova@example.com' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "home_page_about_checklist_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "home_page_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "home_page_proctolog_checklist_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "home_page_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge" varchar DEFAULT 'Нутрициолог · Онлайн-консультации',
  	"hero_heading" varchar DEFAULT 'Ваше здоровье —',
  	"hero_heading_accent" varchar DEFAULT 'мой приоритет',
  	"hero_description" varchar DEFAULT 'Помогаю улучшить самочувствие, нормализовать вес и восстановить здоровье через индивидуальный подход к питанию и образу жизни.',
  	"hero_cta_label" varchar DEFAULT 'Записаться на консультацию',
  	"about_image_id" integer,
  	"about_image_title" varchar DEFAULT 'Лариса Галимова',
  	"about_image_description" varchar DEFAULT 'Клинический нутрициолог',
  	"about_heading" varchar DEFAULT 'Обо мне',
  	"about_paragraph1" varchar DEFAULT 'Меня зовут Лариса Галимова. Я — клинический нутрициолог с высшем медицинским образованием. Помогаю людям по всему миру улучшить здоровье через осознанное и сбалансированное питание.',
  	"about_paragraph2" varchar DEFAULT 'Моя цель — помочь вам достичь оптимального здоровья и благополучия через правильное питание и образ жизни.',
  	"about_cta_label" varchar DEFAULT 'Подробнее обо мне',
  	"services_heading" varchar DEFAULT 'Услуги',
  	"services_description" varchar DEFAULT 'Индивидуальный подход к каждому клиенту. Работаю онлайн со всем миром.',
  	"services_cta_label" varchar DEFAULT 'Все услуги',
  	"guides_heading" varchar DEFAULT 'Гайды и лекции',
  	"guides_description" varchar DEFAULT 'Авторские цифровые продукты — скачайте и начните улучшать своё здоровье прямо сейчас.',
  	"guides_cta_label" varchar DEFAULT 'Все продукты в магазине',
  	"how_it_works_heading" varchar DEFAULT 'Как проходит работа',
  	"how_it_works_description" varchar DEFAULT 'Простой и понятный процесс на пути к вашему здоровью',
  	"reviews_heading" varchar DEFAULT 'Отзывы клиентов',
  	"reviews_description" varchar DEFAULT 'Более 500 довольных клиентов по всему миру',
  	"reviews_cta_label" varchar DEFAULT 'Все отзывы',
  	"proctolog_image_id" integer,
  	"proctolog_badge" varchar DEFAULT 'Смежный специалист',
  	"proctolog_heading" varchar DEFAULT 'Врач-проктолог',
  	"proctolog_heading_accent" varchar DEFAULT 'Галимов Ринат Фаритович',
  	"proctolog_paragraph1" varchar DEFAULT 'Опытный врач-проктолог с 20-летней практикой. Специализируется на диагностике и лечении заболеваний прямой кишки, анального канала и толстого кишечника.',
  	"proctolog_paragraph2" varchar DEFAULT 'Работает в тесном сотрудничестве с нутрициологом для комплексного подхода к здоровью пациентов. Правильное питание часто является ключевым элементом лечения проктологических проблем.',
  	"proctolog_cta_label" varchar DEFAULT 'Записаться к врачу',
  	"proctolog_cta_link" varchar,
  	"faq_heading" varchar DEFAULT 'Часто задаваемые вопросы',
  	"consultation_heading" varchar DEFAULT 'Записаться на консультацию',
  	"consultation_description" varchar DEFAULT 'Оставьте заявку, и я свяжусь с вами в течение 2 часов',
  	"contacts_heading" varchar DEFAULT 'Записаться на консультацию',
  	"contacts_description" varchar DEFAULT 'Выберите удобный способ связи',
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_page_v_version_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_about_checklist_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_proctolog_checklist_item" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_version_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_badge" varchar DEFAULT 'Нутрициолог · Онлайн-консультации',
  	"version_hero_heading" varchar DEFAULT 'Ваше здоровье —',
  	"version_hero_heading_accent" varchar DEFAULT 'мой приоритет',
  	"version_hero_description" varchar DEFAULT 'Помогаю улучшить самочувствие, нормализовать вес и восстановить здоровье через индивидуальный подход к питанию и образу жизни.',
  	"version_hero_cta_label" varchar DEFAULT 'Записаться на консультацию',
  	"version_about_image_id" integer,
  	"version_about_image_title" varchar DEFAULT 'Лариса Галимова',
  	"version_about_image_description" varchar DEFAULT 'Клинический нутрициолог',
  	"version_about_heading" varchar DEFAULT 'Обо мне',
  	"version_about_paragraph1" varchar DEFAULT 'Меня зовут Лариса Галимова. Я — клинический нутрициолог с высшем медицинским образованием. Помогаю людям по всему миру улучшить здоровье через осознанное и сбалансированное питание.',
  	"version_about_paragraph2" varchar DEFAULT 'Моя цель — помочь вам достичь оптимального здоровья и благополучия через правильное питание и образ жизни.',
  	"version_about_cta_label" varchar DEFAULT 'Подробнее обо мне',
  	"version_services_heading" varchar DEFAULT 'Услуги',
  	"version_services_description" varchar DEFAULT 'Индивидуальный подход к каждому клиенту. Работаю онлайн со всем миром.',
  	"version_services_cta_label" varchar DEFAULT 'Все услуги',
  	"version_guides_heading" varchar DEFAULT 'Гайды и лекции',
  	"version_guides_description" varchar DEFAULT 'Авторские цифровые продукты — скачайте и начните улучшать своё здоровье прямо сейчас.',
  	"version_guides_cta_label" varchar DEFAULT 'Все продукты в магазине',
  	"version_how_it_works_heading" varchar DEFAULT 'Как проходит работа',
  	"version_how_it_works_description" varchar DEFAULT 'Простой и понятный процесс на пути к вашему здоровью',
  	"version_reviews_heading" varchar DEFAULT 'Отзывы клиентов',
  	"version_reviews_description" varchar DEFAULT 'Более 500 довольных клиентов по всему миру',
  	"version_reviews_cta_label" varchar DEFAULT 'Все отзывы',
  	"version_proctolog_image_id" integer,
  	"version_proctolog_badge" varchar DEFAULT 'Смежный специалист',
  	"version_proctolog_heading" varchar DEFAULT 'Врач-проктолог',
  	"version_proctolog_heading_accent" varchar DEFAULT 'Галимов Ринат Фаритович',
  	"version_proctolog_paragraph1" varchar DEFAULT 'Опытный врач-проктолог с 20-летней практикой. Специализируется на диагностике и лечении заболеваний прямой кишки, анального канала и толстого кишечника.',
  	"version_proctolog_paragraph2" varchar DEFAULT 'Работает в тесном сотрудничестве с нутрициологом для комплексного подхода к здоровью пациентов. Правильное питание часто является ключевым элементом лечения проктологических проблем.',
  	"version_proctolog_cta_label" varchar DEFAULT 'Записаться к врачу',
  	"version_proctolog_cta_link" varchar,
  	"version_faq_heading" varchar DEFAULT 'Часто задаваемые вопросы',
  	"version_consultation_heading" varchar DEFAULT 'Записаться на консультацию',
  	"version_consultation_description" varchar DEFAULT 'Оставьте заявку, и я свяжусь с вами в течение 2 часов',
  	"version_contacts_heading" varchar DEFAULT 'Записаться на консультацию',
  	"version_contacts_description" varchar DEFAULT 'Выберите удобный способ связи',
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "about_page_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_about_page_values_items_icon" DEFAULT 'Heart',
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "about_page_education_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"year" varchar,
  	"title" varchar,
  	"place" varchar,
  	"variant" varchar
  );
  
  CREATE TABLE "about_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_image_id" integer,
  	"hero_heading" varchar DEFAULT 'Обо мне',
  	"hero_paragraph1" jsonb,
  	"hero_paragraph2" varchar DEFAULT 'Сегодня я помогаю более 500 клиентам по всему миру решать проблемы со здоровьем, которые казались безнадёжными. Работаю онлайн — это позволяет сотрудничать с людьми из любой точки мира.',
  	"hero_cta_label" varchar DEFAULT 'Записаться на консультацию',
  	"values_heading" varchar DEFAULT 'Мои ценности в работе',
  	"education_heading" varchar DEFAULT 'Образование и сертификаты',
  	"cta_heading" varchar DEFAULT 'Готовы начать путь к здоровью?',
  	"cta_description" varchar DEFAULT 'Запишитесь на первичную консультацию и получите персональную стратегию улучшения вашего здоровья.',
  	"cta_button" varchar DEFAULT 'Записаться на консультацию',
  	"_status" "enum_about_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_about_page_v_version_values_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__about_page_v_version_values_items_icon" DEFAULT 'Heart',
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v_version_education_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"year" varchar,
  	"title" varchar,
  	"place" varchar,
  	"variant" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_image_id" integer,
  	"version_hero_heading" varchar DEFAULT 'Обо мне',
  	"version_hero_paragraph1" jsonb,
  	"version_hero_paragraph2" varchar DEFAULT 'Сегодня я помогаю более 500 клиентам по всему миру решать проблемы со здоровьем, которые казались безнадёжными. Работаю онлайн — это позволяет сотрудничать с людьми из любой точки мира.',
  	"version_hero_cta_label" varchar DEFAULT 'Записаться на консультацию',
  	"version_values_heading" varchar DEFAULT 'Мои ценности в работе',
  	"version_education_heading" varchar DEFAULT 'Образование и сертификаты',
  	"version_cta_heading" varchar DEFAULT 'Готовы начать путь к здоровью?',
  	"version_cta_description" varchar DEFAULT 'Запишитесь на первичную консультацию и получите персональную стратегию улучшения вашего здоровья.',
  	"version_cta_button" varchar DEFAULT 'Записаться на консультацию',
  	"version__status" "enum__about_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "contacts_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading" varchar DEFAULT 'Контакты',
  	"hero_description" varchar DEFAULT 'Выберите удобный способ связи. Отвечаю в течение 2 часов в рабочее время.',
  	"hero_how_to_contact" varchar DEFAULT 'Как связаться',
  	"hours_heading" varchar DEFAULT 'Время работы',
  	"hours_description" jsonb,
  	"online_heading" varchar DEFAULT 'Работаю онлайн',
  	"online_description" jsonb,
  	"form_heading" varchar DEFAULT 'Оставить заявку',
  	"form_description" varchar DEFAULT 'Заполните форму и я свяжусь с вами в течение 2 часов',
  	"_status" "enum_contacts_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contacts_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_heading" varchar DEFAULT 'Контакты',
  	"version_hero_description" varchar DEFAULT 'Выберите удобный способ связи. Отвечаю в течение 2 часов в рабочее время.',
  	"version_hero_how_to_contact" varchar DEFAULT 'Как связаться',
  	"version_hours_heading" varchar DEFAULT 'Время работы',
  	"version_hours_description" jsonb,
  	"version_online_heading" varchar DEFAULT 'Работаю онлайн',
  	"version_online_description" jsonb,
  	"version_form_heading" varchar DEFAULT 'Оставить заявку',
  	"version_form_description" varchar DEFAULT 'Заполните форму и я свяжусь с вами в течение 2 часов',
  	"version__status" "enum__contacts_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading" varchar DEFAULT 'Мои услуги',
  	"hero_description" varchar DEFAULT 'Индивидуальный подход к каждому клиенту. Все консультации проходят онлайн — WhatsApp или Telegram. Работаю со всем миром.',
  	"cta_heading" varchar DEFAULT 'Не знаете, что подходит именно вам?',
  	"cta_description" varchar DEFAULT 'Напишите мне — вместе разберёмся, какая услуга подойдёт лучше всего для вашей ситуации.',
  	"cta_button" varchar DEFAULT 'Оставить заявку',
  	"_status" "enum_services_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_services_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_heading" varchar DEFAULT 'Мои услуги',
  	"version_hero_description" varchar DEFAULT 'Индивидуальный подход к каждому клиенту. Все консультации проходят онлайн — WhatsApp или Telegram. Работаю со всем миром.',
  	"version_cta_heading" varchar DEFAULT 'Не знаете, что подходит именно вам?',
  	"version_cta_description" varchar DEFAULT 'Напишите мне — вместе разберёмся, какая услуга подойдёт лучше всего для вашей ситуации.',
  	"version_cta_button" varchar DEFAULT 'Оставить заявку',
  	"version__status" "enum__services_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "shop_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading" varchar DEFAULT 'Гайды и лекции',
  	"hero_description" varchar DEFAULT 'Авторские цифровые продукты для вашего здоровья. После оплаты — мгновенный доступ.',
  	"_status" "enum_shop_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_shop_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_heading" varchar DEFAULT 'Гайды и лекции',
  	"version_hero_description" varchar DEFAULT 'Авторские цифровые продукты для вашего здоровья. После оплаты — мгновенный доступ.',
  	"version__status" "enum__shop_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "review_page_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "review_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading" varchar DEFAULT 'Отзывы клиентов',
  	"hero_description" varchar DEFAULT 'Реальные истории реальных людей, которые улучшили своё здоровье.',
  	"cta_heading" varchar DEFAULT 'Станьте следующим успешным примером',
  	"cta_description" varchar DEFAULT 'Запишитесь на консультацию и начните свой путь к здоровью уже сегодня.',
  	"cta_button" varchar DEFAULT 'Записаться на консультацию',
  	"_status" "enum_review_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_review_page_v_version_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_review_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_heading" varchar DEFAULT 'Отзывы клиентов',
  	"version_hero_description" varchar DEFAULT 'Реальные истории реальных людей, которые улучшили своё здоровье.',
  	"version_cta_heading" varchar DEFAULT 'Станьте следующим успешным примером',
  	"version_cta_description" varchar DEFAULT 'Запишитесь на консультацию и начните свой путь к здоровью уже сегодня.',
  	"version_cta_button" varchar DEFAULT 'Записаться на консультацию',
  	"version__status" "enum__review_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "consent_page_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "consent_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading" varchar DEFAULT 'Согласие на обработку персональных данных',
  	"hero_last_updated" varchar DEFAULT 'Последнее обновление: 1 июня 2026 года',
  	"hero_intro" varchar DEFAULT 'Настоящим я, субъект персональных данных (далее — «Пользователь»), предоставляю своё согласие ИП Галимовой Ларисе Леонидовне (далее — «Оператор») на обработку моих персональных данных на условиях, изложенных ниже.',
  	"notice_description" varchar DEFAULT 'При заполнении любой формы на данном сайте и нажатии кнопки «Записаться на консультацию» или «Отправить», вы подтверждаете, что ознакомились с настоящим Согласием и принимаете его условия.',
  	"_status" "enum_consent_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_consent_page_v_version_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_consent_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_heading" varchar DEFAULT 'Согласие на обработку персональных данных',
  	"version_hero_last_updated" varchar DEFAULT 'Последнее обновление: 1 июня 2026 года',
  	"version_hero_intro" varchar DEFAULT 'Настоящим я, субъект персональных данных (далее — «Пользователь»), предоставляю своё согласие ИП Галимовой Ларисе Леонидовне (далее — «Оператор») на обработку моих персональных данных на условиях, изложенных ниже.',
  	"version_notice_description" varchar DEFAULT 'При заполнении любой формы на данном сайте и нажатии кнопки «Записаться на консультацию» или «Отправить», вы подтверждаете, что ознакомились с настоящим Согласием и принимаете его условия.',
  	"version__status" "enum__consent_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "offer_page_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "offer_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading" varchar DEFAULT 'Публичная оферта',
  	"hero_last_updated" varchar DEFAULT 'Редакция от 1 июня 2026 года',
  	"_status" "enum_offer_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_offer_page_v_version_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_offer_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_heading" varchar DEFAULT 'Публичная оферта',
  	"version_hero_last_updated" varchar DEFAULT 'Редакция от 1 июня 2026 года',
  	"version__status" "enum__offer_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "privacy_page_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "privacy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_heading" varchar DEFAULT 'Политика конфиденциальности',
  	"hero_last_updated" varchar DEFAULT 'Последнее обновление: 1 июня 2026 года',
  	"_status" "enum_privacy_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_privacy_page_v_version_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_privacy_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_heading" varchar DEFAULT 'Политика конфиденциальности',
  	"version_hero_last_updated" varchar DEFAULT 'Последнее обновление: 1 июня 2026 года',
  	"version__status" "enum__privacy_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_includes" ADD CONSTRAINT "services_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_consultations_fk" FOREIGN KEY ("consultations_id") REFERENCES "public"."consultations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_hero_stats" ADD CONSTRAINT "home_page_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_about_checklist_item" ADD CONSTRAINT "home_page_about_checklist_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_how_it_works_steps" ADD CONSTRAINT "home_page_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_proctolog_checklist_item" ADD CONSTRAINT "home_page_proctolog_checklist_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_faq_items" ADD CONSTRAINT "home_page_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_about_image_id_media_id_fk" FOREIGN KEY ("about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_proctolog_image_id_media_id_fk" FOREIGN KEY ("proctolog_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_hero_stats" ADD CONSTRAINT "_home_page_v_version_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_about_checklist_item" ADD CONSTRAINT "_home_page_v_version_about_checklist_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_how_it_works_steps" ADD CONSTRAINT "_home_page_v_version_how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_proctolog_checklist_item" ADD CONSTRAINT "_home_page_v_version_proctolog_checklist_item_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_faq_items" ADD CONSTRAINT "_home_page_v_version_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_about_image_id_media_id_fk" FOREIGN KEY ("version_about_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v" ADD CONSTRAINT "_home_page_v_version_proctolog_image_id_media_id_fk" FOREIGN KEY ("version_proctolog_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_values_items" ADD CONSTRAINT "about_page_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page_education_items" ADD CONSTRAINT "about_page_education_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_page_education_items" ADD CONSTRAINT "about_page_education_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_page" ADD CONSTRAINT "about_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_values_items" ADD CONSTRAINT "_about_page_v_version_values_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_education_items" ADD CONSTRAINT "_about_page_v_version_education_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_about_page_v_version_education_items" ADD CONSTRAINT "_about_page_v_version_education_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_page_v" ADD CONSTRAINT "_about_page_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "review_page_hero_stats" ADD CONSTRAINT "review_page_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."review_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_review_page_v_version_hero_stats" ADD CONSTRAINT "_review_page_v_version_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_review_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consent_page_sections_items" ADD CONSTRAINT "consent_page_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consent_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_consent_page_v_version_sections_items" ADD CONSTRAINT "_consent_page_v_version_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_consent_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offer_page_sections_items" ADD CONSTRAINT "offer_page_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offer_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_offer_page_v_version_sections_items" ADD CONSTRAINT "_offer_page_v_version_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_offer_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_page_sections_items" ADD CONSTRAINT "privacy_page_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_privacy_page_v_version_sections_items" ADD CONSTRAINT "_privacy_page_v_version_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_privacy_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "services_includes_order_idx" ON "services_includes" USING btree ("_order");
  CREATE INDEX "services_includes_parent_id_idx" ON "services_includes" USING btree ("_parent_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "guides_image_idx" ON "guides" USING btree ("image_id");
  CREATE INDEX "guides_file_idx" ON "guides" USING btree ("file_id");
  CREATE INDEX "guides_updated_at_idx" ON "guides" USING btree ("updated_at");
  CREATE INDEX "guides_created_at_idx" ON "guides" USING btree ("created_at");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX "consultations_updated_at_idx" ON "consultations" USING btree ("updated_at");
  CREATE INDEX "consultations_created_at_idx" ON "consultations" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_guides_id_idx" ON "payload_locked_documents_rels" USING btree ("guides_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_consultations_id_idx" ON "payload_locked_documents_rels" USING btree ("consultations_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_hero_stats_order_idx" ON "home_page_hero_stats" USING btree ("_order");
  CREATE INDEX "home_page_hero_stats_parent_id_idx" ON "home_page_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "home_page_about_checklist_item_order_idx" ON "home_page_about_checklist_item" USING btree ("_order");
  CREATE INDEX "home_page_about_checklist_item_parent_id_idx" ON "home_page_about_checklist_item" USING btree ("_parent_id");
  CREATE INDEX "home_page_how_it_works_steps_order_idx" ON "home_page_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "home_page_how_it_works_steps_parent_id_idx" ON "home_page_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "home_page_proctolog_checklist_item_order_idx" ON "home_page_proctolog_checklist_item" USING btree ("_order");
  CREATE INDEX "home_page_proctolog_checklist_item_parent_id_idx" ON "home_page_proctolog_checklist_item" USING btree ("_parent_id");
  CREATE INDEX "home_page_faq_items_order_idx" ON "home_page_faq_items" USING btree ("_order");
  CREATE INDEX "home_page_faq_items_parent_id_idx" ON "home_page_faq_items" USING btree ("_parent_id");
  CREATE INDEX "home_page_about_about_image_idx" ON "home_page" USING btree ("about_image_id");
  CREATE INDEX "home_page_proctolog_proctolog_image_idx" ON "home_page" USING btree ("proctolog_image_id");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE INDEX "_home_page_v_version_hero_stats_order_idx" ON "_home_page_v_version_hero_stats" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_hero_stats_parent_id_idx" ON "_home_page_v_version_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_about_checklist_item_order_idx" ON "_home_page_v_version_about_checklist_item" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_about_checklist_item_parent_id_idx" ON "_home_page_v_version_about_checklist_item" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_how_it_works_steps_order_idx" ON "_home_page_v_version_how_it_works_steps" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_how_it_works_steps_parent_id_idx" ON "_home_page_v_version_how_it_works_steps" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_proctolog_checklist_item_order_idx" ON "_home_page_v_version_proctolog_checklist_item" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_proctolog_checklist_item_parent_id_idx" ON "_home_page_v_version_proctolog_checklist_item" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_faq_items_order_idx" ON "_home_page_v_version_faq_items" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_faq_items_parent_id_idx" ON "_home_page_v_version_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_about_version_about_image_idx" ON "_home_page_v" USING btree ("version_about_image_id");
  CREATE INDEX "_home_page_v_version_proctolog_version_proctolog_image_idx" ON "_home_page_v" USING btree ("version_proctolog_image_id");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX "_home_page_v_autosave_idx" ON "_home_page_v" USING btree ("autosave");
  CREATE INDEX "about_page_values_items_order_idx" ON "about_page_values_items" USING btree ("_order");
  CREATE INDEX "about_page_values_items_parent_id_idx" ON "about_page_values_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_education_items_order_idx" ON "about_page_education_items" USING btree ("_order");
  CREATE INDEX "about_page_education_items_parent_id_idx" ON "about_page_education_items" USING btree ("_parent_id");
  CREATE INDEX "about_page_education_items_image_idx" ON "about_page_education_items" USING btree ("image_id");
  CREATE INDEX "about_page_hero_hero_image_idx" ON "about_page" USING btree ("hero_image_id");
  CREATE INDEX "about_page__status_idx" ON "about_page" USING btree ("_status");
  CREATE INDEX "_about_page_v_version_values_items_order_idx" ON "_about_page_v_version_values_items" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_values_items_parent_id_idx" ON "_about_page_v_version_values_items" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_education_items_order_idx" ON "_about_page_v_version_education_items" USING btree ("_order");
  CREATE INDEX "_about_page_v_version_education_items_parent_id_idx" ON "_about_page_v_version_education_items" USING btree ("_parent_id");
  CREATE INDEX "_about_page_v_version_education_items_image_idx" ON "_about_page_v_version_education_items" USING btree ("image_id");
  CREATE INDEX "_about_page_v_version_hero_version_hero_image_idx" ON "_about_page_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_about_page_v_version_version__status_idx" ON "_about_page_v" USING btree ("version__status");
  CREATE INDEX "_about_page_v_created_at_idx" ON "_about_page_v" USING btree ("created_at");
  CREATE INDEX "_about_page_v_updated_at_idx" ON "_about_page_v" USING btree ("updated_at");
  CREATE INDEX "_about_page_v_latest_idx" ON "_about_page_v" USING btree ("latest");
  CREATE INDEX "_about_page_v_autosave_idx" ON "_about_page_v" USING btree ("autosave");
  CREATE INDEX "contacts_page__status_idx" ON "contacts_page" USING btree ("_status");
  CREATE INDEX "_contacts_page_v_version_version__status_idx" ON "_contacts_page_v" USING btree ("version__status");
  CREATE INDEX "_contacts_page_v_created_at_idx" ON "_contacts_page_v" USING btree ("created_at");
  CREATE INDEX "_contacts_page_v_updated_at_idx" ON "_contacts_page_v" USING btree ("updated_at");
  CREATE INDEX "_contacts_page_v_latest_idx" ON "_contacts_page_v" USING btree ("latest");
  CREATE INDEX "_contacts_page_v_autosave_idx" ON "_contacts_page_v" USING btree ("autosave");
  CREATE INDEX "services_page__status_idx" ON "services_page" USING btree ("_status");
  CREATE INDEX "_services_page_v_version_version__status_idx" ON "_services_page_v" USING btree ("version__status");
  CREATE INDEX "_services_page_v_created_at_idx" ON "_services_page_v" USING btree ("created_at");
  CREATE INDEX "_services_page_v_updated_at_idx" ON "_services_page_v" USING btree ("updated_at");
  CREATE INDEX "_services_page_v_latest_idx" ON "_services_page_v" USING btree ("latest");
  CREATE INDEX "_services_page_v_autosave_idx" ON "_services_page_v" USING btree ("autosave");
  CREATE INDEX "shop_page__status_idx" ON "shop_page" USING btree ("_status");
  CREATE INDEX "_shop_page_v_version_version__status_idx" ON "_shop_page_v" USING btree ("version__status");
  CREATE INDEX "_shop_page_v_created_at_idx" ON "_shop_page_v" USING btree ("created_at");
  CREATE INDEX "_shop_page_v_updated_at_idx" ON "_shop_page_v" USING btree ("updated_at");
  CREATE INDEX "_shop_page_v_latest_idx" ON "_shop_page_v" USING btree ("latest");
  CREATE INDEX "_shop_page_v_autosave_idx" ON "_shop_page_v" USING btree ("autosave");
  CREATE INDEX "review_page_hero_stats_order_idx" ON "review_page_hero_stats" USING btree ("_order");
  CREATE INDEX "review_page_hero_stats_parent_id_idx" ON "review_page_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "review_page__status_idx" ON "review_page" USING btree ("_status");
  CREATE INDEX "_review_page_v_version_hero_stats_order_idx" ON "_review_page_v_version_hero_stats" USING btree ("_order");
  CREATE INDEX "_review_page_v_version_hero_stats_parent_id_idx" ON "_review_page_v_version_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "_review_page_v_version_version__status_idx" ON "_review_page_v" USING btree ("version__status");
  CREATE INDEX "_review_page_v_created_at_idx" ON "_review_page_v" USING btree ("created_at");
  CREATE INDEX "_review_page_v_updated_at_idx" ON "_review_page_v" USING btree ("updated_at");
  CREATE INDEX "_review_page_v_latest_idx" ON "_review_page_v" USING btree ("latest");
  CREATE INDEX "_review_page_v_autosave_idx" ON "_review_page_v" USING btree ("autosave");
  CREATE INDEX "consent_page_sections_items_order_idx" ON "consent_page_sections_items" USING btree ("_order");
  CREATE INDEX "consent_page_sections_items_parent_id_idx" ON "consent_page_sections_items" USING btree ("_parent_id");
  CREATE INDEX "consent_page__status_idx" ON "consent_page" USING btree ("_status");
  CREATE INDEX "_consent_page_v_version_sections_items_order_idx" ON "_consent_page_v_version_sections_items" USING btree ("_order");
  CREATE INDEX "_consent_page_v_version_sections_items_parent_id_idx" ON "_consent_page_v_version_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_consent_page_v_version_version__status_idx" ON "_consent_page_v" USING btree ("version__status");
  CREATE INDEX "_consent_page_v_created_at_idx" ON "_consent_page_v" USING btree ("created_at");
  CREATE INDEX "_consent_page_v_updated_at_idx" ON "_consent_page_v" USING btree ("updated_at");
  CREATE INDEX "_consent_page_v_latest_idx" ON "_consent_page_v" USING btree ("latest");
  CREATE INDEX "_consent_page_v_autosave_idx" ON "_consent_page_v" USING btree ("autosave");
  CREATE INDEX "offer_page_sections_items_order_idx" ON "offer_page_sections_items" USING btree ("_order");
  CREATE INDEX "offer_page_sections_items_parent_id_idx" ON "offer_page_sections_items" USING btree ("_parent_id");
  CREATE INDEX "offer_page__status_idx" ON "offer_page" USING btree ("_status");
  CREATE INDEX "_offer_page_v_version_sections_items_order_idx" ON "_offer_page_v_version_sections_items" USING btree ("_order");
  CREATE INDEX "_offer_page_v_version_sections_items_parent_id_idx" ON "_offer_page_v_version_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_offer_page_v_version_version__status_idx" ON "_offer_page_v" USING btree ("version__status");
  CREATE INDEX "_offer_page_v_created_at_idx" ON "_offer_page_v" USING btree ("created_at");
  CREATE INDEX "_offer_page_v_updated_at_idx" ON "_offer_page_v" USING btree ("updated_at");
  CREATE INDEX "_offer_page_v_latest_idx" ON "_offer_page_v" USING btree ("latest");
  CREATE INDEX "_offer_page_v_autosave_idx" ON "_offer_page_v" USING btree ("autosave");
  CREATE INDEX "privacy_page_sections_items_order_idx" ON "privacy_page_sections_items" USING btree ("_order");
  CREATE INDEX "privacy_page_sections_items_parent_id_idx" ON "privacy_page_sections_items" USING btree ("_parent_id");
  CREATE INDEX "privacy_page__status_idx" ON "privacy_page" USING btree ("_status");
  CREATE INDEX "_privacy_page_v_version_sections_items_order_idx" ON "_privacy_page_v_version_sections_items" USING btree ("_order");
  CREATE INDEX "_privacy_page_v_version_sections_items_parent_id_idx" ON "_privacy_page_v_version_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_privacy_page_v_version_version__status_idx" ON "_privacy_page_v" USING btree ("version__status");
  CREATE INDEX "_privacy_page_v_created_at_idx" ON "_privacy_page_v" USING btree ("created_at");
  CREATE INDEX "_privacy_page_v_updated_at_idx" ON "_privacy_page_v" USING btree ("updated_at");
  CREATE INDEX "_privacy_page_v_latest_idx" ON "_privacy_page_v" USING btree ("latest");
  CREATE INDEX "_privacy_page_v_autosave_idx" ON "_privacy_page_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "services_includes" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "guides" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "consultations" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "contacts_global" CASCADE;
  DROP TABLE "home_page_hero_stats" CASCADE;
  DROP TABLE "home_page_about_checklist_item" CASCADE;
  DROP TABLE "home_page_how_it_works_steps" CASCADE;
  DROP TABLE "home_page_proctolog_checklist_item" CASCADE;
  DROP TABLE "home_page_faq_items" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "_home_page_v_version_hero_stats" CASCADE;
  DROP TABLE "_home_page_v_version_about_checklist_item" CASCADE;
  DROP TABLE "_home_page_v_version_how_it_works_steps" CASCADE;
  DROP TABLE "_home_page_v_version_proctolog_checklist_item" CASCADE;
  DROP TABLE "_home_page_v_version_faq_items" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "about_page_values_items" CASCADE;
  DROP TABLE "about_page_education_items" CASCADE;
  DROP TABLE "about_page" CASCADE;
  DROP TABLE "_about_page_v_version_values_items" CASCADE;
  DROP TABLE "_about_page_v_version_education_items" CASCADE;
  DROP TABLE "_about_page_v" CASCADE;
  DROP TABLE "contacts_page" CASCADE;
  DROP TABLE "_contacts_page_v" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "_services_page_v" CASCADE;
  DROP TABLE "shop_page" CASCADE;
  DROP TABLE "_shop_page_v" CASCADE;
  DROP TABLE "review_page_hero_stats" CASCADE;
  DROP TABLE "review_page" CASCADE;
  DROP TABLE "_review_page_v_version_hero_stats" CASCADE;
  DROP TABLE "_review_page_v" CASCADE;
  DROP TABLE "consent_page_sections_items" CASCADE;
  DROP TABLE "consent_page" CASCADE;
  DROP TABLE "_consent_page_v_version_sections_items" CASCADE;
  DROP TABLE "_consent_page_v" CASCADE;
  DROP TABLE "offer_page_sections_items" CASCADE;
  DROP TABLE "offer_page" CASCADE;
  DROP TABLE "_offer_page_v_version_sections_items" CASCADE;
  DROP TABLE "_offer_page_v" CASCADE;
  DROP TABLE "privacy_page_sections_items" CASCADE;
  DROP TABLE "privacy_page" CASCADE;
  DROP TABLE "_privacy_page_v_version_sections_items" CASCADE;
  DROP TABLE "_privacy_page_v" CASCADE;
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_services_color";
  DROP TYPE "public"."enum_guides_category";
  DROP TYPE "public"."enum_consultations_messenger";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum_about_page_values_items_icon";
  DROP TYPE "public"."enum_about_page_status";
  DROP TYPE "public"."enum__about_page_v_version_values_items_icon";
  DROP TYPE "public"."enum__about_page_v_version_status";
  DROP TYPE "public"."enum_contacts_page_status";
  DROP TYPE "public"."enum__contacts_page_v_version_status";
  DROP TYPE "public"."enum_services_page_status";
  DROP TYPE "public"."enum__services_page_v_version_status";
  DROP TYPE "public"."enum_shop_page_status";
  DROP TYPE "public"."enum__shop_page_v_version_status";
  DROP TYPE "public"."enum_review_page_status";
  DROP TYPE "public"."enum__review_page_v_version_status";
  DROP TYPE "public"."enum_consent_page_status";
  DROP TYPE "public"."enum__consent_page_v_version_status";
  DROP TYPE "public"."enum_offer_page_status";
  DROP TYPE "public"."enum__offer_page_v_version_status";
  DROP TYPE "public"."enum_privacy_page_status";
  DROP TYPE "public"."enum__privacy_page_v_version_status";`)
}
