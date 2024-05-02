'use client';

import React, { useState, useEffect } from 'react';
import { nemesisTargetUrl, fetchTinybirdApi } from '@/utils/tinybird';
import { Card } from '@tremor/react';

const NemesisTarget = ({host, token, username, gameStarted}) => {

    const [data, setData] = useState([])

    let url = nemesisTargetUrl(host, token, username)

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
            <p>Nemesis Target</p>
            <h2>{renderText()}</h2>
        </Card>
    );
};

export default NemesisTarget;