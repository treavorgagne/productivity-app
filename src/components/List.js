import React, { useState } from 'react';
import {
  Box,
  Input,
  Button,
  Checkbox,
  Stack,
  Heading,
  Text,
} from '@chakra-ui/react';

export function List() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');

  const handleAdd = () => {
    setTasks(prev => {
      return [taskTitle, ...prev];
    });
  };

  const handleChange = ({ target }) => {
    setTaskTitle(target.value);
  };

  const handleDelete = targetIndex => {
    setTasks(prev => {
      return prev.filter((task, index) => index !== targetIndex);
    });
  };

  return (
    <Box mx={'auto'} maxWidth={'800px'} textAlign="left">
      <Stack>
        <Input
          onChange={handleChange}
          type={'text'}
          name="taskTitle"
          id="taskTitle"
          placeholder="Title"
          size="md"
        />
        <Button onClick={handleAdd}> Add Task </Button>
        <Box mx={'auto'} maxWidth={'800px'} textAlign="left">
          <Stack w={'100%'} direction={'column'}>
            <Heading
              textAlign={'left'}
              fontWeight={'500'}
              fontSize={['22px', '26px', '30px', '34px']}
              color={'teal'}
            >
              Task List
            </Heading>
            <Box maxWidth={'800px'}>
              {tasks.map((task, index) => (
                <Checkbox
                  py={1}
                  w={'100%'}
                  key={index}
                  size="lg"
                  colorScheme="green"
                >
                  <Stack direction={'row'} justify="space-between">
                    <Box>
                      <Text>{task}</Text>
                    </Box>
                    <Button
                      size={'sm'}
                      colorScheme={'red'}
                      onClick={() => handleDelete(index)}
                    >
                      X
                    </Button>
                  </Stack>
                </Checkbox>
              ))}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
