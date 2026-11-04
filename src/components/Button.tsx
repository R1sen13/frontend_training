import type { ButtonProps } from '../entities/Button/button.types.ts';

function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick} className="Button">
      {props.text}
    </button>
  );
}
export default Button;
