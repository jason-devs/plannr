import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { useParams } from "react-router-dom";

function Project() {
  const { projectId } = useParams();
  const {
    isPending,
    isError,
    data: project = {},
  } = useQuery({
    queryKey: ["project"],
    queryFn: async () => {
      const response = await api.get(`/project/${projectId}`);
      return response.data.data.doc;
    },
  });

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>S' FUUUCKED</span>;

  return (
    <div>
      <h2>PROJECT PAGE</h2>
      <h2>{project.name}</h2>
    </div>
  );
}

export default Project;
