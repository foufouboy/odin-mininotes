
exports.note_create_get = (req, res, next) => {
    res.render("note_edit", {});
}

exports.note_create_post = (req, res, next) => {
    // Si tout se passe bien, note_edit ou notebook_list
    // Sinon, note_edit avec les erreurs
}

exports.note_update_get = (req, res, next) => {
    res.render("note_edit", {});
}

exports.note_update_post = (req, res, next) => {
    // Si tout se passe bien, note_edit ou notebook_list
    // Sinon, note_edit avec les erreurs
}

exports.note_delete_get = (req, res, next) => {
    res.render("note_delete", {});
}

exports.note_delete_post = (req, res, next) => {
    // Si tout se passe bien, notebook_list
    // Sinon, note_delete avec les erreurs
}

