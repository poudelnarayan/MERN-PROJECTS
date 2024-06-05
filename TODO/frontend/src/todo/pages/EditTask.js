import React from "react";

import "./AddTask.css";
import TodoForm from "../components/TodoForm";

const EditTask = (props) => {
  return (
    <React.Fragment>
      <div className="add-task">
        <TodoForm
          onSubmit={props.onEditTask}
          items={props.tasks}
          isEditing={true}
        />
      </div>
    </React.Fragment>
  );
};

export default EditTask;
