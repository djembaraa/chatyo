// Ambil elemen-elemen tab dan konten
const tabButtons = document.querySelectorAll("#TabButtons button");
const tabContents = document.querySelectorAll(".TabValues > section");

// Fungsi untuk mengaktifkan tab
function activateTab(index) {
    // Nonaktifkan semua tab
    tabButtons.forEach((button, btnIndex) => {
        if (btnIndex === index) {
            button.classList.add("bg-heyhao-blue", "text-white");
            button.classList.remove("bg-white", "text-heyhao-secondary");
        } else {
            button.classList.remove("bg-heyhao-blue", "text-white");
            button.classList.add("bg-white", "text-heyhao-secondary");
        }
    });

    // Sembunyikan semua konten dan tampilkan hanya yang aktif
    tabContents.forEach((content, contentIndex) => {
        content.style.display = contentIndex === index ? "block" : "none";
    });
}

// Tambahkan event listener ke setiap tombol tab
tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        activateTab(index);
    });
});

// Aktifkan tab pertama saat pertama kali dimuat
activateTab(0);
