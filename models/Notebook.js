const pool = require("./Pool");

class NotebookStorage {

    #pool;

    constructor() {
        this.#pool = pool;
    }

    async getAllNotebooks() {
        const { rows } = await this.#pool.query("SELECT * FROM notebooks");
        return rows;
    }

    async getNotebook(id) {
        const notebook = await this.#pool
            .query("SELECT * FROM notebooks WHERE id = $1", [id])
            .then(result => result.rows[0]);
        
        return notebook;
    }
    
    async createNotebook({title, description}) {
        await this.#pool.query(
            "INSERT INTO notebooks (title, description) VALUES ($1, $2)",
            [title, description]
        );
    }

    async updateNotebook(id, {title, description}) {
        await this.#pool.query(
            "UPDATE notebooks SET title = $1, description = $2 WHERE id = $3",
            [title, description, id]
        );
    }

    async deleteNotebook(id) {
        await this.#pool.query("DELETE FROM notebooks WHERE id = $1",[id]);
    }
}

module.exports = new NotebookStorage();
