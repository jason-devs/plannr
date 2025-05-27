import { HiEllipsisVertical, HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Menu from "../../ui/Menu";

function UserStoryCard({ userStory, setCurrentUserStory }) {
  const { name: roleName } = userStory.role;

  return (
    <div className="grid grid-cols-[1fr_10%]">
      <div className="rounded-xs border-l-4 pl-2 text-xs">
        <span>{`As ${roleName === "Admin" ? "an" : "a"}`}</span>
        <span className="font-bold uppercase">{` ${roleName} `}</span>
        <span>{`I want to `}</span>
        <span>
          {userStory.story[0].toLowerCase() + userStory.story.slice(1)}
        </span>
      </div>
      <div className="flex items-center">
        <Menu>
          <Menu.Toggle onToggle={() => setCurrentUserStory(userStory)}>
            <button className="aspect-square w-full rounded-full">
              <HiEllipsisVertical className="m-auto" />
            </button>
          </Menu.Toggle>
          <Menu.Window>
            <div className="absolute flex translate-y-full bg-blue-950 p-1">
              <Menu.Item>
                <Modal.Toggle name="editUserStory">
                  <button>
                    <HiPencil />
                  </button>
                </Modal.Toggle>
              </Menu.Item>
              <Menu.Item closeOnClick={true}>
                <Modal.Toggle name="deleteUserStory">
                  <button>
                    <HiTrash />
                  </button>
                </Modal.Toggle>
              </Menu.Item>
            </div>
          </Menu.Window>
        </Menu>
      </div>
    </div>
  );
}

export default UserStoryCard;
