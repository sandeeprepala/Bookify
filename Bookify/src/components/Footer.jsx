import React from 'react';
import '../styles/Footer.css'; // create this CSS file for styles

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" />
        </a>
      </div>

      <div className="footer-links">
        <a href="/terms">Terms & Conditions</a>
      </div>

      <div className="footer-copy">
        © 2025 Bookify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
