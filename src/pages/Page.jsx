import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { HiPlusCircle } from "react-icons/hi2";
import useRole from "../features/role/useRole";
import useSection from "../features/section/useSection";
import useUserStory from "../features/user story/useUserStory";
import usePageComponent from "../features/joins/page component/usePageComponent";
import UserStoryCard from "../features/user story/userStoryCard";
import UserStoryForm from "../features/user story/UserStoryForm";
import Modal from "../ui/Modal";
import RoleContext from "../features/role/roleContext";
import useComponent from "../features/component/useComponent";
import PageComponentContext from "../features/joins/page component/pageComponentContext";
import PageComponentForm from "../features/joins/page component/PageComponentForm";
import PageComponentCard from "../features/joins/page component/PageComponentCard";
import UserStoryContext from "../features/user story/userStoryContext";
import EditUserStoryForm from "../features/user story/EditUserStoryForm";

function Page() {
  const { projectId, pageId } = useParams();
  const queryClient = useQueryClient();

  const pages = queryClient.getQueryData([`${projectId} Pages`]);

  const { roles } = useRole();
  const { sections } = useSection();
  const {
    activeUserStory,
    setActiveUserStory,
    userStories,
    isPendingUserStory,
    isFetchingUserStory,
    updateUserStory,
    isPendingUpdateUserStory,
    variablesUpdateUserStory,
    deleteUserStory,
  } = useUserStory();
  const { pageComponents } = usePageComponent();
  const { components } = useComponent();

  const pageComponentIds = pageComponents.map(
    pageComponent => pageComponent.component._id,
  );

  const filteredComponents = components.reduce((acc, component) => {
    acc = pageComponentIds.includes(component._id)
      ? [...acc]
      : [...acc, component];
    return acc;
  }, []);

  const currentPage = pages?.find(page => page._id === pageId);

  function handleDeleteUserStory() {
    deleteUserStory(activeUserStory._id);
  }

  return (
    <>
      <Modal>
        <Modal.Overlay />
        <div className="flex w-full flex-col gap-3">
          <h2 className="mx-auto text-4xl">{currentPage?.name}</h2>
          <p>{currentPage?.description}</p>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Components</h2>
            <Modal.Toggle name="createPageComponent">
              <button className="h-[32px] w-[30px]">
                <HiPlusCircle className="h-full w-full" />
              </button>
            </Modal.Toggle>
          </div>
          <ul className="flex flex-wrap gap-3">
            {pageComponents?.map(pageComponent => (
              <li key={pageComponent._id}>
                <PageComponentCard
                  pageComponent={pageComponent}
                  origin="component"
                />
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">User Stories</h2>
            <Modal.Toggle name="createUserStory">
              <button className="h-[30px] w-[30px]">
                <HiPlusCircle className="h-full w-full" />
              </button>
            </Modal.Toggle>
          </div>
          <ul className="flex flex-col gap-5">
            {userStories?.map(userStory => (
              <li key={userStory._id}>
                <UserStoryCard
                  userStory={userStory}
                  setCurrentUserStory={setActiveUserStory}
                />
              </li>
            ))}
          </ul>
          <h2 className="text-2xl">Sections</h2>
          {sections?.map(section => (
            <span key={section._id}>{section.name}</span>
          ))}
        </div>
        <Modal.Content name="createUserStory">
          <RoleContext.Provider value={{ roles }}>
            <UserStoryForm />
          </RoleContext.Provider>
        </Modal.Content>
        <Modal.Content name="createPageComponent">
          <PageComponentContext.Provider value={{ filteredComponents }}>
            <PageComponentForm />
          </PageComponentContext.Provider>
        </Modal.Content>
        <Modal.Content name="editUserStory">
          <RoleContext.Provider value={{ roles }}>
            <UserStoryContext.Provider
              value={{
                updateUserStory,
                isPendingUserStory,
                isFetchingUserStory,
                isPendingUpdateUserStory,
                variablesUpdateUserStory,
              }}
            >
              <EditUserStoryForm userStory={activeUserStory} />
            </UserStoryContext.Provider>
          </RoleContext.Provider>
        </Modal.Content>
        <Modal.Content name="deleteUserStory">
          <div>
            <p>Are you sure you want to delete this User Story?</p>
            <div className="flex w-full justify-between">
              <button>Cancel</button>
              <button onClick={handleDeleteUserStory}>Delete</button>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default Page;
