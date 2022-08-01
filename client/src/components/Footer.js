import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="inner-footer">

        <div className="footer-items">
          <h1>Company Name</h1>
          <p>Description of any product or motto of the company.</p>
        </div>

        <div className="footer-items">
          <h3>Quick Links</h3>
          <div className="border1"></div>
          <ul>
            <Link to="#"><li>Home</li></Link>
            <Link to="#"><li>Search</li></Link>
            <Link to="#"><li>Contact</li></Link>
            <Link to="#"><li>About</li></Link>
          </ul>
        </div>

        <div className="footer-items">
          <h3>Recipes</h3>
          <div className="border1"></div>
          <ul>
            <Link to="#"><li>Indian</li></Link>
            <Link to="#"><li>Chinese</li></Link>
            <Link to="#"><li>Mexican</li></Link>
            <Link to="#"><li>Italian</li></Link>
          </ul>
        </div>

        <div className="footer-items">
          <h3>Contact us</h3>
          <div className="border1"></div>
          <ul>
            <li><i className="fa fa-map-marker" aria-hidden="true"></i>XYZ, abc</li>
            <li><i className="fa fa-phone" aria-hidden="true"></i>123456789</li>
            <li><i className="fa fa-envelope" aria-hidden="true"></i>xyz@gmail.com</li>
          </ul>

          <div className="social-media">
            <Link to="#"><i className="fab fa-instagram"></i></Link>
            <Link to="#"><i className="fab fa-facebook"></i></Link>
            <Link to="#"><i className="fab fa-google-plus-square"></i></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer