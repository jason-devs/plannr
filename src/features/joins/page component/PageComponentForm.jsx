import { useContext } from "react";
import Form from "../../../ui/Form";
import PageComponentContext from "./pageComponentContext";
import usePageComponent from "./usePageComponent";
import { useParams } from "react-router-dom";

function PageComponentForm() {
  const { filteredComponents } = useContext(PageComponentContext);
  const { pageId } = useParams();

  const { createPageComponent } = usePageComponent();

  function handleCreatePageComponent(data) {
    createPageComponent({ ...data, page: pageId });
  }

  if (filteredComponents.length === 0) {
    return (
      <span>
        You've used all this projects components on this page. Make some more to
        add more!
      </span>
    );
  }

  return (
    <Form onSubmit={handleCreatePageComponent}>
      <Form.Select name="component" validation={{ required: true }}>
        {filteredComponents?.map(component => (
          <option key={component._id} value={component._id}>
            {component.name}
          </option>
        ))}
      </Form.Select>
      <Form.Submit>
        <input type="submit" />
      </Form.Submit>
    </Form>
  );
}

export default PageComponentForm;
