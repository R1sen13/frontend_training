export type TaskState = {
  id: string;
  name: string;
  completed: boolean;
};

export type TaskStateCreate = {
  name: string;
  completed: boolean;
};

export type TaskListState = TaskState[];
