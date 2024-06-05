import React from "react";

import "./Todo.css";
import TodoList from "../components/TodoList";

const Todo = (props) => {
  return (
    <React.Fragment>
      <div className="wrapper">
        <TodoList
          items={props.items}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
          onTaskComplete={props.onTaskComplete}
        />
      </div>
    </React.Fragment>
  );
};

export default Todo;
