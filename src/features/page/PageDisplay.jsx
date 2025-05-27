import { useState } from "react";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import PageNav from "./PageNav";

function PageDisplay() {
  const [pageMode, setPageMode] = useState("");

  return (
    <>
      <div className="flex w-full justify-between">
        <h2 className="text-2xl">Pages</h2>
        <div>
          <button
            className="h-[30px] w-[30px]"
            onClick={() =>
              setPageMode(pageMode => (pageMode === "delete" ? "" : "delete"))
            }
          >
            <HiMinusCircle className="h-full w-full" />
          </button>
          <Modal.Toggle name="createPage">
            <button className="h-[30px] w-[30px]">
              <HiPlusCircle className="h-full w-full" />
            </button>
          </Modal.Toggle>
        </div>
      </div>
      <PageNav pageMode={pageMode} />
    </>
  );
}

export default PageDisplay;
