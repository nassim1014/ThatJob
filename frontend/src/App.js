import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [companyNames, setCompanyNames] = useState('');
  const [keywords, setKeywords] = useState('');
  const [locations, setLocations] = useState('');
  const [numResults, setNumResults] = useState(10);
  const [jobLinks, setJobLinks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/search', {
        company_names: companyNames.split(',').map(name => name.trim()),
        keywords: keywords.split(',').map(keyword => keyword.trim()),
        locations: locations.split(',').map(location => location.trim()),
        num_results: numResults
      });
      
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
        <input type="text" value={companyNames} onChange={(e) => setCompanyNames(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Keywords (comma separated):</label>
        <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Locations (comma separated):</label>
        <input type="text" value={locations} onChange={(e) => setLocations(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Number of Results per Search:</label>
        <input type="number" value={numResults} onChange={(e) => setNumResults(e.target.value)} />
      </div>
      <button onClick={handleSearch}>Search</button>
      <div className="results-container">
        {jobLinks.map((job, index) => (
          <div key={index} className="job-item">
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Keyword:</strong> {job.keyword}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><a href={job.link} target="_blank" rel="noopener noreferrer">Link to Job Posting</a></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
