import React from 'react';
import Task from '../Task/Task';


import './TaskList.css';

function TaskList(props) {

  return (
    <div className="tasklist">
      {props.task_list.map((task, index) => {
        return <Task
          data={task}
          key={task.id}
          index={index}
          setSelectedTask={props.setSelectedTask}
          setMode={props.setMode}
        />
      })}
      {props.shared_task_list.map((task, index) => {
        return <Task
          data={task}
          key={task.id}
          index={index}
          setSelectedTask={props.setSelectedTask}
          setMode={props.setMode}
        />
      })}
    </div>
  )
}

export default TaskList