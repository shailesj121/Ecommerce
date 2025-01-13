import React from "react";
import { Link } from "react-router-dom";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="footer" style={{ padding: "20px", backgroundColor: "#f8f9fa", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
      {/* Left Side: Contact Details */}
      <div className="footer-left" style={{ flex: 1 }}>
        <h3>Contact Us</h3>
        <p>
          <BiMailSend /> : help@tyohar.com
        </p>
        <p>
          <BiPhoneCall /> : +919318391068
        </p>
        <p>
          <BiSupport /> : Business Hours: 11:00 AM - 7:00 PM (Mon - Sat)
        </p>
        <p>
          <strong>Address:</strong> F15/6, Third Floor, Krishna Nagar, Delhi 10051
        </p>
      </div>
      
      {/* Right Side: Navigation Links */}
      <div className="footer-right" style={{ flex: 1, textAlign: 'right' }}>
        <h3>Quick Links</h3>
        <p>
          <Link to="/about">About</Link> | 
          <Link to="/contact">Contact</Link> | 
          <Link to="/policy">Privacy Policy</Link>
        </p>
        <div className="social-links">
          <a href="https://www.facebook.com/share/WCjm88oezBmX7U6x/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
            Facebook
          </a>
          <a href="https://www.instagram.com/tyohar_bydr.apoorva/profilecard/?igsh=MTQyenZmZ3picTMwZQ==" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
      
    </div>
  );
};

export default Footer;
