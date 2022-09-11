-- DropIndex
DROP INDEX "Card_title_key";

-- DropIndex
DROP INDEX "Credential_title_key";

-- DropIndex
DROP INDEX "Document_title_key";

-- DropIndex
DROP INDEX "Network_title_key";

-- DropIndex
DROP INDEX "Note_title_key";

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "title" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Credential" ALTER COLUMN "title" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "title" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Network" ALTER COLUMN "title" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "title" SET DATA TYPE TEXT;
