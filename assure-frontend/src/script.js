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

// Handle file selection
document.getElementById("insurance-file").addEventListener("change", function(event) {
    if (event.target.files.length > 0) {
        alert("File selected: " + event.target.files[0].name);
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





