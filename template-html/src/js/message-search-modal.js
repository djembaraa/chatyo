document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("Search");
    const searchModal = document.getElementById("Search-Modal");

    // Toggle modal visibility
    searchButton.addEventListener("click", () => {
        searchModal.classList.toggle("hidden");
    });

    // Close modal when clicking on the modal itself
    searchModal.addEventListener("click", (e) => {
        if (e.target === searchModal) {
            searchModal.classList.add("hidden");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector("#Search-Modal input[type='text']");
    const resultTitles = document.querySelectorAll(".result-title");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim().toLowerCase();

        resultTitles.forEach((title) => {
            const originalText = title.textContent;
            if (query === "") {
                // Reset the title to its original text if the query is empty
                title.innerHTML = originalText;
                return;
            }

            // Highlight the matching characters
            const regex = new RegExp(`(${query})`, "gi");
            const highlightedText = originalText.replace(
                regex,
                `<span class="text-heyhao-blue">$1</span>`
            );

            // Update the result-title with the highlighted text
            title.innerHTML = highlightedText;
        });
    });
});