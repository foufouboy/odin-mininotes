const asyncHandler = require("express-async-handler");
const notebookStorage = require("../models/Notebook");
const noteStorage = require("../models/Note");

exports.notebooksIndexGet = asyncHandler(async (req, res) => {
    const notebooks = await notebookStorage.getAllNotebooks();

    res.render("index", {
        notebooks: notebooks,
    });
});

exports.notebookCreateGet = (req, res) => {
    res.render("notebook_form");
}

exports.notebookCreatePost = (req, res) => {
    // Ici si tout se passe bien au niveau de la validation
    // on renverra vers index
    // sinon, on renverra ici (notebook_form) avec les erreurs.
}

exports.notebookUpdateGet = asyncHandler( async (req, res) => {
    const id = req.params.notebook;
    const notebook = await notebookStorage.getNotebook(id);

    res.render("notebook_form", {
        notebook: notebook,
    });
});


exports.notebookUpdatePost = (req, res) => {
    // Ici si tout se passe bien au niveau de la validation
    // on renverra vers notebook_list
    // sinon, on renverra ici (notebook_form) avec les erreurs.
}

exports.notebookDeletePost = asyncHandler( async (req, res) => {
    const id = req.params.notebook;
    await notebookStorage.deleteNotebook(id);
    res.redirect("/");
});

exports.notebookList = asyncHandler(async (req, res) => {
    const id = req.params.notebook;
    const notebook = await notebookStorage.getNotebook(id);
    const notes = await noteStorage.getNotesFromNotebook(id);

    res.render("notebook_list", {
        notes: notes,
        notebook: notebook,
    });
})





