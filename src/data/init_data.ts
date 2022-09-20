import { Data } from '../types'

export const INIT_STATE : Data = {
  columns: [
      {
        id: "col-1",
        title: "COLUMN A",
        tasks: [
          {
            id: "task-1",
            content: "Not so easy task ",
          },
          {
            id: "task-2",
            content: "split and conquer",
          },
          {
            id: "task-3",
            content: "when adding new task/column press ENTER :)",
          }
        ],
      },
      {
        id: "col-2",
        title: "COLUMN B",
        tasks: [
          {
            id: "task-4",
            content: "some task for TODO",
          },
          {
            id: "task-5",
            content: "Create new Kanban UI",
          },
          {
            id: "task-6",
            content: "move columns with < and > in the title",
          },
          {
            id: "task-7",
            content: "move tasks by react-beautiful-dnd from atlassian",
          },
          {
            id: "task-8",
            content: "click on add a column to add new",
          }
        ],
      },
      {
        id: "col-3",
        title: "COLUMN C",
        tasks: [
          {
            id: "task-9",
            content: "We can improve it more",
          },
          {
            id: "task-10",
            content: "reorder tasks inside column",
          }
        ],
      },
    ],
  };