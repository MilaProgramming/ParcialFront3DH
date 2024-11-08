import React from 'react';
import userLogo from './assets/user.png'; // Adjust the path as necessary

function Card({ name, email }) {
  return (
    <div className="card">
      <img src={userLogo} alt="User" className="card-logo" />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

export default Card;
