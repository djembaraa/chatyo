// VIP and FREE options handler
document.addEventListener('DOMContentLoaded', () => {
    // Get references to radio buttons
    const freeRadio = document.getElementById('free');
    const vipRadio = document.getElementById('vip');

    // Get references to other elements
    const groupAssetsBenefit = document.getElementById('Group-Assets-Benefit');
    const addMoreMediaButton = document.getElementById('Add-More-Media');
    const addMoreBenefitButton = document.getElementById('Add-More-Benefit');
    const groupPrice = document.getElementById('group-price');

    const toggleElements = () => {
        const btnUploadFiles = document.querySelectorAll('.btn-upload-file');
        const fileInputs = document.querySelectorAll('.file-input');
        const benefitInputs = document.querySelectorAll('.input-benefit');

        if (freeRadio.checked) {
        // Add .disabled-all class
        groupAssetsBenefit.classList.add('disabled-all');

        // Disable all upload buttons and file inputs
        btnUploadFiles.forEach(button => {
            button.disabled = true;
            button.removeAttribute('enabled');
            button.setAttribute('disabled', '');
        });

        fileInputs.forEach(input => {
            input.disabled = true;
            input.removeAttribute('enabled');
            input.setAttribute('disabled', '');
        });

        benefitInputs.forEach(input => {
            input.disabled = true;
            input.removeAttribute('enabled');
            input.setAttribute('disabled', '');
        });

        // Disable Add More Media button
        addMoreMediaButton.disabled = true;
        addMoreMediaButton.removeAttribute('enabled');
        addMoreMediaButton.setAttribute('disabled', '');

        addMoreBenefitButton.disabled = true;
        addMoreBenefitButton.removeAttribute('enabled');
        addMoreBenefitButton.setAttribute('disabled', '');

        groupPrice.disabled = true;
        groupPrice.removeAttribute('enabled');
        groupPrice.setAttribute('disabled', '');
        } 
        else if (vipRadio.checked) {
        // Remove .disabled-all class
        groupAssetsBenefit.classList.remove('disabled-all');

        // Enable all upload buttons and file inputs
        btnUploadFiles.forEach(button => {
            button.disabled = false;
            button.removeAttribute('disabled');
            button.setAttribute('enabled', '');
        });

        fileInputs.forEach(input => {
            input.disabled = false;
            input.removeAttribute('disabled');
            input.setAttribute('enabled', '');
        });

        benefitInputs.forEach(input => {
            input.disabled = false;
            input.removeAttribute('disabled');
            input.setAttribute('enabled', '');
        });

        // Enable Add More Media button
        addMoreMediaButton.disabled = false;
        addMoreMediaButton.removeAttribute('disabled');
        addMoreMediaButton.setAttribute('enabled', '');

        addMoreBenefitButton.disabled = false;
        addMoreBenefitButton.removeAttribute('disabled');
        addMoreBenefitButton.setAttribute('enabled', '');

        groupPrice.disabled = false;
        groupPrice.removeAttribute('disabled');
        groupPrice.setAttribute('enabled', '');
        }
    };

    // Attach event listeners to radio buttons
    freeRadio.addEventListener('change', toggleElements);
    vipRadio.addEventListener('change', toggleElements);

    // Initialize on page load
    toggleElements();
});

