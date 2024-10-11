const noteStorage = require("../Note");
const TestClient = require("./TestClient");

const {
    DB_NAME_TESTING,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
} = process.env;


let newNote;
let testClient;

beforeEach(() => {
    testClient = new TestClient({
        database: DB_NAME_TESTING,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
        host: DB_HOST
    });
    newNote = testClient.defaultNote;

    testClient.connect();
});

afterEach(() => {
    testClient.end();
})

describe("Note model is working as expected", () => {
    test(".getAllNotes should do so", async () => {

        const notes = await noteStorage.getAllNotes();

        expect(notes).toBeInstanceOf(Array);
        expect(notes[0].title).toBeDefined();
    });

    test(".getNote should get the specified note", async () => {

        const note = await noteStorage.getNote(1);
        expect(note.title).toEqual("A note on Manon");
    });

    test(".createNote should add a note into the notes table", async () => {
        await noteStorage.createNote(
            newNote.title,
            newNote.content,
            newNote.tags,
            newNote.notebookID,
        );

        const { rows } = await testClient.query("SELECT * FROM notes WHERE content = $1", [newNote.content]);

        expect(rows[0].content).toEqual(newNote.content);

        await testClient.query("DELETE FROM notes WHERE content = $1", [newNote.content]);
    });

    test(".deleteNote should delete a note with the specified id", async () => {
        await testClient.insertTestNotes()

        const id = await testClient
            .query("SELECT * FROM notes WHERE content = $1", [newNote.content])
            .then(result => {
                return result.rows[0].id;
            });
        
        await noteStorage.deleteNote(id);

        await testClient
            .query("SELECT * FROM notes WHERE id = $1", [id])
            .then(result => {
                expect(result.rows.length).toEqual(0);
            });
    });

    test(".updateNote should update an existing note given a new note", async () => {
        await testClient.insertTestNotes();

        const id = await testClient
            .query("SELECT * FROM notes WHERE content = $1", [newNote.content])
            .then(result => {
                return result.rows[0].id;
            });

        const updatedNote = {
            title: "An updated title",
            content: "An updated content",
            tags: ["some", "tags"],
            notebookID: 1,
        }

        await noteStorage.updateNote(id, updatedNote);

        await testClient
            .query("SELECT * FROM notes WHERE id = $1", [id])
            .then(result => {
                expect(result.rows[0].content).toEqual(updatedNote.content);
            });
       
        await testClient.deleteTestNotes();
    })

    test(".getNotesFromNotebook should retrieve notes from the specified notebook", async () => {
        expect(noteStorage.getNotesFromNotebook).toBeDefined();

        await testClient.insertTestNotes();
        
        const notesFromNotebook = await noteStorage.getNotesFromNotebook(1);

        expect(notesFromNotebook).toBeDefined();
        expect(notesFromNotebook).toBeInstanceOf(Array);
        expect(notesFromNotebook.every((note) => note.notebook_id === 1)).toBeTruthy();

    })
});
