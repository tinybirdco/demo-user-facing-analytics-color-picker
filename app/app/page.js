"use client";

import React, { useState } from 'react';
import GridGame from '@/components/gridGame';
import Analytics from '@/components/analytics';


export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [username, setUsername] = useState('');

  return (
    // Render the GridGame app
    <div className='content-container'>
      <GridGame 
        onStartGame={setGameStarted} 
        onUsernameChange={setUsername}
      />
      <Analytics 
        username={username} 
        gameStarted={gameStarted}
      />
    </div>
  );
}
