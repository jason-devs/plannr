import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { useParams } from "react-router-dom";

function BackendStack() {
  const queryClient = useQueryClient();
  const { backendStackId } = useParams();

  const {
    isPending: isPendingbackendStack,
    isError: isErrorbackendStack,
    data: backendStack = {},
  } = useQuery({
    queryKey: ["backendStack"],
    queryFn: async () => {
      const response = await api.get(`/backend-stack/${backendStackId}`);
      return response.data.data.doc;
    },
  });

  const {
    isPending: isPendingTechs,
    isError: isErrorTechs,
    data: techs = [],
  } = useQuery({
    queryKey: ["techs"],
    queryFn: async () => {
      const response = await api.get(`/tech`);
      return response.data.data.docs;
    },
  });

  const { mutate: addTech } = useMutation({
    mutationFn: async techId =>
      await api.patch(`/backend-stack/${backendStackId}`, {
        techList: [...backendStack.techList, techId],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["backendStack"]);
    },
  });

  const { mutate: removeTech } = useMutation({
    mutationFn: async techId => {
      await api.patch(`/backend-stack/${backendStackId}`, {
        techList: [...backendStack.techList].filter(
          tech => tech._id !== techId,
        ),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["backendStack"]);
    },
  });

  function handleAddTech(techId) {
    addTech(techId);
  }

  function handleRemoveTech(techId) {
    removeTech(techId);
  }

  if (isPendingbackendStack || isPendingTechs) return <span>Loading...</span>;
  if (isErrorbackendStack || isErrorTechs)
    return <span>S' FUUUCCCCKKEEDD</span>;

  return (
    <div>
      <h2>BACKEND STACK</h2>
      <ul className="flex gap-1">
        {backendStack.techList.map(tech => (
          <span key={tech._id}>{tech.name}</span>
        ))}
      </ul>
      <h2>TECHS</h2>
      <ul className="flex gap-1">
        {techs.map(tech => (
          <button
            key={tech._id}
            onClick={
              backendStack.techList.map(tech => tech._id).includes(tech._id)
                ? () => handleRemoveTech(tech._id)
                : () => handleAddTech(tech._id)
            }
          >
            {tech.name}
            {backendStack.techList.map(tech => tech._id).includes(tech._id)
              ? "-"
              : "+"}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default BackendStack;
