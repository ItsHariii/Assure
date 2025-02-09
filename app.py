from flask import Flask, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv
import requests
from flask_cors import CORS

# Load environment variables
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
PINATA_JWT = os.getenv("PINATA_JWT")

# Validate API keys
if not GOOGLE_API_KEY:
    raise ValueError("❌ ERROR: Missing GOOGLE_API_KEY in .env file")

if not PINATA_JWT:
    raise ValueError("❌ ERROR: Missing PINATA_JWT in .env file")

# Configure Google Gemini AI
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-pro")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the AI-Powered Insurance Checker API!"})

@app.route('/analyze', methods=['POST'])
def analyze_policy():
    try:
        data = request.json
        policy_text = data.get("policy_text", "")

        if not policy_text:
            return jsonify({"error": "No policy text provided"}), 400

        # Generate analysis using Gemini AI
        response = model.generate_content(
            f"""Analyze this insurance policy text and provide key insights:
            {policy_text}"""
        )
        
        return jsonify({"analysis": response.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
            
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400

        # Prepare headers for Pinata API
        headers = {
            "Authorization": f"Bearer {PINATA_JWT}"
        }
        
        files = {
            "file": (file.filename, file.stream, file.content_type)
        }

        # Upload to Pinata
        response = requests.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            headers=headers,
            files=files
        )
        
        if response.status_code != 200:
            return jsonify({"error": "Failed to upload to IPFS"}), 500

        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
