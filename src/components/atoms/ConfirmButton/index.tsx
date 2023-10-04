import styled from "styled-components";
import { Color } from "../../../constants/color";

const Button = styled.button`
  background-color: ${Color.yellow};
  border: none;
  outline: none;
  border-radius: 6px;
  margin-top: 1rem;
  width: 24.8rem;
  height: 3.25rem;
  cursor: pointer;
`;

interface Props {
  readonly disabled: boolean;
  readonly onClick: () => void;
  readonly text: string;
}

export default function ConfirmButton(props: Props) {
  return (
    <Button disabled={props.disabled} onClick={props.onClick}>
      {props.text}
    </Button>
  );
}
