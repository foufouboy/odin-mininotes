
(() => {
    const modal = document.querySelector(".default-modal");
    const deleteButton = document.querySelector("button.delete-notebook");
    const cancelButton = document.querySelector(".delete-notebook-options button:nth-child(2)");

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