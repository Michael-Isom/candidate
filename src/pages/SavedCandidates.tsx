import React, { useState, useEffect } from 'react';
// Corrected import for the Candidate interface
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Load saved candidates from localStorage
    const saved = localStorage.getItem('savedCandidates');
    if (saved) {
      setSavedCandidates(JSON.parse(saved));
    }
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted yet.</p>
      ) : (
        <ul>
          {savedCandidates.map((candidate, index) => (
            <li key={index}>
              <img src={candidate.avatar_url} alt={candidate.name} />
              {candidate.name} - {candidate.login} ({candidate.location})
              <p>{candidate.email}</p>
              <p><a href={candidate.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;