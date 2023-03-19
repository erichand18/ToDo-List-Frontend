import React from 'react';
import axios from 'axios';

import './Task.css';

async function toggleTaskComplete(task_id, complete) {
  const bearer_token = sessionStorage.getItem('bearer_token');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': bearer_token,
    },
  };

  const task_info = {
    task_id,
    complete,
  }

  await axios.post(
    'http://localhost:8000/task/complete',
    task_info,
    config,
  )

  return
}

function Task(props) {

  async function handleTaskCheck(e) {
    e.preventDefault();

    await toggleTaskComplete(props.data.id, props.data.complete);
  }

  return (
    <div className="task">
      <div className="task__checkbox">
        <input type="checkbox" checked={props.data.complete} onClick={handleTaskCheck}></input>
      </div>
      <div className="task__details">
        <div className="task__titlebar">
          {props.data.task_name}
        </div>
        <div className="task__content">
          {props.data.task_description}
        </div>
      </div>
    </div>
  );
}

export default Task