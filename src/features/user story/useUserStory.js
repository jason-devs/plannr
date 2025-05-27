import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOne,
  deleteOne,
  getAll,
  updateOne,
} from "../../services/apiFactory";
import { useParams } from "react-router-dom";
import { useState } from "react";

function useUserStory() {
  const resource = "user-story";
  const queryClient = useQueryClient();
  const { pageId } = useParams();

  const [activeUserStory, setActiveUserStory] = useState(null);

  const {
    data: userStories = [],
    isPending: isPendingUserStories,
    isFetching: isFetchingUserStories,
    isError: isErrorUserStories,
  } = useQuery({
    queryKey: [`${pageId} UserStories`],
    queryFn: async () => await getAll(resource, { page: pageId }),
    enabled: !!pageId,
    staleTime: 60 * 1000 * 10,
  });

  const {
    mutate: createUserStory,
    isPending: isPendingCreateUserStory,
    isError: isErrorCreateUserStory,
    variables: variablesCreateUserStory,
  } = useMutation({
    mutationFn: async data => await createOne(resource, data),
    onSuccess: newUserStory => {
      console.log({ newUserStory });
      queryClient.invalidateQueries([`${pageId} UserStories`]);
    },
  });

  const {
    mutate: updateUserStory,
    isPending: isPendingUpdateUserStory,
    isError: isErrorUpdateUserStory,
    variables: variablesUpdateUserStory,
  } = useMutation({
    mutationFn: async data =>
      await updateOne(resource, activeUserStory._id, data),
    onSettled: () => queryClient.invalidateQueries([`${pageId} UserStories`]),
  });

  const {
    mutate: deleteUserStory,
    isPending: isPendingDeleteUserStory,
    isError: isErrorDeleteUserStory,
  } = useMutation({
    mutationFn: async id => await deleteOne(resource, id),
    onSettled: () => queryClient.invalidateQueries([`${pageId} UserStories`]),
  });

  const isPendingUserStory =
    isPendingUserStories ||
    isPendingUpdateUserStory ||
    isPendingCreateUserStory ||
    isPendingDeleteUserStory;
  const isErrorUserStory =
    isErrorUserStories ||
    isErrorUpdateUserStory ||
    isErrorCreateUserStory ||
    isErrorDeleteUserStory;
  const isFetchingUserStory = isFetchingUserStories;

  return {
    activeUserStory,
    setActiveUserStory,
    userStories,
    isPendingUserStory,
    isErrorUserStory,
    isFetchingUserStory,
    createUserStory,
    isPendingCreateUserStory,
    isErrorCreateUserStory,
    variablesCreateUserStory,
    updateUserStory,
    isPendingUpdateUserStory,
    isErrorUpdateUserStory,
    variablesUpdateUserStory,
    deleteUserStory,
    isPendingDeleteUserStory,
    isErrorDeleteUserStory,
  };
}

export default useUserStory;
