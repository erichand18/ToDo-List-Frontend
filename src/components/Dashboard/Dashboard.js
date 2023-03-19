import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../TaskList/TaskList';
import TaskCreate from '../TaskCreate/TaskCreate';

import './Dashboard.css';

//Fetches list from the backend
async function getList(token) {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': token,
    },
  }

  const list_data = await axios.get(
    'http://localhost:8000/task/list',
    config
  );

  return list_data ? list_data : [];
}

function Dashboard(props) {
  const [list, setList] = useState([])
  const [taskCreate, setTaskCreate] = useState(false);

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

  function handleLogOut(e) {
    e.preventDefault();

    sessionStorage.removeItem('bearer_token');

    props.setToken(null);
  };

  function handleTaskCreate(e) {
    e.preventDefault();

    setTaskCreate(true);
  }


  if (taskCreate) {
    return (
      <TaskCreate setTaskCreate={setTaskCreate} />
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard__content">
        <div className="dashboard-header">
          <h1 className="dashboard-header__text">My To-Do List</h1>
          <div className="dashboard-taskbar">
            <button className="dashboard-taskbar__button" onClick={handleLogOut}>
              Log out
            </button>
            <button className="dashboard-taskbar__button" onClick={handleTaskCreate}>
              +
            </button>
          </div>
        </div>
        <div className="dashboard__body">
          <TaskList task_list={list} />
        </div>
      </div>
    </div>
  )

}

export default Dashboard;