import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

function useTechs() {
  const {
    data: techs = [],
    isPending: isPendingTechs,
    isError: isErrorTechs,
  } = useQuery({
    queryKey: ["Techs"],
    queryFn: async () => {
      const response = await api.get(`tech`);
      return response.data.data.docs;
    },
  });

  const isPendingTech = isPendingTechs;
  const isErrorTech = isErrorTechs;

  return {
    techs,
    isPendingTech,
    isErrorTech,
  };
}

export default useTechs;
