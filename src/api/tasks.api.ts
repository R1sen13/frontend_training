import type { TaskListState } from '../types/task.types.ts';

export async function getTasks(): Promise<TaskListState> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: Date.now(),
          name: 'Task 1',
          completed: false,
        },
      ]);
    }, 2000);
  });
}
