import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Text, Stack, Heading, Link } from '@chakra-ui/react';

export function Timer() {
  const pomodoroTime = [1500, 300, 1500, 300, 1500, 300, 1500, 900];
  const pomodoroStep = [
    'Work 1',
    'Break 1',
    'Work 2',
    'Break 2',
    'Work 3',
    'Break 3',
    'Work 4',
    'Big Break',
  ];
  const [time, setTime] = useState(pomodoroTime[0]);
  const [i, setI] = useState(0);
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(true);

  const handleStart = () => {
    setStart(!start);
    setReset(false);
  };

  const handleReset = () => {
    setStart(false);
    setReset(true);
    setTime(pomodoroTime[0]);
    setI(0);
  };

  useInterval(() => {
    if (start) {
      if (time === 0) {
        setI(i + 1);
        if (i == 7) {
          handleReset();
        } else {
          setTime(pomodoroTime[i + 1]);
        }
      } else {
        setTime(time - 1);
      }
    }
  }, 1);

  return (
    <Box mx={'auto'} maxWidth={'800px'}>
      <Box>
        <Heading
          textAlign={'left'}
          fontWeight={'500'}
          fontSize={['28px', '36px', '40px', '54px']}
          color={'teal'}
          pb={'3'}
        >
          <Link
            isExternal
            href="https://todoist.com/productivity-methods/pomodoro-technique"
          >
            Pomodoro.io
          </Link>
        </Heading>
      </Box>
      <Box border={'2px'} p={3} borderRadius={'4px'}>
        <Text fontWeight={'500'} fontSize={['28px', '36px', '40px', '54px']}>
          {Math.floor(time / 60)} MINS {time % 60} SECS
        </Text>
      </Box>
      <Stack py={2} direction="row" justify={'space-evenly'}>
        <Button
          size={'lg'}
          w="50%"
          fontSize={'24px'}
          colorScheme={start ? 'red' : 'green'}
          onClick={handleStart}
        >
          {start ? 'Pause' : 'Start'} - {pomodoroStep[i]}
        </Button>
        <Button
          size={'lg'}
          w="50%"
          colorScheme={'yellow'}
          disabled={reset}
          fontSize={'24px'}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Stack>
    </Box>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
