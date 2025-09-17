-- CreateTable
CREATE TABLE "hello-prisma"."Items" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hello-prisma"."ItemCords" (
    "id" SERIAL NOT NULL,
    "cordx" INTEGER NOT NULL,
    "cordy" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "ItemCords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hello-prisma"."ItemCords" ADD CONSTRAINT "ItemCords_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "hello-prisma"."Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
