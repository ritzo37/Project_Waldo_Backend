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
    if (userId) {
      const currUser = await db.getUserById(userId);
      if (!currUser.score) {
        await db.updateUserScore(userId, timeElasped);
      } else {
        if (currUser.score > timeElasped) {
          await db.updateUserScore(userId, timeElasped);
        }
      }
    } else {
      if (req.session.tempUserId) {
        const currTempUser = await db.getTempUser(req.session.tempUserId);
        if (currTempUser.score > timeElasped) {
          await db.updateTempUserScore(req.session.tempUserId, timeElasped);
        }
      } else {
        const tempUser = await db.addTempUser(timeElasped);
        const tempUserId = tempUser.tempUserId;
        req.session.tempUserId = tempUserId;
      }
    }
    req.session.start = null;
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
    res.status(409).json({
      message: "There already exists a user with the same name",
    });
  }
}

async function handleLogin(req, res) {
  const { username, password } = req.body;
  const user = await db.getUserByUsername(username);
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
      const tempUserId = req.session.tempUserId;
      if (tempUserId) {
        const tempUser = await db.getTempUser(tempUserId);
        const user = await db.getUserById(userId);
        if (user.score) {
          if (user.score > tempUser.score) {
            await db.updateUserScore(userId, tempUser.score);
          }
        } else {
          db.updateUserScore(userId, tempUser.score);
        }
        await db.deleteTempUserById(tempUserId);
        req.session.tempUserId = null;
      }
      jwt.sign(
        { userId },
        process.env.SECRET_KEY,
        { algorithm: "HS256", expiresIn: "7d" },
        function (err, token) {
          if (err) {
            return res.status(500).json({
              message: "Something bad happened please try again :(",
            });
          }
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 604800000, // 7days
            sameSite: "none",
            path: "/",
            secure: "true",
          });
          res.status(200).json({
            message: "Correct info is sent by you !",
          });
        }
      );
    }
  }
}

async function handleUserScores(req, res) {
  try {
    const data = await db.getUserScores();
    const userId = res.locals.userId;
    let dataToSend = data;
    if (userId) {
      dataToSend = data.map((currItem) => {
        if (currItem.userId === userId) {
          return {
            ...currItem,
            isLoggedIn: true,
          };
        } else {
          return currItem;
        }
      });
    }
    res.status(200).json({
      data: dataToSend,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something bad happened please try again!",
    });
  }
}

async function handleTempScores(req, res) {
  try {
    const data = await db.getTempScores();
    res.status(200).json({
      data,
    });
  } catch (e) {
    res.status(500).json({
      message: "Something bad happened please try again!",
    });
  }
}

async function handleGetItems(req, res) {
  try {
    const data = await db.getItems();
    let dataToSend = [];
    for (let i = data.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
    for (let i = 0; i < 3; i++) dataToSend.push(data[i]);
    res.status(200).json({
      dataToSend,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something bad happened please try again!",
    });
  }
}

async function handleLogout(req, res) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      message: "Please login first!",
    });
  } else {
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: new Date(0),
      sameSite: "none",
      path: "/",
      secure: "true",
    });
    res.status(200).json("Logged out!");
  }
}

async function handleLoginStatus(req, res) {
  const token = req.cookies.token;
  if (token) {
    res.status(200).json("You are logged in !");
  } else {
    res.status(401).json("Nope you aren't logged in!");
  }
}
module.exports = {
  handleCords,
  handleStart,
  handleStop,
  handleSignUp,
  handleLogin,
  handleUserScores,
  handleTempScores,
  handleGetItems,
  handleLogout,
  handleLoginStatus,
};
