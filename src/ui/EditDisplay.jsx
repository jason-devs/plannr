import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useState,
} from "react";

const EditDisplayContext = createContext();

function EditDisplay({ children, content, activator, handleBlur }) {
  const [mode, setMode] = useState("display");

  useEffect(
    function () {
      !content ? setMode("edit") : setMode("display");
    },
    [content],
  );

  let filteredChildren = null;

  if (mode === "edit") {
    filteredChildren = Children.map(children, child => {
      if (!isValidElement(child)) return null;
      if (child.type.name === "Edit") return child;
    });
  }

  if (mode === "display") {
    filteredChildren = Children.map(children, child => {
      if (!isValidElement(child)) return null;
      if (child.type.name === "Display") return child;
    });
  }

  function handleActivate() {
    setMode("edit");
    Children.forEach(children, child => {
      console.log(child.type.name);
      child.type.name === "Edit" ? child.focus?.() : child;
    });
  }

  return (
    <EditDisplayContext.Provider
      value={{ activator, handleActivate, handleBlur }}
    >
      <>{filteredChildren}</>
    </EditDisplayContext.Provider>
  );
}

function Edit({ children }) {
  const { handleBlur } = useContext(EditDisplayContext);
  const clonedChild = cloneElement(children, { onBlur: handleBlur });

  return <>{clonedChild}</>;
}

function Display({ children }) {
  const { activator, handleActivate } = useContext(EditDisplayContext);
  const clonedChild = cloneElement(children, { [activator]: handleActivate });

  return <>{clonedChild}</>;
}

EditDisplay.Edit = Edit;
EditDisplay.Display = Display;

export default EditDisplay;
