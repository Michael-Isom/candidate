// src/api/API.tsx

// You can also type the response to make it clearer

// Function to fetch the next candidate
const fetchNextCandidate = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;  // Random starting point for users
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,  // API URL
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,  // Authorization header
        },
      }
    );

    const data = await response.json();  // Parse the JSON response
    if (!response.ok) {
      throw new Error('Failed to fetch candidate');
    }

    return data;  // Return the data (e.g., array of users)
  } catch (err) {
    console.error('Error fetching next candidate:', err);
    return [];  // Return empty array if there's an error
  }
};

// Exporting the function so it can be used in other files
export { fetchNextCandidate };
