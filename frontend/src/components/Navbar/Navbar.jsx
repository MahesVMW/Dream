import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ setShowlogin }) => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showFullScreenMenu, setShowFullScreenMenu] = useState(false);


  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    setShowProfileDropdown(false);
  };

  const toggleMenu = () => {
    setShowFullScreenMenu(!showFullScreenMenu);
    document.body.classList.toggle('menu-open', !showFullScreenMenu);
  };

  const closeMenu = () => {
    setShowFullScreenMenu(false);
    document.body.classList.remove('menu-open');
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const toggleCollectionsDropdown = () => {
    setShowCollectionsDropdown(!showCollectionsDropdown);
  };

  const handleProfileClick = (callback) => {
    callback();
    setShowProfileDropdown(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="cont">
        <button className="navbar-toggler ml-2" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse ${showFullScreenMenu ? 'show' : ''}`} id="navbarNav">
          <button className="btn-close-menu" onClick={closeMenu}>×</button>
<ul className="navbar-nav">
  <li className="nav-item" onClick={closeMenu}>
    <Link to='/' className="nav-link">Home</Link>
  </li>
  <hr />
  <li className="nav-item" onClick={closeMenu}>
    <a href='#app-download' className="nav-link">Mobile App</a>
  </li>
  <hr />
  <li className="nav-item" onClick={closeMenu}>
    <Link to='/contactus' className="nav-link">Contact-us</Link>
  </li>
  <hr />
  <li className="nav-item" onClick={closeMenu}>
    <a href="#!" className="nav-link">Collections</a>
  </li>
  <hr />
  <li className="nav-item" onClick={closeMenu}>
    <a href='/aboutus' className="nav-link">About-us</a>
  </li>
  <hr />
</ul>

        </div>
        <Link to='/' className="navbar-brand py-4">
          <img src={assets.dream} alt="Logo" className="logo mt-2" />
        </Link>
        <div className="navbar-icons d-flex align-items-center">
          {token && (
            <div className="navbar-profile position-relative mr-1">
              <img
                src={assets.profile_icon}
                alt="Profile"
                onClick={toggleProfileDropdown}
              />
              {showProfileDropdown && (
                <ul className="nav-profile-dropdown position-absolute">
                  <li className="d-flex align-items-center gap-2" onClick={() => handleProfileClick(() => navigate('/myorders'))}>
                    <img src={assets.bag_icon} alt="Orders" />Orders
                  </li>
                  <hr />
                  <li className="d-flex align-items-center gap-2" onClick={logout}>
                    <img src={assets.logout_icon} alt="Logout" />Logout
                  </li>
                </ul>
              )}
            </div>
          )}
          {!token ? (
            <button className="btn btn-outline-tomato ms-3" onClick={() => setShowlogin(true)}>Sign In</button>
          ) : null}
          <Link to='/cart' className="d-flex align-items-center position-relative me-2">
            <img src={assets.basket_icon} alt="Cart" />
            {getTotalCartAmount() > 0 && <div className="dot position-absolute"></div>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
