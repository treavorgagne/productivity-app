import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Stack } from '@chakra-ui/react';
import Moment from 'moment';

export function Timer() {
  const [time, setTime] = useState(Moment());
  const [start, setStart] = useState(false);
  const [reset, setReset] = useState(true);

  const handleStart = () => {
    setStart(!start);
    setReset(false);
  };

  const handleReset = () => {
    setStart(false);
    setReset(true);
    setTime(Moment());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Moment());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box mx={'auto'} maxWidth={'800px'}>
      <Box border={'2px'} p={3} borderRadius={'4px'}>
        <Text FontWeight={'600'} fontSize={['28px', '36px', '40px', '54px']}>
          {time.format('hh')} HRS {time.format('mm')} MINS {time.format('ss')}{' '}
          SECS
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
          {start ? 'Pause' : 'Start'}
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
