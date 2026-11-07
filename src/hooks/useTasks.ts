import type { TaskListState, TaskState } from '../types/task.types.ts';
import { useState } from 'react';

export function useTasks(initialTasks: TaskListState = []) {
  const [tasks, setTasks] = useState<TaskListState>(initialTasks);

  function addTask(task: TaskState) {
    setTasks((currentTasks) => [...currentTasks, task]);
  }

  function deleteTask(taskId: number) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  function completeTask(taskId: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        return taskId === task.id ? { ...task, completed: !task.completed } : task;
      }),
    );
  }

  function editTask(taskId: number, name: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        return taskId === task.id ? { ...task, name } : task;
      }),
    );
  }

  return {
    tasks,
    addTask,
    deleteTask,
    completeTask,
    editTask,
  };
}
