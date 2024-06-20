const asyncHandler = require("express-async-handler");
const Notebook = require("../models/Notebook");
const Note = require("../models/Note");

exports.index = asyncHandler(async (req, res, next) => {
    const allNotebooks = await Notebook.find({}, "name desc")
        .sort({name: 1})
        .exec();

    console.log(allNotebooks);

    res.render("index", {
        title: 'Home',
        notebooks: allNotebooks,
        testing_links: [
            "/notebooks/create",
            "/notebooks/notebook/delete",
            "/notebooks/notebook/update",
            "/notebooks/notebook/",
            "/notebooks/notebook/notes/note",
            "/notebooks/notebook/notes/note/delete",
            "/notebooks/notebook/new-note",
        ],
    });
});

exports.notebook_create_get = (req, res, next) => {
    res.render("notebook_form", {});
}

exports.notebook_create_post = (req, res, next) => {
    // Ici si tout se passe bien au niveau de la validation
    // on renverra vers index
    // sinon, on renverra ici (notebook_form )avec les erreurs.
}

exports.notebook_update_get = (req, res, next) => {
    res.render("notebook_form", {});
}

exports.notebook_update_post = (req, res, next) => {
    // Ici si tout se passe bien au niveau de la validation
    // on renverra vers notebook_list
    // sinon, on renverra ici (notebook_form) avec les erreurs.
}

exports.notebook_delete_get = (req, res, next) => {
    res.render("notebook_delete", {});
}

exports.notebook_delete_post = (req, res, next) => {
    // Ici si tout se passe bien au niveau de la validation
    // on renverra vers index
    // sinon, on renverra ici (notebook_delete)avec les erreurs.
}

exports.notebook_list = (req, res, next) => {
    res.render("notebook_list", {});
}





