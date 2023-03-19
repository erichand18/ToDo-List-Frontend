import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Login.css';

async function userLogin(login_credentials) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }
  const data = await axios.post(
    'http://localhost:8000/user/login',
    login_credentials,
    config,
  )
  sessionStorage.setItem('csrf_token', data.data.csrf_token);
  sessionStorage.setItem('bearer_token', data.data.bearer_token);

  return
}

async function userSignup(signup_info) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }

  await axios.post(
    'http://localhost:8000/user/signup',
    signup_info,
    config,
  );
};

function Login(props) {
  const { setToken } = props

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const [newUser, setNewUser] = useState(false)
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState()


  function handleNewUser(e) {
    e.preventDefault();

    setNewUser(!newUser);
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();

    // set the csrf and bearer tokens in sessionStorage
    await userLogin({
      username,
      password,
    })
    const bearer_token = sessionStorage.getItem('bearer_token');

    setToken(bearer_token)
  }

  async function handleSignupSubmit(e) {
    e.preventDefault();

    await userSignup({
      first_name: firstName,
      last_name: lastName,
      email,
      username,
      password,
    })

    setNewUser(false);
  }

  if (!newUser) {
    return (
      <div className="login-signup-form">
        <form onSubmit={handleLoginSubmit}>
          <div className="login-signup-form__logo-container">
            <img src="https://todo-app-resource-files.s3.us-east-2.amazonaws.com/pngegg.png" alt="login logo"></img>
          </div>
          <div className="login-signup-form__content">
            <div className="login-signup-form__header">
              Login to your account
            </div>
            <input className="login-signup-form__input" onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Username"></input>
            <input className="login-signup-form__input" onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password"></input>
            <button className="login-signup-form__button" type="submit">Login</button>
            <div className="login-signup-form__signup" onClick={handleNewUser}>Sign up</div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="login-signup-form">
      <form onSubmit={handleSignupSubmit}>
        <div className="login-signup-form__logo-container">
          <img src="https://todo-app-resource-files.s3.us-east-2.amazonaws.com/pngegg.png" alt="login logo"></img>
        </div>
        <div className="login-signup-form__content">
          <div className="login-signup-form__header">
            Sign Up for an Account
          </div>
          <input className="login-signup-form__input" onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Username"></input>
          <input className="login-signup-form__input" onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password"></input>
          <input className="login-signup-form__input" onChange={(e) => setFirstName(e.target.value)} type="text" name="first-name" placeholder="First Name"></input>
          <input className="login-signup-form__input" onChange={(e) => setLastName(e.target.value)} type="text" name="last-name" placeholder="Last Name"></input>
          <input className="login-signup-form__input" onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Email"></input>
          <button className="login-signup-form__button" type="submit">Sign Up</button>
          <div className="login-signup-form__signup" onClick={handleNewUser}>Login</div>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;