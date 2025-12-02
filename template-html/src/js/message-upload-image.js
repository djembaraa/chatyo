document.addEventListener("DOMContentLoaded", () => {
    const uploadButton = document.getElementById("Upload-Image");
    const imageInput = document.getElementById("imageInput");
    const chatInput = document.getElementById("Chat-Input");

    // Trigger file input when upload button is clicked
    uploadButton.addEventListener("click", () => {
        imageInput.click();
    });

    // Handle image selection
    imageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imgElement = document.createElement("img");
                imgElement.src = reader.result;
                imgElement.alt = "Uploaded Image";
                imgElement.style.maxWidth = "100%";
                imgElement.style.maxHeight = "200px"; // Adjust size as needed
                imgElement.classList.add("rounded-lg", "shadow-sm", "my-2");

                // Insert image into the contenteditable element
                chatInput.appendChild(imgElement);

                // Optionally scroll to the bottom of the contenteditable
                chatInput.scrollTop = chatInput.scrollHeight;

                // Clear the input value so it can be reused
                imageInput.value = "";
            };

            reader.readAsDataURL(file);
        }
    });
});