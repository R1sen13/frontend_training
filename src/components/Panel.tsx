import type { PanelProps } from '../types/panel.types.ts';

export function Panel({ children }: PanelProps) {
  return <section className="Panel">{children}</section>;
}
