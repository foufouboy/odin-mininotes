const express = require("express");
const router = express.Router();
const notebook_controller = require("../controllers/notebookController");
const note_controller = require("../controllers/noteController");

router.get("/", notebook_controller.index);

router.get("/create", function (req, res, next) {
    res.render("notebook_form", {title: "Create a notebook"});
});

router.get("/:notebook/delete", function (req, res, next) {
    res.render("notebook_delete", {title: "Delete a notebook"});
});

router.get("/:notebook/update", function (req, res, next) {
    res.render("notebook_form", {title: "Update a notebook"});
});

router.get("/:notebook/", function (req, res, next) {
    res.render("notebook_list", {title: "Fake Notebook"});
});

router.get("/:notebook/notes/:note", function (req, res, next) {
    res.render("note_edit", {title: "Edit a Note"});
});

router.get("/:notebook/notes/:note/delete", function (req, res, next) {
    res.render("note_delete", {title: "Delete a Note"});
});

router.get("/:notebook/new-note", function (req, res, next) {
    res.render("note_edit", {title: "Create a new Note"});
});

module.exports = router;

