import { useState } from "react";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import DataModelNav from "./DataModelNav";

function DataModelDisplay() {
  const [dataModelMode, setDataModelMode] = useState("");

  return (
    <>
      <div className="flex w-full justify-between">
        <h2 className="text-2xl">Data Models</h2>
        <div>
          <button
            className="h-[30px] w-[30px]"
            onClick={() =>
              setDataModelMode(dataModelMode =>
                dataModelMode === "delete" ? "" : "delete",
              )
            }
          >
            <HiMinusCircle className="h-full w-full" />
          </button>
          <Modal.Toggle name="createDataModel">
            <button className="h-[30px] w-[30px]">
              <HiPlusCircle className="h-full w-full" />
            </button>
          </Modal.Toggle>
        </div>
      </div>
      <DataModelNav dataModelMode={dataModelMode} />
    </>
  );
}

export default DataModelDisplay;
