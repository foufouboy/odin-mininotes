const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const noteController = require("../controllers/noteController");

const router = Router();

router.get("/notes/:note", noteController.noteUpdateGet);
router.post("/notes/:note", noteController.noteUpdatePost);

router.get("/notes/:note/delete", noteController.noteDeleteGet);
router.post("/notes/:note/delete", noteController.noteDeletePost);

router.get("/new-note", noteController.noteCreateGet);
router.post("/new-note", noteController.noteCreatePost);

module.exports = router;