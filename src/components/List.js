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
  const [tasks, setTasks] = useState(['Add tasks to list']);
  const [taskTitle, setTaskTitle] = useState('');

  const handleAdd = () => {
    if (taskTitle !== '') {
      setTasks(prev => {
        return [taskTitle, ...prev];
      });
      document.getElementById('taskTitle').value = '';
      setTaskTitle('');
    }
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
        <Button size={'lg'} fontSize={['18px', '24px']} onClick={handleAdd}>
          {' '}
          Add Task{' '}
        </Button>
        <Box mx={'auto'} maxWidth={'800px'} textAlign="left">
          <Stack w={'100%'} direction={'column'}>
            <Heading
              textAlign={'left'}
              fontWeight={'500'}
              fontSize={['24px', '28px', '32px', '36px']}
              color={'teal'}
            >
              Task To Do List
            </Heading>
            <Box px={4} maxWidth={'800px'}>
              {tasks.map((task, index) => (
                <Stack direction={'row'} align="center" justify="space-between">
                  <Checkbox
                    py={2}
                    mx={'auto'}
                    w={'100%'}
                    key={index}
                    size="lg"
                    colorScheme="green"
                  >
                    <Box>
                      <Text fontSize={'24px'}>{task}</Text>
                    </Box>
                  </Checkbox>
                  <Button
                    size={'sm'}
                    colorScheme={'red'}
                    onClick={() => handleDelete(index)}
                    justifySelf={'right'}
                  >
                    X
                  </Button>
                </Stack>
              ))}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
