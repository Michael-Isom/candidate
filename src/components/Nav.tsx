import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Nav = () => {
  return (
    <nav>
      <ul>
        {/* Links to navigate between different pages */}
        <li><Link to="/">Home</Link></li>  {/* Home page link */}
        <li><Link to="/about">About</Link></li>  {/* About page link */}
        <li><Link to="/contact">Contact</Link></li>  {/* Contact page link */}
      </ul>
    </nav>
  );
};

export default Nav;