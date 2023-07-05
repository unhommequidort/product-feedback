/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Upvote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_feedback_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parentid_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_category_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_status_fkey";

-- DropForeignKey
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_feedback_id_fkey";

-- DropForeignKey
ALTER TABLE "Upvote" DROP CONSTRAINT "Upvote_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_role_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_user_id_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Feedback";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Status";

-- DropTable
DROP TABLE "Upvote";

-- DropTable
DROP TABLE "UserRole";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "category" (
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "body" VARCHAR NOT NULL,
    "created_by" UUID NOT NULL,
    "feedback_id" UUID NOT NULL,
    "parentid" UUID,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID NOT NULL,
    "title" VARCHAR(240) NOT NULL,
    "detail" VARCHAR NOT NULL,
    "category" VARCHAR(30) NOT NULL,
    "status" VARCHAR(30) NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "status_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "upvote" (
    "user_id" UUID NOT NULL,
    "feedback_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "upvote_pkey" PRIMARY KEY ("user_id","feedback_id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR(30) NOT NULL,
    "first_name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "feedback"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_parentid_fkey" FOREIGN KEY ("parentid") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_category_fkey" FOREIGN KEY ("category") REFERENCES "category"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_status_fkey" FOREIGN KEY ("status") REFERENCES "status"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "upvote" ADD CONSTRAINT "upvote_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "feedback"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "upvote" ADD CONSTRAINT "upvote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
