'use client';

import React, { useState, useEffect } from 'react';
import { gameTrackerUrl, fetchTinybirdApi } from '@/utils/tinybird';
import { Card, Title, AreaChart } from '@tremor/react';

const GameTracker = ({host, token, username, gameStarted, currentGameProgress}) => {

    const [bestGame, setBestGame] = useState([{
        'click': 0,
        'cumulative_duration': 0
    }])

    const [lineColor, setLineColor] = useState('red');

    const [title, setTitle] = useState('Beat your record!');

    let url = gameTrackerUrl(host, token, username)

    useEffect(() => {
        if (gameStarted) {
            fetchTinybirdApi(url, setBestGame);
        }
    }, [gameStarted]);

    // Combine current game and best game into a single array
    const data = bestGame.map((best, index) => ({
        click: best.click,
        best_game_duration: best.cumulative_duration,
        current_game_duration: currentGameProgress[index] ? currentGameProgress[index].cumulative_duration : null,
    }));

    useEffect(() => {
        if (currentGameProgress.length > 0 && bestGame.length > 0) {
            let current_duration = currentGameProgress[currentGameProgress.length-1].cumulative_duration;
            if (current_duration < bestGame[currentGameProgress.length-1].cumulative_duration) {
                setLineColor('green');
            } else {
                setLineColor('red');
            }
            setTitle(`Current Time: ${current_duration}`)
        }
    }, [currentGameProgress]);

    return (
        <Card className="mt-6" decoration="top" decorationColor={lineColor}>
            <Title>{title}</Title>
            <AreaChart className="h-48"
                data={data}
                index='click'
                categories={['best_game_duration', 'current_game_duration']}
                colors={['zinc', lineColor]}
                showLegend={false}
                showYAxis={false}
                showGridLines={false}
                startEndOnly={true}
            />
        </Card>
    );
};

export default GameTracker;