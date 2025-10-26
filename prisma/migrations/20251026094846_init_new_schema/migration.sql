-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cordx1" INTEGER NOT NULL,
    "cordy1" INTEGER NOT NULL,
    "cordx2" INTEGER NOT NULL,
    "cordy2" INTEGER NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "score" DOUBLE PRECISION,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "TempUser" (
    "tempUserId" SERIAL NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TempUser_pkey" PRIMARY KEY ("tempUserId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
