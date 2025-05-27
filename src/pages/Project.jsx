import TextareaAutosize from "react-textarea-autosize";
import { HiPlusCircle } from "react-icons/hi2";
import Modal from "../ui/Modal";
import ProjectForm from "../features/project/ProjectForm";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiRefresh } from "react-icons/hi";
import UpdateTextArea from "../ui/UpdateTextArea";
import PageForm from "../features/page/PageForm";
import ComponentForm from "../features/component/ComponentForm";
import useFrontendStack from "../features/frontend stack/useFrontendStack";
import useTechs from "../features/tech/useTech";
import FrontendStackContext from "../features/frontend stack/frontendStackContext";
import FrontendStackForm from "../features/frontend stack/FrontendStackForm";
import FrontendDisplay from "../features/frontend/FrontendDisplay";
import BackendDisplay from "../features/backend/BackendDisplay";
import useBackendStack from "../features/backend stack/useBackendStack";
import BackendStackContext from "../features/backend stack/backendStackContext";
import BackendStackForm from "../features/backend stack/BackendStackForm";
import ResourceForm from "../features/resource/ResourceForm";
import DataModelForm from "../features/data models/DataModelForm";
import useProject from "../features/project/useProject";

function Project() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  const {
    currentProject,
    projects,
    isPendingProject,
    isFetchingProject,
    isErrorCreateProject,
    variablesCreateProject,
    updateProject,
    isPendingUpdateProject,
    isErrorUpdateProject,
    variablesUpdateProject,
  } = useProject();
  const { currentFrontendStack, updateFrontendStack } = useFrontendStack();
  const { currentBackendStack, updateBackendStack } = useBackendStack();
  const { techs } = useTechs();

  const [editedDescription, setEditedDescription] = useState(null);

  function handleUpdateDescription() {
    updateProject({ description: editedDescription });
  }

  function handleChangeHash() {
    if (!hash) return;
    if (hash === "#front-end") navigate("#back-end", { replace: true });
    if (hash === "#back-end") navigate("#front-end", { replace: true });
  }

  return (
    <Modal>
      <Modal.Overlay />
      <div className="flex flex-col items-start gap-3">
        <div className="relative flex w-full items-center overflow-x-hidden">
          <nav className="no-scrollbar text-1xl flex w-full gap-5 overflow-x-scroll overflow-y-hidden text-nowrap">
            {projects?.map(project => (
              <NavLink
                key={project._id}
                className="rounded-sm border px-2 py-0.5 [&.active]:bg-black [&.active]:text-white"
                to={`/dashboard/project/${project._id}#front-end`}
              >
                {project.name}
              </NavLink>
            ))}
            <label htmlFor="createProject" className="border-l pr-[40px] pl-3">
              Add new &rarr;
            </label>
          </nav>
          {isErrorCreateProject && (
            <span className="text-red-700">
              {`
              Something went wrong creating ${variablesCreateProject?.name || "this project"}. Please try again
              later.`}
            </span>
          )}
          <Modal.Toggle name="createProject">
            <button
              className="absolute left-full aspect-square h-full -translate-x-full border bg-white"
              id="createProject"
            >
              <HiPlusCircle className="h-full w-full fill-black stroke-white" />
            </button>
          </Modal.Toggle>
        </div>
        <h2 className="mx-auto text-4xl">{currentProject?.name}</h2>
        <UpdateTextArea
          initialValue={currentProject?.description || ""}
          onBlur={handleUpdateDescription}
          isFetching={isFetchingProject}
          isPending={isPendingProject}
          isPendingUpdate={isPendingUpdateProject}
          variables={variablesUpdateProject?.description}
          editText={editedDescription}
          setEditText={setEditedDescription}
        >
          <UpdateTextArea.Input>
            <TextareaAutosize
              placeholder="Add a description here..."
              className="field-sizing-content w-full resize-none"
              rows="2"
              disabled={isPendingProject}
            />
          </UpdateTextArea.Input>
        </UpdateTextArea>
        {isErrorUpdateProject && (
          <span className="text-red-700">
            Something went wrong updating this. Please try again.
          </span>
        )}
        <button
          className="flex items-center gap-1 rounded-sm bg-black px-2 py-1 text-white"
          onClick={handleChangeHash}
        >
          {hash === "#front-end" ? "Front End" : "Back End"} <HiRefresh />
        </button>
        {hash === "#front-end" ? (
          <FrontendStackContext.Provider value={{ currentFrontendStack }}>
            <FrontendDisplay />
          </FrontendStackContext.Provider>
        ) : (
          <BackendStackContext.Provider value={{ currentBackendStack }}>
            <BackendDisplay />
          </BackendStackContext.Provider>
        )}
      </div>
      <Modal.Content name="createProject">
        <ProjectForm />
      </Modal.Content>
      <Modal.Content name="createPage">
        <PageForm />
      </Modal.Content>
      <Modal.Content name="createComponent">
        <ComponentForm />
      </Modal.Content>
      <Modal.Content name="createResource">
        <ResourceForm />
      </Modal.Content>
      <Modal.Content name="createDataModel">
        <DataModelForm />
      </Modal.Content>
      <Modal.Content name="addFrontendTech">
        <FrontendStackContext.Provider
          value={{ currentFrontendStack, updateFrontendStack, techs }}
        >
          <FrontendStackForm />
        </FrontendStackContext.Provider>
      </Modal.Content>
      <Modal.Content name="addBackendTech">
        <BackendStackContext.Provider
          value={{ currentBackendStack, updateBackendStack, techs }}
        >
          <BackendStackForm />
        </BackendStackContext.Provider>
      </Modal.Content>
    </Modal>
  );
}

export default Project;
