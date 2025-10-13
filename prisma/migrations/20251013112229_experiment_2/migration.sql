/*
  Warnings:

  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `score` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "score" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "hello-prisma"."Score";

-- CreateTable
CREATE TABLE "TempUser" (
    "userId" SERIAL NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TempUser_pkey" PRIMARY KEY ("userId")
);
