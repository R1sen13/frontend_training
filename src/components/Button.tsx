import type { ButtonProps } from '../types/button.types.ts';

function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick} className={`Button Button--${props.variant}`}>
      {props.text}
    </button>
  );
}
export default Button;
