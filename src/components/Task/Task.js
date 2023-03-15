import React from 'react';


import './Task.css';


function Task(props) {
  return (
    <div className="task">

      <div className="checkbox">
        <input type="checkbox" checked={props.data.complete}></input>
      </div>

      <div className="task-details">

        <div className="titlebar">
          <h3>{props.data.task_name}</h3>
          <p>{props.data.date_created}</p>
        </div>

        <div className="task-body">
          <p>{props.data.task_description}</p>

        </div>

      </div>
    </div>
  )
}

export default Task