const asyncHandler = require("express-async-handler");
const noteStorage = require("../models/Note");
const notebookStorage = require("../models/Notebook");
const { body, validationResult } = require("express-validator");

const noteValidation = [
    body("title")
        .trim()
        .isLength({min: 5, max: 50})
        .withMessage("Note title should be between 5 and 50 characters")
        .escape(),
    body("tags")
        .trim()
        .optional()
        .isLength({max: 50})
        .withMessage("Note tags should be under 50 characters")
        .optional()
        .matches(/[a-zA-Z0-9 ,]*/)
        .withMessage("Note tags should not have non alphanumeric characters!")
        .escape()
];

exports.noteCreateGet = asyncHandler(async (req, res) => {
    const notebooks = await notebookStorage.getAllNotebooks(); 
    const defaultNotebook = req.query.notebook;

    res.render("note_edit", {
        notebooks: notebooks,
        defaultNotebook: defaultNotebook,
    });
});

exports.noteCreatePost = [
    noteValidation,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const notebooks = await notebookStorage.getAllNotebooks(); 
            res.status(400).render("note_edit", {
                errors: errors.array(),
                notebooks: notebooks,
            });
        } else {
            let {
                title, 
                content, 
                tags, 
                notebookID} = req.body;
            tags = tags.match(/[^,]+/g) || [];

            await noteStorage.createNote(title, content, tags, notebookID)
            res.redirect("/notebooks/success?item=note");
        }
    })
];

exports.noteUpdateGet = asyncHandler(async (req, res) => {
    const id = req.params.note;
    const notebooks = await notebookStorage.getAllNotebooks();
    const note = await noteStorage.getNote(id);

    note.data = JSON.stringify(note.content);
    note.tags = note.tags.length ? note.tags.join(", ") : "";

    res.render("note_edit", {
        note: note,
        notebooks,
        defaultNotebook: note.notebook_id,
    });
});

exports.noteUpdatePost = [
    noteValidation,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const notebooks = await notebookStorage.getAllNotebooks(); 
            const note = await noteStorage.getNote(req.params.note);

            res.status(400).render("note_edit", {
                errors: errors.array(),
                notebooks: notebooks,
                note: note,
            });

        } else {
            let {
                title, 
                content, 
                tags, 
                notebookID} = req.body;
            tags = tags.match(/[^,]+/g) || [];


            await noteStorage.updateNote(req.params.note, {title, content, tags, notebookID});
            res.redirect("/notebooks/" + notebookID);
        }
    })
];

exports.noteDeletePost = asyncHandler( async (req, res) => {

    await noteStorage.deleteNote(req.params.note);
    res.redirect("/notebooks/" + req.params.notebook);
});

