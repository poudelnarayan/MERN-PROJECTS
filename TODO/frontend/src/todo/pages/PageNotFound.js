import React from "react";

import "./PagenotFound.css";

const PageNotFound = () => {
  return (
    <React.Fragment>
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <p className="not-found-text">
            Oops! The page you're looking for doesn't exist.
          </p>
          <a href="/" className="not-found-link">
            Go back to Home
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PageNotFound;
