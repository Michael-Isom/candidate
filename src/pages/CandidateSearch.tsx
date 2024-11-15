import React, { useState, useEffect } from 'react';
import { searchGithubUser as fetchGithubUser } from '../api/API'; // Assuming this import is correct
import { Candidate } from '../interfaces/Candidate.interface'; // Corrected import

const CandidateSearch: React.FC = () => {
  const [username, setUsername] = useState<string>('');  // State for storing the GitHub username input
  const [fullName, setFullName] = useState<string>('');  // Full Name input state
  const [location, setLocation] = useState<string>('');  // Location input state
  const [email, setEmail] = useState<string>('');        // Email input state
  const [company, setCompany] = useState<string>('');    // Company input state
  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    // Load saved candidates from localStorage, if any
    const savedCandidates = localStorage.getItem('candidates');
    return savedCandidates ? JSON.parse(savedCandidates) : [];
  });

  // Function to handle adding the current candidate
  const handleAddCandidate = () => {
    if (username && fullName && location && email && company) {
      const newCandidate: Candidate = {
        login: username,
        avatar_url: '',  // Placeholder for now (could be fetched later)
        location,
        email,
        company,
        html_url: '',    // Placeholder for now
        id: Date.now(),  // Use current time as a simple unique ID
        name: fullName,
      };
      const updatedCandidates = [...candidates, newCandidate];
      setCandidates(updatedCandidates);
      localStorage.setItem('candidates', JSON.stringify(updatedCandidates));
      
      // Optionally, clear the input fields after adding a candidate
      setUsername('');
      setFullName('');
      setLocation('');
      setEmail('');
      setCompany('');
    } else {
      alert('Please fill in all the fields.');
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>

      {/* Input form to add a candidate */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>GitHub Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
          />
        </div>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div>
          <label>Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter company"
          />
        </div>

        <button type="button" onClick={handleAddCandidate}>Add Candidate</button>
      </form>

      {/* Display list of saved candidates */}
      <h2>Saved Candidates</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name} - {candidate.login}
            <br />
            Location: {candidate.location} | Email: {candidate.email} | Company: {candidate.company}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateSearch;