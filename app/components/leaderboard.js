'use client';

import React, { useState, useEffect } from 'react';
import { leaderboardUrl, fetchTinybirdApi } from '@/utils/tinybird';
import { Card, Title, BarList } from '@tremor/react';

const Leaderboard = ({host, token, username, gameStarted}) => {

    // set state to store the cumulative duration array for the best game
    const [data, setData] = useState([{
        'name': '',
        'value': 0
    }])

    // Define the Tinybird API url with props
    let url = leaderboardUrl(host, token)

    // Fetch the Tinybird API on game start
    useEffect(() => {
        if (gameStarted) {
            fetchTinybirdApi(url, setData);
        }
    }, [gameStarted]);

    // Set the color of the current player on the leaderboard to green
    const rows = data.map((d) => ({
        name: d.name,
        value: d.value,
        color: d.name === username ? 'green' : 'zinc'
    }))

    return (
        <Card className="mt-6" decoration="top" decorationColor='zinc'>
            <Title>Leaderboard</Title>
            <BarList className="h-48"
                data={rows}
                sortOrder='ascending'
            />
        </Card>
    );
};

export default Leaderboard;