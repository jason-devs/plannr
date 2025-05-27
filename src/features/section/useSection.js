import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createOne, getAll, updateOne } from "../../services/apiFactory";
import { useParams } from "react-router-dom";

function useSection() {
  const resource = "section";
  const queryClient = useQueryClient();
  const { pageId } = useParams();
  const [activeSection, setActiveSection] = useState("");

  const {
    data: sections = [],
    isPending: isPendingSections,
    isFetching: isFetchingSections,
    isError: isErrorSections,
  } = useQuery({
    queryKey: [`${pageId} Sections`],
    queryFn: async () => await getAll(resource, { page: pageId }),
    enabled: !!pageId,
    staleTime: 60 * 1000 * 10,
  });

  const currentSection = sections?.find(
    section => section._id === activeSection,
  );

  const {
    mutate: createSection,
    isPending: isPendingCreateSection,
    isError: isErrorCreateSection,
    variables: variablesCreateSection,
  } = useMutation({
    mutationFn: async data => await createOne(resource, data),
    onSuccess: newSection => {
      console.log({ newSection });
      queryClient.invalidateQueries([`${pageId} Sections`]);
      setActiveSection(newSection._id);
    },
  });

  const {
    mutate: updateSection,
    isPending: isPendingUpdateSection,
    isError: isErrorUpdateSection,
    variables: variablesUpdateSection,
  } = useMutation({
    mutationFn: async data => await updateOne(resource, activeSection, data),
    onSettled: () => queryClient.invalidateQueries([`${pageId} Sections`]),
  });

  const isPendingSection =
    isPendingSections || isPendingUpdateSection || isPendingCreateSection;
  const isErrorSection =
    isErrorSections || isErrorUpdateSection || isErrorCreateSection;
  const isFetchingSection = isFetchingSections;

  return {
    currentSection,
    activeSection,
    setActiveSection,
    sections,
    isPendingSection,
    isErrorSection,
    isFetchingSection,
    createSection,
    isPendingCreateSection,
    isErrorCreateSection,
    variablesCreateSection,
    updateSection,
    isPendingUpdateSection,
    isErrorUpdateSection,
    variablesUpdateSection,
  };
}

export default useSection;
