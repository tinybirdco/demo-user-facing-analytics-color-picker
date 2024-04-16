"use client";

import { Card, Title, BarList } from '@tremor/react';
import React, { useState, useEffect } from 'react';
import {fetchAPI, leaderboardURL } from '../utils/tinybird';

const Leaderboard = ({host, token, page_size, page}) => {
    const [data, setData] = useState([{
        "user": "",
        "clicks": 0
    }])

    let url = leaderboardURL(host, token, page_size, page);

    useEffect(() => {
        fetchAPI(url, setData)
    }, [url]);

    useEffect(() => {
        // create a interval and get the id
        const myInterval = setInterval(() => {
            fetchAPI(url, setData)
        }, 5000);
        return () => clearInterval(myInterval);
    }, [data]);

    const rows = data.map((d) => ({
        name: d.user,
        value: d.clicks
    }));

    return (
        <Card className="mt-6 h-84">
            <Title>
                Leaderboard
            </Title>
            <BarList
                data={rows}
            />
        </Card>
    );
};

export default Leaderboard;