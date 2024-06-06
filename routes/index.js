var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    try {
        res.render('index', { 
            title: 'Home',
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
    } catch (e) {
        throw new Error("Erreur pendant l'affichage de l'index");
        console.error(e);
    }
});

module.exports = router;
