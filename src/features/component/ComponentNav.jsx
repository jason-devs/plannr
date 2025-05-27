import { NavLink } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { HiBars2 } from "react-icons/hi2";
import useComponent from "./useComponent";
import Tag from "../../ui/Tag";

function ComponentNav({ componentMode }) {
  const {
    components,
    deleteComponent,
    isPendingDeleteComponent,
    variablesDeleteComponent,
  } = useComponent();

  function handleDeleteComponent(id) {
    deleteComponent(id);
  }

  return (
    <nav className="flex flex-wrap gap-3">
      {components?.map(component => (
        <Tag key={component._id} mode={componentMode}>
          <div
            className={`flex items-center gap-2 rounded-sm border border-dashed px-2 py-1 ${isPendingDeleteComponent && variablesDeleteComponent === component._id && "opacity-50"}`}
          >
            <NavLink to={`component/${component._id}`}>
              {component.name}
            </NavLink>
            <Tag.Button>
              <button
                name="delete"
                className="h-full border-l border-dashed pl-2"
                onClick={() => handleDeleteComponent(component._id)}
                disabled={isPendingDeleteComponent}
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

export default ComponentNav;
