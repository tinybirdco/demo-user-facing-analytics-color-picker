'use client';

import React, { useState, useEffect } from 'react';
import { favoriteTargetUrl, fetchTinybirdApi } from '@/utils/tinybird';
import { Card } from '@tremor/react';

const FavoriteTarget = ({host, token, username, gameStarted}) => {

    const [data, setData] = useState([])

    let url = favoriteTargetUrl(host, token, username)

    useEffect(() => {
        if (gameStarted) {
            fetchTinybirdApi(url, setData);
        }
    }, [gameStarted]);

    const renderText = () => {
        if(data.length > 0) {
            return `${data[0].click_index}`;
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
            <p>Favorite Target</p>
            <h2>{renderText()}</h2>
        </Card>
    );
};

export default FavoriteTarget;