const { body } = require("express-validator");
const db = require("./prismaQuery");
const validateUserNameAndPassword = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Please don't leave the username empty")
    .custom(async (value) => {
      const check = await db.getUser(value);
      if (check) {
        throw new Error("Username already exists!");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Please don't leave the password empty")
    .isLength({ min: 5, max: 20 })
    .withMessage("Please enter password of length between 5 and 20"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Please don't leave the confirm password field empty")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("The passwords do not match"),
];
module.exports = validateUserNameAndPassword;
