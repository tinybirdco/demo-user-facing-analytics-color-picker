"use client";

import React, { useState, useEffect } from 'react';
import Button from './button';
import * as Redpanda from '../utils/redpanda';

function getRandomColor() {
  // Generate random color code
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function sendToRedpanda(username, color) {
  const message = {
    'user': username,
    'timestamp': new Date().toISOString(),
    'color': color
  };
  console.log(message);
  Redpanda.sendMessage(message);
}

export default function ColorPicker({ onUsernameChange }) {

  useEffect(() => {
    Redpanda.connect();
    return () => {
      Redpanda.disconnect();
    };
  }, []);

  const [buttonColors, setButtonColors] = useState({
    button1Color: '',
    button2Color: '',
    button3Color: ''
  });


  const [username, setUsername] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (event) => {
    setUsername(event.target.value);
    setErrorMsg('');
  }

  const passUsername = (event) => {
    onUsernameChange(username);
  }

  useEffect(() => {
    setButtonColors({
      button1Color: getRandomColor(),
      button2Color: getRandomColor(),
      button3Color: getRandomColor()
    });
  }, []);

  const handleClick = (color) => {
    if (username.trim() === '') {
      setErrorMsg('Please create a username!');
    } else {
      setButtonColors({
        button1Color: getRandomColor(),
        button2Color: getRandomColor(),
        button3Color: getRandomColor()
      });
      sendToRedpanda(username, color);
    }
  };

  return (
    <div className='app-container'>
    <p className='error-message'>{errorMsg}</p>
    <input className='username-input'
        type="text"
        value={username}
        onChange={handleInput}
        onBlur={passUsername}
        placeholder="Enter a username"
    />
    <h1>Pick a color!</h1>
    <div className='buttons-container'>
    <div className='button-container'>
        <Button
        onClick={() => handleClick(buttonColors.button1Color.toUpperCase())}
        backgroundColor={buttonColors.button1Color}
        />
    </div>
    <div className='button-container'>
        <Button
        onClick={() => handleClick(buttonColors.button2Color.toUpperCase())}
        backgroundColor={buttonColors.button2Color}
        />
    </div>
    <div className='button-container'>
        <Button
        onClick={() => handleClick(buttonColors.button3Color.toUpperCase())}
        backgroundColor={buttonColors.button3Color}
        />
    </div>
    </div>
    </div>
  );
}