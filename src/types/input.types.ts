import { type ChangeEvent } from 'react';
import { type KeyboardEvent } from 'react';

export type InputProps = {
  type?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
};
