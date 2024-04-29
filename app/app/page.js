"use client";

import React, { useState } from 'react';
import ColorGame from '@/components/colorGame';
import Analytics from '@/components/analytics';


export default function App() {

  const [username, setUsername] = useState('');

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
  }

  return (
    <div className='content-container'>
      <ColorGame onUsernameChange={handleUsernameChange}/>
    </div>
  );
}
