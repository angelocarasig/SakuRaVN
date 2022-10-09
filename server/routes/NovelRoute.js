const express = require("express");
const router = express.Router();

const Auth = require("../middleware/Auth");
const NovelController = require("../controllers/NovelController");

router.get("/getAll", NovelController.getNovels);

router.get("/get/:id", Auth.validateNovelInput, NovelController.searchNovel, NovelController.getNovel);

module.exports = router;