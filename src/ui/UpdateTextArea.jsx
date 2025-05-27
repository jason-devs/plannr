import { cloneElement, createContext, useContext } from "react";

const UpdateTextAreaContext = createContext();

function UpdateTextArea({
  children,
  initialValue,
  onBlur,
  isFetching,
  isPending,
  isPendingUpdate,
  variables,
  editText,
  setEditText,
}) {
  function getValue() {
    if (editText !== null && !isFetching && !isPending) {
      return editText;
    }

    if ((editText === null && isFetching) || isPendingUpdate) {
      return variables;
    }

    if ((editText === null && !isFetching) || !isPendingUpdate) {
      return initialValue;
    }
  }

  return (
    <UpdateTextAreaContext.Provider value={{ getValue, setEditText, onBlur }}>
      {children}
    </UpdateTextAreaContext.Provider>
  );
}

function Input({ children }) {
  const { getValue, setEditText, onBlur } = useContext(UpdateTextAreaContext);

  const clonedChild = cloneElement(children, {
    onChange: e => setEditText(e.target.value),
    onFocus: e => setEditText(e.target.value),
    onBlur,
    value: getValue(),
  });

  return <>{clonedChild}</>;
}

UpdateTextArea.Input = Input;

export default UpdateTextArea;

/* 

<UpdateText field={project?.description} isFetching={isFetchingProject} isPending={isPendingProject} isUpdating={isPendingUpdate} onBlur={handleUpdateDescription} variables={...}>
  <UpdateText.Input>
    <TextareaAutosize>
    
    </TextareaAutosize>
  </UpdateText.Input>
</UpdateText>

*/
