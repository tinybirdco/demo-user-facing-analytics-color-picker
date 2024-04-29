import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';

const UsernameModal = ({ isOpen, onRequestClose, startGame }) => {
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = () => {
        if (username.trim() === '') {
            setErrorMessage('Please enter a username.');
        } else {
            startGame(username);
            onRequestClose();
        }
    };

    const handleInput = (e) => {
        setUsername(e.target.value);
        setErrorMessage('');
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

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