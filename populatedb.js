#! /usr/bin/env node
require("dotenv").config();
const mongoose = require("mongoose");

console.log(
  'This script populates some test notebooks and notes to my database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

const Note = require("./models/Note");
const Notebook = require("./models/Notebook");

const notes = [];
const notebooks = [];

mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_DEV_URI);
    console.log("Debug: Should be connected");

    console.log("Debug: Creating test notes");
    await createNotes();
    console.log("Debut: Creating test notebooks");
    await createNotebooks();

    console.log("Debug: Closing connection (everything went fine!)");
    mongoose.connection.close();
}

async function noteCreate(name, content, tags) {
    const note = new Note({name, content, tags});

    await note.save();
    notes.push(note);
    console.log("Successfully added new note of name: " + name);
}

async function notebookCreate(name, notes, desc) {
    const notebook = new Notebook({name, notes, desc});
    await notebook.save();
    console.log("Successfully added new notebook of name: " + name);
}

async function createNotebooks() {
    console.log("Adding notebooks");

    await Promise.all([
        notebookCreate(
            "Philosophy",
            [notes[0], notes[1], notes[2]],
            "This notebook saves all my wandering thoughts about existence."
        ),
        notebookCreate(
            "Code",
            [notes[3]],
            "This notebooks is concerned about code and computering."
        ),
    ]);
}

async function createNotes() {
    console.log("Adding notes");

    await Promise.all([
        noteCreate(
            "A thing or two about philosophy",
            `The world is, alas and despite our title, three things :
             something too far away to know, something too intimate to reach,
             and exactly what you're living right know.`,
            ["solipsism", "realism", "life"],
        ),
        noteCreate(
            "Another pretty useless note on philosophy",
            `Have you ever wondered from what was derived our understanding
             and conceptualization of time? I did, and have reeched the
             fortunate conclusion that I shouldn't take too much of yours.
             Bye! Thanks for reading.`,
            ["time", "go away boy"],
        ),
        noteCreate(
            "A last one... about eschatology.",
            `Yes, yes, I know; not that much of a fun thing to talk about
             death, end of the world, loss, nothingness and all that stuff.
             But hell yeah, it must be done. And here it is.`,
            ["eschatology", "death", "life", "hell"],
        ),
        noteCreate(
            "Hello World!",
            `This note is doing nothing but saying Hello to the World to y'all!`,
            ["hello", "world"],
        ),
    ]);
}