// Benefit and Assets handler
document.addEventListener("DOMContentLoaded", () => {
    const assetsContainer = document.getElementById("Assets");
    const addMoreMediaButton = document.getElementById("Add-More-Media");
    const inputFileContainer = document.getElementById("Input-File-Container");
    
    // Handle file upload and display file name
    assetsContainer.addEventListener("change", (e) => {
        if (e.target.matches(".file-input")) {
            const fileInput = e.target;
            const fileNameElement = fileInput.closest(".btn-upload-file").querySelector(".file-name");
            const file = fileInput.files[0];
            if (file) {
                fileNameElement.textContent = file.name;
                fileInput.closest(".btn-upload-file").classList.add("file-uploaded");
            }
        }
    });
    
    // Handle removing upload button/input
    assetsContainer.addEventListener("click", (e) => {
        if (e.target.closest(".delete-btn")) {
            const buttonToRemove = e.target.closest(".btn-upload-file");
            buttonToRemove.remove();
        }
    });
    
    addMoreMediaButton.addEventListener("click", () => {
        const newButton = document.createElement("button");
        newButton.type = "button";
        newButton.className = "btn-upload-file group relative disabled:bg-white flex h-16 items-center rounded-xl border border-heyhao-border py-5 px-6 gap-4 transition-all duration-300";
        newButton.innerHTML = `
            <input type="file" name="" id="" class="file-input absolute opacity-0">
            <img src="assets/images/icons/document-text-grey.svg" class="flex size-6 shrink-0 group-[.file-uploaded]:hidden" alt="icon">
            <img src="assets/images/icons/document-text-black.svg" class="hidden size-6 shrink-0 group-[.file-uploaded]:flex" alt="icon">
            <div class="flex h-6 shrink-0 border border-heyhao-border"></div>
            <span class="file-name w-full max-w-[245px] text-left truncate font-semibold leading-5 text-heyhao-secondary group-[.file-uploaded]:text-heyhao-black">
                Upload Media
            </span>
            <div id="VIP-badge" class="flex shrink-0 gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey group-enabled:hidden">
                <img src="assets/images/icons/crown-grey-fill.svg" class="flex size-4 shrink-0" alt="icon">
                <p class="font-medium text-sm text-heyhao-secondary">VIP Featured</p>
            </div>
            <div class="flex items-center gap-4 group-disabled:hidden">
                <div class="import-btn">
                <img src="assets/images/icons/import-blue.svg" class="flex size-6 shrink-0" alt="icon">
                </div>
                <div class="flex h-6 shrink-0 border border-heyhao-border"></div>
                <div class="delete-btn">
                <img src="assets/images/icons/trash-red.svg" class="flex size-6 shrink-0" alt="icon">
                </div>
            </div>
        `;
        inputFileContainer.appendChild(newButton); // Use appendChild to add the new button at the end of the container
    });

    // Select the container and button
    const inputBenefitContainer = document.querySelector("#Input-Benefit-Container");
    const addMoreBenefitBtn = document.querySelector("#Add-More-Benefit");

    // Function to attach delete functionality to all delete buttons
    function attachDeleteFunctionality() {
        const deleteButtons = inputBenefitContainer.querySelectorAll(".delete-btn");
            deleteButtons.forEach((deleteButton) => {
                deleteButton.addEventListener("click", () => {
                const label = deleteButton.closest("label"); // Find the parent label
                if (label) {
                    label.remove(); // Remove the label element
                }
            });
        });
    }

    // Function to create a new benefit input field
    function createBenefitInput() {
        // Create a new label element
        const newLabel = document.createElement("label");
        newLabel.classList.add("relative", "group");

        // Add the inner HTML for the new benefit input
        newLabel.innerHTML = `
            <div class="absolute transform -translate-y-1/2 top-1/2 left-6 flex gap-4 items-center">
                <p class="numbering flex size-4 shrink-0 items-center justify-center text-heyhao-black group-has-[:placeholder-shown]:text-heyhao-secondary transition-all duration-300"></p>
                <div class="flex h-6 shrink-0 border border-heyhao-border"></div>
            </div>
            <input type="text" name="" id="" placeholder="Type Benefit" class="input-benefit appearance-none outline-none w-full rounded-xl ring-1 ring-heyhao-border py-5 pr-[85px] disabled:pr-[171px] pl-20 gap-4 text-heyhao-black placeholder:text-heyhao-secondary font-semibold disabled:bg-white focus:valid:ring-heyhao-blue transition-all duration-300">
            <div class="absolute transform -translate-y-1/2 top-1/2 right-6 flex items-center gap-4">
                <div id="VIP-badge" class="flex shrink-0 gap-0.5 rounded-lg items-center py-[6px] px-2 bg-heyhao-grey group-has-[:enabled]:hidden">
                    <img src="assets/images/icons/crown-grey-fill.svg" class="flex size-4 shrink-0" alt="icon">
                    <p class="font-medium text-sm text-heyhao-secondary">VIP Featured</p>
                </div>
                <div class="flex items-center gap-4 group-has-[:disabled]:hidden">
                    <div class="flex h-6 shrink-0 border border-heyhao-border"></div>
                    <div class="delete-btn cursor-pointer">
                        <img src="assets/images/icons/close-circle-red.svg" class="flex size-6 shrink-0" alt="icon">
                    </div>
                </div>
            </div>
        `;

        // Append the new label to the container
        inputBenefitContainer.appendChild(newLabel);

        // Attach delete functionality to the new delete button
        attachDeleteFunctionality();
    }

    // Attach delete functionality to existing delete buttons on page load
    attachDeleteFunctionality();

    // Add click event listener to the "Add More Benefit" button
    addMoreBenefitBtn.addEventListener("click", () => {
        createBenefitInput();
    });


});