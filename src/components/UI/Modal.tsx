import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onCartClose: () => void;
}

interface BackdropProps {
  onCartClose: () => void;
}

interface ModalOverlayProps {
  children: ReactNode;
}

const Backdrop: React.FC<BackdropProps> = ({ onCartClose }) => {
  return <div className={classes.backdrop} onClick={onCartClose}></div>;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal: React.FC<ModalProps> = ({ children, onCartClose }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCartClose={onCartClose} />,
        portalElement!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement!
      )}
    </>
  );
};

export default Modal;
