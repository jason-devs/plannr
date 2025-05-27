import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  createOne,
  deleteOne,
  getAll,
  updateOne,
} from "../../services/apiFactory";

function useComponent() {
  const resource = "component";
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const [activeComponent, setActiveComponent] = useState("");

  const {
    data: components = [],
    isPending: isPendingComponents,
    isFetching: isFetchingComponents,
    isError: isErrorComponents,
  } = useQuery({
    queryKey: [`${projectId} Components`],
    queryFn: async () => await getAll(resource, { project: projectId }),
    enabled: !!projectId,
    staleTime: 60 * 1000 * 10,
  });

  const currentComponent = components?.find(
    component => component._id === activeComponent,
  );

  const {
    mutate: createComponent,
    isPending: isPendingCreateComponent,
    isError: isErrorCreateComponent,
    variables: variablesCreateComponent,
  } = useMutation({
    mutationFn: async data => await createOne(resource, data),
    onSuccess: newComponent => {
      console.log({ newComponent });
      queryClient.invalidateQueries([`${projectId} Components`]);
      setActiveComponent(newComponent._id);
    },
  });

  const {
    mutate: updateComponent,
    isPending: isPendingUpdateComponent,
    isError: isErrorUpdateComponent,
    variables: variablesUpdateComponent,
  } = useMutation({
    mutationFn: async data => await updateOne(resource, activeComponent, data),
    onSettled: () => queryClient.invalidateQueries([`${projectId} Components`]),
  });

  const {
    mutate: deleteComponent,
    isPending: isPendingDeleteComponent,
    isError: isErrorDeleteComponent,
    variables: variablesDeleteComponent,
  } = useMutation({
    mutationFn: async id => await deleteOne(resource, id),
    onSettled: () => queryClient.invalidateQueries([`${projectId} Components`]),
  });

  const isPendingComponent =
    isPendingComponents ||
    isPendingUpdateComponent ||
    isPendingCreateComponent ||
    isPendingDeleteComponent;
  const isErrorComponent =
    isErrorComponents ||
    isErrorUpdateComponent ||
    isErrorCreateComponent ||
    isErrorDeleteComponent;
  const isFetchingComponent = isFetchingComponents;

  return {
    currentComponent,
    activeComponent,
    setActiveComponent,
    components,
    isPendingComponent,
    isErrorComponent,
    isFetchingComponent,
    createComponent,
    isPendingCreateComponent,
    isErrorCreateComponent,
    variablesCreateComponent,
    updateComponent,
    isPendingUpdateComponent,
    isErrorUpdateComponent,
    variablesUpdateComponent,
    deleteComponent,
    isPendingDeleteComponent,
    isErrorDeleteComponent,
    variablesDeleteComponent,
  };
}

export default useComponent;
