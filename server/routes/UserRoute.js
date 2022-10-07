const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");


// Get all users
router.get("/get", UserController.getAllUsers);

// Get a users
router.get("/get/:id", UserController.getUser);

// Add user
router.post("/add/:id", UserController.addUser);

// Update user
router.patch("/update/:id", (req, res) => {});

// Delete user
router.delete("/delete/:id", (req, res) => {});

module.exports = router;
