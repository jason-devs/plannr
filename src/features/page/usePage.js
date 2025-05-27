import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  createOne,
  deleteOne,
  getAll,
  updateOne,
} from "../../services/apiFactory";
import { useParams } from "react-router-dom";

function usePage() {
  const resource = "page";
  const queryClient = useQueryClient();
  const { projectId } = useParams();
  const [activePage, setActivePage] = useState("");

  const {
    data: pages = [],
    isPending: isPendingPages,
    isFetching: isFetchingPages,
    isError: isErrorPages,
  } = useQuery({
    queryKey: [`${projectId} Pages`],
    queryFn: async () => await getAll(resource, { project: projectId }),
    enabled: !!projectId,
    staleTime: 60 * 1000 * 10,
  });

  const currentPage = pages?.find(page => page._id === activePage);

  const {
    mutate: createPage,
    isPending: isPendingCreatePage,
    isError: isErrorCreatePage,
    variables: variablesCreatePage,
  } = useMutation({
    mutationFn: async data => await createOne(resource, data),
    onSuccess: newPage => {
      console.log({ newPage });
      queryClient.invalidateQueries([`${projectId} Pages`]);
      setActivePage(newPage._id);
    },
  });

  const {
    mutate: updatePage,
    isPending: isPendingUpdatePage,
    isError: isErrorUpdatePage,
    variables: variablesUpdatePage,
  } = useMutation({
    mutationFn: async data => await updateOne(resource, activePage, data),
    onSettled: () => queryClient.invalidateQueries([`${projectId} Pages`]),
  });

  const {
    mutate: deletePage,
    isPending: isPendingDeletePage,
    isError: isErrorDeletePage,
    variables: variablesDeletePage,
  } = useMutation({
    mutationFn: async id => await deleteOne(resource, id),
    onSettled: () => queryClient.invalidateQueries([`${projectId} Pages`]),
  });

  const isPendingPage =
    isPendingPages ||
    isPendingUpdatePage ||
    isPendingCreatePage ||
    isPendingDeletePage;
  const isErrorPage =
    isErrorPages || isErrorUpdatePage || isErrorCreatePage || isErrorDeletePage;
  const isFetchingPage = isFetchingPages;

  return {
    currentPage,
    activePage,
    setActivePage,
    pages,
    isPendingPage,
    isErrorPage,
    isFetchingPage,
    createPage,
    isPendingCreatePage,
    isErrorCreatePage,
    variablesCreatePage,
    updatePage,
    isPendingUpdatePage,
    isErrorUpdatePage,
    variablesUpdatePage,
    deletePage,
    isPendingDeletePage,
    isErrorDeletePage,
    variablesDeletePage,
  };
}

export default usePage;
