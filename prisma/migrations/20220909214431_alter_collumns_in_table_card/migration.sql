/*
  Warnings:

  - Changed the type of `type` on the `Card` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('credit', 'debit', 'debit_credit');

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "numero" SET DATA TYPE VARCHAR,
ALTER COLUMN "password" SET DATA TYPE VARCHAR,
ALTER COLUMN "securityCode" SET DATA TYPE VARCHAR,
DROP COLUMN "type",
ADD COLUMN     "type" "CardType" NOT NULL;

-- AlterTable
ALTER TABLE "Network" ALTER COLUMN "password" SET DATA TYPE VARCHAR;

-- DropEnum
DROP TYPE "cardType";
