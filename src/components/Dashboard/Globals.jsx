import React, { useState } from 'react'
import "./Main.css"
import axios from 'axios';

export default function Globals() {
  const [users, setUsers] = useState([]);
  const userInfo = JSON.parse(window.localStorage.getItem("User"));
  const userId = userInfo.id;

  axios.get("http://localhost:4000/users")
    .then(res => setUsers(res.data))

  return (
    <div className='global-box'>
      <div className="global-header">
        <h3>Users</h3>
      </div>

      <div className="users-list">
        {
          users.map(user => {
            if (user.id !== userId) {
              return (
                <div className="user-card">
                  <div className="user-card-logo">
                    <i className='fas fa-user'></i>
                  </div>
                  <div className="user-card-text">
                    <span className="user-card-name">{user.fullName}</span>
                    <span className="user-card-uname">@{user.uname}</span>
                  </div>
                </div>
              )
            }

          })
        }
      </div>
    </div>
  )
}
