import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "reviews" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "reviews" ALTER COLUMN "service" DROP NOT NULL;
  ALTER TABLE "reviews" ALTER COLUMN "is_active" SET DEFAULT 'false';
  ALTER TABLE "reviews" ADD COLUMN "photo_id" integer;
  ALTER TABLE "reviews" ADD COLUMN "order" numeric DEFAULT 100;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "reviews_photo_idx" ON "reviews" USING btree ("photo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "reviews" DROP CONSTRAINT "reviews_photo_id_media_id_fk";
  
  DROP INDEX "reviews_photo_idx";
  ALTER TABLE "reviews" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "reviews" ALTER COLUMN "service" SET NOT NULL;
  ALTER TABLE "reviews" ALTER COLUMN "is_active" SET DEFAULT 'true';
  ALTER TABLE "reviews" DROP COLUMN "photo_id";
  ALTER TABLE "reviews" DROP COLUMN "order";`)
}
