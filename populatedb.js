import db from "./prismaQuery.js";

async function addItem(item) {
  await db.addItem(
    item.itemName,
    item.cordx1,
    item.cordx2,
    item.cordy1,
    item.cordy2
  );
}
const item1 = {
  itemName: "sleepingDragon",
  cordx1: 616,
  cordy1: 723,
  cordx2: 633,
  cordy2: 738,
};

const item2 = {
  itemName: "standingDragon",
  cordx1: 294,
  cordy1: 101,
  cordx2: 328,
  cordy2: 132,
};

const item3 = {
  itemName: "shipGuy",
  cordx1: 32,
  cordy1: 593,
  cordx2: 40,
  cordy2: 603,
};

const item4 = {
  itemName: "pinky",
  cordx1: 259,
  cordy1: 1082,
  cordx2: 265,
  cordy2: 1088,
};

const item5 = {
  itemName: "rope",
  cordx1: 209,
  cordy1: 1210,
  cordx2: 220,
  cordy2: 1211,
};

const item6 = {
  itemName: "sailor",
  cordx1: 38,
  cordy1: 1181,
  cordx2: 45,
  cordy2: 1189,
};

const item7 = {
  itemName: "blowingFireGuy",
  cordx1: 99,
  cordy1: 490,
  cordx2: 107,
  cordy2: 500,
};

const item8 = {
  itemName: "thief",
  cordx1: 583,
  cordy1: 267,
  cordx2: 590,
  cordy2: 274,
};

const item9 = {
  itemName: "staircaseGuy",
  cordx1: 570,
  cordy1: 378,
  cordx2: 580,
  cordy2: 392,
};

addItem(item1);
addItem(item2);
addItem(item3);
addItem(item4);
addItem(item5);
addItem(item6);
addItem(item7);
addItem(item8);
addItem(item9);
