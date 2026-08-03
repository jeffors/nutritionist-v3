import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_menu_guides_icon" AS ENUM('Stethoscope', 'Leaf', 'Salad', 'Pill', 'Activity', 'Dna', 'Heart', 'Brain', 'Scale', 'Microscope');
  CREATE TABLE "menu_guides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"icon" "enum_menu_guides_icon" NOT NULL,
  	"badge" varchar,
  	"reading_time" varchar DEFAULT '7 мин',
  	"description" varchar,
  	"image_id" integer,
  	"content" jsonb NOT NULL,
  	"is_coming_soon" boolean DEFAULT false,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "menu_guides_id" integer;
  ALTER TABLE "menu_guides" ADD CONSTRAINT "menu_guides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "menu_guides_slug_idx" ON "menu_guides" USING btree ("slug");
  CREATE INDEX "menu_guides_image_idx" ON "menu_guides" USING btree ("image_id");
  CREATE INDEX "menu_guides_updated_at_idx" ON "menu_guides" USING btree ("updated_at");
  CREATE INDEX "menu_guides_created_at_idx" ON "menu_guides" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_guides_fk" FOREIGN KEY ("menu_guides_id") REFERENCES "public"."menu_guides"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_menu_guides_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_guides_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "menu_guides" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "menu_guides" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_menu_guides_fk";
  
  DROP INDEX "payload_locked_documents_rels_menu_guides_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "menu_guides_id";
  DROP TYPE "public"."enum_menu_guides_icon";`)
}
