const pool = require("./Pool");

class NoteStorage {

    #pool;

    constructor() {
        this.#pool = pool; 
    }

    async getAllNotes() {
        const { rows } = await this.#pool.query("SELECT * FROM notes");
        return rows;
    }

    async getNotesFromNotebook(id) {
        const { rows } = await this.#pool.query(
            "SELECT * FROM notes WHERE notebook_id = $1", [id]
        );

        return rows;
    }

    async createNote(title, content, tags, notebookID) {
        tags = this.#formatArray(tags);

        await this.#pool.query(`
                INSERT INTO notes (title, content, tags, notebook_id)
                VALUES ($1, $2, $3, $4);
            `, [title, content, tags, notebookID]);
    }

    async getNote(id) {
        const { rows } = await this.#pool.query("SELECT * FROM notes WHERE id = $1", [id]);
        return rows[0];
    }

    async updateNote(id, {title, content, tags, notebookID}) {
        const formatedTags = this.#formatArray(tags);

        await this.#pool.query(`
                UPDATE notes
                SET
                    title = $1, 
                    content = $2,
                    tags = $3,
                    notebook_id = $4
                WHERE 
                    id = $5
            `, [title, content, formatedTags, notebookID, id]);
    }

    async deleteNote(id) {
        await this.#pool.query("DELETE FROM notes WHERE id = $1", [id]);
    }

    #formatArray(arr) {
        return `{${arr.join(", ")}}`;
    }
}

module.exports = new NoteStorage();