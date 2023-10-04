import styled from "styled-components";
import { Color } from "../../../constants/color";
import { useState } from "react";
import OpenedEyeBlack from "../../../assets/icons/ic_eyeOpenedBlack.svg";
import SlashedEyeBlack from "../../../assets/icons/ic_eyeSlashed.svg";

interface ContainerProps {
  readonly isFocusIn: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 23.7rem;
  margin-top: 1rem;
  height: 3.25rem;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.isFocusIn ? Color.yellow : Color.gray)};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 22.7rem;
  border: none;
  outline: none;
`;

const VisibleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background-color: ${Color.transparent};
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;

const VisibleIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

interface Props {
  readonly value: string;
  readonly onChange: (text: string) => void;
  readonly placeholder: string;
}

export default function PasswordInput(props: Props) {
  const [isFocused, setFocused] = useState<boolean>(false);
  const [isVisible, setVisible] = useState<boolean>(false);

  return (
    <Container isFocusIn={isFocused}>
      <Input
        type={isVisible ? "text" : "password"}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={props.placeholder}
      />
      <VisibleButton onClick={() => setVisible(!isVisible)}>
        <VisibleIcon
          src={isVisible ? SlashedEyeBlack : OpenedEyeBlack}
          alt="opened-eye-black"
        />
      </VisibleButton>
    </Container>
  );
}
