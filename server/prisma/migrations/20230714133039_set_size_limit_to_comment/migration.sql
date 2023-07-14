/*
  Warnings:

  - You are about to alter the column `body` on the `comment` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(250)`.

*/
-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "body" SET DATA TYPE VARCHAR(250);
