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

@app.route('/linkedin-profile')
def linkedin_profile():
    url = "https://linkedin-data-api.p.rapidapi.com/"

    querystring = {"username":"nazia-edroos-593b49217"}

    headers = {
        "x-rapidapi-key": "31f89230e0mshc68458479372f61p16a3c3jsna0d63ef48498",
        "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)
    return jsonify(response.json())

@app.route('/linkedin-posts')
def linkedin_posts():
    url = "https://linkedin-data-api.p.rapidapi.com/search-posts"

    payload = {
        "keyword": "microsoft",
        "sortBy": "date_posted",
        "datePosted": "",
        "page": 1,
        "contentType": "",
        "fromMember": ["ACoAAAEkwwAB9KEc2TrQgOLEQ-vzRyZeCDyc6DQ", "ACoAAANuWM8BtmA18VYdgqPtIWt6GhBCTDXToV4", "ACoAAA8BYqEBCGLg_vT_ca6mMEqkpp9nVffJ3hc"],
        "fromCompany": [1441, 1035],
        "mentionsMember": ["ACoAAAEkwwAB9KEc2TrQgOLEQ-vzRyZeCDyc6DQ", "ACoAAA8BYqEBCGLg_vT_ca6mMEqkpp9nVffJ3hc"],
        "mentionsOrganization": [1441, 1035],
        "authorIndustry": [96, 4],
        "authorCompany": [1035],
        "authorTitle": ""
    }
    headers = {
        "x-rapidapi-key": "31f89230e0mshc68458479372f61p16a3c3jsna0d63ef48498",
        "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    return jsonify(response.json())


if __name__ == '__main__':
    app.run(debug=True)

