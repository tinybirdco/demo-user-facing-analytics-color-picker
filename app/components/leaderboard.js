'use client';

import React, { useState, useEffect } from 'react';
import { leaderboardUrl, fetchTinybirdApi } from '@/utils/tinybird';
import { Card, Title, BarList } from '@tremor/react';

const Leaderboard = ({host, token, username, gameStarted}) => {

    const [data, setData] = useState([{
        'name': '',
        'value': 0
    }])

    let url = leaderboardUrl(host, token)

    useEffect(() => {
        if (gameStarted) {
            fetchTinybirdApi(url, setData);
        }
    }, [gameStarted]);

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