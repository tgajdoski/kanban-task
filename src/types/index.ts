export interface TaskType {
  id: string;
  content: string;
}

export interface ColumnType {
  id: string;
  title: string;
  tasks: TaskType[];
}

export interface Data {
  columns: ColumnType[];
}
