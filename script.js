document.addEventListener("DOMContentLoaded", () => {
    const langToggleBtn = document.getElementById("langToggleBtn");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const ghostContactForm = document.getElementById("ghostContactForm");
    const receiptModal = document.getElementById("receiptModal");
    const receiptDetails = document.getElementById("receiptDetails");
    const closeReceiptBtn = document.getElementById("closeReceiptBtn");
    const htmlRoot = document.documentElement;

    let currentLang = "both"; // 'km', 'en', or 'both'

    // 1. Language Toggle (Khmer / English / Both)
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            if (currentLang === "both") {
                currentLang = "km";
                document.querySelectorAll(".km").forEach(el => el.style.display = "inline-block");
                document.querySelectorAll(".en").forEach(el => el.style.display = "none");
                langToggleBtn.innerText = "🇰🇭 ភាសាខ្មែរ";
            } else if (currentLang === "km") {
                currentLang = "en";
                document.querySelectorAll(".km").forEach(el => el.style.display = "none");
                document.querySelectorAll(".en").forEach(el => el.style.display = "inline-block");
                langToggleBtn.innerText = "🇬🇧 English";
            } else {
                currentLang = "both";
                document.querySelectorAll(".km").forEach(el => el.style.display = "");
                document.querySelectorAll(".en").forEach(el => el.style.display = "");
                langToggleBtn.innerText = "🇰🇭 / EN";
            }
        });
    }

    // 2. Dark / Light Theme Toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = htmlRoot.getAttribute("data-theme");
            if (currentTheme === "dark") {
                htmlRoot.setAttribute("data-theme", "light");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                htmlRoot.setAttribute("data-theme", "dark");
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    // Helper: Field Validation
    function validateField(inputEl, msg) {
        const group = inputEl.closest(".form-group");
        const errSpan = group.querySelector(".error-msg");
        if (msg) {
            group.classList.add("has-error");
            errSpan.textContent = msg;
            return false;
        } else {
            group.classList.remove("has-error");
            errSpan.textContent = "";
            return true;
        }
    }

    // 3. Form Validation & Submission Receipt
    if (ghostContactForm) {
        ghostContactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const senderName = document.getElementById("senderName");
            const senderContact = document.getElementById("senderContact");
            const submissionType = document.getElementById("submissionType");
            const storyLocation = document.getElementById("storyLocation");
            const storyTitle = document.getElementById("storyTitle");
            const storyDetails = document.getElementById("storyDetails");

            let isValid = true;
            if (!senderName.value.trim()) isValid = validateField(senderName, "សូមបញ្ចូលឈ្មោះ / Name required.");
            else validateField(senderName, "");

            if (!senderContact.value.trim()) isValid = validateField(senderContact, "សូមបញ្ចូលទំនាក់ទំនង / Contact info required.");
            else validateField(senderContact, "");

            if (!storyTitle.value.trim()) isValid = validateField(storyTitle, "សូមបញ្ចូលចំណងជើង / Title or subject required.");
            else validateField(storyTitle, "");

            if (!storyDetails.value.trim()) isValid = validateField(storyDetails, "សូមបញ្ចូលខ្លឹមសាររឿង ឬសារ / Story or message required.");
            else validateField(storyDetails, "");

            if (!isValid) return;

            const refCode = "UHT-GS-" + Math.floor(100000 + Math.random() * 900000);
            const locText = storyLocation.value.trim() || "Not specified";

            receiptDetails.innerHTML = `
                <div><strong>Reference ID:</strong> ${refCode}</div>
                <div><strong>Sender:</strong> ${senderName.value.trim()} (${senderContact.value.trim()})</div>
                <div><strong>Category:</strong> ${submissionType.value}</div>
                <div><strong>Location:</strong> ${locText}</div>
                <div><strong>Title / Subject:</strong> ${storyTitle.value.trim()}</div>
            `;

            receiptModal.classList.remove("hidden");
            ghostContactForm.reset();
        });
    }

    if (closeReceiptBtn) {
        closeReceiptBtn.addEventListener("click", () => {
            receiptModal.classList.add("hidden");
        });
    }

    if (receiptModal) {
        receiptModal.addEventListener("click", (e) => {
            if (e.target === receiptModal) {
                receiptModal.classList.add("hidden");
            }
        });
    }
});
