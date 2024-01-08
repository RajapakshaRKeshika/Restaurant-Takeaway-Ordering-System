import React from 'react';
import './footer.css'; // Make sure to link the correct CSS file
import { FaFacebook, FaInstagram, FaTwitter, FaTripadvisor } from 'react-icons/fa'; // Social media icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Taste Colombo</h2>
          <p>Experience the flavors of Sri Lanka, from our kitchen to your table.</p>
          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://tripadvisor.com" target="_blank" rel="noopener noreferrer"><FaTripadvisor /></a>
          </div>
        </div>
        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li>Home</li>
            <li>Menu</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Visit Us</h2>
          <address>
            123 Spice Road, Colombo 03,<br />
            Sri Lanka<br />
            Open Hours: 10AM - 10PM<br />
            <a href="tel:+94123456789">+94 123 456 789</a><br />
            <a href="mailto:info@lankabites.lk">info@tastecolombo.lk</a>
          </address>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Taste Colombo 
      </div>
    </footer>
  );
};

export default Footer;
