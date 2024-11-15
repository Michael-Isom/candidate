// api.tsx
/// <reference types="vite/client" />

// GithubUser interface with `id` explicitly defined
export interface GithubUser {
  login: string;
  avatar_url: string;
  location: string;
  email: string;
  company: string;
  html_url: string;
  id: number; // Ensure `id` is included and defined as number
  name: string;
}

// Candidate interface with `id` defined as a string
export interface Candidate {
  login: string;
  avatar_url: string;
  location: string;
  email: string;
  company: string;
  html_url: string;
  id: string; // `id` in Candidate is a string
  name: string;
}

// Fetch GitHub users
const searchGithub = async (): Promise<Candidate[]> => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1; // Random start for pagination
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );

    const data: GithubUser[] = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response. Check the network tab for details.');
    }

    // Map GitHub users to candidates
    return data.map((user: GithubUser) => ({
      login: user.login,
      avatar_url: user.avatar_url,
      location: user.location || "Not provided",
      email: user.email || "Not provided",
      company: user.company || "Not provided",
      html_url: user.html_url,
      id: user.id.toString(), // Ensure `id` is converted to string for Candidate
      name: user.name || user.login,
    }));
  } catch (err) {
    console.error('Error fetching GitHub users:', err);
    return [];
  }
};

// Fetch a specific GitHub user
const searchGithubUser = async (username: string): Promise<Candidate | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });

    const data: GithubUser = await response.json();

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
      id: data.id.toString(), // Ensure `id` is converted to string for Candidate
      name: data.name || data.login,
    };
  } catch (err) {
    console.error(`Error fetching user ${username}:`, err);
    return null;
  }
};

export { searchGithub, searchGithubUser };
