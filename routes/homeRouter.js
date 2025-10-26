const express = require("express");
const homeController = require("../controller/homeController");
const homeRouter = express.Router({ mergeParams: true });
const validateUserNameAndPassword = require("../errorValidation");
const middlewares = require("../middlewares");

homeRouter.post("/cordsCheck/:itemName", homeController.handleCords);
homeRouter.get("/start", homeController.handleStart);
homeRouter.get("/stop", middlewares.isAuthenticated, homeController.handleStop);
homeRouter.post(
  "/sign-up",
  validateUserNameAndPassword,
  homeController.handleSignUp
);
homeRouter.get("/getItems", homeController.handleGetItems);
homeRouter.post("/log-in", homeController.handleLogin);
homeRouter.get("/authRoute", middlewares.isAuthenticated, (req, res) => {
  res.json("authenitcation works!");
});
homeRouter.get(
  "/allUserScores",
  middlewares.isAuthenticated,
  homeController.handleUserScores
);
homeRouter.get("/allTempScores", homeController.handleTempScores);
homeRouter.get("/logout", homeController.handleLogout);
homeRouter.get("/login-status", homeController.handleLoginStatus);
homeRouter.get("/", (req, res) => {
  res.json(
    "Hey! The server is up. Please open the frontend repo and access the app."
  );
});
module.exports = homeRouter;
