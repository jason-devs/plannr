import { FormProvider, useForm, useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import useRegister from "../hooks/useRegister";

function Form({ children, onSubmit }) {
  const methods = useForm();
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        {children}
      </form>
    </FormProvider>
  );
}

function Input({ name, validation = {}, ...rest }) {
  const rhfProps = useRegister(name, validation);

  return <input {...rhfProps} {...rest} />;
}

function TextArea({ name, validation = {}, ...rest }) {
  const rhfProps = useRegister(name, validation);

  return <TextareaAutosize {...rhfProps} {...rest} />;
}

function Select({ children, name, validation = {}, ...rest }) {
  const rhfProps = useRegister(name, validation);

  return (
    <select {...rhfProps} {...rest}>
      {children}
    </select>
  );
}

function Label({ children }) {
  return <>{children}</>;
}

function Error({ children, name }) {
  const {
    formState: { errors },
  } = useFormContext();

  return <>{errors[name] && children}</>;
}

function Submit({ children }) {
  return <>{children}</>;
}

Form.Input = Input;
Form.TextArea = TextArea;
Form.Select = Select;
Form.Label = Label;
Form.Error = Error;
Form.Submit = Submit;

export default Form;
