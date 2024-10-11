const asyncHandler = require("express-async-handler");
const notebookStorage = require("../models/Notebook");
const noteStorage = require("../models/Note");

exports.notebooksIndexGet = asyncHandler(async (req, res) => {
    const notebooks = await notebookStorage.getAllNotebooks();

    res.send("Index page");
});

exports.notebookCreateGet = (req, res) => {
}

exports.notebookCreatePost = (req, res) => {
    // Ici si tout se passe bien au niveau de la validation
    // on renverra vers index
    // sinon, on renverra ici (notebook_form) avec les erreurs.
}

exports.notebookUpdateGet = (req, res) => {

}

exports.notebookUpdatePost = (req, res) => {
    // Ici si tout se passe bien au niveau de la validation
    // on renverra vers notebook_list
    // sinon, on renverra ici (notebook_form) avec les erreurs.
}

exports.notebookDeleteGet = (req, res) => {
}

exports.notebookDeletePost = (req, res) => {
    // Ici si tout se passe bien au niveau de la validation
    // on renverra vers index
    // sinon, on renverra ici (notebookDelete)avec les erreurs.
}

exports.notebookList = (req, res) => {
    res.render("notebook_list", {});
}





