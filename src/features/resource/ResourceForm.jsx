import { useParams } from "react-router-dom";
import Form from "../../ui/Form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

function ResourceForm() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const {
    mutate: createResource,
    isPending: isPendingCreateResource,
    isError: isErrorCreateResource,
  } = useMutation({
    mutationKey: ["createResource"],
    mutationFn: async data => {
      const response = await api.post(`/backend-resource`, {
        ...data,
        project: projectId,
      });
      return response.data.data.newDoc;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`${projectId} Resources`]);
    },
  });

  function handleSubmit(data) {
    createResource(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        validation={{ required: true }}
        name="name"
        type="text"
        placeholder="Enter name here..."
        disabled={isPendingCreateResource}
      />
      <Form.Submit>
        <input type="submit" />
      </Form.Submit>
      {isErrorCreateResource && <span>It&apos;s fucked...</span>}
    </Form>
  );
}

export default ResourceForm;
