import * as React from 'react';

export type TaskState = {
  id: number;
  name: string;
  completed: boolean;
};

export type TaskListState = TaskState[];

export type TaskListProps = {
  tasks: TaskListState;
  setTasks: React.Dispatch<React.SetStateAction<TaskListState>>;
};
