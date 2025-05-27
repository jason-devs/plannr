import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { createOne, getAll, updateOne } from "../../services/apiFactory";
import PageContext from "../page/pageContext";

function useComponentSection() {
  const resource = "component-section";
  const queryClient = useQueryClient();
  const { activePage } = useContext(PageContext);
  const [activeComponentSection, setActiveComponentSection] = useState("");

  const {
    data: componentSections = [],
    isPending: isPendingComponentSections,
    isFetching: isFetchingComponentSections,
    isError: isErrorComponentSections,
  } = useQuery({
    queryKey: [`${activePage} ComponentSections`],
    queryFn: async () => await getAll(resource, { page: activePage }),
    enabled: !!activePage,
    staleTime: 60 * 1000 * 10,
  });

  const currentComponentSection = componentSections?.find(
    componentSection => componentSection._id === activeComponentSection,
  );

  const {
    mutate: createComponentSection,
    isPending: isPendingCreateComponentSection,
    isError: isErrorCreateComponentSection,
    variables: variablesCreateComponentSection,
  } = useMutation({
    mutationFn: async data => await createOne(resource, data),
    onSuccess: newComponentSection => {
      console.log({ newComponentSection });
      queryClient.invalidateQueries([`${activePage} ComponentSections`]);
      setActiveComponentSection(newComponentSection._id);
    },
  });

  const {
    mutate: updateComponentSection,
    isPending: isPendingUpdateComponentSection,
    isError: isErrorUpdateComponentSection,
    variables: variablesUpdateComponentSection,
  } = useMutation({
    mutationFn: async data =>
      await updateOne(resource, activeComponentSection, data),
    onSettled: () =>
      queryClient.invalidateQueries([`${activePage} ComponentSections`]),
  });

  const isPendingComponentSection =
    isPendingComponentSections ||
    isPendingUpdateComponentSection ||
    isPendingCreateComponentSection;
  const isErrorComponentSection =
    isErrorComponentSections ||
    isErrorUpdateComponentSection ||
    isErrorCreateComponentSection;
  const isFetchingComponentSection = isFetchingComponentSections;

  return {
    currentComponentSection,
    activeComponentSection,
    setActiveComponentSection,
    componentSections,
    isPendingComponentSection,
    isErrorComponentSection,
    isFetchingComponentSection,
    createComponentSection,
    isPendingCreateComponentSection,
    isErrorCreateComponentSection,
    variablesCreateComponentSection,
    updateComponentSection,
    isPendingUpdateComponentSection,
    isErrorUpdateComponentSection,
    variablesUpdateComponentSection,
  };
}

export default useComponentSection;
