import React, { useState } from 'react';
import axios from 'axios';

import './TaskCreate.css';


async function taskCreate(task_info) {
  const bearer_token = sessionStorage.getItem('bearer_token');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': bearer_token,
    },
  };

  await axios.post(
    'http://localhost:8000/task/new',
    task_info,
    config,
  )

  return
}

function TaskCreate(props) {

  const [taskName, setTaskName] = useState();
  const [taskDescription, setTaskDescription] = useState();

  async function handleNewTaskSubmit(e) {
    e.preventDefault();

    await taskCreate({
      name: taskName,
      description: taskDescription,
    });

    props.setTaskCreate(false);
  }

  function handleCancelButton(e) {
    e.preventDefault();

    props.setTaskCreate(false);
  }

  return (
    <div className="new-task-form">
      <form onSubmit={handleNewTaskSubmit}>
        <div className="new-task-form__content">
          <div className="new-task-form__header">
            New Task
          </div>
          <label className="new-task-form__label" htmlFor="task_name">Name:</label>
          <input className="new-task-form__input" onChange={(e) => setTaskName(e.target.value)} type="text" name="task_name" placeholder="My Task"></input>
          <label className="new-task-form__label" htmlFor="task_description">Description:</label>
          <textarea className="new-task-form__input" onChange={(e) => setTaskDescription(e.target.value)} rows="4" cols="50" name="task_description" placeholder="Lorem Ipsum something something something"></textarea>
          <button className="new-task-form__button" type="submit">Create Task</button>
          <button className="new-task-form__button" onClick={handleCancelButton}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default TaskCreate;