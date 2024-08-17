import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Placeorder from './pages/Placeorder/Placeorder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import Contactus from './components/Contactus/Contactus';
import About from './components/About/About';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './components/Profile/Profile';

const App = () => {
  const [showLogin, setShowlogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowlogin={setShowlogin} />}
      <div className="app">
        <Navbar setShowlogin={setShowlogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart setShowlogin={setShowlogin} />} />
          <Route path='/order' element={<Placeorder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/contactus' element={<Contactus />} />
          <Route path='/aboutus' element={<About />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
