import { Link } from "react-router-dom";
import React from "react";

import "./MainNav.css";

const Mainnav = () => {
  return (
    <React.Fragment>
      <div className="nav-container">
        <nav className="nav-bar">
          <h1 className="nav-title">Todo</h1>
          <ul className="nav-links">
            <li>
              <Link to="/">My Tasks </Link>
            </li>
            <li>
              <Link to="/add-task">Add Task</Link>
            </li>
            <li>
              <Link to="/completed-tasks">Completed Tasks</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Mainnav;
