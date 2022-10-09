const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

// Get all users
router.get("/get", UserController.getAllUsers);

// Get a user
router.get("/get/:id", UserController.searchUser, UserController.getUser);

// Get uList
router.get("/get/ulist/:id", UserController.getUserList);

// Add user
router.post("/add/:id", UserController.addUser);

// Update user
router.patch("/update/:id", UserController.updateUser);

// Delete user
router.delete("/delete/:id", UserController.searchUser, UserController.deleteUser);

module.exports = router;
