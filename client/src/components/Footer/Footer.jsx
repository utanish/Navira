import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>NGO Site Generator</h3>
          <p>Empowering non-profit organizations with beautiful websites.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/create">Create Website</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@ngositegenerator.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} NGO Site Generator. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
