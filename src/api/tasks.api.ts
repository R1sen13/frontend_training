import type { TaskListState, TaskState } from '../types/task.types.ts';

const API_URL = import.meta.env.VITE_API_URL;

export async function getTasks(): Promise<TaskListState> {
  const response = await fetch(`${API_URL}/tasks`);

  if (!response.ok) {
    throw new Error('Failed to get tasks from API');
  }

  const result: { data: TaskListState } = await response.json();

  return result.data;
}

export async function getTaskById(taskId: string): Promise<TaskState> {
  const response = await fetch(`${API_URL}/tasks/${taskId}`);

  if (!response.ok) {
    throw new Error('Failed to get task from API');
  }

  return response.json();
}

export async function createTask(task: Pick<TaskState, 'name' | 'completed'>) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return response.json();
}

export async function patchTask(taskId: string, task: Partial<TaskState>) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to patch task');
  }

  return response.json();
}

export async function delTask(taskId: string): Promise<void> {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete task');
  }

  return response.json();
}
