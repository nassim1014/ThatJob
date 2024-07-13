import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [companyNames, setCompanyNames] = useState('');
  const [keywords, setKeywords] = useState('');
  const [locations, setLocations] = useState('');
  const [numResults, setNumResults] = useState(10); // Default number of results
  const [jobLinks, setJobLinks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/search', {
        company_names: companyNames.split(',').map(name => name.trim()),
        keywords: keywords.split(',').map(keyword => keyword.trim()),
        locations: locations.split(',').map(location => location.trim()),
        num_results: numResults
      });
      console.log(response.data)
      setJobLinks(response.data);
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  return (
    <div className="App">
      <h1>Job Search Tool</h1>
      <div className="input-container">
        <label>Company Names (comma separated):</label>
        <input type="text" value={companyNames} onChange={(e) => setCompanyNames(e.target.value)} className="input-box"/>
      </div>
      <div className="input-container">
        <label>Keywords (comma separated):</label>
        <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="input-box"/>
      </div>
      <div className="input-container">
        <label>Locations (comma separated):</label>
        <input type="text" value={locations} onChange={(e) => setLocations(e.target.value)} className="input-box"/>
      </div>
      <div className="input-container">
        <label>Number of Results per Search:</label>
        <input type="number" value={numResults} onChange={(e) => setNumResults(e.target.value)} className="input-box"/>
      </div>
      <button onClick={handleSearch} className="search-button">Search</button>
      <div className="results-container">
        <table className="results-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Keyword</th>
              <th>Location</th>
              <th>Job Link</th>
            </tr>
          </thead>
          <tbody>
            {jobLinks.map((job, index) => (
              <tr key={index} className="job-item">
                <td>{job.company}</td>
                <td>{job.keyword}</td>
                <td>{job.location}</td>
                <td><a href={job.link} target="_blank" rel="noopener noreferrer">Link to Job Posting</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
