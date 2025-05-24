import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">NGO</span>
          <span className="logo-accent">Site</span>
          <span className="logo-text">Generator</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link create-btn">
              Create Website
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
