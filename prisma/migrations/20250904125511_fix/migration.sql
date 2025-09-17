-- DropForeignKey
ALTER TABLE "hello-prisma"."ItemCords" DROP CONSTRAINT "ItemCords_itemId_fkey";

-- AddForeignKey
ALTER TABLE "hello-prisma"."ItemCords" ADD CONSTRAINT "ItemCords_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "hello-prisma"."Items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
