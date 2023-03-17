import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../TaskList/TaskList';

import './Dashboard.css';

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

function Dashboard(props) {
  const [list, setList] = useState([])

  useEffect(() => {
    const fetchList = async () => {
      try {
        setList([]);
        const list_data = await getList(props.token);
        setList(list_data.data.tasks);
      } catch (e) {
        console.log(e)
        setList([]);
      }
    };
    fetchList();
  }, [props.token])

  function handleClick(e) {
    e.preventDefault();

    sessionStorage.removeItem('bearer_token');
    sessionStorage.removeItem('csrf_token');

    props.setToken(null);
  }

  return (
    <div className="wrapper">
      <div className="header">
        <h1>Welcome to ToDo List!</h1>
        <div className="taskbar">
          <button className="taskbar-button" onClick={handleClick}>
            Log out
          </button>
          <button className="taskbar-button">
            +
          </button>
        </div>
      </div>
      <div className="body">
        <TaskList task_list={list} />
      </div>
    </div>
  )

}

export default Dashboard;