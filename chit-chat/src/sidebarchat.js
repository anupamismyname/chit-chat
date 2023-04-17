import React from 'react'
import "./sidebarchat.css";
import { Avatar } from '@mui/material';


function sidebarchat() {
  return (
    <div className='sidebarchat'>
      <Avatar />
      <div className='SidebarChat-info'>
        <h2>Room Name</h2>
        <p>This is tha last massage from Room</p>
      </div>
    </div>
  )
}

export default sidebarchat
