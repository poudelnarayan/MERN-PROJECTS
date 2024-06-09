import React, { useState, useEffect } from "react";

import "./CompletedTask.css";

import TodoList from "../components/TodoList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/ErrorModal";
import LoadingSpinner from "../../shared/components/LoadingSpinner";

const CompletedTask = (props) => {
  const [loadedTasks, setLoadedTasks] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/tasks/completed"
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
            onDelete={props.onDelete}
            onTaskComplete={props.onTaskComplete}
          />
        </div>
      )}
    </React.Fragment>
  );
};
export default CompletedTask;
