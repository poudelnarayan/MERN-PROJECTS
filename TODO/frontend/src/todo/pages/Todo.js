import React, { useState, useEffect } from "react";

import "./Todo.css";
import TodoList from "../components/TodoList";
import Notification from "../../shared/components/Notification";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/ErrorModal";
import LoadingSpinner from "../../shared/components/LoadingSpinner";

const Todo = (props) => {
  const [loadedTasks, setLoadedTasks] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showNotification, setShowNotification] = useState(false);

  const deleteTask = (id) => {
    props.onDelete(id);
    setShowNotification(true);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/tasks"
        );
        setLoadedTasks(responseData.activeTasks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, [sendRequest, setLoadedTasks]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && (
        <div className="wrapper">
          <TodoList
            items={loadedTasks}
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
      )}
    </React.Fragment>
  );
};

export default Todo;
