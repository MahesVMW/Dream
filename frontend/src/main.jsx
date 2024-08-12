import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/StoreContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <App />
      </SnackbarProvider>
    </StoreContextProvider>
  </BrowserRouter>
);
