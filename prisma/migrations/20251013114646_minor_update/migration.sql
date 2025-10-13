/*
  Warnings:

  - The primary key for the `TempUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `TempUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TempUser" DROP CONSTRAINT "TempUser_pkey",
DROP COLUMN "userId",
ADD COLUMN     "tempUserId" SERIAL NOT NULL,
ADD CONSTRAINT "TempUser_pkey" PRIMARY KEY ("tempUserId");
