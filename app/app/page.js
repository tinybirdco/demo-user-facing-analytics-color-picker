"use client";

import React, { useState } from 'react';
import GridGame from '@/components/gridGame';
import Analytics from '@/components/analytics';


export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [username, setUsername] = useState('');
  const [currentGameProgress, setCurrentGameProgress] = useState([]);

  return (
    // Render the GridGame app
    <div className='content-container'>
      <GridGame 
        onStartGame={setGameStarted} 
        onUsernameChange={setUsername}
        updateGameProgress={setCurrentGameProgress}
      />
      <Analytics 
        username={username} 
        gameStarted={gameStarted}
        currentGameProgress={currentGameProgress}
      />
    </div>
  );
}
