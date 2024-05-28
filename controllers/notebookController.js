
// TODO

exports.index = (req, res, next) => {
    res.redirect("/");
}

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





