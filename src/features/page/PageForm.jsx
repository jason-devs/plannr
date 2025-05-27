import { useMutation, useQueryClient } from "@tanstack/react-query";
import Form from "../../ui/Form";
import api from "../../services/api";
import { useParams } from "react-router-dom";

function PageForm() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const {
    mutate: createPage,
    isPending: isPendingCreatePage,
    isError: isErrorCreatePage,
  } = useMutation({
    mutationKey: ["createPage"],
    mutationFn: async data => {
      const response = await api.post(`/page`, {
        ...data,
        project: projectId,
      });
      return response.data.data.newDoc;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`${projectId} Pages`]);
    },
  });

  function handleSubmit(data) {
    createPage(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        validation={{ required: true }}
        name="name"
        type="text"
        placeholder="Enter a name..."
        disabled={isPendingCreatePage}
      />
      <Form.Submit>
        <input type="submit" />
      </Form.Submit>
      {isErrorCreatePage && <span>It&apos;s fucked...</span>}
    </Form>
  );
}

export default PageForm;
