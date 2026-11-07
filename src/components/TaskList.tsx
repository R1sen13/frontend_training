import Button from './Button.tsx';
import type { TaskState } from '../types/task.types.ts';
import { type FormEvent, Fragment, type KeyboardEvent, useState } from 'react';
import TaskCard from './TaskCard.tsx';
import Input from './Input.tsx';
import type { FilterState } from '../types/filter.types.ts';
import { Filter } from './Filter.tsx';
import { useTasks } from '../hooks/useTasks.ts';
import { Panel } from './Panel.tsx';

function TaskList() {
  const { tasks, addTask, deleteTask, completeTask, editTask, taskError, isLoading } = useTasks();
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

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    add({
      id: Date.now(),
      name: newTask,
      completed: false,
    });
  }

  function handleEdit(event: FormEvent<HTMLFormElement>, taskId: number) {
    event.preventDefault();

    edit(taskId, newTaskName);
  }

  function handleReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    cancelEditionTask();
  }

  function edit(taskId: number, name: string) {
    if (!name.trim() || name.trim().length === 0) {
      setError('Cannot edit task with empty name');
      setNewTaskName('');
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
    if (filter === 'Active') {
      return !task.completed;
    }
    if (filter === 'Completed') {
      return task.completed;
    }
    return true;
  });

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      cancelEditionTask();
    }
  }

  const displayedError = taskError ?? error;

  return (
    <div className="TaskList">
      <Panel>
        <h1>Current TaskList</h1>
        <Filter filter={filter} setFilter={setFilter}></Filter>
      </Panel>

      <Panel>
        {isLoading ? (
          <div className="LoadingTasks">Tasks are loading...</div>
        ) : !(visibleTasks.length > 0) ? (
          <div>No tasks</div>
        ) : (
          visibleTasks.map((task) => (
            <Fragment key={task.id}>
              <TaskCard name={task.name} completed={task.completed}></TaskCard>
              <div className="TaskAction">
                {editingTaskId === task.id ? (
                  <form onSubmit={(event) => handleEdit(event, task.id)} onReset={handleReset}>
                    <Button variant="danger" text={'Cancel'} type={'reset'} />
                    <Input
                      value={newTaskName}
                      onChange={(event) => setNewTaskName(event.target.value)}
                      onKeyDown={(event) => handleKeyDown(event)}
                    />
                    <Button variant="secondary" text={'Save'} type={'submit'} />
                  </form>
                ) : (
                  <Button
                    variant="secondary"
                    text={'Edit'}
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setNewTaskName(task.name);
                    }}
                  ></Button>
                )}
                <Button
                  variant="primary"
                  text={'Complete'}
                  onClick={() => completeTask(task.id)}
                ></Button>
                <Button
                  variant="danger"
                  text={'Delete'}
                  onClick={() => deleteTask(task.id)}
                ></Button>
              </div>
            </Fragment>
          ))
        )}
      </Panel>

      <Panel>
        <form className="TaskAdd" onSubmit={handleAdd}>
          <Input
            value={newTask}
            onChange={(event) => {
              setNewTask(event.target.value);
              setError('');
            }}
          ></Input>
          <Button variant={'primary'} text={'Add'} type={'submit'}></Button>
        </form>
      </Panel>

      {error ? <div className="ErrorMessage">{'Error: ' + displayedError}</div> : null}
    </div>
  );
}
export default TaskList;
