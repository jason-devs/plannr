import { useState } from "react";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ResourceNav from "./ResourceNav";

function ResourceDisplay() {
  const [resourceMode, setResourceMode] = useState("");

  return (
    <>
      <div className="flex w-full justify-between">
        <h2 className="text-2xl">Resources</h2>
        <div>
          <button
            className="h-[30px] w-[30px]"
            onClick={() =>
              setResourceMode(resourceMode =>
                resourceMode === "delete" ? "" : "delete",
              )
            }
          >
            <HiMinusCircle className="h-full w-full" />
          </button>
          <Modal.Toggle name="createResource">
            <button className="h-[30px] w-[30px]">
              <HiPlusCircle className="h-full w-full" />
            </button>
          </Modal.Toggle>
        </div>
      </div>
      <ResourceNav resourceMode={resourceMode} />
    </>
  );
}

export default ResourceDisplay;
