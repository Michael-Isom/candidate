import React, { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';  // Correct import for Candidate interface
import { fetchNextCandidate } from '../api/API';  // Correct import for fetchNextCandidate function

const CandidateSearch: React.FC = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    loadNextCandidate();  // Fetch candidate data on page load
  }, []);

  const loadNextCandidate = async () => {
    try {
      const githubUsers = await fetchNextCandidate();  // Fetch candidates from API
      
      // Ensure there is at least one user in the array before mapping
      if (githubUsers && githubUsers.length > 0) {
        const githubUser = githubUsers[0];  // Select the first user from the array

        const mappedCandidate: Candidate = {
          id: githubUser.login,  // Using the `login` as the unique `id`
          login: githubUser.login,
          avatar_url: githubUser.avatar_url,
          location: githubUser.location || '',  // Default empty string if location is missing
          email: githubUser.email || '',  // Default empty string if email is missing
          company: githubUser.company || '',  // Default empty string if company is missing
          html_url: githubUser.html_url,
          name: githubUser.name || '',  // Default empty string if name is missing
        };
        
        setCurrentCandidate(mappedCandidate);  // Set candidate data to state
        setMessage("");  // Clear any error message
      } else {
        setMessage("No more candidates available.");
      }
    } catch (error) {
      setMessage("Failed to load candidates.");
    }
  };

  const handleAddCandidate = () => {
    if (currentCandidate) {
      // Assuming you want to add the candidate to a list
      // setPotentialCandidates((prev) => [...prev, currentCandidate]); 
      loadNextCandidate();  // Load next candidate after adding
    }
  };

  const handleSkipCandidate = () => {
    loadNextCandidate();  // Skip to next candidate
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {message && <p>{message}</p>}  {/* Show any error or status message */}
      
      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.name} style={{ width: '100px', height: '100px' }} />
          <h2>{currentCandidate.name}</h2>
          <p><strong>Username:</strong> {currentCandidate.login}</p>
          <p><strong>Location:</strong> {currentCandidate.location}</p>
          <p><strong>Email:</strong> {currentCandidate.email}</p>
          <p><strong>Company:</strong> {currentCandidate.company}</p>
          <p>
            <strong>GitHub Profile:</strong> 
            <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
          </p>
          
          <button onClick={handleAddCandidate}>Add Candidate</button>
          <button onClick={handleSkipCandidate}>Skip Candidate</button>
        </div>
      ) : (
        <p>Loading candidate...</p>
      )}
    </div>
  );
};

export default CandidateSearch;