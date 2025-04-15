import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { HiOutlineXCircle } from "./Icons";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName, openByDefault = false }) {
  const { open } = useContext(ModalContext);

  useEffect(
    function () {
      // One cannot set a useState variable while rendering a component
      // so the need to use a useEffect to open the modal by default
      if (openByDefault) open(opensWindowName);
    },
    [open, openByDefault, opensWindowName],
  );

  if (!openByDefault)
    return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name, showCloseButton = false }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0 z-10 h-[100dvh] w-full backdrop-blur-xs transition duration-500">
      <div className="dark:bg-dark-background-500 fixed top-1/2 left-1/2 mx-2 w-full -translate-1/2 transform rounded-sm bg-white p-4 shadow-lg transition-all duration-500 md:max-w-1/2 dark:text-white">
        {showCloseButton && (
          <button
            onClick={close}
            className="absolute right-7 translate-x-3 transform border-0 border-none bg-none transition-all duration-200"
          >
            <HiOutlineXCircle className="h-7 w-7 md:h-8 md:w-8" />
          </button>
        )}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
