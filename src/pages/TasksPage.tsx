import TaskList from '../components/TaskList.tsx';
import { Navigation } from '../components/Navigation.tsx';

export function TasksPage() {
  return (
    <div>
      <TaskList />
      <Navigation to="/about" name="About" />
    </div>
  );
}
