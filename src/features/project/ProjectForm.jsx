import Form from "../../ui/Form";
import useProject from "./useProject";

function ProjectForm() {
  const { createProject, isPendingCreateProject, isErrorCreateProject } =
    useProject();

  function handleSubmit(data) {
    createProject(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        validation={{ required: true }}
        name="name"
        type="text"
        placeholder="Enter a name..."
        disabled={isPendingCreateProject}
      />
      <Form.Submit>
        <input type="submit" />
      </Form.Submit>
      {isErrorCreateProject && <span>It&apos;s fucked...</span>}
    </Form>
  );
}

export default ProjectForm;
