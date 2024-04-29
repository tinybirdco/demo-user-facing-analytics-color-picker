"use client";

import React, { useState, useEffect } from 'react';
import UsernameModal from './usernameModal';
import GameOverModal from './gameOverModal';
//import * as Confluent from '../utils/confluent';


function sendToConfluent(username, index, correct, duration) {
  const message = {
    'user': username,
    'timestamp': new Date().toISOString(),
    'index': index,
    'correct': correct,
    'duration': duration 
  };
  console.log(message);
  Confluent.sendMessage(message);
}

export default function ColorGame({ onUsernameChange }) {
  /*
  useEffect(() => {
    Confluent.connect();
    return () => {
      Confluent.disconnect();
    };
  }, []);
  */

  const [startTime, setStartTime] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  const handleClick = (index, correct) => {
    if (!gameOver) {
      const clickTime = new Date();
      const duration = (clickTime - startTime);
      setStartTime(clickTime);
      //sendToConfluent(username, index, correct, duration);
      console.log(`username: ${username} picked: ${index} ${correct} duration: ${duration}`)
      setTargetIndex(Math.floor(Math.random() * 25));
      setClickCount(prevCount => prevCount + 1);
      if (clickCount >= 24) {
        setGameOver(true);
        setShowGameOverModal(true);
      }
    }
  };

  const startGame = (username) => {
    setUsername(username);
    setStartTime(new Date());
    const initialTarget = Math.floor(Math.random() * 25);
    setTargetIndex(initialTarget);
  };

  const handlePlayAgain = () => {
    setClickCount(0);
    setGameOver(false);
    setShowGameOverModal(false);
    setStartTime(new Date());
    const initialTarget = Math.floor(Math.random() * 25);
    setTargetIndex(initialTarget);
  };

  const renderButtons = () => {
    const buttons = [];
    for (let i = 0; i < 25; i++) {
      buttons.push(
        <button
          key={i}
          className={`button ${targetIndex === i ? 'target' : ''}`}
          onClick={() => handleClick(i, i === targetIndex)}
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
        startGame={startGame}
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