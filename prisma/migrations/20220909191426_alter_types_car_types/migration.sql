/*
  Warnings:

  - The values [credito,debito,ambos] on the enum `cardType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "cardType_new" AS ENUM ('credit', 'debit', 'debit_credit');
ALTER TABLE "Card" ALTER COLUMN "type" TYPE "cardType_new" USING ("type"::text::"cardType_new");
ALTER TYPE "cardType" RENAME TO "cardType_old";
ALTER TYPE "cardType_new" RENAME TO "cardType";
DROP TYPE "cardType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "type" SET DEFAULT 'debit_credit';
