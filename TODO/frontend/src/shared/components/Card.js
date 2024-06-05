import React from "react";
import "./Card.css";

const Card = ({ message }) => {
  return (
    <div className="card">
      <p>{message}</p>
    </div>
  );
};

export default Card;
