import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_consultations_messenger" ADD VALUE 'max';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "consultations" ALTER COLUMN "messenger" SET DATA TYPE text;
  DROP TYPE "public"."enum_consultations_messenger";
  CREATE TYPE "public"."enum_consultations_messenger" AS ENUM('whatsapp', 'telegram');
  ALTER TABLE "consultations" ALTER COLUMN "messenger" SET DATA TYPE "public"."enum_consultations_messenger" USING "messenger"::"public"."enum_consultations_messenger";`)
}
