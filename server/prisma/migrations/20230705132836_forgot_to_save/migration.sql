/*
  Warnings:

  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `upvote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_created_by_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_feedback_id_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_parentid_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_category_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_created_by_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_status_fkey";

-- DropForeignKey
ALTER TABLE "upvote" DROP CONSTRAINT "upvote_feedback_id_fkey";

-- DropForeignKey
ALTER TABLE "upvote" DROP CONSTRAINT "upvote_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_role_id_fkey";

-- DropForeignKey
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_user_id_fkey";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "comment";

-- DropTable
DROP TABLE "feedback";

-- DropTable
DROP TABLE "role";

-- DropTable
DROP TABLE "status";

-- DropTable
DROP TABLE "upvote";

-- DropTable
DROP TABLE "user_role";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Category" (
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "body" VARCHAR NOT NULL,
    "created_by" UUID NOT NULL,
    "feedback_id" UUID NOT NULL,
    "parentid" UUID,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" UUID NOT NULL,
    "title" VARCHAR(240) NOT NULL,
    "detail" VARCHAR NOT NULL,
    "category" VARCHAR(30) NOT NULL,
    "status" VARCHAR(30) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Upvote" (
    "user_id" UUID NOT NULL,
    "feedback_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Upvote_pkey" PRIMARY KEY ("user_id","feedback_id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" VARCHAR(30) NOT NULL,
    "first_name" VARCHAR(30) NOT NULL,
    "last_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentid_fkey" FOREIGN KEY ("parentid") REFERENCES "Comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_status_fkey" FOREIGN KEY ("status") REFERENCES "Status"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
