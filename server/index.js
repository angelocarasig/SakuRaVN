const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// JSON
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", (error) => {console.error(error)});
db.once("open", () => console.log("Connected to database."));

// Routes
const userRoute = require("./routes/UserRoute");
app.use("/user", userRoute);

// App
app.listen(process.env.PORT, () => {
    console.log("Server started.");
})