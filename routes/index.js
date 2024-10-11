const { Router } = require('express');
const notebookController = require("../controllers/notebookController");

const router = Router();

/* GET home page. */
router.get('/', notebookController.notebooksIndexGet);

module.exports = router;
