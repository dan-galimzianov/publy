/*
  Warnings:

  - You are about to drop the `PostFormat` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Prompt" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."PostFormat";

-- CreateTable
CREATE TABLE "public"."PostFormatPrompt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PostFormatPrompt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Prompt" ADD CONSTRAINT "Prompt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
