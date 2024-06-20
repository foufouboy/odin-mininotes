var express = require('express');
var router = express.Router();
const notebook_controller = require("../controllers/notebookController");

/* GET home page. */
router.get('/', notebook_controller.index);

module.exports = router;
