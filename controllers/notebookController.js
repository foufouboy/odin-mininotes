const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const notebookStorage = require("../models/Notebook");
const noteStorage = require("../models/Note");
const { getExcerpt } = require("../utils");

const notebookValidation = [
    body("title")
        .trim()
        .isLength({min: 5, max: 50})
        .withMessage("Title should be between 5 and 50 characters")
        .escape(),
    body("description")
        .trim()
        .isLength({max: 250})
        .withMessage("Description should be under 250 characters")
        .escape(),
];


exports.success = (req, res) => {
    res.render("success", {
        item: req.query.item
    });
}

exports.notebooksIndexGet = asyncHandler(async (req, res) => {
    const notebooks = await notebookStorage.getAllNotebooks();

    res.render("index", {
        notebooks: notebooks,
    });
});

exports.notebookCreateGet = (req, res) => {
    res.render("notebook_form");
}

exports.notebookCreatePost = [
    notebookValidation,    
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).render("notebook_form", {
                errors: errors.array(),
            });
        } else {
            const { title, description } = req.body;

            await notebookStorage.createNotebook({title, description});
            res.redirect("/notebooks/success/?item=notebook");
        }
    })
];

exports.notebookUpdateGet = asyncHandler( async (req, res) => {
    const id = req.params.notebook;
    const notebook = await notebookStorage.getNotebook(id);

    res.render("notebook_form", {
        notebook: notebook,
    });
});


exports.notebookUpdatePost = [
    notebookValidation,
    asyncHandler(async (req, res) => {
        const id = req.params.notebook;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const notebook = await notebookStorage.getNotebook(id);
            return res.status(400).render("notebook_form", {
                errors: errors.array(),
                notebook: notebook,
            });
        } else {
            const {title, description} = req.body;
            await notebookStorage.updateNotebook(id, {title, description});
            res.redirect("/");
        }
    }),  
]; 


exports.notebookDeletePost = asyncHandler( async (req, res) => {
    const id = req.params.notebook;
    await notebookStorage.deleteNotebook(id);
    res.redirect("/");
});

exports.notebookList = asyncHandler(async (req, res) => {
    const id = req.params.notebook;
    const notebook = await notebookStorage.getNotebook(id);
    const isLastNotebook = await notebookStorage
        .getAllNotebooks()
        .then(result => result.length === 1);
    const notes = await noteStorage.getNotesFromNotebook(id);
    const notesWithExcerpt = notes.map(note => {
        note.excerpt = getExcerpt(note.content);
        return note;
    });

    console.log(notesWithExcerpt);

    res.render("notebook_list", {
        notes: notesWithExcerpt,
        notebook: notebook,
        isLastNotebook,
    });
})





