import type { ButtonProps } from '../entities/Button/button.types.ts';

function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick} className={`Button Button--${props.variant}`}>
      {props.text}
    </button>
  );
}
export default Button;
