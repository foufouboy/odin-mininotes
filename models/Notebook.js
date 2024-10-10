const pool = require("./Pool");

class NotebookStorage {

    #pool;

    constructor() {
        this.#pool = pool;
    }

    getAllNotebooks() {}

    getNotebook(id) {}
    
    createNotebook({title, description}) {}

    updateNotebook(id, {title, description}) {}

    deleteNotebook(id) {}
}

module.exports = new NotebookStorage();
