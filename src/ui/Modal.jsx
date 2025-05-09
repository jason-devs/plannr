import { cloneElement, createContext, useContext, useState } from "react";
import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  function handleOpen(name) {
    setOpenName(openName !== name ? name : "");
  }

  function handleClose() {
    setOpenName("");
  }

  return (
    <ModalContext.Provider value={{ openName, handleOpen, handleClose }}>
      <div className="relative h-full">{children}</div>
    </ModalContext.Provider>
  );
}

function Header({ children }) {
  const { handleClose } = useContext(ModalContext);

  return (
    <div className="flex gap-1">
      {children}
      <button onClick={handleClose}>
        <HiXMark />
      </button>
    </div>
  );
}

function Content({ children, name }) {
  const { openName } = useContext(ModalContext);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-950">
      {openName === name ? children : null}
    </div>
  );
}

function Overlay() {
  const { openName, handleClose } = useContext(ModalContext);

  return openName !== "" ? (
    <div
      className="absolute h-full w-full backdrop-blur-sm"
      onClick={handleClose}
    ></div>
  ) : null;
}

function Toggle({ children, name }) {
  const { handleOpen } = useContext(ModalContext);
  const clonedChild = cloneElement(children, {
    onClick: () => handleOpen(name),
  });

  return <>{clonedChild}</>;
}

Modal.Header = Header;
Modal.Content = Content;
Modal.Overlay = Overlay;
Modal.Toggle = Toggle;

export default Modal;
