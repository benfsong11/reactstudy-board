import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

interface ModalProps {
  isOpened: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal(props: ModalProps) {
  if (!props.isOpened) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">{props.children}</div>
    </div>,
    document.getElementById("modal-root")!
  );
}
