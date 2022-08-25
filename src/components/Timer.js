import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Text, Stack } from '@chakra-ui/react';
import useSound from 'use-sound';
import Alarm from '../sounds/alarm.wav';
import { RiVolumeUpFill, RiVolumeMuteFill } from 'react-icons/ri';

export function Timer() {
  const [playOn] = useSound(Alarm, { volume: 0.25 });
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
  const [muted, setMuted] = useState(true);

  const handleMute = () => {
    setMuted(!muted);
  };

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
        if (muted !== true) playOn();
        setI(i + 1);
        if (i === 7) {
          handleReset();
        } else {
          setTime(pomodoroTime[i + 1]);
        }
      } else {
        setTime(time - 1);
      }
    }
  }, 1000);

  return (
    <Box mx={'auto'} maxWidth={'800px'}>
      <Box border={'2px'} p={3} borderRadius={'4px'}>
        <Text fontWeight={'500'} fontSize={['28px', '36px', '40px', '54px']}>
          {lpad(Math.floor(time / 60).toString())} MINS{' '}
          {lpad((time % 60).toString())} SECS
        </Text>
      </Box>
      <Stack py={2} direction="row" justify={'space-evenly'}>
        <Button
          size={'lg'}
          w="100%"
          fontSize={['18px', '24px']}
          colorScheme={start ? 'red' : 'green'}
          onClick={handleStart}
        >
          {start ? 'Pause' : 'Start'} - {pomodoroStep[i]}
        </Button>
        <Button
          size={'lg'}
          bg={'none'}
          fontSize={['18px', '24px']}
          onClick={handleMute}
        >
          {muted ? (
            <RiVolumeMuteFill size={48} />
          ) : (
            <RiVolumeUpFill size={48} />
          )}
        </Button>
        <Button
          size={'lg'}
          w="100%"
          colorScheme={'yellow'}
          disabled={reset}
          fontSize={['18px', '24px']}
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

function lpad(str) {
  while (str.length < 2) str = '0' + str;
  return str;
}
