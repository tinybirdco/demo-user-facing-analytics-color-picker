'use client';

import React, { useState, useEffect } from 'react';
import { gameTrackerUrl, fetchTinybirdApi } from '@/utils/tinybird';
import { Card, Title, AreaChart } from '@tremor/react';

const GameTracker = ({host, token, username, gameStarted, currentGameProgress}) => {

    // set state to store the cumulative duration array for the best game
    const [bestGame, setBestGame] = useState([{
        'click': 0,
        'cumulative_duration': 0
    }])

    // Define the Tinybird API url with props
    let url = gameTrackerUrl(host, token, username)

    // Fetch the Tinybird API on game start
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

    // Set states for line color and card title
    const [lineColor, setLineColor] = useState('red');
    const [title, setTitle] = useState('Beat your record!');

    // Any time the current game progress updates, check if you are ahead or behind
    // and change the line color to green/red depending on the outcome
    useEffect(() => {
        // Reset if game has just started
        if (currentGameProgress.length == 0) {
            setTitle('Beat your record!');
            setLineColor('zinc');
        }
        
        // If game is in progress, update color and title
        if (currentGameProgress.length > 0 && bestGame.length > 0) {
            
            // Define cumulative duration of current game
            let currentGameIndex = currentGameProgress.length-1;
            let currentDuration = currentGameProgress[currentGameIndex].cumulative_duration;
            
            if (currentDuration < bestGame[currentGameIndex].cumulative_duration) {
                setLineColor('green');
            } else {
                setLineColor('red');
            }
            // Update the title with the cumulative duration of your current game
            setTitle(`Current Time: ${currentDuration}`)
        }
    }, [currentGameProgress]); // Update states on each click

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