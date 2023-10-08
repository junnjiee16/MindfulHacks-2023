
// import {ReactCountdownClock} from 'pughpugh/react-countdown-clock';

import React, { useState, useEffect } from 'react';
import { Box, Text, Button, ChakraProvider } from '@chakra-ui/react';
export function FocusTimer(data, id) {
    const [isRunning, setIsRunning] = useState(false);
    console.log(`ID: ${id}`);
    console.log(`Data: ${data[id - 1]}`);
    let seconds = 3000;
    const [timeLeft, setTimeLeft] = useState(seconds); // Initial countdown time in seconds

    // Function to start the countdown
    const startCountdown = () => {
        setIsRunning(true);
    };

    // Function to stop the countdown
    const stopCountdown = () => {
        setIsRunning(false);
    };

    useEffect(() => {
        let timer;

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isRunning, timeLeft]);

    return (
        <Box textAlign="center" mt={4} p={"50px"} alignItems="center">
            <Text fontSize="2xl">Countdown Timer</Text>
            <Text fontSize="3xl" fontWeight="bold" mt={2}>
                {timeLeft % 60 === 0 ? timeLeft / 60 : Math.ceil((timeLeft / 60))} minutes
            </Text>
            <Button
                colorScheme="teal"
                mt={4}
                mr={"20px"}
                onClick={startCountdown}
                isDisabled={isRunning}
            >
                Start Countdown
            </Button>
            <Button
                colorScheme="red"
                mt={4}
                mr={"20px"}
                onClick={stopCountdown}
                isDisabled={!isRunning}
            >
                Stop Countdown
            </Button>


        </Box>
    );

}