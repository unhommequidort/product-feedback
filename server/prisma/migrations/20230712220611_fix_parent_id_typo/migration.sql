/*
  Warnings:

  - You are about to drop the column `parentid` on the `comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_parentid_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "parentid",
ADD COLUMN     "parentId" UUID;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
