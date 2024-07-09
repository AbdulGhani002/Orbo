require("dotenv").config();
const express = require("express");
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

app.use(baseRoute);
app.use(authRoute);
db.connectToDatabase().then(()=>{
  app.listen(process.env.PORT || 5500, () => {
    console.log("Server is running...");
  });
}).catch(error=>{
  console.log(error);
})

