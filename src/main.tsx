// src/main.tsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import CandidateSearch from './pages/CandidateSearch';
import SavedCandidates from './pages/SavedCandidates';
import ErrorPage from './pages/ErrorPage';
import './index.css'; // Ensure your styles are applied

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<CandidateSearch />} />
          <Route path="saved-candidates" element={<SavedCandidates />} />
        </Route>
        <Route path="*" element={<ErrorPage />} /> {/* Catch-all route for undefined paths */}
      </Routes>
    </Router>
  );
}