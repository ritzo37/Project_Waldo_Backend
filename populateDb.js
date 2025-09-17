const db = require("./prismaQuery");
async function populateDb(item) {
  await db.addItem(
    item.name,
    item.cordx1,
    item.cordx2,
    item.cordy1,
    item.cordy2
  );
}

const item1 = {
  name: "sailor",
  cordx1: 37,
  cordy1: 1173,
  cordx2: 48,
  cordy2: 1189,
};

const item2 = {
  name: "sleepingDragon",
  cordx1: 614,
  cordy1: 727,
  cordx2: 631,
  cordy2: 736,
};

const item3 = {
  name: "thief",
  cordx1: 582,
  cordy1: 261,
  cordx2: 593,
  cordy2: 274,
};
