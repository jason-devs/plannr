import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAll, updateOne } from "../../services/apiFactory";
import { useParams } from "react-router-dom";

function useFrontendStack() {
  const resource = "frontend-stack";
  const queryClient = useQueryClient();
  const { projectId } = useParams();

  const {
    data: frontendStacks = [],
    isPending: isPendingFrontendStacks,
    isFetching: isFetchingFrontendStacks,
    isError: isErrorFrontendStacks,
  } = useQuery({
    queryKey: [`Frontend Stacks`],
    queryFn: async () => await getAll(resource, {}),
    enabled: !!projectId,
    staleTime: 60 * 1000 * 10,
  });

  const currentFrontendStack = frontendStacks?.find(
    frontendStack => frontendStack.project === projectId,
  );

  const {
    mutate: updateFrontendStack,
    isPending: isPendingUpdateFrontendStack,
    isError: isErrorUpdateFrontendStack,
    variables: variablesUpdateFrontendStack,
  } = useMutation({
    mutationFn: async data =>
      await updateOne(resource, currentFrontendStack._id, data),
    onSettled: () => queryClient.invalidateQueries([`Frontend Stacks`]),
  });

  const isPendingFrontendStack =
    isPendingFrontendStacks || isPendingUpdateFrontendStack;
  const isErrorFrontendStack =
    isErrorFrontendStacks || isErrorUpdateFrontendStack;
  const isFetchingFrontendStack = isFetchingFrontendStacks;

  return {
    currentFrontendStack,
    frontendStacks,
    isPendingFrontendStack,
    isErrorFrontendStack,
    isFetchingFrontendStack,
    updateFrontendStack,
    isPendingUpdateFrontendStack,
    isErrorUpdateFrontendStack,
    variablesUpdateFrontendStack,
  };
}

export default useFrontendStack;
