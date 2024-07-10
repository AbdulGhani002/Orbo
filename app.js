require("dotenv").config();
const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const db = require("./data/database");
const { join } = require("path");

const baseRoute = require("./routes/base.routes");
const authRoute = require("./routes/auth.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.static("pictures"));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/orbo',
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(baseRoute);
app.use(authRoute);

db.connectToDatabase().then(() => {
    app.listen(process.env.PORT || 5500, () => {
        console.log("Server is running...");
    });
}).catch(error => {
    console.log(error);
});
