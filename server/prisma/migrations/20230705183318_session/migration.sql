-- AlterTable
ALTER TABLE "users" ADD COLUMN     "salt" TEXT NOT NULL DEFAULT gen_salt('bf', 8),
ALTER COLUMN "password" SET DATA TYPE VARCHAR;

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");
