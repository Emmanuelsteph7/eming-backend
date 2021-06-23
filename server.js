const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const passport = require("passport");

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

// Connect Mongo to app
connectDB();

const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const store = new MongoStore({
  uri: process.env.MONGO_URI2,
  collection: "sessions",
});

// Logging using morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Cors middleware
app.use(
  cors({
    // origin: "*",
    origin: [`${process.env.WEBSITE1}`, `${process.env.WEBSITE2}`],
    credentials: true,
  })
);

app.set("trust proxy", 1);

// Sessions
app.use(
  session({
    secret: "mern-story-app",
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
