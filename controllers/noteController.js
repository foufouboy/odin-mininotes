const asyncHandler = require("express-async-handler");
const noteStorage = require("../models/Note");

exports.noteCreateGet = (req, res) => {
    res.render("note_edit", {});
}

exports.noteCreatePost = (req, res) => {
    // Si tout se passe bien, note_edit ou notebook_list
    // Sinon, note_edit avec les erreurs
}

exports.noteUpdateGet = (req, res) => {
}

exports.noteUpdatePost = (req, res) => {
    // Si tout se passe bien, note_edit ou notebook_list
    // Sinon, note_edit avec les erreurs
}

exports.noteDeleteGet = (req, res) => {
    res.render("note_delete", {});
}

exports.noteDeletePost = (req, res) => {
    // Si tout se passe bien, notebook_list
    // Sinon, note_delete avec les erreurs
}

