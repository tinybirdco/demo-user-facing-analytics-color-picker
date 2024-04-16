"use client";

import { Card, Title, Tracker } from '@tremor/react';
import React, { useState, useEffect } from 'react';
import {fetchAPI, liveClicksURL } from '../utils/tinybird';

const LiveClicks = ({host, token}) => {
    const [data, setData] = useState([{
        "ts": "",
        "c": 0
    }])

    let url = liveClicksURL(host, token);

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

    // if c is 0, color is gray
    // if c is between 1 and 10, color is yellow
    // if c is greater than 10, color is emerald

    const rows = data.map((d) => ({
        color: d.c === 0 ? 'gray' : d.c > 10 ? 'emerald' : 'yellow',
        tooltip: d.c.toString() + ' clicks',
    }));

    return (
        <Card className="mt-6 h-30">
            <Title>
                Live Clicks
            </Title>
            <Tracker
                data={rows}
            />
        </Card>
    );
};

export default LiveClicks;