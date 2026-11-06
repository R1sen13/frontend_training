import * as React from 'react';

export type FilterState = 'All' | 'Active' | 'Completed';

export type FilterProps = {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
};
