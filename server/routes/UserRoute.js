const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const UserListController = require("../controllers/UserListController");

// Get all users
router.get("/get", UserController.getAllUsers);

// Get a user
router.get("/get/:id", UserController.searchUser, UserController.getUser);

// Get uList
router.get("/get/ulist/:id", UserListController.getUserList);

// Update user novels
router.patch("/update/novels/:id", UserListController._getUserList ,UserListController.updateUserNovels);

// Add user
router.post("/add/:id", UserController.addUser);

// Update user
router.patch("/update/:id", UserController.updateUser);

// Delete user
router.delete("/delete/:id", UserController.searchUser, UserController.deleteUser);

module.exports = router;
