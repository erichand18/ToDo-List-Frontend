import React, { useState } from 'react';
import axios from 'axios';

import './TaskEditAndShare.css';


async function taskEdit(updates, task_id) {
  const bearer_token = sessionStorage.getItem('bearer_token');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': bearer_token,
    },
  };

  await axios.put(
    `http://localhost:8000/task/${task_id}/edit`,
    {
      task_name: updates.task_name,
      task_description: updates.task_description,
    },
    config,
  )

  return
}

async function taskShare(task_info) {
  const bearer_token = sessionStorage.getItem('bearer_token');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': bearer_token,
    },
  };

  await axios.post(
    'http://localhost:8000/task/share',
    task_info,
    config,
  )

  return
}

function TaskEditAndShare(props) {
  const [recipientUsername, setRecipientUsername] = useState();
  const [taskName, setTaskName] = useState(props.selectedTask.task_name);
  const [taskDescription, setTaskDescription] = useState(props.selectedTask.task_description);

  async function handleTaskSubmit(e) {
    e.preventDefault();

    if (props.mode === 'edit') {
      await taskEdit({
        id: props.selectedTask.id,
        task_name: taskName,
        task_description: taskDescription,
      },
        props.selectedTask.id,
      )
    } else if (props.mode === 'share') {
      await taskShare({
        recipient_username: recipientUsername,
        task_id: props.selectedTask.id,
      })
    }

    props.setMode(null);
  }

  function handleCancelButton(e) {
    e.preventDefault();

    props.setMode(null);
  }

  return (
    <div className="update-share-task-form">
      <form onSubmit={handleTaskSubmit}>
        <div className="update-share-task-form__content">
          <div className="update-share-task-form__header">
            {props.mode === "share"
              ? 'Share Task'
              : 'Edit Task'}
          </div>
          {props.mode === 'share'
            ? <>
              <label className="update-share-task-form__label" htmlFor="recipient_user">Recipient's Username:</label>
              <input
                className="update-share-task-form__input"
                onChange={(e) => setRecipientUsername(e.target.value)}
                type="text"
                name="recipient_user"
                placeholder="JohnnyAppleseed1"
              ></input>
            </>
            : <>
              <label className="update-share-task-form__label" htmlFor="task_name">Name:</label>
              <input
                className="update-share-task-form__input"
                onChange={(e) => setTaskName(e.target.value)}
                type="text"
                name="task_name"
                placeholder="My Task"
                value={taskName}
              ></input>
              <label
                className="update-share-task-form__label"
                htmlFor="task_description"
              >Description:</label>
              <textarea
                className="update-share-task-form__input"
                onChange={(e) => setTaskDescription(e.target.value)}
                rows="4"
                cols="50"
                name="task_description"
                placeholder="Lorem Ipsum something something something"
                value={taskDescription}
              ></textarea>
            </>
          }
          <button
            className="update-share-task-form__button"
            type="submit"
          >{props.mode === 'edit'
            ? 'Update Task'
            : 'Share Task'}
          </button>
          <button
            className="update-share-task-form__button"
            onClick={handleCancelButton}
          >
            {props.mode === 'edit'
              ? 'Cancel Edit'
              : 'Cancel Share'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskEditAndShare;