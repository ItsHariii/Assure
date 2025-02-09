function analyzePolicy() {
    let policyText = document.getElementById("policyText").value;
    let resultElement = document.getElementById("analysisResult");

    if (policyText.trim() === "") {
        resultElement.innerHTML = "⚠️ Please paste an insurance policy to analyze.";
        return;
    }

    let response = analyzeFakeAI(policyText);
    resultElement.innerHTML = `✅ Policy Analysis: ${response}`;
}

function analyzeFakeAI(text) {
    if (text.includes("not covered")) return "This policy may not cover all procedures.";
    if (text.includes("100% covered")) return "Good news! This policy fully covers your procedure.";
    return "This policy has standard coverage. Check details for exclusions.";
}
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}
function redirectToUpload(type) {
    window.location.href = `upload.html?type=${type}`;
}

document.getElementById("insurance-file").addEventListener("change", function(event) {
    let files = event.target.files;
    let uploadedFilesContainer = document.getElementById("uploaded-files");

    if (files.length > 0) {
        uploadedFilesContainer.style.display = "block"; // Show the file list

        // Clear only if the user reselects files, not when appending
        uploadedFilesContainer.innerHTML = "";

        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            // Create a new file entry
            let fileEntry = document.createElement("div");
            fileEntry.classList.add("uploaded-file-item");

            fileEntry.innerHTML = `
                <img src="./assets/pdf.png" alt="PDF Icon">
                <span>${file.name}</span>
            `;

            uploadedFilesContainer.appendChild(fileEntry);
        }
    } else {
        uploadedFilesContainer.style.display = "none"; // Hide if no file selected
    }
});



// Handle text submission
function submitText() {
    let textData = document.getElementById("insurance-text").value;
    if (textData.trim() === "") {
        alert("Please paste some insurance details before submitting.");
    } else {
        alert("Insurance details submitted successfully!");
    }
}






