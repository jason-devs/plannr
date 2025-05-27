import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createOne, getAll, updateOne } from "../../services/apiFactory";

function useRole() {
  const resource = "role";
  const queryClient = useQueryClient();
  const [activeRole, setActiveRole] = useState("");

  const {
    data: roles = [],
    isPending: isPendingRoles,
    isFetching: isFetchingRoles,
    isError: isErrorRoles,
  } = useQuery({
    queryKey: [`roles`],
    queryFn: async () => await getAll(resource, {}),
    staleTime: 60 * 1000 * 10,
  });

  const currentRole = roles?.find(role => role._id === activeRole);

  const {
    mutate: createRole,
    isPending: isPendingCreateRole,
    isError: isErrorCreateRole,
    variables: variablesCreateRole,
  } = useMutation({
    mutationFn: async data => await createOne(resource, data),
    onSuccess: newRole => {
      console.log({ newRole });
      queryClient.invalidateQueries([`roles`]);
      setActiveRole(newRole._id);
    },
  });

  const {
    mutate: updateRole,
    isPending: isPendingUpdateRole,
    isError: isErrorUpdateRole,
    variables: variablesUpdateRole,
  } = useMutation({
    mutationFn: async data => await updateOne(resource, activeRole, data),
    onSettled: () => queryClient.invalidateQueries([`roles`]),
  });

  const isPendingRole =
    isPendingRoles || isPendingUpdateRole || isPendingCreateRole;
  const isErrorRole = isErrorRoles || isErrorUpdateRole || isErrorCreateRole;
  const isFetchingRole = isFetchingRoles;

  return {
    currentRole,
    activeRole,
    setActiveRole,
    roles,
    isPendingRole,
    isErrorRole,
    isFetchingRole,
    createRole,
    isPendingCreateRole,
    isErrorCreateRole,
    variablesCreateRole,
    updateRole,
    isPendingUpdateRole,
    isErrorUpdateRole,
    variablesUpdateRole,
  };
}

export default useRole;
