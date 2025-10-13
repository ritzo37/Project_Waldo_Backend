const db = require("../prismaQuery");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

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
    const userId = res.locals.userId;
    if (!userId) {
      await db.addScore(userId, timeElasped);
    } else {
      const currScore = await db.getScore(userId);
      if (!currScore) {
        await db.addScore(userId, timeElasped);
      } else {
        if (currScore.score > timeElasped) {
          await db.updateScore(userId, timeElasped);
        }
      }
    }
    await req.session.destroy();
    res.status(200).json(timeElasped);
  } else {
    res.status(403).json({ message: "You haven't even started the game yet!" });
  }
}

async function handleSignUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.addUser(username, hashedPassword);
    res.status(200).json({
      message: "Sucessfully Created The User",
    });
  } catch (err) {
    console.log(err);
    res.status(409).json({
      message: "There already exists a user with the same name",
    });
  }
}

async function handleLogin(req, res) {
  const { username, password } = req.body;
  const user = await db.getUser(username);
  if (!user) {
    res.status(404).json({
      message: "The user doesn't exist!",
    });
  } else {
    const fetchedPassword = user.password;
    const match = await bcrypt.compare(password, fetchedPassword);
    if (!match) {
      res.status(401).json({
        message: "The password doesn't match",
      });
    } else {
      const userId = user.userId;
      jwt.sign(
        { userId },
        process.env.SECRET_KEY,
        { algorithm: "HS256" },
        function (err, token) {
          if (err) {
            res.status(500).json({
              message: "Something bad happened please try again :(",
            });
          }
          res.status(200).json({
            message: "Correct info is sent by you !",
            token: token,
          });
        }
      );
    }
  }
}

async function handleGetScores(req, res) {
  try {
    const data = await db.getScores();
    res.status(200).json({
      data,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something bad happened please try again!",
    });
  }
}

module.exports = {
  handleCords,
  handleStart,
  handleStop,
  handleSignUp,
  handleLogin,
  handleGetScores,
};
