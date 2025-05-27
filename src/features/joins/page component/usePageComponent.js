import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  createOne,
  deleteOne,
  getAll,
  updateOne,
} from "../../../services/apiFactory";
import { useParams } from "react-router-dom";

function usePageComponent() {
  const resource = "page-component";
  const queryClient = useQueryClient();
  const { pageId } = useParams();
  const [activePageComponent, setActivePageComponent] = useState("");

  const {
    data: pageComponents = [],
    isPending: isPendingPageComponents,
    isFetching: isFetchingPageComponents,
    isError: isErrorPageComponents,
  } = useQuery({
    queryKey: [`${pageId} PageComponents`],
    queryFn: async () => await getAll(resource, { page: pageId }),
    enabled: !!pageId,
    staleTime: 60 * 1000 * 10,
  });

  const currentPageComponent = pageComponents?.find(
    pageComponent => pageComponent._id === activePageComponent,
  );

  const {
    mutate: createPageComponent,
    isPending: isPendingCreatePageComponent,
    isError: isErrorCreatePageComponent,
    variables: variablesCreatePageComponent,
  } = useMutation({
    mutationFn: data => createOne(resource, data),
    onSuccess: newPageComponent => {
      queryClient.invalidateQueries([`${pageId} PageComponents`]);
      setActivePageComponent(newPageComponent._id);
    },
  });

  const {
    mutate: updatePageComponent,
    isPending: isPendingUpdatePageComponent,
    isError: isErrorUpdatePageComponent,
    variables: variablesUpdatePageComponent,
  } = useMutation({
    mutationFn: async data =>
      await updateOne(resource, activePageComponent, data),
    onSettled: () =>
      queryClient.invalidateQueries([`${pageId} PageComponents`]),
  });

  const {
    mutate: deletePageComponent,
    isPending: isPendingDeletePageComponent,
    isError: isErrorDeletePageComponent,
  } = useMutation({
    mutationFn: async id => await deleteOne(resource, id),
    onSettled: () =>
      queryClient.invalidateQueries([`${pageId} PageComponents`]),
  });

  const isPendingPageComponent =
    isPendingPageComponents ||
    isPendingUpdatePageComponent ||
    isPendingCreatePageComponent ||
    isPendingDeletePageComponent;
  const isErrorPageComponent =
    isErrorPageComponents ||
    isErrorUpdatePageComponent ||
    isErrorCreatePageComponent ||
    isErrorDeletePageComponent;
  const isFetchingPageComponent = isFetchingPageComponents;

  return {
    currentPageComponent,
    activePageComponent,
    setActivePageComponent,
    pageComponents,
    isPendingPageComponent,
    isErrorPageComponent,
    isFetchingPageComponent,
    createPageComponent,
    isPendingCreatePageComponent,
    isErrorCreatePageComponent,
    variablesCreatePageComponent,
    updatePageComponent,
    isPendingUpdatePageComponent,
    isErrorUpdatePageComponent,
    variablesUpdatePageComponent,
    deletePageComponent,
    isPendingDeletePageComponent,
    isErrorDeletePageComponent,
  };
}

export default usePageComponent;
