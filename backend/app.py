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

@app.route('/generate-summary')
def linkedin_profile():
    url = "https://linkedin-data-api.p.rapidapi.com/"

    headers = {
        "x-rapidapi-key": "31f89230e0mshc68458479372f61p16a3c3jsna0d63ef48498",
        "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com"
    }

    interviewee = {"username":"nazia-edroos-593b49217"}
    interviewee_response = requests.get(url, headers=headers, params=interviewee)
    interviewee_profile = interviewee_response.json()

    interviewer = {"username":"jvngyn"}
    interviewer_response = requests.get(url, headers=headers, params=interviewer)
    interviewer_profile = interviewer_response.json()

    # Summarize the LinkedIn profile using Gemini AI
    model = genai.GenerativeModel("gemini-2.0-flash")
    summary_prompt = f"""Summarize this LinkedIn profile: {interviewee_profile} in a way that can be said during a job interview
    with formal conversational sentence structure. Do not include any introductory phrases like 
    'Here is a summary:' or 'The profile is:'. This LinkedIn profile is 
    interviewing with this recruiter: {interviewer_profile} so use points of commonality to come up with 
    conversation points. Avoid talking about irrelevant experience or skills. Write it in first-person and 
    address the other person in second-person. 
    Keep it to 5-6 bullet points. Simply provide the summary without any preamble. Avoid using phrases such as
    "like you" or "similar to you"."""
    summary_response = model.generate_content(summary_prompt)

    # Come up with common interests for both LinkedIn profiles using Gemini AI
    interests_prompt = f"""Come up with bullet points of common interests between these LinkedIn profiles: 
    {interviewee_profile} and {interviewer_profile}. Do not include any introductory phrases like 
    'Here is a summary:' or 'The profile is:'.
    Use information from the skills, project experience and posts section.
    Keep it to 5-6 bullet points, 3-4 words on each. Simply provide the bullet points without any preamble."""
    interests_response = model.generate_content(interests_prompt)

    # Return the summarized profile and common interests as JSON
    return jsonify({'response': summary_response.text,
                    'interests': interests_response.text})


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

