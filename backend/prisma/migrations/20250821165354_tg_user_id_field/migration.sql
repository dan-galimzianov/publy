/*
  Warnings:

  - Changed the type of `tgUserId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "tgUserId",
ADD COLUMN     "tgUserId" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_tgUserId_key" ON "public"."User"("tgUserId");
