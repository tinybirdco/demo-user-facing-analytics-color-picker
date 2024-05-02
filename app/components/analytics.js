import React from 'react';
import FastestGame from './fastestGame';
import { Grid } from '@tremor/react';

const HOST = 'api.us-east.aws.tinybird.co';
const TOKEN = 'p.eyJ1IjogIjBiMjJiMDkxLTdjNzktNDRlMS1hZTg1LTQwYjhhNmNiNTE1NyIsICJpZCI6ICJhNzdjYmIwNS1hNGYzLTRhNTEtYWEwNy1iNTI2NzViZGJkYmMiLCAiaG9zdCI6ICJ1cy1lYXN0LWF3cyJ9.3IFDsL5yBA8-Dg5srBixhfpXTmHr3q_li0aNQayKg5I';

export default function Analytics({username, gameStarted}) {
    return (
        <div className='analytics-container'>
            <h2>Analytics for {username}</h2>
            <Grid className='grid-cols-4 gap-6'>
                <FastestGame
                    host={HOST}
                    token={TOKEN}
                    username={username}
                    gameStarted={gameStarted}
                />
            </Grid>
        </div>
    )
}
