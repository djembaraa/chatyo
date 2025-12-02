document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("Gallery-Modal");
    const imagePreview = document.getElementById("Image-Preview");
    const closeButton = document.getElementById("Btn-Close");

    // Handle preview button clicks
    document.querySelectorAll(".preview-img[data-image-src]").forEach(button => {
        button.addEventListener("click", () => {
            const imageSrc = button.getAttribute("data-image-src");
            if (imageSrc) {
                imagePreview.src = imageSrc; // Update modal image
                modal.classList.remove("hidden"); // Show modal
            }
        });
    });

    // Handle close button click
    closeButton.addEventListener("click", () => {
        modal.classList.add("hidden"); // Hide modal
    });

    // Optional: Close modal when clicking outside the image container
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden"); // Hide modal
        }
    });
});