import type { TaskListState, TaskState, TaskStateCreate } from '../types/task.types.ts';
import { useEffect, useState } from 'react';
import { createTask, delTask, getTaskById, getTasks, patchTask } from '../api/tasks.api.ts';

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

  async function addTask(task: TaskStateCreate): Promise<void> {
    let newTask: TaskState;
    try {
      newTask = await createTask(task);
    } catch (error) {
      setTaskError('Failed to create task');
      return;
    }
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  async function deleteTask(taskId: string) {
    try {
      await delTask(taskId);
    } catch {
      setTaskError('Failed to delete task');
      return;
    }
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  async function completeTask(taskId: string) {
    try {
      const task = await getTaskById(taskId);
      await patchTask(taskId, { completed: !task.completed });
    } catch {
      setTaskError('Failed to complete task');
      return;
    }
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        return taskId === task.id ? { ...task, completed: !task.completed } : task;
      }),
    );
  }

  async function editTask(taskId: string, name: string) {
    try {
      await patchTask(taskId, { name });
    } catch {
      setTaskError('Failed to rename task');
      return;
    }
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
