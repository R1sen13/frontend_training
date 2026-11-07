import { Navigate, Route, Routes } from 'react-router-dom';
import { AboutPage } from '../pages/AboutPage.tsx';
import { TasksPage } from '../pages/TasksPage.tsx';
import { NotFoundPage } from '../pages/NotFoundPage.tsx';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/tasks'} replace />}></Route>
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
