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

    // set the csrf and bearer tokens in sessionStorage
    await userLogin({
      username,
      password,
    })
    const bearer_token = sessionStorage.getItem('bearer_token');

    setToken(bearer_token)
  }

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Login;