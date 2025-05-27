import { NavLink } from "react-router-dom";
import useDataModel from "./useDataModel";
import Tag from "../../ui/Tag";
import { HiX } from "react-icons/hi";
import { HiBars2 } from "react-icons/hi2";

function DataModelNav({ dataModelMode }) {
  const {
    dataModels,
    deleteDataModel,
    isPendingDeleteDataModel,
    variablesDeleteDataModel,
  } = useDataModel();

  function handleDeleteDataModel(id) {
    deleteDataModel(id);
  }

  return (
    <nav className="flex flex-wrap gap-3">
      {dataModels?.map(dataModel => (
        <Tag key={dataModel._id} mode={dataModelMode}>
          <div
            className={`flex items-center gap-2 rounded-sm border border-dashed px-2 py-1 ${isPendingDeleteDataModel && variablesDeleteDataModel === dataModel._id && "opacity-50"}`}
          >
            <NavLink to={`data-model/${dataModel._id}`}>
              {dataModel.name}
            </NavLink>
            <Tag.Button>
              <button
                name="delete"
                className="h-full border-l border-dashed pl-2"
                onClick={() => handleDeleteDataModel(dataModel._id)}
                disabled={isPendingDeleteDataModel}
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

export default DataModelNav;
