import Form from "../../ui/Form";
import { useContext } from "react";
import FrontendStackContext from "./frontendStackContext";

function FrontendStackForm() {
  const { currentFrontendStack, updateFrontendStack, techs } =
    useContext(FrontendStackContext);

  function handleSubmit(data) {
    updateFrontendStack({
      techList: [
        ...currentFrontendStack.techList.map(tech => tech._id),
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

export default FrontendStackForm;
