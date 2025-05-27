import { cloneElement, createContext, useContext, useState } from "react";

const MenuContext = createContext();

function Menu({ children }) {
  const [isOpen, setIsOpen] = useState();

  function handleToggle() {
    setIsOpen(isOpen => !isOpen);
  }

  return (
    <MenuContext.Provider value={{ isOpen, handleToggle }}>
      {children}
    </MenuContext.Provider>
  );
}

function Toggle({ children, onToggle }) {
  const { handleToggle } = useContext(MenuContext);
  const clonedChild = cloneElement(children, {
    onClick: () => {
      handleToggle();
      onToggle?.();
    },
    className: `${children.props.className || ""} relative`.trim(),
  });
  return clonedChild;
}

function Item({ children, closeOnClick = false }) {
  const { handleToggle } = useContext(MenuContext);
  const clonedChild = cloneElement(children, {
    onClick: handleToggle,
  });

  return <>{closeOnClick ? clonedChild : children}</>;
}

function Window({ children }) {
  const { isOpen } = useContext(MenuContext);
  return <>{isOpen && children}</>;
}

Menu.Toggle = Toggle;
Menu.Item = Item;
Menu.Window = Window;

export default Menu;
