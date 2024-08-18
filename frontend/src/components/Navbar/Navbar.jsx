import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import MyOrders from "../../pages/MyOrders/MyOrders";

const NavbarComponent = ({ setShowlogin }) => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("profile");
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setToken("");
    }
  }, [setToken]);

  const userName = localStorage.getItem('userName') || 'guest';
  const userEmail = localStorage.getItem('userEmail') || 'Not Available';

  const toggleProfileMenu = () => {
    const isOpening = !showProfileMenu;
    setShowProfileMenu(isOpening);
    setSelectedMenu("profile");  // Set to profile by default when opening
    document.body.classList.toggle("menu-open", isOpening);
  };

  const toggleLeftMenu = () => {
    setShowLeftMenu(prevState => !prevState);
    document.body.classList.toggle("menu-open", !showLeftMenu);
  };

  const closeAllMenus = () => {
    setShowLeftMenu(false);
    setShowProfileMenu(false);
    document.body.classList.remove("menu-open");
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    closeAllMenus();
    setShowLogoutConfirmation(false);
  };

  const renderProfileContent = () => {
    switch (selectedMenu) {
      case "profile":
        return (
          <div className="profile-details">
            <p><i className="fas fa-user-circle"></i> {userName}</p>
            <p><i className="fas fa-envelope"></i> {userEmail}</p>
            <p><i className="fa-solid fa-address-book"></i> Not Available</p>
            <p><i className="fa-solid fa-phone"></i> Not Available</p>
          </div>
        );
      case "orders":
        return <MyOrders />;
      case "settings":
        return <div className="settings-details">Settings</div>;
      case "logout":
        return showLogoutConfirmation ? (
          <div className="logout-confirmation">
            <p>Are you sure you want to logout?</p>
            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={() => setShowLogoutConfirmation(false)}>Cancel</button>
              <button className="btn btn-danger" onClick={confirmLogout}>Logout</button>
            </div>
          </div>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div>
      {showLeftMenu && <div className="overlay active" onClick={closeAllMenus}></div>}
      {showProfileMenu && <div className="profile-overlay active" onClick={closeAllMenus}></div>}

      {/* Sidebar Menu for Small Devices */}
      <nav id="left-sidebar" className={showLeftMenu ? "active" : ""}>
        <div id="dismiss-left" onClick={toggleLeftMenu}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <ul className="list-unstyled components">
          <li><Link to="/" onClick={closeAllMenus}>Home</Link></li>
          <li><Link to="/aboutus" onClick={closeAllMenus}>About</Link></li>
          <li><Link to="/contactus" onClick={closeAllMenus}>Contact</Link></li>
        </ul>
      </nav>

      <div id="profile-menu" className={showProfileMenu ? "active" : ""}>
        <div className="profile-nav mt-5">
          <button className="btn-close-profile" onClick={toggleProfileMenu}>
            <i className="fas fa-times"></i>
          </button>
          <ul>
            <li
              className={selectedMenu === "profile" ? "active" : ""}
              onClick={() => setSelectedMenu("profile")}
            >
              <i className="fas fa-user"></i>
            </li>
            <li
              className={selectedMenu === "orders" ? "active" : ""}
              onClick={() => setSelectedMenu("orders")}
            >
              <i className="fas fa-box"></i>
            </li>
            <li
              className={selectedMenu === "settings" ? "active" : ""}
              onClick={() => setSelectedMenu("settings")}
            >
              <i className="fas fa-cog"></i>
            </li>
            <li
              onClick={() => {
                setSelectedMenu("logout");
                setShowLogoutConfirmation(true);
              }}
            >
              <i className="fa-solid fa-circle-left"></i>
            </li>
          </ul>
        </div>
        <div className="profile-content mx-5">
          {renderProfileContent()}
        </div>
      </div>

      {/* Navbar Header */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
        <button id="sidebarCollapseLeft" className="btn btn-primary d-lg-none ml-2" onClick={toggleLeftMenu}>
          <i className="fas fa-bars"></i>
        </button>
        <Link className="navbar-brand ml-5" to="/">
          <img src={assets.dream} alt="Logo" />
        </Link>

        <ul className="navbar-nav d-none d-lg-flex ml-5">
          <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
          <li className="nav-item"><Link to="/contact" className="nav-link">Contact</Link></li>
        </ul>

        <Link to='/cart' className="cart-icon d-flex align-items-center position-relative me-2">
          <i className="fa-solid fa-cart-shopping"></i>
          {getTotalCartAmount() > 0 && <div className="dot position-absolute"></div>}
        </Link>

        {token ? (
          <button id="profileToggle" className="profile-icon btn btn-primary mr-2" onClick={toggleProfileMenu}>
            <img src={assets.profile_image} alt="" />
          </button>
        ) : (
          <button className="btn signin ms-3" onClick={() => setShowlogin(true)}><i className="fa-solid fa-right-to-bracket"></i></button>
        )}
      </nav>
    </div>
  );
};

export default NavbarComponent;
