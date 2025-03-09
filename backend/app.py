from flask import Flask, jsonify, request
from flask_cors import CORS
import google.generativeai as genai
import requests

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

genai.configure(api_key="AIzaSyCJHST-dJuFixWFYmq2LsbGl7A_tzAFYss")

@app.route('/')
def home():
    return ""

@app.route('/generate-summary')
def linkedin_profile():
    url = "https://linkedin-data-api.p.rapidapi.com/"

    headers = {
        "x-rapidapi-key": "d9c496a31cmshbedbcf90a816ae0p1dd4adjsn42a2f2291b22",
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


@app.route('/linkedin-search', methods=['GET'])
def linkedin_search():
    print("tests")
    query = request.args.get('query', '').lower()
    print(query)

    # url = "https://linkedin-data-api.p.rapidapi.com/search-people"
    # querystring = {"keywords": query, "start": "0", "geo": "103644278,101165590"}

    headers = {
        "x-rapidapi-key": "d9c496a31cmshbedbcf90a816ae0p1dd4adjsn42a2f2291b22",
        "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com"
    }

    # response = requests.get(url, headers=headers, params=querystring)

    response = {
                "data": {
                    "items": [
                    {
                        "fullName": "Max Klymenko",
                        "headline": "I make videos about careers, brands and social causes. 8 Million followers and 3 Billion views.",
                        "location": "London",
                        "profilePicture": "",
                        "profileURL": "https://www.linkedin.com/in/maxoklymenko",
                        "summary": "Current: Creative Director at klym&co - After a career in corporate consultancy and advertising, Max started his own social media channels...",
                        "username": "maxoklymenko"
                    },
                    {
                        "fullName": "Max Levchin",
                        "headline": "Co-Founder & CEO at Affirm, Inc",
                        "location": "San Francisco, CA",
                        "profilePicture": "https://media.licdn.com/dms/image/v2/C4E03AQFlmLGSxfTBlg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1516155449314?e=1747267200&v=beta&t=hBB8oJ3v6ZvC2g6Q2FmzUrYLnpp0G3lqXbR3Bh7UYKY",
                        "profileURL": "https://www.linkedin.com/in/maxlevchin",
                        "summary": "",
                        "username": "maxlevchin"
                    },
                    {
                        "fullName": "Max Foster",
                        "headline": "International Anchor & Correspondent @CNN",
                        "location": "United Kingdom",
                        "profilePicture": "https://media.licdn.com/dms/image/v2/C4E03AQE93Qc5PRmQHA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1641993773667?e=1747267200&v=beta&t=u-Q_F0jO0lNRcQcRRbbOTVE00hyoOcXh2pGwhBn66YE",
                        "profileURL": "https://www.linkedin.com/in/maxfostercnn",
                        "summary": "Current: News Anchor, CNN Newsroom at CNN - CNN Newsroom with Max Foster and Bianca Nobilo on CNN US. CNN Newsroom with Max Foster on CNN...",
                        "username": "maxfostercnn"
                    },
                    {
                        "fullName": "Max Haot",
                        "headline": "CEO at VAST. We are hiring!",
                        "location": "Long Beach, CA",
                        "profilePicture": "https://media.licdn.com/dms/image/v2/D5603AQHZfZedrwFgXw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1718314256650?e=1747267200&v=beta&t=iNMdTKUq4EiD8wpbUzOSkFF7vzmPbW80NiYK_FlFUw8",
                        "profileURL": "https://www.linkedin.com/in/maxhaot",
                        "summary": "",
                        "username": "maxhaot"
                    },
                    {
                        "fullName": "Malcolm ( aka Max) King",
                        "headline": "Former fund manager , non-executive director, freelance financial writer, assisting good causes",
                        "location": "Greater London",
                        "profilePicture": "",
                        "profileURL": "https://www.linkedin.com/in/malcolm-aka-max-king-14a4b98",
                        "summary": "",
                        "username": "malcolm-aka-max-king-14a4b98"
                    },
                    {
                        "fullName": "Max Brown",
                        "headline": "Rugby Content Creator\ud83c\udfc9 700k+ Followers\ud83d\udcc8 195k Subscribers | YouTube\ud83c\udfa5 200m+ Views on Socials Making rugby relatable for the masses\ud83e\udd1d",
                        "location": "United Kingdom",
                        "profilePicture": "https://media.licdn.com/dms/image/v2/D4D03AQH_l2ajHP7iVA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1674554481034?e=1747267200&v=beta&t=uCBswtakP-R1QEej3_qwuPGFCV44dJ50-ulyAU3ZSOA",
                        "profileURL": "https://www.linkedin.com/in/max-brown-951639263",
                        "summary": "Current: Fitness Coach at Max Brown Coaching",
                        "username": "max-brown-951639263"
                    },
                    {
                        "fullName": "Max Branzburg",
                        "headline": "Head of Consumer Products at Coinbase",
                        "location": "United States",
                        "profilePicture": "https://media.licdn.com/dms/image/v2/D5603AQEdokjesDhEmg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1679932663318?e=1747267200&v=beta&t=a4ZO7VI975flcTK4YbRvoC9VLSJ90kQHBf8YddJ7MLo",
                        "profileURL": "https://www.linkedin.com/in/mbranzburg",
                        "summary": "",
                        "username": "mbranzburg"
                    },
                    {
                        "fullName": "Max Dickins",
                        "headline": "Director, Hoopla! \u2502 LinkedIn Top Voice \u2502 Author: Billy No Mates and Improvise! \u2502 The Inbetween Man podcast",
                        "location": "London",
                        "profilePicture": "https://media.licdn.com/dms/image/v2/D4E03AQGNp7BI6TmKMg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1720457518905?e=1747267200&v=beta&t=SEONfjPe7eYWB-9OX4kyeeFPKAIXVk-tJdozolCKHac",
                        "profileURL": "https://www.linkedin.com/in/max-dickins-improv",
                        "summary": "Summary: My name is Max. I once sold a date with me on Groupon. A thousand people bought it. But that cannot...",
                        "username": "max-dickins-improv"
                    },
                    {
                        "fullName": "Max .",
                        "headline": "Senior Security Engineer",
                        "location": "San Francisco Bay Area",
                        "profilePicture": "https://media.licdn.com/dms/image/v2/D5603AQF3Y64YRp0X4A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1672437260999?e=1747267200&v=beta&t=of4RI2ff-n8IDXyGh0g55FvjGyzmeTCz7EltXQFP0vM",
                        "profileURL": "https://www.linkedin.com/in/-max-",
                        "summary": "",
                        "username": "-max-"
                    },
                    {
                        "fullName": "Max Babka",
                        "headline": "US Power at Trafigura",
                        "location": "United States",
                        "profilePicture": "",
                        "profileURL": "https://www.linkedin.com/in/max-babka",
                        "summary": "",
                        "username": "max-babka"
                    }
                    ],
                    "total": 172420
                },
                "message": "",
                "success": True
                }

    # return jsonify(response.json())
    return response


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

