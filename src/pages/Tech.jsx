import { useQueryClient } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import Modal from "../ui/Modal";
import Form from "../ui/Form";
import useFrontendStack from "../features/frontend stack/useFrontendStack";
import useBackendStack from "../features/backend stack/useBackendStack";

function Tech() {
  const queryClient = useQueryClient();
  const { techId, projectId } = useParams();
  const { updateFrontendStack } = useFrontendStack();
  const { updateBackendStack } = useBackendStack();

  const projects = queryClient.getQueryData(["projects"]);
  const project = projects.find(project => project._id === projectId);
  const tech = queryClient
    .getQueryData(["Techs"])
    .find(tech => tech._id === techId);

  const frontend = queryClient
    .getQueryData([`Frontend Stacks`])
    .find(frontendStack => frontendStack.project === projectId);
  const backend = queryClient
    .getQueryData([`Backend Stacks`])
    .find(backendStack => backendStack.project === projectId);

  const inFrontend = Boolean(
    frontend?.techList.find(tech => tech._id === techId),
  );
  const inBackend = Boolean(
    backend?.techList.find(tech => tech._id === techId),
  );

  function handleUpdateTechLists(data) {
    if (data.frontend) {
      const newSet = new Set([
        ...frontend.techList.map(tech => tech._id),
        techId,
      ]);

      const newList = [...newSet];

      updateFrontendStack({ techList: newList });
    }

    if (data.backend) {
      const newSet = new Set([
        ...backend.techList.map(tech => tech._id),
        techId,
      ]);

      const newList = [...newSet];

      updateBackendStack({ techList: newList });
    }

    if (!data.frontend) {
      const newList = frontend.techList
        .map(tech => tech._id)
        .filter(id => id !== techId);

      updateFrontendStack({ techList: newList });
    }

    if (!data.backend) {
      const newList = backend.techList
        .map(tech => tech._id)
        .filter(id => id !== techId);

      updateBackendStack({ techList: newList });
    }
  }

  return (
    <Modal>
      <Modal.Overlay />
      <div className="flex flex-col gap-3">
        <NavLink to={-1}>&larr; Back to Techs</NavLink>
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold">{tech.name}</h2>
          <Modal.Toggle name="addTech">
            <button className="rounded-sm bg-black px-2 py-1 text-white">
              Use
            </button>
          </Modal.Toggle>
        </div>
        <p>Field: {tech.field}</p>
        <p>Version: {tech.currentVersion}</p>
        <p>{tech.description}</p>
        <p>Open Source: {tech.openSource ? "👍" : "👎"}</p>
        <h3>Pros:</h3>
        <ul className="list-inside list-disc">
          {tech?.pros?.map(pro => (
            <li key={pro}>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
        <h3>Cons:</h3>
        <ul className="list-inside list-disc">
          {tech?.cons?.map(con => (
            <li key={con}>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
      <Modal.Content name="addTech">
        <Form className="flex flex-col gap-2" onSubmit={handleUpdateTechLists}>
          <h3>Use in {project.name}</h3>
          <div className="flex w-full justify-between">
            <Form.Label>
              <label htmlFor="frontend">Frontend:</label>
            </Form.Label>
            <Form.Input
              validation={{}}
              name="frontend"
              type="checkbox"
              id="frontend"
              defaultChecked={inFrontend}
            />
            {/* <input type="checkbox" id="frontend" defaultChecked={inFrontend} value="frontend"/> */}
          </div>
          <div className="flex w-full justify-between">
            <Form.Label>
              <label htmlFor="backend">Backend:</label>
            </Form.Label>
            <Form.Input
              validation={{}}
              name="backend"
              type="checkbox"
              id="backend"
              defaultChecked={inBackend}
            />
            {/* <input type="checkbox" id="backend" defaultChecked={inBackend} value="backend"/> */}
          </div>
          <Form.Submit>
            <input type="submit" />
          </Form.Submit>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default Tech;
