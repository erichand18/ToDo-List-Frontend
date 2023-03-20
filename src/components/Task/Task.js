import React, { useState } from 'react';
import axios from 'axios';

import './Task.css';


async function toggleTaskComplete(task_id) {

  const bearer_token = sessionStorage.getItem('bearer_token');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': bearer_token,
    },
  };
  const task_info = {
    task_id,
  }

  const response_data = await axios.post(
    'http://localhost:8000/task/complete',
    task_info,
    config,
  )

  return response_data.data.completed
}

async function deleteTask(task_id) {
  const bearer_token = sessionStorage.getItem('bearer_token');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': bearer_token,
    },
  };

  await axios.delete(
    `http://localhost:8000/task/${task_id}/delete`,
    config,
  )

  return
}

function Task(props) {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [completed, setCompleted] = useState(props.data.completed);

  async function handleTaskCheck(e) {
    e.preventDefault();
    const updated_completed = await toggleTaskComplete(props.data.id);
    setCompleted(updated_completed);
  }

  function handleTaskEdit(e) {
    e.preventDefault();
    props.setSelectedTask(props.data);
    props.setMode('edit');
  }

  async function handleTaskDelete(e) {
    e.preventDefault();
    await deleteTask(props.data.id);
    props.setMode(null);
  }

  function handleTaskShare(e) {
    e.preventDefault();
    props.setSelectedTask(props.data);
    props.setMode('share');
  }

  return (
    <div className="task">
      <div className="task__body">
        <div className="task__checkbox">
          <input type="checkbox" checked={completed} onClick={handleTaskCheck}></input>
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
      <div className="task__dropdown">
        <label htmlFor={`toggle-menu-${props.index}`}>
          <img src="https://todo-app-resource-files.s3.us-east-2.amazonaws.com/ellipsis.png" alt="ellipses" />
        </label>
        <input type="checkbox" id={`toggle-menu-${props.index}`} onClick={() =>
          setOpenDropdownId(openDropdownId === props.index ? null : props.index)
        } />
        <ul className={`dropdown-content_${openDropdownId === props.index ? "open" : ""
          }`} id={`dropdown_${props.key}`}>
          <li className="task-dropdown__option" onClick={handleTaskEdit}>Edit</li>
          <li className="task-dropdown__option" onClick={handleTaskDelete}>Delete</li>
          <li className="task-dropdown__option" onClick={handleTaskShare}>Share</li>
        </ul>
      </div>
    </div>
  );
}

export default Task