const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    name: { type: String, required: true, maxLength: 100},
    content: { type: String, required: true},
    tags: [{ type: String }],  
}, {collection: "notes"});

NoteSchema.virtual("url").get(function() {
    return `NOT IMPLEMENTED YET`;  
});

module.exports = mongoose.model("Note", NoteSchema);
