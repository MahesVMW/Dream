import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.dream}  className='logo' alt="" />
            <p className='mt-3'>At Dream Clothings, we believe that fashion is more than just clothing—it's an expression of who you are. Our mission is to bring you high-quality, stylish apparel that makes you feel confident and comfortable every day. Whether you're dressing for a special occasion or looking for everyday essentials, our curated collections offer something for everyone. Thank you for choosing Dream Clothings to be a part of your style journey.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-222-432-7886</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ Tomato.com-All Rights Reserved</p>
    </div>
  )
}

export default Footer
