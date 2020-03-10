const express = require("express");
const authRoute = require("./routes/auth-route");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const profileRoute = require("./routes/profile-route");

const app = express();

// set up ejs
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// mongodb connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

// Homepage
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

// Create Home Route
app.use("/auth", authRoute);
app.use("/profile", profileRoute);

app.listen(3000, () => console.log("App Listening at PORT 3000"));
