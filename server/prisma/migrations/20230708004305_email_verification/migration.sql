/*
  Warnings:

  - A unique constraint covering the columns `[email,verification_code,passwordResetToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_email_verification_code_idx";

-- DropIndex
DROP INDEX "users_email_verification_code_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "passwordResetAt" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT,
ADD COLUMN     "provider" TEXT;

-- CreateIndex
CREATE INDEX "users_email_verification_code_passwordResetToken_idx" ON "users"("email", "verification_code", "passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_verification_code_passwordResetToken_key" ON "users"("email", "verification_code", "passwordResetToken");
