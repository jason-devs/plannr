import { NavLink } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { HiBars2 } from "react-icons/hi2";
import Tag from "../../ui/Tag";
import useBackendStack from "../backend stack/useBackendStack";
import useFrontendStack from "../frontend stack/useFrontendStack";
import { useState } from "react";

function TechNav({ techList, techMode, location }) {
  const [removeId, setRemoveId] = useState("");

  const { updateBackendStack, isPendingUpdateBackendStack } = useBackendStack();
  const { updateFrontendStack, isPendingUpdateFrontendStack } =
    useFrontendStack();

  const isPendingStack =
    isPendingUpdateBackendStack || isPendingUpdateFrontendStack;

  function handleRemoveTech(removeId) {
    setRemoveId(removeId);

    if (location === "frontend") {
      console.log({
        techList: techList.map(tech => tech._id).filter(id => id !== removeId),
      });
      updateFrontendStack({
        techList: techList.map(tech => tech._id).filter(id => id !== removeId),
      });
    }

    if (location === "backend") {
      updateBackendStack({
        techList: techList.map(tech => tech._id).filter(id => id !== removeId),
      });
    }
  }

  return (
    <nav className="flex flex-wrap gap-2">
      {techList?.map(tech => (
        <Tag key={tech._id} mode={techMode}>
          <div
            className={`flex items-center gap-2 rounded-sm border border-dashed px-2 py-1 ${isPendingStack && removeId === tech._id && "opacity-50"}`}
          >
            <NavLink to={`techs/${tech._id}`}>{tech.name}</NavLink>
            <Tag.Button>
              <button
                name="delete"
                className="h-full border-l border-dashed pl-2"
                onClick={() => handleRemoveTech(tech._id)}
                disabled={isPendingStack}
              >
                <HiX />
              </button>
              <button
                name="reorder"
                className="h-full border-l border-dashed pl-2"
              >
                <HiBars2 />
              </button>
            </Tag.Button>
          </div>
        </Tag>
      ))}
    </nav>
  );
}

export default TechNav;
