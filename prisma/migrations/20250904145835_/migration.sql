/*
  Warnings:

  - You are about to drop the `ItemCords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "hello-prisma"."ItemCords" DROP CONSTRAINT "ItemCords_itemId_fkey";

-- AlterTable
ALTER TABLE "hello-prisma"."Items" ADD COLUMN     "cordx1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cordx2" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cordy1" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "cordy2" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "hello-prisma"."ItemCords";
