module.exports = {
    getExcerpt: (content) => {
        if (content.blocks.length === 0) 
            return "Empty note";

        const firstBlock = content.blocks[0];
        let text;

        if (firstBlock.type === "paragraph" || firstBlock.type === "heading") {
            text = firstBlock.data.text;
        } else if (firstBlock.type === "list") {
            text = firstBlock.data.items[0];
        }

        console.log(content.blocks);

        if (text.length > 100) 
            return truncateWithDots(100, text);
        else 
            return text;
    },

    recents: {
        addNote: function (note) {
            if (this.notes.length >= 4)
                this.notes.pop();

            this.notes.unshift(note);
        },
        addNotebook: function (notebook) {
            if (this.notebooks.length >= 4)
                this.notebooks.pop();

            this.notebooks.unshift(notebook);
        },

        notebooks: [],
        notes: [],
    }
};

function truncateWithDots(length, text) {
    if (text.length <= length) 
        return text;
    else
        return text.substring(0, length) + "...";
}