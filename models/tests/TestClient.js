const { Client } = require("pg");

class TestClient extends Client {
    constructor(config) {
        super(config);
        this.defaultNote = {
            title: "A new title",
            content: "A new content, for testing",
            tags: [],
            notebookID: 1,
        };
        this.defaultNotebook = {
            title: "About testing",
            description: "Here goes everything concerning testing",
        }
    }

    async insertTestNotes() {
        const {title, content, notebookID} = this.defaultNote;

        await this.query(
            `INSERT INTO notes (title, content, notebook_id) 
             VALUES 
                ($1, $2, $3),
                ($1, $2, $3),
                ($1, $2, $3)`,
            [title, content, notebookID]
        );
    }

    async deleteTestNotes() {
        await this.query("DELETE FROM notes WHERE content = $1", [this.defaultNote.content]);
    }

    async insertTestNotebook() {
        const {title, desc} = this.defaultNotebook;

        await this.query("INSERT INTO notebooks (title, description) VALUES ($1, $2)", [title, desc]);
    }

    async deleteTestNotebook() {
        await this.query("DELETE FROM notebooks WHERE title = $1", [this.defaultNotebook.title]);
    }

    async getTestNotebookID() {
        const id = await testClient
            .query("SELECT * FROM notebooks WHERE description = $1 LIMIT 1", [newNotebook.description])
            .then(result => {
                return result.rows[0].id;
            });
        
        return id;
    }
}

module.exports = TestClient;