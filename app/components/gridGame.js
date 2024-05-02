"use client";

import React, { useState, useEffect } from 'react';
import UsernameModal from './usernameModal';
import GameOverModal from './gameOverModal';

export default function GridGame() {
  
  // Set various states
  const [targetIndex, setTargetIndex] = useState(null); // Target index of green circle
  const [username, setUsername] = useState(''); // Username
  const [isModalOpen, setIsModalOpen] = useState(true); // Username modal status
  const [clickCount, setClickCount] = useState(0); // Game clicks remaining
  const [gameOver, setGameOver] = useState(false); // Is the game over?
  const [showGameOverModal, setShowGameOverModal] = useState(false); // Show game over modal when game over

  // Handle the click of one of the game buttons.
  const handleClick = (index, correct) => {
    if (!gameOver) {
      // Pick a random button to become the next target
      setTargetIndex(Math.floor(Math.random() * 25)+1);

      // Increment click count
      setClickCount(prevCount => prevCount + 1);

      // Check for game over
      if (clickCount >= 24 || !correct) {        
        // Show modal
        setGameOver(true);
        setShowGameOverModal(true);
      }
    }
  };

  // When username is submitted, handle the game start
  const handleStartGame = (username) => {
    // Set the username
    setUsername(username);

    // Create an initial target button
    const initialTarget = Math.floor(Math.random() * 25) + 1;
    setTargetIndex(initialTarget);
  };

  // When the game ends, handle starting a new game
  const handlePlayAgain = () => {
    // Reset the click count to zero
    setClickCount(0);
    
    // Reset game and remove game over modal
    setGameOver(false);
    setShowGameOverModal(false);

    // Set a new target button
    const initialTarget = Math.floor(Math.random() * 25)+1;
    setTargetIndex(initialTarget);
  };

  const handleStartOver = () => {
    setGameOver(true);
    handlePlayAgain();
  }

  // Render 25 buttons in the grid
  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i < 26; i++) {
      buttons.push(
        <button
          key={i}
          // If button is the target, add the 'target' class
          className={`button ${targetIndex === i ? 'target' : ''}`}

          // When clicked, pass the key of the clicked button and check if it is the target
          onClick={() => handleClick(i, i === targetIndex)}

          // Disable buttons when game is over
          disabled={gameOver}
        >{i}</button>
      );
    }
    return buttons;
  };

  return (
    <div className='app-container'>
      <UsernameModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onStartGame={handleStartGame}
      />
      <GameOverModal
        isOpen={showGameOverModal}
        onPlayAgain={handlePlayAgain}
      />
      <div className='top-container'>
        <h2 className = 'click-count'>{25 - clickCount}</h2>
        <button 
          className='start-button'
          onClick={handleStartOver}>Start Over
        </button>
      </div>
      <div className='buttons-container'>
        {renderButtons()}
      </div>
    </div>
  );
}