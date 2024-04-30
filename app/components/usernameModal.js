import React, { useState, useRef } from 'react';
import Modal from 'react-modal';

const UsernameModal = ({ isOpen, onRequestClose, onStartGame }) => {
    // Set states for username and error message
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Create a ref for the text input for focus
    const inputRef = useRef(null);

    const handleSubmit = () => {
        // Check for non-null username
        if (username.trim() === '') {
            setErrorMessage('Please enter a username.');
        } else {
            // Start the game and close the modal
            onStartGame(username);
            onRequestClose();
        }
    };

    // Set username on input
    const handleInput = (e) => {
        setUsername(e.target.value);
        setErrorMessage('');
    }

    // Start game on Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    // Focus on input after modal opens
    const handleAfterOpen = () => {
        if (inputRef.current) {
        inputRef.current.focus();
        }
    };

    return (
        <Modal
         className='info-modal'
         isOpen={isOpen}
         onAfterOpen={handleAfterOpen}
         onRequestClose={onRequestClose}
         contentLabel="Enter your username"
         shouldCloseOnOverlayClick={false}
        >
            <h2>Enter your username</h2>
            <p className='error-message'>{errorMessage}</p>
            <input className='username-input'
                type="text"
                value={username}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
            <button
                onClick={handleSubmit}
                className='start-button'
            >Start Game!</button>
        </Modal>
    );
};

export default UsernameModal;