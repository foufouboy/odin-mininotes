const { Router } = require("express");
const notebookController = require("../controllers/notebookController");
const notesRouter = require("./notes");

const router = Router();

router.get("/", (req, res) => {
    res.redirect("/");
});

router.get("/create", notebookController.notebookCreateGet);
router.post("/create", notebookController.notebookCreatePost);

router.get("/:notebook/delete", notebookController.notebookDeleteGet);
router.post("/:notebook/delete", notebookController.notebookDeletePost);

router.get("/:notebook/update", notebookController.notebookUpdateGet);
router.post("/:notebook/update", notebookController.notebookUpdatePost);

router.get("/:notebook/", notebookController.notebookList);

router.use("/:notebook/notes/", notesRouter);


module.exports = router;

