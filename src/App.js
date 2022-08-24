import React from 'react';
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import { Timer } from './components/Timer';
import { List } from './components/List';
import { Header } from './components/Header';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack>
            <Header />
            <Box w={'100%'} mx={'auto'} h={'93vh'}>
              <Timer />
              <List />
            </Box>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
