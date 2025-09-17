const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();

async function addItem(itemName, cordx1, cordx2, cordy1, cordy2) {
  await prisma.items.create({
    data: {
      name: itemName,
      cordx1,
      cordx2,
      cordy1,
      cordy2,
    },
  });
}
async function getItem(insertedItem) {
  const data = await prisma.items.findMany({
    where: {
      name: insertedItem,
    },
  });
  return data[0];
}

module.exports = { addItem, getItem };
