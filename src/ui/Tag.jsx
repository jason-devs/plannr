import { Children, createContext, useContext } from "react";

const TagContext = createContext();

function Tag({ children, mode }) {
  return <TagContext.Provider value={{ mode }}>{children}</TagContext.Provider>;
}

function Button({ children }) {
  const { mode } = useContext(TagContext);
  const selectedChild = Children.toArray(children).find(
    child => child.props.name === mode,
  );

  return <>{selectedChild}</>;
}

Tag.Button = Button;

export default Tag;
