const editor = new EditorJS({
    holder: "editor-container",
    tools: {
        header: Header,
        list: List,
    },
    onReady: () => {
        console.log("Editor.js is ready!");
    }
});

