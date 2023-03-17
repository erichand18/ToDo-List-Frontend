import React from 'react';
import Login from '../Login/Login';
import useToken from './useToken';
import Dashboard from '../Dashboard/Dashboard';
import './App.css';

function App() {
  const { token, setToken } = useToken()

  // If no token, take the user to the login screen
  return !token
    ? <Login setToken={setToken} />
    : <Dashboard token={token} setToken={setToken} />
}


export default App;
