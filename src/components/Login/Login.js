import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Login.css';

async function userLogin(login_credentials) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
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

function Login(props) {
  const { setToken } = props

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(username, password)
    // set the csrf and bearer tokens in sessionStorage
    await userLogin({
      username,
      password,
    })
    const bearer_token = sessionStorage.getItem('bearer_token');

    setToken(bearer_token)
  }

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="login-form__logo-container">
          <img src="https://todo-app-resource-files.s3.us-east-2.amazonaws.com/pngegg.png" alt="login logo"></img>
        </div>
        <div className="login-form__content">
          <div className="login-form__header">
            Login to your account
          </div>
          <input className="login-form__input" onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Username"></input>
          <input className="login-form__input" onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password"></input>
          <button className="login-form__button" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;