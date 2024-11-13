const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const noteController = require("../controllers/noteController");

const router = Router({mergeParams: true});

router.get("/notes/:note", noteController.noteUpdateGet); // To do 1
router.post("/notes/:note", noteController.noteUpdatePost);

router.post("/notes/:note/delete", noteController.noteDeletePost);

module.exports = router;