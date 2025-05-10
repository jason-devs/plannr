import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Form from "../ui/Form";

function Dashboard() {
  const navigate = useNavigate();
  const name = useSelector(
    state => state.auth.currentUser?.name || "Finding your ass...",
  );
  const {
    isPending,
    isError,
    data: projects = [],
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await api.get("/project");
      console.log(response.data.data.docs);
      return response.data.data.docs;
    },
  });

  const { mutate: createProject } = useMutation({
    mutationKey: ["project"],
    mutationFn: body => api.post("/project", body),
    onSuccess: response => {
      const newProject = response.data.data.newDoc;
      navigate(`/project/${newProject._id}`);
    },
    onError: err => console.error(err),
  });

  function handleCreateProject(data) {
    createProject(data);
  }

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>S' fucked.</span>;
  }

  return (
    <div>
      <h2>DASHBOARD Welcome back, {name}</h2>
      <h2>Projects</h2>
      <ul className="flex-wrap gap-1">
        {projects.map(project => (
          <Link to={`/project/${project._id}`} key={project._id}>
            {project.name}
          </Link>
        ))}
      </ul>
      <Form onSubmit={handleCreateProject}>
        <Form.Label>
          <label htmlFor="name">Project Name:</label>
        </Form.Label>
        <Form.Input
          validation={{ required: true }}
          name="name"
          placeholder="Enter the new projects name..."
          id="name"
        />
        <Form.Submit>
          <input type="submit" />
        </Form.Submit>
      </Form>
    </div>
  );
}

export default Dashboard;
