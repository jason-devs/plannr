import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Form from "../ui/Form";

function Pages() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const {
    isPending: isPendingPages,
    isError: isErrorPages,
    data: pages = [],
  } = useQuery({
    queryFn: async () => {
      const response = await api.get(`/page?project=${projectId}`);
      return response.data.data.docs;
    },
    queryKey: ["pagePages"],
  });

  const { mutate: createPage } = useMutation({
    mutationFn: async body => {
      await api.post(`/page`, { ...body, project: projectId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pagePages"]);
    },
  });

  function handleCreatePage(data) {
    createPage(data);
  }

  if (isPendingPages) return <span>Loading...</span>;
  if (isErrorPages) return <span>It's FUUUUUCKED!</span>;

  return (
    <div>
      <h2>PAGES</h2>
      <ul>
        {pages.map(page => (
          <span key={page._id}>{page.name}</span>
        ))}
      </ul>
      <Form onSubmit={handleCreatePage}>
        <Form.Label>
          <label htmlFor="name">Page Name:</label>
        </Form.Label>
        <Form.Input
          validation={{ required: true }}
          name="name"
          id="name"
          placeholder="Enter name here..."
        />
        <Form.Submit>
          <input type="submit" />
        </Form.Submit>
      </Form>
    </div>
  );
}

export default Pages;
