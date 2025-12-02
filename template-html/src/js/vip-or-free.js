document.addEventListener("DOMContentLoaded", () => {
    const freeRadio = document.getElementById("Free");
    const vipRadio = document.getElementById("Vip");
    const groupPrice = document.getElementById("Group-Price");
    const groupRight = document.getElementById("Group-Right");
    const groupAsset = document.getElementById("Group-Asset");
    const groupBenefit = document.getElementById("Group-Benefit");

    const toggleGroupPrice = () => {
        if (freeRadio.checked) {
            groupRight.classList.remove("bg-heyhao-grey");
            groupPrice.classList.add("hidden");
            groupAsset.classList.add("hidden");
            groupBenefit.classList.add("hidden");
        } else if (vipRadio.checked) {
            groupRight.classList.add("bg-heyhao-grey");
            groupPrice.classList.remove("hidden");
            groupAsset.classList.remove("hidden");
            groupBenefit.classList.remove("hidden");
        }
    };

    // Attach event listeners
    freeRadio.addEventListener("change", toggleGroupPrice);
    vipRadio.addEventListener("change", toggleGroupPrice);

    // Initialize the correct state on page load
    toggleGroupPrice();
});
