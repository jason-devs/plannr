import { useContext } from "react";
import Form from "../../ui/Form";
import RoleContext from "../role/roleContext";
import useUserStory from "./useUserStory";
import PageContext from "../page/pageContext";
import { useParams } from "react-router-dom";

function UserStoryForm() {
  const { pageId } = useParams();
  const { roles } = useContext(RoleContext);
  const { createUserStory } = useUserStory();

  function handleSubmit(data) {
    if (!pageId) alert("Select a page numb-nuts!");
    createUserStory({ ...data, page: pageId });
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="flex items-center">
        <span>As a </span>
        <Form.Select validation={{ required: true }} name="role" id="role">
          {roles?.map(role => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </Form.Select>
      </div>
      <p>I want to be able to:</p>
      <Form.TextArea
        validation={{ required: true }}
        name="story"
        id="story"
        type="text"
        placeholder="Enter story here..."
      />
      <Form.Submit>
        <input type="submit" />
      </Form.Submit>
    </Form>
  );
}

export default UserStoryForm;
