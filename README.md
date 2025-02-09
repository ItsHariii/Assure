# Assure - AI-Powered Health Insurance Checker

## Team Members
- Hari Manivannan
- Waleed Moid Ahmed


## Project Overview
**Assure** is an AI-powered web platform designed to help users maximize their health insurance benefits. Our platform allows users to upload insurance policy documents or paste their policy details to get real-time AI analysis, helping them determine coverage, exclusions, and potential savings.

## Purpose
Many people struggle with understanding the complexities of health insurance, leading to confusion about coverage and potential out-of-pocket costs. **Assure** simplifies this by leveraging AI to analyze insurance documents and provide easy-to-understand insights. Our goal is to **empower users to make informed decisions and prevent unnecessary expenses**.

## Features
- **Insurance Policy Analysis:** Upload PDFs or paste text to receive AI-driven insights.
- **Coverage Breakdown:** Identify what procedures are covered under your plan.
- **Instant Feedback:** Users receive analysis within seconds.
- **Multiple Document Support:** Upload multiple PDFs at once.
- **User-Friendly Interface:** Clean and intuitive design inspired by platforms like The Zebra.

## Tools & Technologies Used
- **Frontend:** HTML, CSS (Maname Font), JavaScript
- **Backend:** Python (Flask)
- **AI Model:** Google Gemini Pro (via Google Generative AI API)
- **Storage:** Pinata (IPFS for document handling)
- **Environment Management:** Python Dotenv
- **API Integration:** Flask-CORS for frontend-backend communication

## Challenges Faced & Solutions
### 1. **File Upload Issues**
- **Problem:** Initially, the backend was not receiving file uploads correctly, leading to HTTP errors.
- **Solution:** We debugged the Flask request handling and ensured that FormData was correctly processed. Additionally, CORS policies were adjusted to allow file uploads from the frontend.

### 2. **AI Analysis Formatting Issues**
- **Problem:** The AI response was sometimes too verbose or unclear.
- **Solution:** We refined our prompts to the AI model to provide more concise and user-friendly responses.

### 3. **Ensuring Multiple File Support**
- **Problem:** The frontend initially only displayed one uploaded file.
- **Solution:** Implemented an array-based display system that dynamically updates the file list upon selection.

## Frameworks & APIs Used
- **Google Generative AI API** - Used for analyzing insurance policies
- **Pinata API** - For uploading and retrieving PDFs via IPFS
- **Flask & Flask-CORS** - Backend and API handling
- **JavaScript Fetch API** - For making API requests from the frontend

## How to Run
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/Assure.git
   cd Assure
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add the following:
     ```sh
     GOOGLE_API_KEY=your_google_api_key
     PINATA_JWT=your_pinata_jwt
     ```
4. Start the backend:
   ```sh
   python app.py
   ```
5. Open the frontend in a browser:
   ```sh
   open index.html
   ```

## Future Improvements
- Implement user authentication for saved analyses.
- Expand AI insights to compare different insurance providers.
- Add real-time customer support via chatbot.

## Credits
- **Google Generative AI API** for AI-powered policy analysis.
- **Pinata** for decentralized document storage.
- **Flask & Flask-CORS** for backend communication.
- **Maname Font** for styling.

## License
This project is licensed under the MIT License.

