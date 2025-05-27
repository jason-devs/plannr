import { useParams } from "react-router-dom";
import {
  createOne,
  deleteOne,
  getAll,
  updateOne,
} from "../../services/apiFactory";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useResource() {
  const resource = "backend-resource";
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: resources = [],
    isPending: isPendingResources,
    isFetching: isFetchingResources,
    isError: isErrorResources,
  } = useQuery({
    queryKey: [`${projectId} Resources`],
    queryFn: async () => await getAll(resource, { project: projectId }),
    enabled: !!projectId,
    staleTime: 60 * 1000 * 10,
  });

  const {
    mutate: createResource,
    isPending: isPendingCreateResource,
    isError: isErrorCreateResource,
    variables: variablesCreateResource,
  } = useMutation({
    mutationFn: async data => await createOne(resource, data),
    onSuccess: newResource => {
      console.log({ newResource });
      queryClient.invalidateQueries([`${projectId} Resources`]);
    },
  });

  const {
    mutate: updateResource,
    isPending: isPendingUpdateResource,
    isError: isErrorUpdateResource,
    variables: variablesUpdateResource,
  } = useMutation({
    //FIXME: I removed the ID to get rid of the squiggly line.
    mutationFn: async data => await updateOne(resource, data),
    onSettled: () => queryClient.invalidateQueries([`${projectId} Resources`]),
  });

  const {
    mutate: deleteResource,
    isPending: isPendingDeleteResource,
    isError: isErrorDeleteResource,
    variables: variablesDeleteResource,
  } = useMutation({
    mutationFn: async id => await deleteOne(resource, id),
    onSettled: () => queryClient.invalidateQueries([`${projectId} Resources`]),
  });

  const isPendingResource =
    isPendingResources ||
    isPendingUpdateResource ||
    isPendingCreateResource ||
    isPendingDeleteResource;
  const isErrorResource =
    isErrorResources ||
    isErrorUpdateResource ||
    isErrorCreateResource ||
    isErrorDeleteResource;
  const isFetchingResource = isFetchingResources;

  return {
    resources,
    isPendingResource,
    isErrorResource,
    isFetchingResource,
    createResource,
    isPendingCreateResource,
    isErrorCreateResource,
    variablesCreateResource,
    updateResource,
    isPendingUpdateResource,
    isErrorUpdateResource,
    variablesUpdateResource,
    deleteResource,
    isPendingDeleteResource,
    isErrorDeleteResource,
    variablesDeleteResource,
  };
}

export default useResource;
