from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
import requests
from linkedin_api import Linkedin

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

genai.configure(api_key="AIzaSyCJHST-dJuFixWFYmq2LsbGl7A_tzAFYss")
model = genai.GenerativeModel("gemini-2.0-flash")

# api = Linkedin('hongraon@pm.me', "TestMe3Times!")

@app.route('/')
def home():
    return ""

@app.route('/generate-summary')
def linkedin_profile():
    username = request.args.get('username', '')
    name = request.args.get('name', '')
    print('username', username)
    url = "https://linkedin-data-api.p.rapidapi.com/"

    headers = {
        "x-rapidapi-key": "dc7b9d7454msh688a36901d41f00p1ba819jsn0e055c13a9a9",
        "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com"
    }

    interviewee = {"username":"nazia-edroos-593b49217"}
    interviewee_response = requests.get(url, headers=headers, params=interviewee)
    interviewee_profile = interviewee_response.json()

    # interviewer = {"username":"jvngyn"}
    interviewer = {"username": username}
    interviewer_response = requests.get(url, headers=headers, params=interviewer)
    interviewer_profile = interviewer_response.json()

    # interviewee_profile = api.get_profile("nazia-edroos-593b49217")
    # interviewer_profile = api.get_profile(username)
    # print(interviewer_profile)

    # Summarize the LinkedIn profile using Gemini AI
    summary_prompt = f"""Summarize this LinkedIn profile: {interviewer_profile} in a way that can be said during a job interview
    with formal conversational sentence structure. Do not include any introductory phrases like 
    'Here is a summary:' or 'The profile is:'. For context, this I am looking to set up a coffee chat with this person and my profile is: {interviewee_profile}.
    So avoid talking about irrelevant experience or skills. Keep it to 5-6 very salient bullet points. Only give me the bullet points, no introductory text.
    Avoid using phrases such as "like you" or "similar to you"."""
    summary_response = model.generate_content(summary_prompt)

    # Come up with common interests for both LinkedIn profiles using Gemini AI
    interests_prompt = f"""Come up with bullet points of common interests between these LinkedIn profiles: 
    {interviewee_profile} and {interviewer_profile}. Do not include any introductory phrases like 
    'Here is a summary:' or 'The profile is:'.
    Use information from the skills, project experience and posts section. Only include interests that are actually common and relevant.
    Keep it to 5-6 bullet points, 3-4 words on each. Simply provide the bullet points without any preamble."""
    interests_response = model.generate_content(interests_prompt)

    print(summary_response.text)
    print(interests_response.text)

    # Return the summarized profile and common interests as JSON
    return jsonify({'bio': summary_response.text,
                    'common': interests_response.text,
                    'name': name})

@app.route('/chat', methods=['GET'])
def chat():
    message = request.args.get('message', '')
    print(message)
    response = model.generate_content(message)
    return jsonify({'response': response.text})

@app.route('/linkedin-search', methods=['GET'])
def linkedin_search():
    print("tests")
    name = request.args.get('name', '').lower()
    print(name)

    url = "https://linkedin-data-api.p.rapidapi.com/search-people"
    querystring = {"keywords": name, "start": "0", "geo": "103644278,101165590"}

    headers = {
        "x-rapidapi-key": "dc7b9d7454msh688a36901d41f00p1ba819jsn0e055c13a9a9",
        "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring).json()

    print(response)
    # people = api.search_people(
    #     keywords=name,
    # )

    # print(people)

    items = response['data']['items']
    extracted_data = []

    for item in items:
        extracted_data.append({
            'fullName': item.get('fullName'),
            'headline': item.get('headline'),
            'username': item.get('username')
        })

    print(extracted_data)

    # return jsonify(people)

    return jsonify(extracted_data)


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
        "x-rapidapi-key": "d9c496a31cmshbedbcf90a816ae0p1dd4adjsn42a2f2291b22",
        "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    return jsonify(response.json())


if __name__ == '__main__':
    app.run(debug=True)

