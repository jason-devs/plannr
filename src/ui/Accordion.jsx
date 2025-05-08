import { cloneElement, createContext, useContext, useState } from "react";

const AccordionContext = createContext();

function Accordion({ children }) {
  const [openContent, setOpenContent] = useState("");

  function handleOpen(contentName) {
    setOpenContent(openContent === contentName ? "" : contentName);
  }

  return (
    <AccordionContext.Provider value={{ openContent, handleOpen }}>
      {children}
    </AccordionContext.Provider>
  );
}

function Header({ children }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {children}
    </div>
  );
}

function Toggle({ children, name, iconOpen, iconClose }) {
  const { openContent, handleOpen } = useContext(AccordionContext);
  const clonedChild = cloneElement(
    children,
    { onClick: () => handleOpen(name) },
    openContent === name ? iconClose : iconOpen
  );
  return <>{clonedChild}</>;
}

function Content({ children, name }) {
  const { openContent } = useContext(AccordionContext);

  if (openContent !== name || openContent === "") return null;
  return <div>{children}</div>;
}

Accordion.Header = Header;
Accordion.Toggle = Toggle;
Accordion.Content = Content;

export default Accordion;
