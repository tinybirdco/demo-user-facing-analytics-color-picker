'use client';

import React from 'react';
import FastestGame from './fastestGame';
import FastestClick from './fastestClick';
import FavoriteTarget from './favoriteTarget';
import NemesisTarget from './nemesisTarget';
import { Grid } from '@tremor/react';
require('dotenv').config({ path: '../.env.local'})

const TINYBIRD_HOST = 'api.us-east.aws.tinybird.co';
const TINYBIRD_TOKEN = 'p.eyJ1IjogIjBiMjJiMDkxLTdjNzktNDRlMS1hZTg1LTQwYjhhNmNiNTE1NyIsICJpZCI6ICJhNzdjYmIwNS1hNGYzLTRhNTEtYWEwNy1iNTI2NzViZGJkYmMiLCAiaG9zdCI6ICJ1cy1lYXN0LWF3cyJ9.3IFDsL5yBA8-Dg5srBixhfpXTmHr3q_li0aNQayKg5I';

export default function Analytics({username, gameStarted, currentGameProgress}) { 
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
                <FastestClick
                    host={host}
                    token={token}
                    username={username}
                    gameStarted={gameStarted}
                />
                <FavoriteTarget
                    host={host}
                    token={token}
                    username={username}
                    gameStarted={gameStarted}
                />
                <NemesisTarget
                    host={host}
                    token={token}
                    username={username}
                    gameStarted={gameStarted}
                />
            </Grid>
        </div>
    )
}

