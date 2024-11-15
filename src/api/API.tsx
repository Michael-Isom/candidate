// src/api/API.tsx

// Define a type for the GitHub User data that will be used as a Candidate
export interface GithubUser {
  login: string;
  name: string | null;
  location: string | null;
  email: string | null;
  company: string | null;
  avatar_url: string;
  html_url: string;
}

// Function to fetch a single GitHub user by username
export const fetchGithubUser = async (username: string): Promise<GithubUser> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error('User not found');
    }

    const data = await response.json();

    // Return only the relevant fields for the Candidate
    return {
      login: data.login,
      name: data.name || '',
      location: data.location || '',
      email: data.email || '',
      company: data.company || '',
      avatar_url: data.avatar_url,
      html_url: data.html_url,
    };
  } catch (err) {
    console.error('Error fetching GitHub user:', err);
    throw new Error('Failed to fetch GitHub user');
  }
};

// Function to fetch a random GitHub user (candidate) to be displayed
export const fetchNextCandidate = async (): Promise<GithubUser[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;  // Random starting point for users
    const response = await fetch(`https://api.github.com/users?since=${start}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,  // Authorization header
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch candidate');
    }

    // Map the fetched data to the GithubUser type to ensure proper structure
    return data.map((user: any) => ({
      login: user.login,
      name: user.name || '',
      location: user.location || '',
      email: user.email || '',
      company: user.company || '',
      avatar_url: user.avatar_url,
      html_url: user.html_url,
    }));
  } catch (err) {
    console.error('Error fetching next candidate:', err);
    return [];  // Return empty array if there's an error
  }
};
