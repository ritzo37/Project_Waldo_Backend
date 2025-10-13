-- CreateTable
CREATE TABLE "hello-prisma"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hello-prisma"."Score" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Score_userId_key" ON "hello-prisma"."Score"("userId");

-- AddForeignKey
ALTER TABLE "hello-prisma"."Score" ADD CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "hello-prisma"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
