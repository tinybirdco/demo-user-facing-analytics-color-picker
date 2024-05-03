'use client';

import React, { useState, useEffect } from 'react';
import { fastestGameUrl, fetchTinybirdApi } from '@/utils/tinybird';
import { Card } from '@tremor/react';

const FastestGame = ({host, token, username, gameStarted}) => {

    const [data, setData] = useState([])
    let url = fastestGameUrl(host, token, username)

    useEffect(() => {
        if (gameStarted) {
            fetchTinybirdApi(url, setData);
        }
    }, [gameStarted]);

    const renderTitle = () => {
        if(data.length > 0) {
            return `${data[0].total_duration} ms`;
        } else {
            return 'None';
        }
    }

    return (
        <Card 
            className="mt-6"
            decoration="top"
            decorationColor='zinc'
        >
            <p>Fastest Game</p>
            <h2>{renderTitle()}</h2>
        </Card>
    );
};

export default FastestGame;