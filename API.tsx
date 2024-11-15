/// <reference types="vite/client" />

// Define TypeScript interface for ImportMetaEnv
interface ImportMetaEnv {
  readonly VITE_GITHUB_TOKEN: string;
}

// Extend the ImportMeta interface
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Define the Candidate interface to ensure proper typing for GitHub user data
export interface Candidate {
  login: string;      // Username
  avatar_url: string; // Avatar URL
  location: string;   // Location
  email: string;      // Email (might be null depending on the user)
  company: string;    // Company (might be null)
  html_url: string;   // Profile URL
  id: number;         // Unique ID
  name: string;       // Full name
}

// Fetch a random list of GitHub users to be used in the candidate search
const searchGithub = async (): Promise<Candidate[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1; // Random start for pagination
    const response = await fetch(
      `https://api.github.com/users?since=${start}`, // Fetch random users after the given "start"
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Include GitHub token for auth
        },
      }
    );

    const data = await response.json();
    
    // Ensure that the response is an array of candidates
    if (!response.ok) {
      throw new Error('Invalid API response. Check the network tab for details.');
    }

    // Map API response to candidates' specific structure
    return data.map((user: any) => ({
      login: user.login,
      avatar_url: user.avatar_url,
      location: user.location || "Not provided",
      email: user.email || "Not provided",
      company: user.company || "Not provided",
      html_url: user.html_url,
      id: user.id,
      name: user.name || user.login,  // Use username if name is not available
    }));
  } catch (err) {
    console.error('An error occurred while fetching GitHub users:', err);
    return [];
  }
};

// Fetch a specific GitHub user by username
const searchGithubUser = async (username: string): Promise<Candidate | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Include GitHub token for auth
      },
    });

    const data = await response.json();

    // Check if the response is okay and that we have valid user data
    if (!response.ok) {
      throw new Error(`User ${username} not found`);
    }

    return {
      login: data.login,
      avatar_url: data.avatar_url,
      location: data.location || "Not provided",
      email: data.email || "Not provided",
      company: data.company || "Not provided",
      html_url: data.html_url,
      id: data.id,
      name: data.name || data.login,
    };
  } catch (err) {
    console.error(`An error occurred while fetching user ${username}:`, err);
    return null;
  }
};

export { searchGithub, searchGithubUser };  // Ensure both functions are exported
