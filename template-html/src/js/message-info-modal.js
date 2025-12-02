document.addEventListener("DOMContentLoaded", () => {
    const infoButton = document.getElementById("Info");
    const infoModal = document.getElementById("Info-Modal");
    const infoModalClose = document.getElementById("Close-Info");

    // Toggle modal visibility
    infoButton.addEventListener("click", () => {
        infoModal.classList.toggle("hidden");
    });

    // Close modal when clicking on the modal itself
    infoModalClose.addEventListener("click", (e) => {
        infoModal.classList.add("hidden");
    });

    // Close modal when clicking on the modal itself
    infoModal.addEventListener("click", (e) => {
        if (e.target === infoModal) {
            infoModal.classList.add("hidden");
        }
    });
});