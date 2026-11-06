import type { InputProps } from '../types/input.types.ts';

function Input(props: InputProps) {
  return (
    <input
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
      className="Input"
    ></input>
  );
}
export default Input;
