"use client";

import { Grid } from '@tremor/react';
import React, { useState } from 'react';
import LiveClicks from './liveClicks';
import TopColors from './topColors';
import Leaderboard from './leaderboard';

const TINYBIRD_HOST='YOUR TINYBIRD HOST'
const TINYBIRD_TOKEN='YOUR TINYBIRD PIPE READ TOKEN'

export default function Analytics({ username }) {

    const [page, setPage] = useState(0);

    const handleLeftClick = () => {
        if (page != 0) {
            setPage(page - 1);
        }
    }

    const handleRightClick = () => {
        setPage(page + 1);
    }

    let host = TINYBIRD_HOST
    let token = TINYBIRD_TOKEN

    return (
        <div className='analytics-container'>
            <h2>Analytics</h2>
            <Grid>
                <LiveClicks
                host={host}
                token={token}
                username={username}
                />
                <TopColors
                host={host}
                token={token}
                username={username}
                />
                <Leaderboard
                host={host}
                token={token}
                page_size={10}
                page={page}
                />
                <div className="nav-button-container">
                    <button className="nav-button" onClick={handleLeftClick}>
                        {"<"}
                    </button>
                    <button className="nav-button" onClick={handleRightClick}>
                        {">"}
                    </button>
                </div>
            </Grid>
        </div>
    );
}