"use client";

import { Card, Title, DonutChart, Legend } from '@tremor/react';
import React, { useState, useEffect } from 'react';
import {fetchAPI, topColorsURL } from '../utils/tinybird';

const TopColors = ({host, token, username}) => {
    const [data, setData] = useState([{
        "name": "",
        "c": 0
    }])

    let url = topColorsURL(host, token, username);

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
        name: d.name,
        value: d.c,
        color: d.name === 'black' ? 'zinc' : d.name
    }));

    const colors = rows.map(row => row.color)
    const labels = rows.map(row => row.color + ': ' + row.value)

    return (
        <Card className="flex mt-6 h-84">
            <Title>
                Color Distribution
            </Title>
            <DonutChart
                data={rows}
                colors={colors}
                showLabel={false}
            />
            <Legend
                categories={labels}
                colors={colors}
            />
        </Card>
    );
};

export default TopColors;