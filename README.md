# ThatJob
Overview

This project is a Flask-based API that allows users to search for job listings based on specific companies, keywords, and locations. The API accepts a JSON request with search parameters (company names, keywords, locations, and the number of results) and returns a list of job links that match the query using Google search results.
Features

    Search Jobs: The API fetches job listings by combining the company names, keywords, and locations and performs a Google search for matching results.
    CORS Enabled: The API supports Cross-Origin Resource Sharing (CORS), making it accessible from different domains.
    JSON API: The API accepts and returns data in JSON format.
    Configurable Number of Results: The number of results returned can be customized.

Requirements

    Python 3.x
    Flask
    Flask-CORS
    googlesearch-python
