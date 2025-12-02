document.addEventListener("click", function (event) {
    if (event.target.closest(".show-password")) {
        const button = event.target.closest(".show-password");
        const targetId = button.getAttribute("data-target");
        const input = document.getElementById(targetId);

        if (input) {
            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";

            // Toggle visibility of icons
            button.querySelector(".hide-icon").classList.toggle("hidden", !isPassword);
            button.querySelector(".show-icon").classList.toggle("hidden", isPassword);
        }
    }
});
