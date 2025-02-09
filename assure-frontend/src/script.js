// API configuration
const API_BASE_URL = 'http://localhost:5000';

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

// Handle file upload
async function handleFileUpload(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    const uploadedFilesContainer = document.getElementById("uploaded-files");
    
    if (!file) return;

    try {
        // Show loading state
        const statusElement = document.createElement('div');
        statusElement.classList.add('uploaded-file-item');
        statusElement.innerHTML = `
            <img src="./assets/pdf.png" alt="PDF Icon">
            <span>⏳ Uploading ${file.name}...</span>
        `;
        uploadedFilesContainer.style.display = "block";
        uploadedFilesContainer.innerHTML = '';
        uploadedFilesContainer.appendChild(statusElement);

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Update status with success message
        statusElement.innerHTML = `
            <img src="./assets/pdf.png" alt="PDF Icon">
            <span>✅ ${file.name} uploaded successfully!</span>
            <small>IPFS Hash: ${data.IpfsHash}</small>
        `;
    } catch (error) {
        console.error('Error:', error);
        uploadedFilesContainer.innerHTML = `
            <div class="uploaded-file-item">
                <img src="./assets/pdf.png" alt="PDF Icon">
                <span>❌ Error: ${error.message}</span>
            </div>
        `;
    }
}

// Handle text submission and analysis
async function submitText() {
    const textData = document.getElementById("insurance-text").value;
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('analysis-result');
    
    if (textData.trim() === "") {
        alert("Please paste some insurance details before submitting.");
        return;
    }

    try {
        resultContainer.innerHTML = "⏳ Analyzing your insurance details...";
        document.querySelector('.paste-container').appendChild(resultContainer);

        const response = await fetch(`${API_BASE_URL}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ policy_text: textData })
        });

        if (!response.ok) {
            throw new Error(`Analysis failed: ${response.statusText}`);
        }

        const data = await response.json();
        resultContainer.innerHTML = `
            <h3>✅ Analysis Results:</h3>
            <p>${data.analysis}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        resultContainer.innerHTML = `❌ Error analyzing policy: ${error.message}`;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('insurance-file');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }

    const submitButton = document.querySelector('.submit-btn');
    if (submitButton) {
        submitButton.addEventListener('click', submitText);
    }
});






