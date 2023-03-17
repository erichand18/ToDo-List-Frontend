import React from 'react';
import Task from '../Task/Task';


import './TaskList.css';

function TaskList(props) {

  return (
    <div className="tasklist">
      {props.task_list.map(task => {
        return <Task data={task} />
      })}
    </div>
  )
}

export default TaskList