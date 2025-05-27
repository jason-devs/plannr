import { useState } from "react";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ComponentNav from "./ComponentNav";

function ComponentDisplay() {
  const [componentMode, setComponentMode] = useState("");

  return (
    <>
      <div className="flex w-full justify-between">
        <h2 className="text-2xl">Components</h2>
        <div>
          <button
            className="h-[30px] w-[30px]"
            onClick={() =>
              setComponentMode(componentMode =>
                componentMode === "delete" ? "" : "delete",
              )
            }
          >
            <HiMinusCircle className="h-full w-full" />
          </button>
          <Modal.Toggle name="createComponent">
            <button className="h-[30px] w-[30px]">
              <HiPlusCircle className="h-full w-full" />
            </button>
          </Modal.Toggle>
        </div>
      </div>
      <ComponentNav componentMode={componentMode} />
    </>
  );
}

export default ComponentDisplay;
