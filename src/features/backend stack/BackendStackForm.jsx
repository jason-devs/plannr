import Form from "../../ui/Form";
import { useContext } from "react";
import BackendStackContext from "./backendStackContext";

function BackendStackForm() {
  const { currentBackendStack, updateBackendStack, techs } =
    useContext(BackendStackContext);

  console.log({ currentBackendStack });

  function handleSubmit(data) {
    updateBackendStack({
      techList: [
        ...currentBackendStack.techList.map(tech => tech._id),
        data.tech,
      ],
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Select name="tech" validation={{ required: true }}>
        {techs?.map(tech => (
          <option key={tech._id} value={tech._id}>
            {tech.name}
          </option>
        ))}
      </Form.Select>
      <Form.Submit>
        <input type="submit" />
      </Form.Submit>
    </Form>
  );
}

export default BackendStackForm;
