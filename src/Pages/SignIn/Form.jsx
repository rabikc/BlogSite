import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";

const Form = () => {
  const [type, setType] = useState("password");
  const onSubmit = (e) => {
    e.preventDefault();
  };

  const seePassword = () => {
    type === "password" ? setType("text") : setType("password");
  };

  return (
    <div className="form-wrapper">
      <h1>Sign-In </h1>
      <form onSubmit={onSubmit}>
        <div className="input-wrapper">
          <input type="text" name="username" id="username" required />
          <label for="username">Username</label>
        </div>
        <div className="input-wrapper">
          <input type={type} name="password" id="password" required />
          <label for="password"> Password</label>
          <BsEyeFill onClick={seePassword} />
        </div>
        <div className="extra-options">
          <div className="remember-me-wrapper">
            <input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              value="remember"
            />
            <label for="remember-me">Remember Me</label>
          </div>
          <Link to="#" className="forgot-password">
            Forgot password?
          </Link>
        </div>
        <input type="submit" value="Sign in" />
      </form>
      <Link to="#" className="signup-link">
        Don't have an account?
      </Link>
      <span className="or-divider">Or</span>
      <div className="social-login-links">
        <div className="google">
          <img src="google-logo.png" alt="Google" />
          <span>Log in with Google</span>
        </div>
        <div className="facebook">
          <img src="facebook-logo.png" alt="Facebook" />
          <span>Log in with Facebook</span>
        </div>
        <div className="facebook">
          <img src="twitter-logo.png" alt="Twitter" />
          <span>Log in with Twitter</span>
        </div>
      </div>
    </div>
  );
};

export default Form;
