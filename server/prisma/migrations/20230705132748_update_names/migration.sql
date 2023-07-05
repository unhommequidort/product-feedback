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
