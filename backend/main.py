from flask import Flask, request, jsonify
from googlesearch import search
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def search_jobs(company_names, keywords, locations, num_results=10):
    job_links = []

    for company in company_names:
        for keyword in keywords:
            for location in locations:
                query = f"{keyword} {company} {location} job"
                search_results = search(query, num_results=num_results)

                for link in search_results:
                    job_links.append({
                        "company": company,
                        "keyword": keyword,
                        "location": location,
                        "link": link
                    })

    return job_links

@app.route('/api/search', methods=['POST'])
def handle_search():
    data = request.json
    print(data)
    company_names = data.get('company_names', [])
    keywords = data.get('keywords', [])
    locations = data.get('locations', [])
    num_results = data.get('num_results', 10)

    job_links = search_jobs(company_names, keywords, locations, num_results)
    print(job_links)
    return jsonify(job_links)

if __name__ == '__main__':
    app.run(debug=True)
