import Button from './Button.tsx';
import type { TaskListProps, TaskState } from '../types/task.types.ts';
import { Fragment, type KeyboardEvent, useState } from 'react';
import TaskCard from './TaskCard.tsx';
import Input from './Input.tsx';
import type { FilterState } from '../types/filter.types.ts';
import { Filter } from './Filter.tsx';
import { useTasks } from '../hooks/useTasks.ts';

function TaskList(props: TaskListProps) {
  const { tasks, addTask, deleteTask, completeTask, editTask } = useTasks(props.tasks);
  const [newTask, setNewTask] = useState<string>('');
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [filter, setFilter] = useState<FilterState>('All');

  function add(task: TaskState) {
    if (!newTask.trim() || newTask.trim().length === 0) {
      setError('Cannot add task with empty name');
      return;
    }
    addTask(task);
    setError('');
    setNewTask('');
  }

  function edit(taskId: number, name: string) {
    if (!name.trim() || name.trim().length === 0) {
      setError('Cannot edit task with empty name');
      setNewTaskName('');
      setEditingTaskId(null);
      return;
    }
    editTask(taskId, name);
    setError('');
    setNewTaskName('');
    setEditingTaskId(null);
  }

  function cancelEditionTask() {
    setNewTaskName('');
    setEditingTaskId(null);
    setError('');
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter == 'Active') {
      return !task.completed;
    }
    if (filter == 'Completed') {
      return task.completed;
    }
    return true;
  });

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, taskId: number) {
    if (event.key === 'Enter') {
      edit(taskId, newTaskName);
    }
    if (event.key === 'Escape') {
      cancelEditionTask();
    }
  }

  return (
    <div className="TaskList">
      <h1>Current TaskList</h1>
      <Filter filter={filter} setFilter={setFilter}></Filter>
      {!(visibleTasks.length > 0) ? (
        <div>No tasks</div>
      ) : (
        visibleTasks.map((task) => (
          <Fragment key={task.id}>
            <TaskCard name={task.name} completed={task.completed}></TaskCard>
            <div className="TaskAction">
              {editingTaskId === task.id ? (
                <div>
                  <Button
                    variant="danger"
                    text={'Cancel'}
                    onClick={() => {
                      cancelEditionTask();
                    }}
                  />
                  <Input
                    value={newTaskName}
                    onChange={(event) => setNewTaskName(event.target.value)}
                    onKeyDown={(event) => handleKeyDown(event, task.id)}
                  />
                  <Button
                    variant="secondary"
                    text={'Save'}
                    onClick={() => {
                      edit(task.id, newTaskName);
                    }}
                  />
                </div>
              ) : (
                <Button
                  variant="secondary"
                  text={'Edit'}
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setNewTaskName('');
                  }}
                ></Button>
              )}
              <Button
                variant="primary"
                text={'Complete'}
                onClick={() => completeTask(task.id)}
              ></Button>
              <Button variant="danger" text={'Delete'} onClick={() => deleteTask(task.id)}></Button>
            </div>
          </Fragment>
        ))
      )}
      <div className="TaskAdd">
        <Input
          value={newTask}
          onChange={(event) => {
            setNewTask(event.target.value);
            setError('');
          }}
        ></Input>
        <Button
          variant={'primary'}
          text={'Add'}
          onClick={() =>
            add({
              id: Date.now(),
              name: newTask,
              completed: false,
            })
          }
        ></Button>
      </div>
      {error ? <div>{error}</div> : null}
    </div>
  );
}
export default TaskList;
