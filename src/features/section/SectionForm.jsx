import { useContext } from "react";
import Form from "../../ui/Form";
import PageContext from "../page/pageContext";
import useSection from "./useSection";

function SectionForm() {
  const { createSection } = useSection();
  const { activePage } = useContext(PageContext);

  function handleSubmit(data) {
    console.log({ ...data, page: activePage });
    createSection({ ...data, page: activePage });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        validation={{ required: true }}
        name="name"
        id="name"
        type="text"
        placeholder="Enter name here..."
      />
      <Form.TextArea
        validation={{ required: true }}
        name="description"
        id="description"
        placeholder="Enter description here..."
      />
      <Form.Submit>
        <input type="submit" />
      </Form.Submit>
    </Form>
  );
}

export default SectionForm;
