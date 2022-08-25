import React from 'react';
import { ChakraProvider, Box, VStack, theme } from '@chakra-ui/react';
import { Timer } from './components/Timer';
import { List } from './components/List';
import { Header } from './components/Header';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <VStack minH="100vh" p={3}>
          <Header />
          <Box w={'100%'} mx={'auto'} h={'93vh'}>
            <Timer />
            <List />
          </Box>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
