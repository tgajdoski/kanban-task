import React, { useRef, useState, KeyboardEvent } from 'react';

import { Droppable } from 'react-beautiful-dnd';
import Task from "./TaskComponent";
import AddTask from './AddTask';
import { ColumnType } from '../types'
import { Box, Text, Button, Flex, Input } from "@chakra-ui/react";


interface Props {
  first: boolean;
  last: boolean;
  column?: ColumnType;
  createColumn: (columnName: string) => void;
  createTask: (taskContent: string, key: string) => void;
  moveColumn: (direction : number, columnId: string) => void;
}

const Column: React.FC<Props> = ({
  first,
  last,
  column,
  createColumn,
  createTask,
  moveColumn
}) => {
  const tasks = column?.tasks;
  const columnTitle = column?.title;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAddColumn, setisAddColumn] = useState(false);
  
  const onKeyPressed = (e: KeyboardEvent<HTMLInputElement>)  => {
    if (e.key === "Enter") {
      createColumn(inputRef.current?.value || '')
      setisAddColumn(false)
    }
  };

  const [isAddingNewTask, setIsAddingNewTask] = useState(false);

  const addColumn = () => {
    return (
      <Input
        variant='filled'
        value={columnTitle}
        ref={inputRef}
        onKeyPress={onKeyPressed}
        placeholder="Column name"
      />
    );
  };

  const newColumnTitle = () => {
    return (
      <Flex mb={4} px={2} justify="space-between" align="center">
          {isAddColumn ? (
          addColumn()
        ) : (
          <Button
            onClick={() => setisAddColumn(true)}
            size="sm"
            bg="transparent"
          >
            Add a column
          </Button>
          )}
      </Flex>
    );
  };

  const header = (columnObj: ColumnType) => {
    return (
      <Flex mb={4} px={2} justify="space-between" align="center">
        {!first && <Button
            onClick={() => moveColumn(-1, columnObj.id)}
            size="sm"
            bg="ButtonFace"
          >
          &lt;
        </Button>}
        {isAddColumn ? (
          addColumn()
        ) : (
          <Text fontSize="md" fontWeight="bold">
            {columnObj.title}
          </Text>
        )}

      {!last && <Button
            onClick={() => moveColumn(1,  columnObj.id)}
            size="sm"
            bg="ButtonFace"
          >
          &gt;
        </Button>}
      </Flex>
    );
  };

  const taskList = (columnObj: ColumnType) => {
    return (
      <Droppable droppableId={columnObj.id}>
        {({ droppableProps, innerRef, placeholder }) => (
          <Box minH={200} ref={innerRef} {...droppableProps}>
            {column &&
              tasks &&
              tasks.map((task, index) => (
                <Task
                  columnId={column.id}
                  createTask={createTask}
                  key={task?.id}
                  task={task}
                  index={index}
                />
              ))}
            {column && isAddingNewTask && (
              <Task
                columnId={column.id}
                createTask={(taskContent, key) => {
                  createTask(taskContent, key);
                  setIsAddingNewTask(false);
                }}
                autoFocus
                draggable={false}
                key={`${column.id}/taks-${tasks?.length || 0}`}
                index={tasks?.length || 0}
              />
            )}
            {placeholder}
            
            {column && !isAddingNewTask && (
              <AddTask
                key={`${column.id}`}
                onClick={() => setIsAddingNewTask(true)}
              />
            )}
          </Box>
        )}
      </Droppable>
    );
  };

  return (
    <Box minH="60vh" minW={200} w={{ base: "100%", sm: "50%", md: 300 }} p={3}>
      {column ? header(column) : newColumnTitle()}
      {column && tasks && taskList(column)}
    </Box>
  );
};

export default Column;
