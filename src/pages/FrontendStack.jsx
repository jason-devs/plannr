import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { useParams } from "react-router-dom";

function FrontendStack() {
  const queryClient = useQueryClient();
  const { frontendStackId } = useParams();

  const {
    isPending: isPendingFrontendStack,
    isError: isErrorFrontendStack,
    data: frontendStack = {},
  } = useQuery({
    queryKey: ["frontendStack"],
    queryFn: async () => {
      const response = await api.get(`/frontend-stack/${frontendStackId}`);
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
      await api.patch(`/frontend-stack/${frontendStackId}`, {
        techList: [...frontendStack.techList, techId],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["frontendStack"]);
    },
  });

  const { mutate: removeTech } = useMutation({
    mutationFn: async techId => {
      await api.patch(`/frontend-stack/${frontendStackId}`, {
        techList: [...frontendStack.techList].filter(
          tech => tech._id !== techId,
        ),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["frontendStack"]);
    },
  });

  function handleAddTech(techId) {
    addTech(techId);
  }

  function handleRemoveTech(techId) {
    removeTech(techId);
  }

  if (isPendingFrontendStack || isPendingTechs) return <span>Loading...</span>;
  if (isErrorFrontendStack || isErrorTechs)
    return <span>S' FUUUCCCCKKEEDD</span>;

  return (
    <div>
      <h2>FRONTEND STACK</h2>
      <ul className="flex gap-1">
        {frontendStack.techList.map(tech => (
          <span key={tech._id}>{tech.name}</span>
        ))}
      </ul>
      <h2>TECHS</h2>
      <ul className="flex gap-1">
        {techs.map(tech => (
          <button
            key={tech._id}
            onClick={
              frontendStack.techList.map(tech => tech._id).includes(tech._id)
                ? () => handleRemoveTech(tech._id)
                : () => handleAddTech(tech._id)
            }
          >
            {tech.name}
            {frontendStack.techList.map(tech => tech._id).includes(tech._id)
              ? "-"
              : "+"}
          </button>
        ))}
      </ul>
    </div>
  );
}

export default FrontendStack;
