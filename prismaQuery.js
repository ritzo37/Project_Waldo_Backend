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

async function getItems() {
  return prisma.items.findMany();
}

async function getUserByUsername(username) {
  const data = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return data;
}

async function getUserById(userId) {
  return await prisma.user.findUnique({
    where: {
      userId,
    },
  });
}

async function addUser(username, password) {
  await prisma.user.create({
    data: {
      username,
      password,
    },
  });
}

async function addTempUser(timeElasped) {
  return await prisma.tempUser.create({
    data: {
      score: timeElasped,
    },
  });
}

async function updateUserScore(userId, score) {
  return await prisma.user.update({
    data: {
      score,
    },
    where: {
      userId,
    },
  });
}

async function updateTempUserScore(tempUserId, score) {
  await prisma.tempUser.update({
    data: {
      score,
    },
    where: {
      tempUserId,
    },
  });
}

async function getUserScore(userId) {
  return await prisma.user.findUnique({
    where: {
      userId,
    },
  });
}

async function getTempUser(tempUserId) {
  return await prisma.tempUser.findUnique({
    where: {
      tempUserId,
    },
  });
}
async function getUserScores() {
  const data = await prisma.user.findMany({
    orderBy: {
      score: "asc",
    },
    select: {
      username: true,
      score: true,
      userId: true,
    },
  });
  return data;
}

async function getTempScores() {
  const data = await prisma.tempUser.findMany({
    orderBy: {
      score: "asc",
    },
  });
  return data;
}

async function deleteTempUserById(tempUserId) {
  await prisma.tempUser.delete({
    where: {
      tempUserId,
    },
  });
}

module.exports = {
  addItem,
  getItem,
  getUserById,
  getUserByUsername,
  addUser,
  addTempUser,
  getUserById,
  updateUserScore,
  updateTempUserScore,
  getUserScore,
  getTempUser,
  getUserScores,
  getTempScores,
  deleteTempUserById,
  getItems,
};
