import React from "react";

import "./AddTask.css";

import TodoForm from "../components/TodoForm";

const AddTask = (props) => {
  return (
    <React.Fragment>
      <div className="add-task">
        <TodoForm onSubmit={props.onNewTask} />
      </div>
    </React.Fragment>
  );
};

export default AddTask;
