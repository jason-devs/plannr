import { useQueries } from "@tanstack/react-query";
import api from "../services/api";
import { Link, useParams } from "react-router-dom";

function Project() {
  const { projectId } = useParams();
  const queries = useQueries({
    queries: [
      {
        queryKey: ["project", projectId],
        queryFn: async () => {
          const response = await api.get(`/project/${projectId}`);
          return response.data.data.doc;
        },
      },
      {
        queryKey: ["pages", projectId],
        queryFn: async () => {
          const response = await api.get(`/page?project=${projectId}`);
          return response.data.data.docs;
        },
      },
      {
        queryKey: ["components", projectId],
        queryFn: async () => {
          const response = await api.get(`/component?project=${projectId}`);
          return response.data.data.docs;
        },
      },
      {
        queryKey: ["dataModels", projectId],
        queryFn: async () => {
          const response = await api.get(`/data-model?project=${projectId}`);
          return response.data.data.docs;
        },
      },
      {
        queryKey: ["frontendStack", projectId],
        queryFn: async () => {
          const response = await api.get(
            `/frontend-stack?project=${projectId}`,
          );
          return response.data.data.docs;
        },
      },
      {
        queryKey: ["backendStack", projectId],
        queryFn: async () => {
          const response = await api.get(`/backend-stack?project=${projectId}`);
          return response.data.data.docs;
        },
      },
    ],
  });

  const [
    { data: project = {} },
    { data: pages = [] },
    { data: components = [] },
    { data: dataModels = [] },
    { data: frontendStack = {} },
    { data: backendStack = {} },
  ] = queries;

  const isLoading = queries.some(query => query.isPending);
  const isError = queries.some(query => query.isError);

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>S' FUUUCKED</span>;

  return (
    <div>
      <h2>PROJECT PAGE</h2>
      <h2>{project.name}</h2>
      <h2>FRONT END</h2>
      <h2>
        <Link to={`/frontend-stack/${frontendStack[0]._id}`}>TECH STACK</Link> -
        {frontendStack[0]?.techList.length}
      </h2>
      <h2>
        <Link to={`/project/${project._id}/pages`}>PAGES</Link> - {pages.length}
      </h2>
      <ul className="flex gap-1">
        {pages.map(page => (
          <span key={page._id}>{page.name}</span>
        ))}
      </ul>
      <h2>COMPONENTS - {components.length}</h2>
      <ul className="flex gap-1">
        {components.map(component => (
          <span key={component._id}>{component.name}</span>
        ))}
      </ul>
      <h2>BACK END</h2>
      <h2>
        <Link to={`/backend-stack/${backendStack[0]._id}`}>TECH STACK</Link> -
        {backendStack[0]?.techList.length}
      </h2>
      <h2>DATA MODELS - {dataModels.length}</h2>
      <ul className="flex gap-1">
        {dataModels.map(dataModel => (
          <span key={dataModel._id}>{dataModel.name}</span>
        ))}
      </ul>
    </div>
  );
}

export default Project;
