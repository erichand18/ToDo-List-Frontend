import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from '../Login/Login';
import useToken from './useToken';
import TaskList from '../TaskList/TaskList';

import './App.css';

//Fetches list from the backend
async function getList(token) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    useCredentials: false,
  }
  const username = sessionStorage.getItem('username')

  const data = {
    csrfmiddlewaretoken: token,
    username: username,
  }

  const list_data = await axios.post(
    'http://localhost:8000/task/list',
    data,
    config
  );

  return list_data ? list_data : [];
}

function App() {
  const { token, setToken } = useToken()
  const [list, setList] = useState([])

  useEffect(() => {
    const fetchList = async () => {
      try {
        setList([]);
        const list_data = await getList(token);
        setList(list_data.data.tasks);
      } catch (e) {
        console.log(e)
        setList([]);
      }
    };
    fetchList();
  }, [token])

  // If no token, take the user to the login screen
  if (!token) {
    return (
      <Login setToken={setToken} />
    )
  }


  let taskListDisplay;

  if (list) {
    taskListDisplay = <TaskList task_list={list} />
  } else {
    taskListDisplay = <h1>No Tasks</h1>
  }


  return (
    <div className="wrapper">
      <div className="header">
        <h1>Welcome to ToDo List!</h1>
        <div className="taskbar">
          <button className="taskbar-button">
            Log out
          </button>
          <button className="taskbar-button">
            +
          </button>
        </div>
      </div>
      <div className="body">
        {taskListDisplay}
      </div>
    </div>
  );
}

export default App;
