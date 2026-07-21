import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_page_nutrition_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "_home_page_v_version_nutrition_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "home_page" ADD COLUMN "nutrition_heading" varchar DEFAULT 'Почему питание — основа здоровья';
  ALTER TABLE "home_page" ADD COLUMN "nutrition_paragraph1" varchar DEFAULT 'Правильно подобранный рацион — это не просто топливо для организма, а мощный терапевтический инструмент. Наше самочувствие, уровень энергии и даже хронические процессы напрямую зависят от того, что оказывается в нашей тарелке.';
  ALTER TABLE "home_page" ADD COLUMN "nutrition_paragraph2" varchar DEFAULT 'Коррекция питания позволяет не просто маскировать симптомы, а работать с первопричиной недомоганий, мягко восстанавливая баланс и возвращая организму его естественную силу.';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_nutrition_heading" varchar DEFAULT 'Почему питание — основа здоровья';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_nutrition_paragraph1" varchar DEFAULT 'Правильно подобранный рацион — это не просто топливо для организма, а мощный терапевтический инструмент. Наше самочувствие, уровень энергии и даже хронические процессы напрямую зависят от того, что оказывается в нашей тарелке.';
  ALTER TABLE "_home_page_v" ADD COLUMN "version_nutrition_paragraph2" varchar DEFAULT 'Коррекция питания позволяет не просто маскировать симптомы, а работать с первопричиной недомоганий, мягко восстанавливая баланс и возвращая организму его естественную силу.';
  ALTER TABLE "home_page_nutrition_cards" ADD CONSTRAINT "home_page_nutrition_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_version_nutrition_cards" ADD CONSTRAINT "_home_page_v_version_nutrition_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_nutrition_cards_order_idx" ON "home_page_nutrition_cards" USING btree ("_order");
  CREATE INDEX "home_page_nutrition_cards_parent_id_idx" ON "home_page_nutrition_cards" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_nutrition_cards_order_idx" ON "_home_page_v_version_nutrition_cards" USING btree ("_order");
  CREATE INDEX "_home_page_v_version_nutrition_cards_parent_id_idx" ON "_home_page_v_version_nutrition_cards" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_page_nutrition_cards" CASCADE;
  DROP TABLE "_home_page_v_version_nutrition_cards" CASCADE;
  ALTER TABLE "home_page" DROP COLUMN "nutrition_heading";
  ALTER TABLE "home_page" DROP COLUMN "nutrition_paragraph1";
  ALTER TABLE "home_page" DROP COLUMN "nutrition_paragraph2";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_nutrition_heading";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_nutrition_paragraph1";
  ALTER TABLE "_home_page_v" DROP COLUMN "version_nutrition_paragraph2";`)
}
