const { Router } = require("express");
const notebookController = require("../controllers/notebookController");
const noteController = require("../controllers/noteController");
const notesRouter = require("./notes");

const router = Router();

router.get("/", (req, res) => {
    res.redirect("/");
});

router.get("/create", notebookController.notebookCreateGet);
router.post("/create", notebookController.notebookCreatePost);

router.get("/new-note", noteController.noteCreateGet);
router.post("/new-note", noteController.noteCreatePost);

router.get("/success", notebookController.success);

router.post("/:notebook/delete", notebookController.notebookDeletePost);

router.get("/:notebook/update", notebookController.notebookUpdateGet);
router.post("/:notebook/update", notebookController.notebookUpdatePost);

router.get("/:notebook/", notebookController.notebookList);


router.use("/:notebook/", notesRouter);


module.exports = router;

