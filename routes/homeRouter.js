const express = require("express");
const homeController = require("../controller/homeController");
const homeRouter = express.Router();
homeRouter.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});
homeRouter.post("/cordsCheck/:itemName", homeController.handleCords);
homeRouter.get("/start", homeController.handleStart);
homeRouter.get("/stop", homeController.handleStop);
module.exports = homeRouter;
