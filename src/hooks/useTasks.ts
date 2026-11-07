import type { TaskListState, TaskState } from '../types/task.types.ts';
import { useEffect, useState } from 'react';
import { getTasks } from '../api/tasks.api.ts';

export function useTasks() {
  const [taskError, setTaskError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tasks, setTasks] = useState<TaskListState>([]);

  useEffect(() => {
    async function loadTasks() {
      try {
        setIsLoading(true);
        const tasks = await getTasks();
        setTasks(tasks);
      } catch {
        setTaskError('Fail in loading tasks.');
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []);

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
    taskError,
    isLoading,
  };
}
