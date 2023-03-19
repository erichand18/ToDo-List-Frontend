import React from 'react';


import './Task.css';


function Task(props) {
  return (
    <div className="task">
      <div className="task__checkbox">
        <input type="checkbox" checked={props.data.complete}></input>
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
  )
}

export default Task