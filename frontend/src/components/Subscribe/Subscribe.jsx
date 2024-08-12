import React from 'react';
import './Subscribe.css';
import { useSnackbar } from 'notistack';

const Subscribe = () => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    fetch("https://formspree.io/f/xvoedrpj", {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        enqueueSnackbar('Subscribed!', { variant: 'success' });
      } else {
        response.json().then(data => {
          if (data.errors) {
            enqueueSnackbar('Error: ' + data.errors.map(error => error.message).join(', '), { variant: 'error' });
          } else {
            enqueueSnackbar('Error submitting form', { variant: 'error' });
          }
        });
      }
    }).catch(error => {
      enqueueSnackbar('Network error: ' + error.message, { variant: 'error' });
    });
    event.target.reset();
  };

  return (
    <div className="subscribe-banner mt-5">
      <div className="subscribe-content">
        <div className="subscribe-text">
          <h2>Sign Up For Email!</h2>
          <p>Receive exclusive offers, new collections, and more.</p>
        </div>
        <form onSubmit={handleSubmit} className="subscribe-form">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="subscribe-input"
            required
          />
          <button type="submit" className="subscribe-button">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
