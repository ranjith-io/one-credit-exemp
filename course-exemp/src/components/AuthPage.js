// AuthPage.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './AuthPage.css';

function AuthPage({ onLoginSuccess, onLoginFailure }) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <img className ='bitlogo' src='../../login-logo-dark-mode.png' alt="BITSathy Logo" />
        <h1>Welcome to One Credit Course Exemption</h1>
        {/* <p>Log in to manage your course exemption requests easily.</p> */}
        <div className="auth-login-button">
          <GoogleLogin
            onSuccess={onLoginSuccess}
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
