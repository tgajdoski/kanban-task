import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/ColumnComponent";
import { Flex } from "@chakra-ui/react";
import { ColumnType } from './types'
import { INIT_STATE } from './data/init_data';
import { ChakraProvider } from '@chakra-ui/react'
import { useState } from "react";


function App() {

  const [columns, setColumns] = useState(INIT_STATE.columns);
  
  /// THESE FUNCS ARE DATA MANIPULATION AND CAN BE MOVED TO SOME MODEL FOLDER...
  // drag and drop update data
  const moveTask = (results: any) => {
    const {droppableId: destId, index: destIndex}  = results.destination
    const {droppableId: sourceId, index: sourceIndex}  = results.source
    
    let tempCol = columns;
    let colSourceIndex = tempCol.findIndex(c=> c.id === sourceId)
    let colDestIndex = tempCol.findIndex(c=> c.id === destId)
    let task = tempCol[colSourceIndex].tasks[sourceIndex];

    // moving to different destination column
    if (destId !== sourceId) {
      // add element to destination column at index
      tempCol[colDestIndex].tasks.splice(destIndex, 0, task);
      // remove element from source column at index
      tempCol[colSourceIndex].tasks.splice(sourceIndex, 1)  
    } else { // moving inside same column
      let t = tempCol[colDestIndex].tasks[destIndex];
      tempCol[colDestIndex].tasks[destIndex] = tempCol[colDestIndex].tasks[sourceIndex];
      tempCol[colDestIndex].tasks[sourceIndex] = t;
    }

    setColumns([...tempCol]);
  }
  // update data with new column
  const createColumn = (colName: string) => {
    const newCol = {
      id: `col-${columns.length+1}`, // generate column id by length of columns
      title: colName,
      tasks: [],
    };
    let newData = columns;
    newData.push(newCol);
    setColumns([...newData]);
  }
  // update data / column  with new task
  const createTask = (taskContent: string, key: string) => {
    let columnsTemp = columns;
    let taskCount = columnsTemp.reduce((acc, c) => { return acc + c.tasks.length } , 0);
    const newTask = {
      id: `task-${taskCount+1}`, // generate task id by length of tasks
      content: taskContent,
    };

    let colIndex = columnsTemp.findIndex(c=> c.id === key)
    if ( colIndex > -1 ) {
      columnsTemp[colIndex].tasks.push(newTask);
    }
    setColumns([...columnsTemp]);
  }
  // update data when columng is ordered
  const moveColumn = (direction: number, columnId: string) => {
    let columnsTemp = columns;
    let colIndex = columnsTemp.findIndex(c=> c.id === columnId)

    const col = columnsTemp[colIndex];
    if ((colIndex === 0 && direction < 0) || (colIndex === columns.length -1  && direction > 0)) return;
    columnsTemp[colIndex] = columnsTemp[colIndex+direction];
    columnsTemp[colIndex+direction] = col;

    setColumns([...columnsTemp]);
  }
  // DATA MANIPULATION END

  
  return (
    <ChakraProvider>
      <Flex h="100%" direction="column">
        <Flex flex={1} mt={15} wrap="nowrap" overflowX="scroll">
          <DragDropContext onDragEnd={moveTask}>
            {columns.map((t: ColumnType, index: number) => {
              const column = t;
              const idx = index;
              return (
                <Column
                  key={column.id}
                  first= {idx === 0 ? true: false}
                  last= {idx === columns.length -1 ? true: false}
                  column={column}
                  createColumn={createColumn}
                  createTask={createTask}
                  moveColumn={moveColumn}
                />
              );
            })}
            <Column
              key="new-column"
              first={false}
              last={false}
              createColumn={createColumn}
              createTask={createTask}
              moveColumn={moveColumn}
            />
          </DragDropContext>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}


export default App;