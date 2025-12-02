const fileInput = document.getElementById("file-input");
const photoContainer = document.getElementById("photo-container");
const addPhotoButton = document.getElementById("add-photo");
const defaultPhoto = "assets/images/photos/default.png"; // Default photo path

// Trigger file input click when "Add" button is clicked
addPhotoButton.addEventListener("click", () => {
    fileInput.click();
});

// Handle file input change
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            photoContainer.src = reader.result; // Update photo preview
        };
        reader.readAsDataURL(file);
    } else {
        // If no file is selected, revert to the default photo
        photoContainer.src = defaultPhoto;
    }
});
