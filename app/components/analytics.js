'use client';

import React, { useState, useEffect } from 'react';
import GameTracker from './gameTracker';
import FastestGame from './fastestGame';
import FastestClick from './fastestClick';
import FavoriteTarget from './favoriteTarget';
import NemesisTarget from './nemesisTarget';
import { Grid } from '@tremor/react';

export default function Analytics({username, gameStarted, currentGameProgress}) { 
   
    // Set Tinybird auth states
    const [tinybirdHost, setTinybirdHost] = useState('');
    const [tinybirdToken, setTinybirdToken] = useState('');

    // Fetch tokens from the proxy
    useEffect(() => {
        fetch('http://localhost:3001/api/tinybird')
            .then(response => response.json())
            .then(data => {
                const { TINYBIRD_HOST, TINYBIRD_TOKEN } = data;
                setTinybirdHost(TINYBIRD_HOST);
                setTinybirdToken(TINYBIRD_TOKEN);
            })
            .catch(error => console.error('Error fetching Tinybird env variables: ', error));
    }, []);

    return (
        <div className='analytics-container'>
            <h2>Analytics for {username}</h2>
            <Grid className='grid-cols-4 gap-6'>
                <FastestGame
                    host={tinybirdHost}
                    token={tinybirdToken}
                    username={username}
                    gameStarted={gameStarted}
                />
                <FastestClick
                    host={tinybirdHost}
                    token={tinybirdToken}
                    username={username}
                    gameStarted={gameStarted}
                />
                <FavoriteTarget
                    host={tinybirdHost}
                    token={tinybirdToken}
                    username={username}
                    gameStarted={gameStarted}
                />
                <NemesisTarget
                    host={tinybirdHost}
                    token={tinybirdToken}
                    username={username}
                    gameStarted={gameStarted}
                />
            </Grid>
            <GameTracker
                host={tinybirdHost}
                token={tinybirdToken}
                username={username}
                gameStarted={gameStarted}
                currentGameProgress={currentGameProgress}
            />
        </div>
    )
}

