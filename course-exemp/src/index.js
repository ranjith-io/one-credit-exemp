import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import  {BrowserRouter} from 'react-router-dom'; // Import BrowserRouter for routing
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="349725818925-jce3cdh3aphljnds4l0khd2rs7n7hbo2.apps.googleusercontent.com">
  <BrowserRouter>  
      <App />
      
  </BrowserRouter>  
  
  </GoogleOAuthProvider>
);
