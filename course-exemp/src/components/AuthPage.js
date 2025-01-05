// AuthPage.js
import React from 'react';
import {GoogleLogin} from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import './AuthPage.css';

function AuthPage({ onLoginSuccess, onLoginFailure }) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <img className ='bitlogo' src='../../login-logo-dark-mode.png' alt="BITSathy Logo" />
        <h1>Welcome to One Credit Course Exemption</h1>
        <div className="auth-login-button">
          <GoogleLogin
            onSuccess={(response) => {
              try {
              const decodedToken = jwtDecode(response.credential);
                // console.log('Decoded token:', decodedToken);
              
              const  email  = decodedToken.email; // Extract email from the response
              if (email === 'ranjith.mc22@bitsathy.ac.in') {
                // Call admin-specific handler
                onLoginSuccess(decodedToken, true);
              } else {
                // Call student-specific handler
                onLoginSuccess(decodedToken, false);
              }
            } catch (error) {
              console.error('Error decoding token:', error);
              onLoginFailure(error);
            }}
          }
            onError={onLoginFailure}
            useOneTap
            render={(renderProps) => (
              <button
                className="custom-google-login-btn"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Sign in with Google
              </button>
              
            )}
         />
        </div>
        <p>Login with Bitsathy mail</p>
      </div>
    </div>
  );
}

export default AuthPage;
