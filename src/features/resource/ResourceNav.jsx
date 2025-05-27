import { NavLink } from "react-router-dom";
import useResource from "./useResource";
import Tag from "../../ui/Tag";
import { HiX } from "react-icons/hi";
import { HiBars2 } from "react-icons/hi2";

function ResourceNav({ resourceMode }) {
  const {
    resources,
    deleteResource,
    isPendingDeleteResource,
    variablesDeleteResource,
  } = useResource();

  function handleDeleteResource(id) {
    deleteResource(id);
  }

  return (
    <nav className="flex flex-wrap gap-3">
      {resources?.map(resource => (
        <Tag key={resource._id} mode={resourceMode}>
          <div
            className={`flex items-center gap-2 rounded-sm border border-dashed px-2 py-1 ${isPendingDeleteResource && variablesDeleteResource === resource._id && "opacity-50"}`}
          >
            <NavLink to={`resource/${resource._id}`}>{resource.name}</NavLink>
            <Tag.Button>
              <button
                name="delete"
                className="h-full border-l border-dashed pl-2"
                onClick={() => handleDeleteResource(resource._id)}
                disabled={isPendingDeleteResource}
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

export default ResourceNav;
