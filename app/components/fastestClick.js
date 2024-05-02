'use client';

import React, { useState, useEffect } from 'react';
import { fastestClickUrl, fetchTinybirdApi } from '@/utils/tinybird';
import { Card } from '@tremor/react';

const FastestClick = ({host, token, username, gameStarted}) => {

    const [data, setData] = useState([])

    let url = fastestClickUrl(host, token, username)

    useEffect(() => {
        if (gameStarted) {
            fetchTinybirdApi(url, setData);
        }
    }, [gameStarted]);

    const renderText = () => {
        if(data.length > 0) {
            return `${data[0].duration} ms`;
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
            <p>Fastest Click</p>
            <h2>{renderText()}</h2>
        </Card>
    );
};

export default FastestClick;