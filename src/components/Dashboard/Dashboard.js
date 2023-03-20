import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../TaskList/TaskList';
import TaskCreate from '../TaskCreate/TaskCreate';
import TaskEditAndShare from '../TaskEditAndShare/TaskEditAndShare';

import './Dashboard.css';

//Fetches list from the backend
async function getList() {

  const bearer_token = sessionStorage.getItem('bearer_token');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': bearer_token,
    },
  }
  const list_data = await axios.get(
    'http://localhost:8000/task/list',
    config
  );

  const data = {
    tasks: list_data.data?.tasks ? list_data.data?.tasks : [],
    shared_tasks: list_data.data?.shared_tasks ? list_data.data?.shared_tasks : [],
  }

  return data;
}

function Dashboard(props) {
  const [list, setList] = useState([]);
  const [sharedList, setSharedList] = useState([]);
  const [mode, setMode] = useState(null);
  const [selectedTask, setSelectedTask] = useState();

  useEffect(() => {
    const bearer_token = sessionStorage.getItem('bearer_token');
    const fetchList = async () => {
      try {
        setList([]);
        const list_data = await getList(bearer_token);
        setList(list_data.tasks);
        setSharedList(list_data.shared_tasks);
      } catch (e) {
        console.log(e)
        setList([]);
      }
    };
    fetchList();
  }, [mode])

  function handleLogOut(e) {
    e.preventDefault();

    sessionStorage.removeItem('bearer_token');

    props.setToken(null);
  };

  function handleTaskCreate(e) {
    e.preventDefault();

    setMode('create');
  }

  if (mode === 'create') {
    return (
      <TaskCreate
        setMode={setMode}
      />
    );
  } else if (mode === 'share') {
    return (
      <TaskEditAndShare
        mode="share"
        setMode={setMode}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
    );
  } else if (mode === 'edit') {
    return (
      <TaskEditAndShare
        mode="edit"
        setMode={setMode}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
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
          <TaskList
            task_list={list}
            shared_task_list={sharedList}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            setMode={setMode}
          />
        </div>
      </div>
    </div>
  )

}

export default Dashboard;