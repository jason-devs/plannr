import { useMutation, useQueryClient } from "@tanstack/react-query";
import Form from "../../ui/Form";
import api from "../../services/api";
import { useParams } from "react-router-dom";

function DataModelForm() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const {
    mutate: createDataModel,
    isPending: isPendingCreateDataModel,
    isError: isErrorCreateDataModel,
  } = useMutation({
    mutationKey: ["createDataModel"],
    mutationFn: async data => {
      const response = await api.post(`/data-model`, {
        ...data,
        project: projectId,
      });
      return response.data.data.newDoc;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`${projectId} DataModels`]);
    },
  });

  function handleSubmit(data) {
    createDataModel(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        validation={{ required: true }}
        name="name"
        type="text"
        placeholder="Enter a name..."
        disabled={isPendingCreateDataModel}
      />
      <Form.Submit>
        <input type="submit" />
      </Form.Submit>
      {isErrorCreateDataModel && <span>It&apos;s fucked...</span>}
    </Form>
  );
}

export default DataModelForm;
