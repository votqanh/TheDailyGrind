from flask import Flask, jsonify
from flask_cors import CORS
import google.generativeai as genai
import requests

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

genai.configure(api_key="AIzaSyCJHST-dJuFixWFYmq2LsbGl7A_tzAFYss")

@app.route('/')
def home():
    return jsonify({'message': 'Hello from Flask!'})

@app.route('/generate')
def generate_content():
    # Generate content using Google Generative AI
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content("Explain how AI works")
    
    # Print the response text to the console
    print(response.text)
    
    # Return the response text as JSON
    return jsonify({'response': response.text})

@app.route('/linkedin')
def linkedin_data():
    url = "https://linkedin-data-api.p.rapidapi.com/"

    querystring = {"username":"nazia-edroos-593b49217"}

    headers = {
        "x-rapidapi-key": "31f89230e0mshc68458479372f61p16a3c3jsna0d63ef48498",
        "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    return jsonify(response.json())


if __name__ == '__main__':
    app.run(debug=True)
