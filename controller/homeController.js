const db = require("../prismaQuery");
async function handleCords(req, res) {
  const itemName = req.params.itemName;
  const { cordX, cordY } = req.body.imgCords;
  const currItem = await db.getItem(itemName);
  let found = false;
  const x1 = currItem.cordx1;
  const x2 = currItem.cordx2;
  const y1 = currItem.cordy1;
  const y2 = currItem.cordy2;
  if (cordX >= x1 && cordX <= x2 && cordY >= y1 && cordY <= y2) {
    found = true;
  }
  if (found) {
    res.status(200).json({ message: `You found ${itemName}` });
  } else {
    res.status(400).json({ message: "No match found" });
  }
}

async function handleStart(req, res) {
  const currTime = Date.now();
  if (!req.session.start) req.session.start = currTime;
  res.status(200).json({ message: "Game has started" });
}

async function handleStop(req, res) {
  if (req.session.start) {
    const timeNow = Date.now();
    const timeElasped = (timeNow - req.session.start) / 1000;
    req.session.destroy();
    res.status(200).json(timeElasped);
  } else {
    res.status(403).json({ message: "You haven't even started the game yet!" });
  }
}

module.exports = {
  handleCords,
  handleStart,
  handleStop,
};
