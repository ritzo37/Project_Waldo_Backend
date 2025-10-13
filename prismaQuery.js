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

async function getUser(username) {
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

async function addScore(userId, score) {
  if (!userId) {
    await prisma.score.create({
      data: {
        score,
      },
    });
  } else {
    await prisma.score.create({
      data: {
        userId: userId,
        score: score,
      },
    });
  }
}

async function updateScore(userId, score) {
  return await prisma.score.update({
    data: {
      score,
    },
    where: {
      userId,
    },
  });
}

async function getScore(userId) {
  return await prisma.score.findUnique({
    where: {
      userId,
    },
  });
}

async function getScores() {
  const data = await prisma.score.findMany({
    orderBy: {
      score: "asc",
    },
  });
  return data;
}

module.exports = {
  addItem,
  getItem,
  getUser,
  addUser,
  getUserById,
  addScore,
  updateScore,
  getScore,
  getScores,
};
