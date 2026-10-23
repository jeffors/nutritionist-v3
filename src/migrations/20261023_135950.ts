import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "consultations" ADD COLUMN "service" varchar;
   UPDATE "consultations" SET "service" = 'Не указана' WHERE "service" IS NULL;
   ALTER TABLE "consultations" ALTER COLUMN "service" SET NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "consultations" DROP COLUMN "service";`)
}
