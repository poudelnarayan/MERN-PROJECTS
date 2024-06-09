import React, { useState } from "react";

import "./Todo.css";
import TodoList from "../components/TodoList";
import Notification from "../../shared/components/Notification";

const Todo = (props) => {
  const [showNotification, setShowNotification] = useState(false);

  const deleteTask = (id) => {
    props.onDelete(id);
    setShowNotification(true);
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        <TodoList
          items={props.items}
          onEdit={props.onEdit}
          onDelete={deleteTask}
          onTaskComplete={props.onTaskComplete}
        />
        {showNotification && (
          <Notification
            message="Task Deleted"
            actionText="Undo"
            onAction={props.onUndelete}
            onClose={() => setShowNotification(false)}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Todo;
