import { useState } from 'react';
import TaskList from '../components/TaskList.tsx';
import type { TaskListState } from '../types/task.types.ts';

function App() {
  const [tasks, setTasks] = useState<TaskListState>([]);

  return (
    <main className="App">
      <TaskList tasks={tasks} setTasks={setTasks}></TaskList>
    </main>
  );
}

export default App;
