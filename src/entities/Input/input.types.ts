import type { ChangeEvent } from 'react';

export type InputProps = {
  type?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};
