import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  createOne,
  deleteOne,
  getAll,
  updateOne,
} from "../../services/apiFactory";

function useDataModel() {
  const resource = "data-model";
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: dataModels = [],
    isPending: isPendingDataModels,
    isFetching: isFetchingDataModels,
    isError: isErrorDataModels,
  } = useQuery({
    queryKey: [`${projectId} DataModels`],
    queryFn: async () => await getAll(resource, { project: projectId }),
    enabled: !!projectId,
    staleTime: 60 * 1000 * 10,
  });

  const {
    mutate: createDataModel,
    isPending: isPendingCreateDataModel,
    isError: isErrorCreateDataModel,
    variables: variablesCreateDataModel,
  } = useMutation({
    mutationFn: async data => await createOne(resource, data),
    onSuccess: newDataModel => {
      console.log({ newDataModel });
      queryClient.invalidateQueries([`${projectId} DataModels`]);
    },
  });

  const {
    mutate: updateDataModel,
    isPending: isPendingUpdateDataModel,
    isError: isErrorUpdateDataModel,
    variables: variablesUpdateDataModel,
  } = useMutation({
    //FIXME: I removed the ID to get rid of the squiggly line.
    mutationFn: async data => await updateOne(resource, data),
    onSettled: () => queryClient.invalidateQueries([`${projectId} DataModels`]),
  });

  const {
    mutate: deleteDataModel,
    isPending: isPendingDeleteDataModel,
    isError: isErrorDeleteDataModel,
    variables: variablesDeleteDataModel,
  } = useMutation({
    mutationFn: async id => await deleteOne(resource, id),
    onSettled: () => queryClient.invalidateQueries([`${projectId} DataModels`]),
  });

  const isPendingDataModel =
    isPendingDataModels ||
    isPendingUpdateDataModel ||
    isPendingCreateDataModel ||
    isPendingDeleteDataModel;
  const isErrorDataModel =
    isErrorDataModels ||
    isErrorUpdateDataModel ||
    isErrorCreateDataModel ||
    isErrorDeleteDataModel;
  const isFetchingDataModel = isFetchingDataModels;

  return {
    dataModels,
    isPendingDataModel,
    isErrorDataModel,
    isFetchingDataModel,
    createDataModel,
    isPendingCreateDataModel,
    isErrorCreateDataModel,
    variablesCreateDataModel,
    updateDataModel,
    isPendingUpdateDataModel,
    isErrorUpdateDataModel,
    variablesUpdateDataModel,
    deleteDataModel,
    isPendingDeleteDataModel,
    isErrorDeleteDataModel,
    variablesDeleteDataModel,
  };
}

export default useDataModel;
