-- DropForeignKey
ALTER TABLE "hello-prisma"."Score" DROP CONSTRAINT "Score_userId_fkey";

-- AlterTable
ALTER TABLE "Score" ALTER COLUMN "score" SET DATA TYPE DOUBLE PRECISION;
