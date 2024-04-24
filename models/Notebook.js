const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotebookSchema = new Schema({
    name: { type: String, required: true, maxlength: 100},
    notes: [{ type: Schema.Types.ObjectId, ref: "Note"}],
    desc: { type: String, required: true, maxlength: 100} 
}, {collection: "notebooks"});

NotebookSchema.virtual("url").get(function() {
    return `NOT IMPLEMENTED YET`;  
});

module.exports = mongoose.model("Notebook", NotebookSchema);
