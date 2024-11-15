Candidate Search Application

Overview

A React-based application that allows users to search for GitHub profiles and save them for future reference. The app uses the GitHub API to fetch user information and stores candidates locally in the browser.

Features

	•	Search GitHub Users: Fetch GitHub users using the GitHub API.
	•	Save Candidates: Users can save candidate profiles to a list.
	•	View Saved Candidates: View a list of all saved candidates with their details.
	•	GitHub Token Integration: Uses a personal GitHub token for API requests.

Prerequisites

	•	Node.js installed.
	•	Vite development server for React.
	•	GitHub token stored in .env.

Installation

	1.	Clone the repository:
 git clone <your-repo-url>
cd candidate-search

	2.	Install dependencies:
 npm install

 
	3.	Set up .env:
	•	Create a .env file in the root directory and add your GitHub token:
 VITE_GITHUB_TOKEN=your-github-token

 	4.	Run the app:
  npm run dev

  Your app will be accessible at http://localhost:3000.

Application Flow

	1.	GitHub User Search:
	•	Users can input a GitHub username to fetch data like name, email, location, company, etc.
	2.	Save Candidate:
	•	Users can save the fetched profile to a list of candidates.
	3.	Saved Candidates:
	•	The app stores saved candidates in the browser’s localStorage and allows users to view and manage them.

Code Snippets

Fetch GitHub Users with API
const searchGithub = async (): Promise<Candidate[]> => {
  const response = await fetch(
    `https://api.github.com/users?since=${Math.floor(Math.random() * 100000000) + 1}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    }
  );
  const data: GithubUser[] = await response.json();
  return data.map(user => ({
    id: user.id.toString(),
    login: user.login,
    avatar_url: user.avatar_url,
    name: user.name || user.login,
    location: user.location || 'Not provided',
    email: user.email || 'Not provided',
    company: user.company || 'Not provided',
    html_url: user.html_url,
  }));
};

Deployment

To deploy the app:
	1.	Build the app:
 npm run build

 	2.	Deploy to platforms like Netlify, Vercel, or GitHub Pages.
	3.	After deployment, you’ll get a public URL for the app.

License

MIT License
