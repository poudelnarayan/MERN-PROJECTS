import React from "react";

import TodoItem from "./TodoItem";

import Card from "../../shared/components/Card";

const TodoList = (props) => {
  return (
    <div>
      {props.items.length === 0 && <Card message="No Tasks Found" />}
      <div className="todo-list">
        {props.items.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            creationDate={item.creationDate}
            dueDate={item.dueDate}
            priority={item.priority}
            isCompleted={item.isCompleted}
            onTaskComplete={props.onTaskComplete}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
