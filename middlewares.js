const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const tokenVal = req.cookies.token;
  if (tokenVal) {
    jwt.verify(tokenVal, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(401).json({
          message: "Please login again!",
        });
      } else {
        const { userId } = decoded;
        res.locals.userId = userId;
        next();
      }
    });
  }
}

module.exports = {
  isAuthenticated,
};
