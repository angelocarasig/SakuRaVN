const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const Auth = require("../middleware/Auth");

// Get all users
router.get("/get", UserController.getAllUsers);

// Get a user
router.get("/get/:id", Auth.validateInput, UserController.searchUser, UserController.getUser);

// Add user
router.post("/add/:id", Auth.validateInput, UserController.addUser);

// Update user
router.patch("/update/:id", Auth.validateInput, UserController.searchUser, UserController.updateUser);

// Delete user
router.delete("/delete/:id", Auth.validateInput, UserController.searchUser, UserController.deleteUser);

module.exports = router;
