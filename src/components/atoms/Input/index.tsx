import styled from "styled-components";
import { Color } from "../../../constants/color";

const InputContainer = styled.input`
  width: 24rem;
  height: 3.25rem;
  margin-top: 1rem;
  border-radius: 6px;
  border: 1px solid ${Color.gray};
  padding-left: 0.5rem;
  outline: none;

  &:focus {
    border: 1px solid ${Color.yellow};
  }
`;

interface InputProps {
  readonly value: string;
  readonly onChange: (text: string) => void;
  readonly placeholder: string;
}

export default function Input(props: InputProps) {
  return (
    <InputContainer
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
      placeholder={props.placeholder}
    />
  );
}
