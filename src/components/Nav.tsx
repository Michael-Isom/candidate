// src/components/Nav.tsx
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Candidate Search</Link>
        </li>
        <li>
          <Link to="/saved-candidates">Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;