import { HiX } from "react-icons/hi";
import usePageComponent from "./usePageComponent";

function PageComponentCard({ pageComponent, origin, displayField = "name" }) {
  const { deletePageComponent, isPendingPageComponent } = usePageComponent();

  function handleDeletePageComponent() {
    deletePageComponent(pageComponent._id);
  }

  return (
    <div
      className={`flex items-center rounded-sm border border-dashed ${isPendingPageComponent && "opacity-50"}`}
    >
      <span className="px-2 py-1">{pageComponent[origin][displayField]}</span>
      <button
        className="h-full border-l border-dashed px-2"
        onClick={handleDeletePageComponent}
      >
        <HiX />
      </button>
    </div>
  );
}

export default PageComponentCard;
