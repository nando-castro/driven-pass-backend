-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('rg', 'cnh');

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "type" "DocumentType" NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "issueDate" VARCHAR(255) NOT NULL,
    "validity" VARCHAR(255) NOT NULL,
    "registerNumber" VARCHAR(255) NOT NULL,
    "issuer" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_title_key" ON "Document"("title");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
