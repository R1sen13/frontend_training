import Button from './Button.tsx';
import type { TaskListProps, TaskState } from '../entities/Tasks/tasks.types.ts';
import { Fragment, useState } from 'react';
import TaskCard from './TaskCard.tsx';

function TaskList(props: TaskListProps) {
  const [newTask, setNewTask] = useState<string>('');
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  function addTask(task: TaskState) {
    if (!newTask.trim() || newTask.trim().length === 0) {
      setError('Cannot add task with empty name');
      return;
    }
    props.setTasks([...props.tasks, task]);
    setError('');
    setNewTask('');
  }

  function deleteTask(taskId: number) {
    props.setTasks(props.tasks.filter((task) => task.id !== taskId));
  }

  function completeTask(taskId: number) {
    props.setTasks(
      props.tasks.map((task) => {
        return taskId === task.id ? { ...task, completed: !task.completed } : task;
      }),
    );
  }

  function editTask(taskId: number, name: string) {
    if (!name.trim() || name.trim().length === 0) {
      setError('Cannot edit task with empty name');
      setNewTaskName('');
      return;
    }
    props.setTasks(
      props.tasks.map((task) => {
        return task.id === taskId ? { ...task, name } : task;
      }),
    );
    setError('');
    setNewTaskName('');
  }

  return (
    <div className="TaskList">
      <h1>Current TaskList</h1>
      {props.tasks.map((task) => (
        <Fragment key={task.id}>
          <TaskCard name={task.name} completed={task.completed}></TaskCard>
          {editingTaskId === task.id ? (
            <div>
              <input value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} />
              <Button
                text={'Save'}
                onClick={() => {
                  editTask(task.id, newTaskName);
                  setEditingTaskId(null);
                  setNewTaskName('');
                }}
              />
            </div>
          ) : (
            <Button
              text={'Edit'}
              onClick={() => {
                setEditingTaskId(task.id);
                setNewTaskName('');
              }}
            ></Button>
          )}
          <Button text={'Complete'} onClick={() => completeTask(task.id)}></Button>
          <Button text={'Delete'} onClick={() => deleteTask(task.id)}></Button>
        </Fragment>
      ))}
      <input
        value={newTask}
        onChange={(event) => {
          setNewTask(event.target.value);
          setError('');
        }}
      ></input>
      <Button
        text={'Add'}
        onClick={() =>
          addTask({
            id: props.tasks.length + 1,
            name: newTask,
            completed: false,
          })
        }
      ></Button>
      {error ? <div>{error}</div> : null}
    </div>
  );
}
export default TaskList;
