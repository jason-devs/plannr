import { useContext, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import UpdateTextArea from "../../ui/UpdateTextArea";
import UserStoryContext from "./userStoryContext";
import RoleContext from "../role/roleContext";

function EditUserStoryForm({ userStory }) {
  const { roles } = useContext(RoleContext);

  const {
    updateUserStory,
    isPendingUserStory,
    isFetchingUserStory,
    isPendingUpdateUserStory,
    variablesUpdateUserStory,
  } = useContext(UserStoryContext);

  const [editedStory, setEditedStory] = useState(null);

  function handleUpdateUserStory() {
    updateUserStory({ story: editedStory });
  }

  function handleUpdateUserStoryRole(e) {
    updateUserStory({ role: e.target.value });
  }

  return (
    <div>
      <span>As A </span>
      <select
        name="role"
        id="role"
        defaultValue={userStory.role._id}
        onChange={handleUpdateUserStoryRole}
      >
        {roles?.map(role => (
          <option key={role._id} value={role._id}>
            {role.name}
          </option>
        ))}
      </select>
      <p>I want to:</p>
      <UpdateTextArea
        initialValue={userStory?.story || ""}
        onBlur={handleUpdateUserStory}
        isFetching={isFetchingUserStory}
        isPending={isPendingUserStory}
        isPendingUpdate={isPendingUpdateUserStory}
        variables={variablesUpdateUserStory?.story}
        editText={editedStory}
        setEditText={setEditedStory}
      >
        <UpdateTextArea.Input>
          <TextareaAutosize
            placeholder="Add a story here..."
            className="field-sizing-content w-full resize-none"
            rows="2"
            disabled={isPendingUserStory}
          />
        </UpdateTextArea.Input>
      </UpdateTextArea>
    </div>
  );
}

export default EditUserStoryForm;
