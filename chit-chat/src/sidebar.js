import React from 'react';
import "./Sidebar.css";
/*import DonutLargeIcon from @material-ui/core*/
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { SearchOutlined } from '@mui/icons-material';
import SidebarChat from './sidebarchat.js';


function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-hader'>
        <AccountCircleIcon />
        <div className='sidebar-headerRight'>
            <IconButton>
                <ChatIcon />   
            </IconButton>
            <IconButton>
                <DonutLargeIcon />   
            </IconButton>
            <IconButton>
                <MoreVertIcon />   
            </IconButton>
        </div>
      </div>

      <div className='sidebar-search'>
        <div className='sidebar-searchContainer'>
          <SearchOutlined />
          <input placeholder="Search or start new chat" type= "text" />
        </div>
      </div>

      <div className="sidebar-chats">
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>


    </div>
  )
}

 export default Sidebar;