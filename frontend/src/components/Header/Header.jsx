import React from 'react';
import './Header.css';
import storeVideo from '../../assets/store.mp4';

const Header = () => {
  return (
    <div className="header">
      <video className="header-video" autoPlay loop muted>
        <source src={storeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="header-contents">
        <h2>Enhance Your Style</h2>
        <p>Building a Better You</p>
      </div>
    </div>
  );
}

export default Header;
