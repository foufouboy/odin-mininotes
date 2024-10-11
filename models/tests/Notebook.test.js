const notebookStorage = require("../Notebook");
const TestClient = require("./TestClient");

const {
    DB_NAME_TESTING,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
} = process.env;


let newNotebook;
let testClient;

beforeEach(() => {
    testClient = new TestClient({
        database: DB_NAME_TESTING,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
        host: DB_HOST
    });
    newNotebook = testClient.defaultNotebook;

    testClient.connect();
});

afterEach(() => {
    testClient.end();
});

describe("Notebook model is working as expected", () => {
    test(".getAllNotebooks should do so", async () => {
        expect(notebookStorage.getAllNotebooks).toBeDefined();

        const notebooks = await notebookStorage.getAllNotebooks();

        expect(notebooks).toBeInstanceOf(Array);
        expect(notebooks[0].title).toEqual("Personal");
    }); 

    test(".getNotebook should get a notebook with specified id", async () => {
        expect(notebookStorage.getNotebook).toBeDefined();
        
        const notebook = await notebookStorage.getNotebook(1);

        expect(notebook.title).toBeDefined();
        expect(notebook.description).toBeDefined();

    }); 

    test(".createNotebook should add a notebook into the notebook table", async () => {
        expect(notebookStorage.createNotebook).toBeDefined();

        const tableLength = await testClient
            .query("SELECT * FROM notebooks")
            .then((result) => {
                return result.rows.length;
            });

        await notebookStorage.createNotebook({...newNotebook});

        const newTableLength = await testClient
            .query("SELECT * FROM notebooks")
            .then((result) => {
                return result.rows.length;
            });

        expect(newTableLength).toEqual(tableLength + 1);

        await testClient.deleteTestNotebook();
    }); 

    test(".updateNotebook should update an existing notebook given a new notebook", async () => {
        expect(notebookStorage.updateNotebook).toBeDefined();

        await testClient.insertTestNotebook();

        const id = await testClient
            .query("SELECT * FROM notebooks WHERE description = $1", [newNotebook.description])
            .then(result => {
                return result.rows[0].id;
            });

        const updatedNotebook = {
            title: "An updated title",
            description: "An updated description",
        }

        await notebookStorage.updateNotebook(id, updatedNotebook);

        await testClient
            .query("SELECT * FROM notebooks WHERE id = $1", [id])
            .then(result => {
                expect(result.rows[0].description).toEqual(updatedNotebook.description);
            });
       
        await testClient.deleteTestNotebook();
    });

    test(".deleteNotebook should delete a notebook AND its notes", async () => {
        expect(notebookStorage.deleteNotebook).toBeDefined();

        await testClient.insertTestNotebook();
        const id = await testClient.getTestNotebookID();

        await testClient.query(
            "INSERT INTO notes (title, content, notebook_id) VALUES ($1, $2, $3)",
            ["Test title", "test content", id],
        );

        await notebookStorage.deleteNotebook(id);

        await testClient
            .query("SELECT * FROM notebooks WHERE id = $1", [id])
            .then(result => {
                expect(result.rows.length).toEqual(0);
            });
        
        await testClient
            .query("SELECT * FROM notes WHERE notebook_id = $1", [id])
            .then(result => {
                expect(result.rows.length).toEqual(0);
            });
    }); 
}); 