const express = require("express");
const router = express.Router();

const Auth = require("../middleware/Auth");
const UserListController = require("../controllers/UserListController");
const NovelController = require("../controllers/NovelController");

// Get novels from a given user id
router.get("/get/:id", Auth.validateInput, UserListController._getUserList, UserListController.getUserNovels);

// Update user novels
router.patch("/update/:id", Auth.validateInput, UserListController._getUserList, NovelController._updateNovels, UserListController.updateUserNovels);

module.exports = router;