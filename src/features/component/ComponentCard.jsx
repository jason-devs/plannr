import { HiX } from "react-icons/hi";
import usePageComponent from "../joins/page component/usePageComponent";

function ComponentCard({ component }) {
  const { deletePageComponent } = usePageComponent();

  function handleDeletePageComponent() {
    deletePageComponent(component._id);
  }

  return (
    <div className="flex items-center rounded-sm border border-dashed">
      <span className="px-2 py-1">{component.name}</span>
      <button
        className="h-full border-l border-dashed px-2"
        onClick={handleDeletePageComponent}
      >
        <HiX />
      </button>
    </div>
  );
}

export default ComponentCard;
