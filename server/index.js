const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());

// Mongoose
mongoose.connect(uri)
const connection = mongoose.connection;

// Routes
const userRoute = require("./routes/UserRoute");
app.use("/user", userRoute);

// App

connection.once('open', () => {
    console.log("Database connected.")
})

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
})