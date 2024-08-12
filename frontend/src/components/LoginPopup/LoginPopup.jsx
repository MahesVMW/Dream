import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const LoginPopup = ({ setShowlogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const { enqueueSnackbar } = useSnackbar();

  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }
    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        setShowlogin(false);
        enqueueSnackbar(`${currState} successful!`, { variant: 'success' });
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    } catch (error) {
      console.error('Error during login/register: ', error);
      enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowlogin(false)} src={assets.cross_icon} alt='Close' />
        </div>
        <div className='login-popup-inputs'>
          {currState === 'Sign Up' && (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Your name'
              required={currState === 'Sign Up'}
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Password'
            required
          />
        </div>
        <button type='submit'>{currState === 'Sign Up' ? 'Create account' : 'Login'}</button>
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === 'Login' ? (
          <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
