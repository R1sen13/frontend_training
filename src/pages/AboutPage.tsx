import { Navigation } from '../components/Navigation.tsx';

export function AboutPage() {
  return (
    <div className="AboutPage">
      <div>Hey! It is task tracker x100000</div>
      <Navigation to="/tasks" name="Tasks" />
    </div>
  );
}
