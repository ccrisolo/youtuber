const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("./models/user");
require("dotenv").config();
require("./config/database");
require("./config/passport");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
        },
        function (accessToken, refreshToken, profile, cb) {
            // a user has logged in with OAuth...
            User.findOne({ googleId: profile.id }, function (err, user) {
                if (err) return cb(err);
                if (user) {
                    return cb(null, user);
                } else {
                    let newUser = new User({
                        name: profile.name,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                    });
                    newUser.save(function (err) {
                        if (err) return cb(err);
                        return cb(null, newUser);
                    });
                }
            });
        }
    )
);
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));

const favoritesRouter = require("./routes/api/favorites");

app.listen(3000, () => console.log("server started"));

app.use(logger("dev"));
app.use(express.json());
app.use(
    session({
        secret: "SEIRocks!",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// Put API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
app.use("/api/favorites", favoritesRouter);

//'catch all' route below
app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
    console.log(`Express app running on port ${port}`);
});
