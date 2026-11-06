import Button from './Button.tsx';
import type { FilterProps } from '../types/filter.types.ts';

export function Filter(props: FilterProps) {
  return (
    <div className="Filter">
      <Button
        variant={props.filter === 'All' ? 'primary' : 'secondary'}
        onClick={() => {
          props.setFilter('All');
        }}
        text={'All'}
      ></Button>
      <Button
        variant={props.filter === 'Active' ? 'primary' : 'secondary'}
        onClick={() => {
          props.setFilter('Active');
        }}
        text={'Active'}
      ></Button>
      <Button
        variant={props.filter === 'Completed' ? 'primary' : 'secondary'}
        onClick={() => {
          props.setFilter('Completed');
        }}
        text={'Completed'}
      ></Button>
    </div>
  );
}
