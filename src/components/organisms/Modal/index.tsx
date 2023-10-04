import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { AlignRight } from "../../atoms/Alignment";
import { Color } from "../../../constants/color";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${Color.black0_5};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 6px ${Color.black0_2};
  max-width: 80%;
  width: 25rem;
  height: 20.25rem;
`;

const ModalCloseButton = styled.button`
  background: ${Color.transparent};
  border: none;
  outline: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

interface ModalProps {
  isOpened: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal(props: ModalProps) {
  if (!props.isOpened) return null;

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContainer>
        <AlignRight>
          <ModalCloseButton onClick={props.onClose}>&times;</ModalCloseButton>
        </AlignRight>
        {props.children}
      </ModalContainer>
    </ModalOverlay>,
    document.getElementById("modal-root")!
  );
}
