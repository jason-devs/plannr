import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { createOne, getAll, updateOne } from "../../services/apiFactory";
import { useParams } from "react-router-dom";

function useProject() {
  const resource = "project";
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { projectId } = useParams();

  const {
    data: projects = [],
    isPending: isPendingProjects,
    isFetching: isFetchingProjects,
    isError: isErrorProjects,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => await getAll(resource, {}),
  });

  const currentProject = projects.find(
    project => project?._id === projectId || null,
  );

  const {
    mutate: createProject,
    isPending: isPendingCreateProject,
    isError: isErrorCreateProject,
    variables: variablesCreateProject,
  } = useMutation({
    mutationKey: [`Create ${currentProject?.name} Project`],
    mutationFn: async data => await createOne(resource, data),
    onSuccess: () => {
      queryClient.invalidateQueries([`projects`]);
    },
  });

  const {
    mutate: updateProject,
    isPending: isPendingUpdateProject,
    isError: isErrorUpdateProject,
    variables: variablesUpdateProject,
  } = useMutation({
    mutationFn: async data => await updateOne(resource, projectId, data),
    onSettled: () => queryClient.invalidateQueries([`projects`]),
  });

  const isPendingProject =
    isPendingProjects || isPendingUpdateProject || isPendingCreateProject;
  const isErrorProject =
    isErrorProjects || isErrorUpdateProject || isErrorCreateProject;
  const isFetchingProject = isFetchingProjects;

  return {
    projectId,
    currentProject,
    projects,
    isPendingProject,
    isErrorProject,
    isFetchingProject,
    createProject,
    isPendingCreateProject,
    isErrorCreateProject,
    variablesCreateProject,
    updateProject,
    isPendingUpdateProject,
    isErrorUpdateProject,
    variablesUpdateProject,
    dispatch,
  };
}

export default useProject;
