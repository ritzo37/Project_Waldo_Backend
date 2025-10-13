/*
  Warnings:

  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "hello-prisma"."Score" DROP CONSTRAINT "Score_userId_fkey";

-- DropTable
DROP TABLE "hello-prisma"."Score";

-- DropTable
DROP TABLE "hello-prisma"."User";
