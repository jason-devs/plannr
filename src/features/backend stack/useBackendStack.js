import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll, updateOne } from "../../services/apiFactory";
import { useParams } from "react-router-dom";

function useBackendStack() {
  const resource = "backend-stack";
  const queryClient = useQueryClient();
  const { projectId } = useParams();

  const {
    data: backendStacks = [],
    isPending: isPendingBackendStacks,
    isFetching: isFetchingBackendStacks,
    isError: isErrorBackendStacks,
  } = useQuery({
    queryKey: [`Backend Stacks`],
    queryFn: async () => await getAll(resource, {}),
    enabled: !!projectId,
    staleTime: 60 * 1000 * 10,
  });

  const currentBackendStack = backendStacks?.find(
    backendStack => backendStack.project === projectId,
  );

  const {
    mutate: updateBackendStack,
    isPending: isPendingUpdateBackendStack,
    isError: isErrorUpdateBackendStack,
    variables: variablesUpdateBackendStack,
  } = useMutation({
    mutationFn: async data =>
      await updateOne(resource, currentBackendStack._id, data),
    onSettled: () => queryClient.invalidateQueries([`Backend Stacks`]),
  });

  const isPendingBackendStack =
    isPendingBackendStacks || isPendingUpdateBackendStack;
  const isErrorBackendStack = isErrorBackendStacks || isErrorUpdateBackendStack;
  const isFetchingBackendStack = isFetchingBackendStacks;

  return {
    currentBackendStack,
    backendStacks,
    isPendingBackendStack,
    isErrorBackendStack,
    isFetchingBackendStack,
    updateBackendStack,
    isPendingUpdateBackendStack,
    isErrorUpdateBackendStack,
    variablesUpdateBackendStack,
  };
}

export default useBackendStack;
