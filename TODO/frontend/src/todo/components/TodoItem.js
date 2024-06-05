import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./TodoItem.css"; // Import the CSS file for styling

import { useNavigate } from "react-router-dom";

const TodoItem = (props) => {
  const navigate = useNavigate();
  return (
    <div className={`todo-item ${props.priority}`}>
      <h2 className="todo-title">
        <i className="fas fa-tasks"></i>{" "}
        <span className="todo-text">{props.title}</span>
      </h2>
      <p className="todo-description">
        <i className="fas fa-align-left"></i>{" "}
        <span className="todo-text">{props.description}</span>
      </p>
      <p className="todo-date">
        <i className="fas fa-calendar-alt"></i>{" "}
        <span className="todo-text">Created on: {props.creationDate}</span>
      </p>
      <p className="todo-date">
        <i className="fas fa-calendar-check"></i>{" "}
        <span className="todo-text">Due by: {props.dueDate}</span>
      </p>
      <p className="todo-priority">
        <i className="fas fa-exclamation-circle"></i>{" "}
        <span className="todo-text">Priority: {props.priority}</span>
      </p>
      <p
        className={`todo-status ${
          props.isCompleted ? "completed" : "not-completed"
        }`}
      >
        <i
          className={`fas ${
            props.isCompleted ? "fa-check-circle" : "fa-times-circle"
          }`}
        ></i>
        <span className="todo-text">
          Status: {props.isCompleted ? "Completed" : "Not Completed"}
        </span>
      </p>
      <div className="todo-actions">
        <button
          onClick={() => props.onTaskComplete(props.id)}
          className="todo-action-btn complete-btn"
        >
          <i
            className={`fas ${props.isCompleted ? "fa-undo" : "fa-check"}`}
          ></i>
          {props.isCompleted ? "Undo" : "Complete"}
        </button>

        {!props.isCompleted && (
          <button
            onClick={() => navigate(`/edit-task/${props.id}`)}
            className="todo-action-btn edit-btn"
          >
            <i className="fas fa-edit"></i> Edit
          </button>
        )}
        <button
          onClick={() => props.onDelete(props.id)}
          className="todo-action-btn delete-btn"
        >
          <i className="fas fa-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
