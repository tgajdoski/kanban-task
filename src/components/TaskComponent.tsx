import React, { useState, useRef , KeyboardEvent } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Text, Flex, useColorMode, Input } from "@chakra-ui/react";
import { TaskType } from "../types";

interface Props {
  columnId: string;
  task?: TaskType;
  index: number;
  autoFocus?: boolean;
  draggable?: boolean;
  showAddTask?: boolean;
  createTask: (taskContent: string, key: string) => void;
}

const TaskComponent: React.FC<Props> = ({
  columnId,
  task,
  index,
  draggable = true,
  autoFocus = false,
  createTask
}) => {
  const { colorMode } = useColorMode();
  const bgColor: any = { light: "whiteAlpha.900", dark: "gray.800" };
  const inputRef = useRef<HTMLInputElement>(null);
  const taskText = task?.content;

  const onKeyPressed = (e: KeyboardEvent<HTMLInputElement>)  => {
    if (e.key === "Enter") {
      createTask(inputRef.current?.value || '' , columnId || '')
      setIsEditing(false)
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  const taskInput = () => {
    return (
      <Input
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        ref={inputRef}
        value={taskText}
        onKeyPress={onKeyPressed}
        variant="outline"
        placeholder="Task Name"
        size="sm"
      />
    );
  };

  const taskContent = ({
    dragHandleProps = {},
  }: {
    dragHandleProps?: any;
    draggableProps?: any;
  }) => {
    return (
      <Flex
        //  mb={2}
        justify="space-between"
        direction="row"
      >
        <Flex
          p={2}
          flex={1}
          justify="space-between"
          direction="column"
          wrap="nowrap"
          {...dragHandleProps}
        >

          {isEditing || autoFocus ? (
            taskInput()
          ) : (
            <Text fontSize="sm" userSelect="none">
              {task?.content}
            </Text>
          )}
         
        </Flex>
      </Flex>
    );
  };

  return (
    <Draggable
      draggableId={task?.id || "test"}
      index={index}
      isDragDisabled={!draggable}
    >
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <Flex
          bg={bgColor[colorMode]}
          direction="column"
          mb={2}
          boxShadow="md"
          rounded="md"
          {...draggableProps}
          ref={innerRef}
        >
          {taskContent({
            dragHandleProps,
          })}
        </Flex>
      )}
    </Draggable>
  );
};

export default React.memo(TaskComponent);
