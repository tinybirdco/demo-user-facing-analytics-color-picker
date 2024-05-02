'use client';

import React from 'react';
import FastestGame from './fastestGame';
import { Grid } from '@tremor/react';
require('dotenv').config({ path: '../.env.local'})

const TINYBIRD_HOST = process.env.TINYBIRD_HOST
const TINYBIRD_TOKEN = process.env.TINYBIRD_TOKEN

export default function Analytics({username, gameStarted}) { 
    let host = TINYBIRD_HOST;
    let token = TINYBIRD_TOKEN;

    return (
        <div className='analytics-container'>
            <h2>Analytics for {username}</h2>
            <Grid className='grid-cols-4 gap-6'>
                <FastestGame
                    host={host}
                    token={token}
                    username={username}
                    gameStarted={gameStarted}
                />
            </Grid>
        </div>
    )
}

