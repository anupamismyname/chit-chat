//import logo from './logo.svg';
//import './App.css';
//import Message from '@mui/icons-material';
//import React from 'react';
import React, { useState } from 'react';
import "./App.css";
import Sidebar from './sidebar';
import Chat from './chat';
import Pusher from "pusher-js";
import { useEffect } from 'react';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync').then(response => {
        setMessages(response.data);
      })
  }, []);

  useEffect(() => {
    const pusher = new Pusher('fca747566048089f1313', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
      channel.bind('inserted', function(newMessage) {
        setMessages([...messages, newMessage]);
      });

      return () => {
        channel.unbind_all()
        channel.unsubscribe();
      }
  }, [messages]);

  console.log(messages);
  


  return (
    <div className="app">
      <div className='app-body'>
        <Sidebar />  {/*sidebar componant*/}
        <Chat messages={messages} />


      </div>

    
    {/*Chat Componant*/} 
    

    </div>
  );
}

export default App;
