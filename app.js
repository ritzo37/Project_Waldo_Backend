require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const cookieParser = require("cookie-parser");
const homeRouter = require("./routes/homeRouter");
const { Pool } = require("pg");
const pgSession = require("connect-pg-simple")(session);
const cors = require("cors");
const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      createTableIfMissing: true,
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
      partitioned: true,
      path: "/",
    },
  })
);

app.use("/", homeRouter);
app.listen(3000, () => console.log("app listening on port 3000!"));
