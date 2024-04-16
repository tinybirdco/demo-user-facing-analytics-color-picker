"use client";

import React, { useState } from 'react';
import ColorPicker from '@/components/colorPicker';
import Analytics from '@/components/analytics';


export default function App() {

  const [username, setUsername] = useState('');

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
  }

  return (
    <div className='content-container'>
      <ColorPicker onUsernameChange={handleUsernameChange}/>
      <Analytics username={username}/>
    </div>
  );
}
