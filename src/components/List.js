import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Checkbox,
  Stack,
  HStack,
  Heading,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  FormControl,
} from '@chakra-ui/react';

export function List() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tasks, setTasks] = useState(['Add tasks to list']);
  const [taskTitle, setTaskTitle] = useState('');
  const [editTask, setEditTask] = useState('');

  useEffect(() => {
    const savedState = window.localStorage.getItem('tasks');
    if (savedState !== null) setTasks(JSON.parse(savedState));
  }, []);

  useEffect(() => {
    const newTasks = JSON.stringify([...tasks]);
    localStorage.setItem('tasks', newTasks);
  }, [tasks]);

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

  const handleEdit = targetIndex => {
    console.log(`Edit ${targetIndex}`);
    const newTasks = [...tasks];
    newTasks[targetIndex] = editTask;
    setTasks(newTasks);
    setEditTask('');
    onClose();
  };

  const handleEditTask = ({ target }) => {
    setEditTask(target.value);
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
                <Stack
                  key={task + index}
                  direction={'row'}
                  align="center"
                  justify="space-between"
                >
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
                  <HStack>
                    <>
                      <Button size={'sm'} colorScheme={'blue'} onClick={onOpen}>
                        Edit
                      </Button>
                      <Modal onClose={onClose} isOpen={isOpen} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Edit {task}</ModalHeader>
                          <ModalCloseButton />
                          <FormControl>
                            <ModalBody>
                              <Input
                                type={'text'}
                                size="md"
                                placeholder={task}
                                onChange={handleEditTask}
                              />
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                colorScheme={'blue'}
                                onClick={() => handleEdit(index)}
                              >
                                Update
                              </Button>
                            </ModalFooter>
                          </FormControl>
                        </ModalContent>
                      </Modal>
                    </>
                    <Button
                      size={'sm'}
                      colorScheme={'red'}
                      onClick={() => handleDelete(index)}
                      justifySelf={'right'}
                    >
                      X
                    </Button>
                  </HStack>
                </Stack>
              ))}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
