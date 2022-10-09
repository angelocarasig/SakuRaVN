// =======================
// Project Setup
// =======================

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());

// =======================
// Mongoose Setup
// =======================
mongoose.connect(uri)
const connection = mongoose.connection;

// =======================
// Routes
// =======================
const userRoute = require("./routes/UserRoute");
const NovelRoute = require("./routes/NovelRoute");
const UserNovelRoute = require("./routes/UserListRoute");
const UserExceptionHandler = require("./exceptions/ExceptionHandler");

app.use("/user", userRoute);
app.use("/novel", NovelRoute);
app.use("/userlist", UserNovelRoute);

app.use(UserExceptionHandler);

// =======================
// App
// =======================
connection.once('open', () => {
    console.log("Database connected.")
})

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})