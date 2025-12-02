// Function to convert URLs in text to clickable links
function convertUrlsToLinks() {
    const messageCards = document.querySelectorAll(".message-card p"); // Select all message paragraphs

    messageCards.forEach((message) => {
        // Only process messages that have not been processed already
        if (!message.classList.contains("processed")) {
            let text = message.textContent;

            // Regular expression to match URLs
            const urlRegex = /((https?:\/\/|www\.)[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?=\s|$)/g;

            // Replace URLs with anchor tags
            const linkedText = text.replace(urlRegex, (url) => {
                let href = url;

                // Add protocol if missing (e.g., for "www." or ".com" cases)
                if (!href.startsWith("http://") && !href.startsWith("https://")) {
                    href = "https://" + href;
                }

                return `<a href="${href}" target="_blank" class="text-blue-500 underline">${url}</a>`;
            });

            // Update the message content with links
            message.innerHTML = linkedText;

            // Mark as processed to prevent duplicate processing
            message.classList.add("processed");
        }
    });
}

// Run the function initially
convertUrlsToLinks();

// Optional: Re-run the function if new messages are dynamically added
// For example, if you're using a chat application that dynamically loads messages
const observer = new MutationObserver(() => {
    convertUrlsToLinks();
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});
