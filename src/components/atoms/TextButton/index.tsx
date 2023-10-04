import styled from "styled-components";
import { Color } from "../../../constants/color";

interface ButtonProps {
  isSmall: boolean;
  hasMarginTop: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${(props) => (props.isSmall ? Color.gray : Color.black)};
  font-size: ${(props) => (props.isSmall ? 12 : 14)}px;
  font-weight: 500;
  margin-top: ${(props) => (props.hasMarginTop ? 0.5 : 0)}rem;
`;

interface TextButtonProps {
  text: string;
  onClick: () => void;
  isSmall: boolean;
  hasMarginTop: boolean;
}

export default function TextButton(props: TextButtonProps) {
  return (
    <Button
      isSmall={props.isSmall}
      hasMarginTop={props.hasMarginTop}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
}
