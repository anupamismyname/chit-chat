//import React from 'react'
import React, { useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from '@mui/material';
import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material';
import MoodRoundedIcon from '@mui/icons-material/MoodRounded';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import axios from "./axios"



function Chat({ messages }) {
  const [input, setInput] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    await axios.post('/messages/new', {
      message: input,
      name: 'demo app',
      timestamp: 'just now',
      received: true,
    });
    setInput('');
  };
  return (
    <div className='chat'>
      <div className='chat-heder'>
        <Avatar />

        <div className='chat-headerInfo'>
          <h3>Room Name</h3>
          <p>last seen at...</p>
        </div>
        <div className='chat-headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className='chat-body'>
        {messages.map((message) => (
          <p className={`chat-message ${message.received && "chat-reciever"}`}>
            <span className='chat-name'>{message.name} </span>
            {message.message} 
            <span className='chat-time'>{message.timestamp} 
            </span>
          </p>
        ))}
      </div>
      <div className='chat-footer'>
        <MoodRoundedIcon />
        <form> 
          <input value={input} onChange={e => setInput(e.target.value)} placeholder='Type message' Type='text' />
          <button onClick={sendMessage} type='submit'>Send a message</button>
        </form>
        <MicNoneRoundedIcon />
      </div>
    </div>
  )
}

export default Chat;
