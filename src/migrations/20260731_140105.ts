import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_recipes_category" AS ENUM('breakfast', 'lunch', 'dinner', 'dessert', 'snacks', 'drinks');
  CREATE TYPE "public"."enum_recipes_difficulty" AS ENUM('easy', 'medium', 'hard');
  CREATE TABLE "recipes_ingredients" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"amount" varchar NOT NULL,
  	"unit" varchar
  );
  
  CREATE TABLE "recipes_instructions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step_number" numeric,
  	"description" varchar NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "recipes_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "recipes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"category" "enum_recipes_category" NOT NULL,
  	"prep_time" numeric,
  	"cook_time" numeric,
  	"servings" numeric DEFAULT 1,
  	"difficulty" "enum_recipes_difficulty" DEFAULT 'medium',
  	"nutrition_calories" numeric,
  	"nutrition_protein" numeric,
  	"nutrition_fat" numeric,
  	"nutrition_carbs" numeric,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "recipes_id" integer;
  ALTER TABLE "home_page" ADD COLUMN "recipes_heading" varchar DEFAULT 'Рецепты и готовые меню';
  ALTER TABLE "home_page" ADD COLUMN "recipes_description" varchar DEFAULT 'Сбалансированное питание может быть невероятно вкусным. Выберите бесплатные рецепты или воспользуйтесь нашими специализированными меню-гайдами.';
  ALTER TABLE "home_page" ADD COLUMN "recipes_cta_label" varchar DEFAULT 'Перейти в библиотеку результатов';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_recipes_heading" varchar DEFAULT 'Рецепты и готовые меню';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_recipes_description" varchar DEFAULT 'Сбалансированное питание может быть невероятно вкусным. Выберите бесплатные рецепты или воспользуйтесь нашими специализированными меню-гайдами.';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_recipes_cta_label" varchar DEFAULT 'Перейти в библиотеку результатов';
  ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_instructions" ADD CONSTRAINT "recipes_instructions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "recipes_instructions" ADD CONSTRAINT "recipes_instructions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes_tags" ADD CONSTRAINT "recipes_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "recipes" ADD CONSTRAINT "recipes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "recipes_ingredients_order_idx" ON "recipes_ingredients" USING btree ("_order");
  CREATE INDEX "recipes_ingredients_parent_id_idx" ON "recipes_ingredients" USING btree ("_parent_id");
  CREATE INDEX "recipes_instructions_order_idx" ON "recipes_instructions" USING btree ("_order");
  CREATE INDEX "recipes_instructions_parent_id_idx" ON "recipes_instructions" USING btree ("_parent_id");
  CREATE INDEX "recipes_instructions_image_idx" ON "recipes_instructions" USING btree ("image_id");
  CREATE INDEX "recipes_tags_order_idx" ON "recipes_tags" USING btree ("_order");
  CREATE INDEX "recipes_tags_parent_id_idx" ON "recipes_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "recipes_slug_idx" ON "recipes" USING btree ("slug");
  CREATE INDEX "recipes_image_idx" ON "recipes" USING btree ("image_id");
  CREATE INDEX "recipes_updated_at_idx" ON "recipes" USING btree ("updated_at");
  CREATE INDEX "recipes_created_at_idx" ON "recipes" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recipes_fk" FOREIGN KEY ("recipes_id") REFERENCES "public"."recipes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_recipes_id_idx" ON "payload_locked_documents_rels" USING btree ("recipes_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "recipes_ingredients" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_instructions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "recipes" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "recipes_ingredients" CASCADE;
  DROP TABLE "recipes_instructions" CASCADE;
  DROP TABLE "recipes_tags" CASCADE;
  DROP TABLE "recipes" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recipes_fk";
  
  DROP INDEX "payload_locked_documents_rels_recipes_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "recipes_id";
  ALTER TABLE "home_page" DROP COLUMN "recipes_heading";
  ALTER TABLE "home_page" DROP COLUMN "recipes_description";
  ALTER TABLE "home_page" DROP COLUMN "recipes_cta_label";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_recipes_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_recipes_description";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_recipes_cta_label";
  DROP TYPE "public"."enum_recipes_category";
  DROP TYPE "public"."enum_recipes_difficulty";`)
}
