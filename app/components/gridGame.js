"use client";

import React, { useState } from 'react';
import UsernameModal from './usernameModal';
import GameOverModal from './gameOverModal';

async function sendToConfluent(payload) {
  console.log('Sending data to Confluent: ', payload);

  try {
    const response = await fetch('http://localhost:3001/api/sendToConfluent', {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();
    console.log('Data sent to Kafka: ', responseData);
  } catch (error) {
    console.error('Error sending data to Kafka: ', error.message);
  }
}

export default function GridGame() {
  
  // Set various states
  const [startTime, setStartTime] = useState(null); // Click start time
  const [targetIndex, setTargetIndex] = useState(null); // Target index of green circle
  const [username, setUsername] = useState(''); // Username
  const [isModalOpen, setIsModalOpen] = useState(true); // Username modal status
  const [clickCount, setClickCount] = useState(0); // Game clicks remaining
  const [gameOver, setGameOver] = useState(false); // Is the game over?
  const [showGameOverModal, setShowGameOverModal] = useState(false); // Show game over modal when game over

  // Handle the click of one of the game buttons.
  const handleClick = (index, correct) => {
    if (!gameOver) {
      // Calculate time of click and compare it to start time to get duration between clicks
      const clickTime = new Date();
      const duration = (clickTime - startTime);

      // Send the data to the Confluent proxy
      let payload = {
        'timestamp': new Date().toISOString(),
        'username': username,
        'message': {
          'event-type': 'click',
          'start-time': startTime.toISOString(),
          'click-time': clickTime.toISOString(),
          'duration': duration,
          'index': index,
          'correct': correct
        }
      }
      sendToConfluent(payload);

      // set new start time to latest click time
      setStartTime(clickTime);
      
      // Pick a random button to become the next target
      setTargetIndex(Math.floor(Math.random() * 25));

      // Increment click count
      setClickCount(prevCount => prevCount + 1);

      // Check for game over
      if (clickCount >= 24) {
        // Send game end event to Confluent
        let payload = {
          'timestamp': new Date().toISOString(),
          'username': username,
          'message': {
            'event-type': 'game-emd'
          }
        }
        sendToConfluent(payload);
        
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

    // Set the start time for first click
    setStartTime(new Date());

    // Create an initial target button
    const initialTarget = Math.floor(Math.random() * 25);
    setTargetIndex(initialTarget);

    // Send game start event to Confluent
    let payload = {
      'timestamp': new Date().toISOString(),
      'username': username,
      'message': {
        'event-type': 'game-start'
      }
    }
    sendToConfluent(payload);
    
  };

  // When the game ends, handle starting a new game
  const handlePlayAgain = () => {
    // Reset the click count to zero
    setClickCount(0);
    
    // Reset game and remove game over modal
    setGameOver(false);
    setShowGameOverModal(false);

    // Set a new start time
    setStartTime(new Date());

    // Set a new target button
    const initialTarget = Math.floor(Math.random() * 25);
    setTargetIndex(initialTarget);

    // Send game start event to Confluent
    let payload = {
      'timestamp': new Date().toISOString(),
      'username': username,
      'message': {
        'event-type': 'game-start'
      }
    }
    sendToConfluent(payload);
  };

  // Render 25 buttons in the grid
  const renderButtons = () => {
    const buttons = [];
    for (let i = 0; i < 25; i++) {
      buttons.push(
        <button
          key={i}
          // If button is the target, add the 'target' class
          className={`button ${targetIndex === i ? 'target' : ''}`}

          // When clicked, pass the key of the clicked button and check if it is the target
          onClick={() => handleClick(i, i === targetIndex)}

          // Disable buttons when game is over
          disabled={gameOver}
        />
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
      <h2 className = 'click-count'>{25 - clickCount}</h2>
      <div className='buttons-container'>
        {renderButtons()}
      </div>
    </div>
  );
}