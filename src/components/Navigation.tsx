import type { NavigationProps } from '../types/navigation.types.ts';
import { NavLink } from 'react-router-dom';

export function Navigation(props: NavigationProps) {
  return (
    <NavLink to={props.to} className={({ isActive }) => (isActive ? 'Link Link--active' : 'Link')}>
      {props.name}
    </NavLink>
  );
}
