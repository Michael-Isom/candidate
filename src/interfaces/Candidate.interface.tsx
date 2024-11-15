// src/pages/CandidateSearch.tsx

import React, { useState, useEffect } from 'react';
import { Candidate } from '../models/Candidate'; // Correct import for the named export
import { fetchNextCandidate } from '../api/candidateAPI'; // ensure fetchNextCandidate is correctly exported from candidateAPI

const CandidateSearch: React.FC = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    loadNextCandidate();
  }, []);

  const loadNextCandidate = async () => {
    try {
      const candidate = await fetchNextCandidate(); // Fetch candidate logic
      if (candidate) {
        setCurrentCandidate(candidate);
        setMessage("");
      } else {
        setMessage("No more candidates available.");
      }
    } catch (error) {
      setMessage("Failed to load candidates.");
    }
  };

  const handleAddCandidate = () => {
    if (currentCandidate) {
      // Assuming you have a way to store potential candidates (like useState or localStorage)
      // setPotentialCandidates((prev) => [...prev, currentCandidate]); // Add to list
      loadNextCandidate();
    }
  };

  const handleSkipCandidate = () => {
    loadNextCandidate();
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {message && <p>{message}</p>}
      {currentCandidate ? (
        <div>
          <div>
            <img src={currentCandidate.avatar_url} alt={currentCandidate.name} />
            <h2>{currentCandidate.name}</h2>
            <p>Username: {currentCandidate.login}</p>
            <p>Location: {currentCandidate.location}</p>
            <p>Email: {currentCandidate.email}</p>
            <p>Company: {currentCandidate.company}</p>
            <p>Profile: <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>
          </div>
          <button onClick={handleAddCandidate}>+</button>
          <button onClick={handleSkipCandidate}>-</button>
        </div>
      ) : (
        <p>Loading candidate...</p>
      )}
    </div>
  );
};

export default CandidateSearch;