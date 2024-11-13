if (data === "") {
    data = {
       "time": 1550476186479,
       "blocks": [
       ],
       "version": "2.8.1"
    }
} else {
    data = JSON.parse(data);
}

console.log(data);
const editor = new EditorJS({
    holder: "editor-container",
    tools: {
        header: Header,
        list: List,
    },
    onReady: () => {
        console.log("Editor.js is ready!");
    },
    data: data,
});

const form = document.querySelector("form.note");
const deleteButton = document.querySelector(".delete-note");

form.addEventListener("submit", async (e) => {

   const data = JSON.stringify(await editor.save());

   const input = document.createElement("input");
   input.setAttribute("type", "hidden");
   input.setAttribute("value", data);
   input.setAttribute("name", "content");

   form.appendChild(input);
});

(() => {
    const modal = document.querySelector(".default-modal");
    const deleteButton = document.querySelector("button.delete-note");
    const cancelButton = document.querySelector(".delete-note-options button:nth-child(2)");

    deleteButton.addEventListener("click", () => {
        modal.classList.toggle("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) 
            modal.classList.toggle("active");
    });

    cancelButton.addEventListener("click", () => {
        modal.classList.toggle("active");
    });
})();
