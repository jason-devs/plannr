import { useParams } from "react-router-dom";
import Form from "../../ui/Form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

function ComponentForm() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const {
    mutate: createComponent,
    isPending: isPendingCreateComponent,
    isError: isErrorCreateComponent,
  } = useMutation({
    mutationKey: ["createComponent"],
    mutationFn: async data => {
      const response = await api.post(`/component`, {
        ...data,
        project: projectId,
      });
      return response.data.data.newDoc;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`${projectId} Components`]);
    },
  });

  function handleSubmit(data) {
    createComponent(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        validation={{ required: true }}
        name="name"
        type="text"
        placeholder="Enter name here..."
        disabled={isPendingCreateComponent}
      />
      <Form.Submit>
        <input type="submit" />
      </Form.Submit>
      {isErrorCreateComponent && <span>It&apos;s fucked...</span>}
    </Form>
  );
}

export default ComponentForm;
