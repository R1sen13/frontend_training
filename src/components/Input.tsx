import type { InputProps } from '../entities/Input/input.types.ts';

function Input(props: InputProps) {
  return (
    <input
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      className="Input"
    ></input>
  );
}
export default Input;
