const express = require("express");
const router = express.Router();
const notebook_controller = require("../controllers/notebookController");
const note_controller = require("../controllers/noteController");

router.get("/", notebook_controller.index);

router.get("/create", function (req, res, next) {
    res.send("NOT IMPLEMENTED YET: Notebook creating page");
});

router.get(":notebook/delete", function (req, res, next) {
    res.send("NOT IMPLEMENTED YET: Notebook deleting page");
});

router.get("/:notebook/update", function (req, res, next) {
    res.send("NOT IMPLEMENTED YET: Notebook updating page");
});

router.get("/:notebook/", function (req, res, next) {
    res.render("notebook_list", {title: "Fake Notebook"});
});

router.get("/:notebook/notes/:note", function (req, res, next) {
    res.send("NOT IMPLEMENTED YET: Note taking main page");
});

router.get("/:notebook/notes/:note/delete", function (req, res, next) {
    res.send("NOT IMPLEMENTED YET: Note deleting page");
});

router.get("/:notebook/new-note", function (req, res, next) {
    res.send("NOT IMPLEMENTED YET: Note creating page");
});

module.exports = router;

